---
title: Select Menus
description: Dropdown select menu components
---

## Select Menu Types

DiscordRDA supports all Discord select menu types:

| Type | Description |
|------|-------------|
| `string_select` | Select from predefined options |
| `user_select` | Select users |
| `role_select` | Select roles |
| `mentionable_select` | Select users or roles |
| `channel_select` | Select channels |

## String Select Menu

```ruby
bot.slash('role_menu', 'Select your roles') do |cmd|
  cmd.handler do |interaction|
    interaction.respond(content: 'Choose your roles:') do |builder|
      builder.components do |row|
        row.string_select(
          custom_id: 'role_select',
          placeholder: 'Select roles',
          min_values: 1,
          max_values: 3
        ) do |menu|
          menu.option(label: 'Developer', value: 'dev', emoji: '💻')
          menu.option(label: 'Designer', value: 'design', emoji: '🎨')
          menu.option(label: 'Manager', value: 'manager', emoji: '📊')
        end
      end
    end
  end
end

bot.on(:select_menu) do |interaction|
  if interaction.custom_id == 'role_select'
    values = interaction.values
    interaction.respond(
      content: "You selected: #{values.join(', ')}",
      ephemeral: true
    )
  end
end
```

## User Select

```ruby
bot.slash('mention', 'Mention a user') do |cmd|
  cmd.handler do |interaction|
    interaction.respond(content: 'Select a user to mention:') do |builder|
      builder.components do |row|
        row.user_select(
          custom_id: 'user_mention',
          placeholder: 'Choose a user'
        )
      end
    end
  end
end

bot.on(:select_menu) do |interaction|
  if interaction.custom_id == 'user_mention'
    user = interaction.resolved.users.first
    interaction.respond(content: "You mentioned #{user.mention}")
  end
end
```

## Role Select

```ruby
bot.slash('assign_role', 'Assign a role') do |cmd|
  cmd.handler do |interaction|
    interaction.respond(content: 'Select a role to assign:') do |builder|
      builder.components do |row|
        row.role_select(
          custom_id: 'role_assign',
          placeholder: 'Choose a role'
        )
      end
    end
  end
end
```

## Multi-Select

```ruby
interaction.respond(content: 'Select channels to monitor:') do |builder|
  builder.components do |row|
    row.channel_select(
      custom_id: 'channel_monitor',
      placeholder: 'Select channels',
      min_values: 1,
      max_values: 5,
      channel_types: [:text, :announcement]
    )
  end
end
```

## Dynamic Options

```ruby
class PaginatedSelect
  def initialize(items, per_page: 25)
    @items = items
    @per_page = per_page
  end
  
  def show_page(interaction, page: 0)
    start_idx = page * @per_page
    page_items = @items[start_idx, @per_page]
    
    interaction.respond(content: "Page #{page + 1}:") do |builder|
      builder.components do |row|
        row.string_select(
          custom_id: "items_page_#{page}",
          placeholder: 'Select an item'
        ) do |menu|
          page_items.each do |item|
            menu.option(label: item.name, value: item.id.to_s)
          end
        end
      end
      
      # Navigation buttons
      builder.components do |row|
        if page > 0
          row.button(style: :secondary, label: '◀ Prev', custom_id: "prev_#{page}")
        end
        if start_idx + @per_page < @items.length
          row.button(style: :secondary, label: 'Next ▶', custom_id: "next_#{page}")
        end
      end
    end
  end
end
```

## Handling Selections

```ruby
bot.on(:select_menu) do |interaction|
  case interaction.custom_id
  when /^items_page_(\d+)$/
    page = $1.to_i
    item_id = interaction.values.first
    handle_item_selection(interaction, item_id, page)
    
  when 'role_select'
    roles = interaction.resolved.roles
    interaction.respond(
      content: "Added roles: #{roles.map(&:name).join(', ')}",
      ephemeral: true
    )
  end
end
```
