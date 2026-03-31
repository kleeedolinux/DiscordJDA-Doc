---
sidebar_position: 3
---

# Buttons & Components

Components are interactive elements you can add to messages: buttons, select menus, and more. They enable rich user interfaces without message parsing.

## Component Types

Discord supports several component types:
- **Buttons** - Clickable buttons with styles
- **String Select** - Dropdown menu (text options)
- **User Select** - Dropdown for selecting users
- **Role Select** - Dropdown for selecting roles
- **Channel Select** - Dropdown for selecting channels
- **Mentionable Select** - Dropdown for users and roles

## Buttons

### Button Styles

```ruby
:primary     # Blurple (style: 1) - Custom ID
:secondary   # Gray (style: 2) - Custom ID
:success     # Green (style: 3) - Custom ID
:danger      # Red (style: 4) - Custom ID
:link        # URL buttons (style: 5) - Opens URL
```

### Creating Buttons

```ruby
interaction.respond(content: 'Choose an action:') do |builder|
  builder.components do |row|
    # Primary button
    row.button(
      style: :primary,
      label: 'Approve',
      custom_id: 'approve_btn',
      emoji: '✅'
    )
    
    # Danger button
    row.button(
      style: :danger,
      label: 'Reject',
      custom_id: 'reject_btn',
      emoji: '❌'
    )
    
    # Link button (opens URL)
    row.button(
      style: :link,
      label: 'View Docs',
      url: 'https://example.com'
    )
  end
end
```

### Handling Button Clicks

```ruby
bot.on(:button_click) do |interaction|
  case interaction.custom_id
  when 'approve_btn'
    interaction.update_message(
      content: '✅ Approved!',
      components: []  # Remove buttons
    )
  when 'reject_btn'
    interaction.update_message(
      content: '❌ Rejected',
      components: []
    )
  end
end
```

### Disabled Buttons

```ruby
row.button(
  style: :primary,
  label: 'Processing...',
  custom_id: 'processing',
  disabled: true  # Grayed out, not clickable
)
```

### Button with Emoji

```ruby
row.button(
  style: :success,
  label: 'Like',
  custom_id: 'like_btn',
  emoji: { name: '👍' }
)

# Custom emoji
row.button(
  style: :primary,
  label: 'React',
  custom_id: 'react_btn',
  emoji: { name: 'party', id: '123456789', animated: false }
)
```

## Select Menus

### String Select (Dropdown)

```ruby
interaction.respond(content: 'Pick a color:') do |builder|
  builder.components do |row|
    row.string_select(
      custom_id: 'color_select',
      placeholder: 'Choose a color',
      min_values: 1,    # Minimum selections
      max_values: 1,    # Maximum selections
      options: [
        { 
          label: 'Red',
          value: 'red',
          description: 'The color of passion',
          emoji: { name: '🔴' }
        },
        { 
          label: 'Green',
          value: 'green',
          description: 'The color of nature',
          emoji: { name: '🟢' }
        },
        { 
          label: 'Blue',
          value: 'blue',
          description: 'The color of sky',
          emoji: { name: '🔵' }
        }
      ]
    )
  end
end

# Handle selection
bot.on(:string_select) do |interaction|
  next unless interaction.custom_id == 'color_select'
  
  selected = interaction.selected_values.first
  interaction.update_message(content: "You selected: #{selected}")
end
```

### Multi-Select

```ruby
row.string_select(
  custom_id: 'roles_select',
  placeholder: 'Select roles to assign',
  min_values: 0,
  max_values: 5,  # Can select up to 5
  options: available_roles.map { |r| { label: r.name, value: r.id } }
)
```

### User Select

```ruby
interaction.respond(content: 'Who should be the leader?') do |builder|
  builder.components do |row|
    row.user_select(
      custom_id: 'leader_select',
      placeholder: 'Select a user',
      max_values: 1
    )
  end
end

bot.on(:user_select) do |interaction|
  next unless interaction.custom_id == 'leader_select'
  
  selected_user_id = interaction.selected_values.first
  selected_user = interaction.resolved.users[selected_user_id]
  
  interaction.update_message(
    content: "Leader selected: #{selected_user.mention}"
  )
end
```

### Role Select

```ruby
row.role_select(
  custom_id: 'role_select',
  placeholder: 'Choose a role'
)

bot.on(:role_select) do |interaction|
  role_id = interaction.selected_values.first
  role = interaction.resolved.roles[role_id]
  
  interaction.respond(
    content: "Selected role: #{role.mention}",
    ephemeral: true
  )
end
```

### Channel Select

```ruby
row.channel_select(
  custom_id: 'channel_select',
  placeholder: 'Select destination channel',
  channel_types: [0, 5],  # Only text and news channels
  max_values: 1
)

bot.on(:channel_select) do |interaction|
  channel_id = interaction.selected_values.first
  channel = interaction.resolved.channels[channel_id]
  
  interaction.respond(
    content: "Selected: #{channel.mention}",
    ephemeral: true
  )
end
```

### Mentionable Select

```ruby
row.mentionable_select(
  custom_id: 'notify_select',
  placeholder: 'Who to notify?',
  max_values: 10  # Users and/or roles
)

bot.on(:mentionable_select) do |interaction|
  # Can contain user IDs and role IDs
  selected = interaction.selected_values
  
  mentions = selected.map { |id| "<@#{id}>" }.join(' ')
  interaction.respond(content: "Will notify: #{mentions}")
end
```

## Action Rows

Components must be placed in "Action Rows" (up to 5 per message, 5 components per row):

```ruby
interaction.respond(content: 'Multiple rows:') do |builder|
  builder.components do |row1|
    # Row 1: 3 buttons
    row1.button(style: :primary, label: '1', custom_id: 'btn1')
    row1.button(style: :primary, label: '2', custom_id: 'btn2')
    row1.button(style: :primary, label: '3', custom_id: 'btn3')
  end
  
  builder.components do |row2|
    # Row 2: 1 select menu (selects take full row)
    row2.string_select(
      custom_id: 'select1',
      placeholder: 'Choose',
      options: [{ label: 'A', value: 'a' }]
    )
  end
end
```

## Advanced Patterns

### Paginated Results

```ruby
class Paginator
  def initialize(bot, items, per_page: 10)
    @bot = bot
    @items = items
    @per_page = per_page
  end
  
  def send(interaction, page: 0)
    total_pages = (@items.length.to_f / @per_page).ceil
    
    start_idx = page * @per_page
    end_idx = start_idx + @per_page
    page_items = @items[start_idx...end_idx]
    
    content = page_items.map { |i| "• #{i}".join("\n")
    
    interaction.respond(content: content) do |builder|
      builder.components do |row|
        row.button(
          style: :secondary,
          label: '◀ Previous',
          custom_id: "page_#{page - 1}",
          disabled: page == 0
        )
        row.button(
          style: :secondary,
          label: "#{page + 1} / #{total_pages}",
          custom_id: 'page_indicator',
          disabled: true
        )
        row.button(
          style: :secondary,
          label: 'Next ▶',
          custom_id: "page_#{page + 1}",
          disabled: page >= total_pages - 1
        )
      end
    end
  end
end

# Handle pagination
bot.on(:button_click) do |interaction|
  if interaction.custom_id.start_with?('page_')
    page = interaction.custom_id.split('_')[1].to_i
    # Re-render with new page
    # (Need to track what was being paginated)
  end
end
```

### Confirmation Dialog

```ruby
def confirm(interaction, message, on_confirm:, on_cancel: nil)
  interaction.respond(content: message) do |builder|
    builder.components do |row|
      row.button(
        style: :success,
        label: '✅ Confirm',
        custom_id: 'confirm'
      )
      row.button(
        style: :danger,
        label: '❌ Cancel',
        custom_id: 'cancel'
      )
    end
  end
  
  # Wait for response
  response = bot.wait_for(:button_click, timeout: 60) do |i|
    i.message.id == interaction.message.id &&
    i.user.id == interaction.user.id
  end
  
  if response && response.custom_id == 'confirm'
    on_confirm.call(response)
  else
    on_cancel&.call(response)
  end
end
```

### Dynamic Select Options

```ruby
bot.slash('roles', 'Assign roles') do |cmd|
  cmd.handler do |interaction|
    # Get available roles
    roles = bot.guild_roles(interaction.guild_id)
      .reject { |r| r.managed? }
      .reject { |r| r.name == '@everyone' }
      .first(25)  # Discord limit
    
    options = roles.map do |role|
      {
        label: role.name,
        value: role.id,
        description: "#{role.members.length} members",
        emoji: { name: '🏷️' }
      }
    end
    
    interaction.respond(content: 'Select roles:') do |builder|
      builder.components do |row|
        row.string_select(
          custom_id: 'assign_roles',
          placeholder: 'Choose roles',
          min_values: 0,
          max_values: [roles.length, 5].min,
          options: options
        )
      end
    end
  end
end
```

## Component V2

Discord's new Component V2 system (experimental):

```ruby
# Container with multiple components
interaction.respond(content: '') do |builder|
  builder.container(accent_color: 0x7289da) do |container|
    container.text_display(content: '# Welcome')
    container.text_display(content: 'Choose an option:')
    
    container.action_row do |row|
      row.button(style: :primary, label: 'Option 1', custom_id: 'opt1')
      row.button(style: :primary, label: 'Option 2', custom_id: 'opt2')
    end
    
    container.separator
    
    container.text_display(content: '_Powered by DiscordRDA_')
  end
end
```

## Best Practices

1. **Use clear labels** - Users should understand what clicking does
2. **Group related buttons** - Logical organization in rows
3. **Disable after use** - Prevent double-clicks on important actions
4. **Handle timeouts** - Remove or disable components after time
5. **Use appropriate styles** - Green for success, red for danger
6. **Limit options** - Max 25 options in selects, 5 buttons per row

## Complete Example

```ruby
require 'discord_rda'

bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  application_id: ENV['DISCORD_APP_ID'],
  intents: [:guilds]
)

# Poll command with buttons
bot.slash('poll', 'Create a poll') do |cmd|
  cmd.string('question', 'Poll question', required: true)
  cmd.string('option1', 'First option', required: true)
  cmd.string('option2', 'Second option', required: true)
  
  cmd.handler do |interaction|
    question = interaction.option('question')
    opt1 = interaction.option('option1')
    opt2 = interaction.option('option2')
    
    interaction.respond do |builder|
      builder.content = "📊 **#{question}**"
      
      builder.components do |row|
        row.button(
          style: :primary,
          label: opt1,
          custom_id: 'vote_1',
          emoji: { name: '1️⃣' }
        )
        row.button(
          style: :primary,
          label: opt2,
          custom_id: 'vote_2',
          emoji: { name: '2️⃣' }
        )
      end
    end
  end
end

# Handle votes
votes = Hash.new(0)

bot.on(:button_click) do |interaction|
  case interaction.custom_id
  when 'vote_1'
    votes[interaction.user.id] = 1
    interaction.respond(
      content: "Voted for option 1!",
      ephemeral: true
    )
  when 'vote_2'
    votes[interaction.user.id] = 2
    interaction.respond(
      content: "Voted for option 2!",
      ephemeral: true
    )
  end
end

# Help command with select menu
bot.slash('help', 'Get help') do |cmd|
  cmd.handler do |interaction|
    interaction.respond(content: 'Select a topic:') do |builder|
      builder.components do |row|
        row.string_select(
          custom_id: 'help_topic',
          placeholder: 'Choose topic',
          options: [
            { label: 'Getting Started', value: 'start', emoji: { name: '🚀' } },
            { label: 'Commands', value: 'commands', emoji: { name: '⌨️' } },
            { label: 'FAQ', value: 'faq', emoji: { name: '❓' } },
            { label: 'Support', value: 'support', emoji: { name: '🆘' } }
          ]
        )
      end
    end
  end
end

bot.on(:string_select) do |interaction|
  next unless interaction.custom_id == 'help_topic'
  
  topic = interaction.selected_values.first
  
  content = case topic
  when 'start'
    'Welcome! Get started by reading the docs.'
  when 'commands'
    'Available commands: /help, /poll, /info'
  when 'faq'
    'Q: Is this free? A: Yes!'
  when 'support'
    'Join our support server: discord.gg/example'
  end
  
  interaction.update_message(content: content)
end

bot.run
```

## Next Steps

- **[Create Modals](./modals)** - Form inputs for complex data
- **[Add Autocomplete](./autocomplete)** - Smart suggestions
- **[Learn Interactions](./interaction)** - Full interaction API
