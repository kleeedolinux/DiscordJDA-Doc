---
sidebar_position: 2
---

# Interaction API Reference

Complete API reference for the `DiscordRDA::Interaction` class.

## Class Overview

```ruby
class DiscordRDA::Interaction < Entity
  # Represents a Discord interaction (slash command, button, etc.)
end
```

## Properties

### Core Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | Snowflake | Interaction ID |
| `type` | Integer | Interaction type (1=ping, 2=app command, 3=message component, 4=autocomplete, 5=modal submit) |
| `application_id` | Snowflake | Application ID |
| `channel_id` | Snowflake | Channel ID |
| `guild_id` | Snowflake | Guild ID (nil if DM) |
| `user` | User | User who triggered interaction |
| `member` | Member | Guild member (nil if DM) |
| `token` | String | Interaction token |
| `version` | Integer | API version |
| `message` | Message | Message for component interactions |
| `channel` | Channel | Channel object |

**Example:**

```ruby
bot.slash('info', 'Get info') do |cmd|
  cmd.handler do |interaction|
    puts interaction.id
    puts interaction.user.username
    puts interaction.guild_id
    puts interaction.channel_id
  end
end
```

### Command-Specific Properties

| Property | Type | Description |
|----------|------|-------------|
| `command_id` | Snowflake | Command ID |
| `command_name` | String | Command name |
| `command_type` | Integer | Command type |
| `command_data` | Hash | Raw command data |
| `options` | Hash | Command options |

```ruby
bot.slash('greet', 'Greet someone') do |cmd|
  cmd.string('name', required: true)
  cmd.boolean('loud')
  
  cmd.handler do |interaction|
    puts interaction.command_name  # => "greet"
    puts interaction.options       # => { "name" => "John", "loud" => true }
  end
end
```

### Component-Specific Properties

| Property | Type | Description |
|----------|------|-------------|
| `custom_id` | String | Component custom ID |
| `component_type` | Integer | Component type |
| `component_data` | Hash | Raw component data |
| `selected_values` | Array | Selected values (select menus) |

```ruby
bot.on(:button_click) do |interaction|
  puts interaction.custom_id        # => "approve_btn"
  puts interaction.component_type   # => 2 (button)
end

bot.on(:string_select) do |interaction|
  puts interaction.selected_values  # => ["red", "blue"]
end
```

## Methods

### `option(name)`

Get a specific option value.

```ruby
bot.slash('echo', 'Echo text') do |cmd|
  cmd.string('text', required: true)
  cmd.integer('times')
  
  cmd.handler do |interaction|
    text = interaction.option('text')     # => "Hello"
    times = interaction.option('times')   # => 3 or nil
    
    interaction.respond(content: text * times.to_i)
  end
end
```

### `options`

Get all options as a hash.

```ruby
cmd.handler do |interaction|
  opts = interaction.options
  # => { "text" => "Hello", "times" => 3 }
end
```

### `focused_option`

Get the focused option (for autocomplete).

```ruby
bot.on(:autocomplete) do |interaction|
  focused = interaction.focused_option
  # => { "name" => "color", "value" => "re", "focused" => true }
  
  query = focused['value']
  # Search and return choices...
end
```

### `respond(content = nil, **options, &block)`

Respond to the interaction.

```ruby
cmd.handler do |interaction|
  # Simple text response
  interaction.respond(content: 'Hello!')
  
  # With embed
  interaction.respond(
    content: 'Hello!',
    embeds: [{ title: 'Embed', color: 0x00ff00 }]
  )
  
  # Ephemeral (only visible to user)
  interaction.respond(
    content: 'Secret!',
    ephemeral: true
  )
  
  # With components
  interaction.respond(
    content: 'Click a button:',
    components: [...]
  )
  
  # With builder block
  interaction.respond do |builder|
    builder.content = 'Hello!'
    builder.embed do |embed|
      embed.title = 'Title'
      embed.color = 0xff0000
    end
    builder.components do |row|
      row.button(style: :primary, label: 'Click', custom_id: 'btn')
    end
  end
end
```

### `defer(ephemeral: false)`

Defer the response (show "thinking...").

```ruby
cmd.handler do |interaction|
  # Show "thinking" immediately
  interaction.defer(ephemeral: true)
  
  # Do slow work
  result = slow_operation()
  
  # Update with result
  interaction.edit_original(content: "Result: #{result}")
end
```

### `defer_update`

Defer updating a message (for components).

```ruby
bot.on(:button_click) do |interaction|
  interaction.defer_update
  
  # Do work
  
  # Edit the original message
  interaction.edit_original(content: 'Updated!')
end
```

### `update_message(**options)`

Update the original message (component interactions).

```ruby
bot.on(:button_click) do |interaction|
  interaction.update_message(
    content: 'Button clicked!',
    components: []  # Remove buttons
  )
end
```

### `edit_original(**options)`

Edit the original interaction response.

```ruby
cmd.handler do |interaction|
  interaction.defer
  
  # Later...
  interaction.edit_original(
    content: 'Updated content',
    embeds: [new_embed]
  )
end
```

### `delete_original`

Delete the original interaction response.

```ruby
cmd.handler do |interaction|
  interaction.respond(content: 'This will be deleted...')
  
  sleep 10
  
  interaction.delete_original
end
```

### `followup(**options)`

Send a follow-up message.

```ruby
cmd.handler do |interaction|
  interaction.respond(content: 'First response')
  
  # Additional messages
  interaction.followup(content: 'Second message')
  interaction.followup(content: 'Third message')
end
```

### `get_followup(message_id)`

Get a followup message.

```ruby
followup = interaction.followup(content: 'Test')
message_id = followup.id

# Later...
message = interaction.get_followup(message_id)
```

### `edit_followup(message_id, **options)`

Edit a followup message.

```ruby
interaction.edit_followup(
  message_id,
  content: 'Updated followup'
)
```

### `delete_followup(message_id)`

Delete a followup message.

```ruby
interaction.delete_followup(message_id)
```

### `autocomplete(choices)`

Respond to autocomplete.

```ruby
bot.on(:autocomplete) do |interaction|
  choices = [
    { name: 'Red', value: 'red' },
    { name: 'Blue', value: 'blue' }
  ]
  
  interaction.autocomplete(choices)
end
```

### `modal(custom_id:, title:, **options, &block)`

Open a modal.

```ruby
cmd.handler do |interaction|
  interaction.modal(
    custom_id: 'feedback_modal',
    title: 'Send Feedback'
  ) do |modal|
    modal.short(
      custom_id: 'subject',
      label: 'Subject',
      required: true
    )
    modal.paragraph(
      custom_id: 'message',
      label: 'Your message',
      required: true
    )
  end
end
```

### `premium_required`

Show premium required response.

```ruby
cmd.handler do |interaction|
  if user_needs_premium?(interaction.user)
    interaction.premium_required
  else
    interaction.respond(content: 'Here is your premium content!')
  end
end
```

## Modal Values

### `modal_value(id)`

Get a value from modal submission.

```ruby
bot.on(:modal_submit) do |interaction|
  subject = interaction.modal_value('subject')
  message = interaction.modal_value('message')
  
  interaction.respond(content: "Subject: #{subject}")
end
```

### `modal_values`

Get all modal values.

```ruby
bot.on(:modal_submit) do |interaction|
  values = interaction.modal_values
  # => { "subject" => "Hello", "message" => "World" }
end
```

### `has_modal_value?(id)`

Check if a modal value exists.

```ruby
if interaction.has_modal_value?('optional_field')
  value = interaction.modal_value('optional_field')
end
```

## Resolved Data

### `resolved`

Access resolved entities from selects.

```ruby
bot.on(:user_select) do |interaction|
  user_id = interaction.selected_values.first
  user = interaction.resolved.users[user_id]
  
  interaction.respond(content: "Selected: #{user.mention}")
end

bot.on(:role_select) do |interaction|
  role_id = interaction.selected_values.first
  role = interaction.resolved.roles[role_id]
  
  interaction.respond(content: "Selected: #{role.mention}")
end

bot.on(:channel_select) do |interaction|
  channel_id = interaction.selected_values.first
  channel = interaction.resolved.channels[channel_id]
  
  interaction.respond(content: "Selected: #{channel.mention}")
end
```

### `target_user`

Get target user (context menus).

```ruby
bot.context_menu(type: :user, name: 'Info') do |interaction|
  user = interaction.target_user
  member = interaction.target_member
  
  interaction.respond(
    content: "User: #{user.username}",
    ephemeral: true
  )
end
```

### `target_message`

Get target message (context menus).

```ruby
bot.context_menu(type: :message, name: 'Quote') do |interaction|
  message = interaction.target_message
  
  interaction.respond(
    content: "> #{message.content}\n— #{message.author.mention}"
  )
end
```

### `original_message`

Get original message (for component interactions).

```ruby
bot.on(:button_click) do |interaction|
  message = interaction.original_message
  
  puts "Button clicked on message: #{message.id}"
end
```

## Type Checking

### `command?`

Check if interaction is a command.

```ruby
bot.on(:interaction_create) do |interaction|
  if interaction.command?
    handle_command(interaction)
  end
end
```

### `component?`

Check if interaction is a component interaction.

```ruby
if interaction.component?
  handle_component(interaction)
end
```

### `autocomplete?`

Check if interaction is autocomplete.

```ruby
if interaction.autocomplete?
  handle_autocomplete(interaction)
end
```

### `modal_submit?`

Check if interaction is a modal submission.

```ruby
if interaction.modal_submit?
  handle_modal_submit(interaction)
end
```

## Permission Helpers

### `permissions`

Get user permissions.

```ruby
cmd.handler do |interaction|
  perms = interaction.permissions
  
  if perms.administrator?
    interaction.respond(content: 'You are admin!')
  end
end
```

### `app_permissions`

Get bot permissions in channel.

```ruby
cmd.handler do |interaction|
  perms = interaction.app_permissions
  
  unless perms.send_messages?
    interaction.respond(
      content: "I can't send messages here!",
      ephemeral: true
    )
    return
  end
end
```

## Complete Example

```ruby
require 'discord_rda'

bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  application_id: ENV['DISCORD_APP_ID'],
  intents: [:guilds, :guild_messages]
)

# Command with all interaction features
bot.slash('ticket', 'Create a support ticket') do |cmd|
  cmd.string('subject', 'Brief subject', required: true)
  cmd.string('priority', 'Priority level',
    choices: [
      { name: 'Low', value: 'low' },
      { name: 'Medium', value: 'medium' },
      { name: 'High', value: 'high' }
    ]
  )
  
  cmd.handler do |interaction|
    # Check permissions
    unless interaction.permissions.manage_messages?
      interaction.respond(
        content: 'You need manage messages permission!',
        ephemeral: true
      )
      return
    end
    
    subject = interaction.option('subject')
    priority = interaction.option('priority') || 'low'
    
    # Defer for processing
    interaction.defer(ephemeral: true)
    
    # Create ticket
    ticket_id = create_ticket(
      guild_id: interaction.guild_id,
      user_id: interaction.user.id,
      subject: subject,
      priority: priority
    )
    
    # Update with result
    interaction.edit_original(
      content: "✅ Ticket ##{ticket_id} created!"
    )
    
    # Send followup with details
    interaction.followup(
      content: "Subject: #{subject}\nPriority: #{priority}"
    )
  end
end

# Button interaction
bot.on(:button_click) do |interaction|
  case interaction.custom_id
  when 'confirm_delete'
    # Verify it's the same user
    unless interaction.user.id == interaction.message.interaction&.user&.id
      interaction.respond(
        content: 'This button is not for you!',
        ephemeral: true
      )
      return
    end
    
    # Delete and update
    interaction.defer_update
    
    delete_item(interaction.message.id)
    
    interaction.edit_original(
      content: '🗑️ Deleted!',
      components: []
    )
  end
end

# Select menu interaction
bot.on(:string_select) do |interaction|
  next unless interaction.custom_id == 'role_select'
  
  role_ids = interaction.selected_values
  
  # Add roles to user
  role_ids.each do |role_id|
    bot.add_guild_member_role(
      interaction.guild_id,
      interaction.user.id,
      role_id
    )
  end
  
  interaction.respond(
    content: "✅ Added #{role_ids.length} roles!",
    ephemeral: true
  )
end

# Modal submission
bot.on(:modal_submit) do |interaction|
  next unless interaction.custom_id == 'report_modal'
  
  user_id = interaction.modal_value('reported_user')
  reason = interaction.modal_value('reason')
  details = interaction.modal_value('details')
  
  # Process report
  create_report(
    reporter: interaction.user.id,
    reported: user_id,
    reason: reason,
    details: details
  )
  
  interaction.respond(
    content: '📋 Report submitted! Moderators will review.',
    ephemeral: true
  )
end

# Autocomplete
bot.on(:autocomplete) do |interaction|
  next unless interaction.command_name == 'tag'
  
  query = interaction.focused_option['value']
  
  tags = search_tags(query).first(25)
  
  choices = tags.map do |tag|
    { name: tag.name, value: tag.id }
  end
  
  interaction.autocomplete(choices)
end

bot.run
```

## See Also

- [Slash Commands Guide](../interactions/slash-commands) - Using interactions
- [Buttons & Components](../interactions/buttons-components) - Component interactions
- [Modals Guide](../interactions/modals) - Modal submissions
