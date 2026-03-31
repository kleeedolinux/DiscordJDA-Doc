---
sidebar_position: 1
---

# Slash Commands

Slash Commands are Discord's modern command system. They provide a native UI, autocomplete, permissions, and work on all platforms.

## What are Slash Commands?

Unlike prefix commands (like `!help`), slash commands:
- Show a native Discord UI with descriptions
- Support typed arguments (strings, numbers, users, etc.)
- Provide autocomplete suggestions
- Have built-in permission controls
- Work on mobile and desktop

## Creating Slash Commands

### Basic Command

```ruby
bot.slash('hello', 'Say hello to someone') do |cmd|
  # Define options
  cmd.string('name', 'The person to greet', required: true)
  
  # Handle the command
  cmd.handler do |interaction|
    name = interaction.option('name')
    interaction.respond(content: "Hello, #{name}!")
  end
end
```

### Command with Multiple Options

```ruby
bot.slash('ban', 'Ban a user from the server') do |cmd|
  cmd.user('user', 'User to ban', required: true)
  cmd.string('reason', 'Reason for ban')
  cmd.integer('days', 'Days of messages to delete', min_value: 0, max_value: 7)
  
  # Set default permissions
  cmd.default_permissions(:ban_members)
  
  cmd.handler do |interaction|
    user = interaction.option('user')
    reason = interaction.option('reason') || 'No reason provided'
    days = interaction.option('days') || 0
    
    # Ban the user
    bot.create_guild_ban(
      interaction.guild_id,
      user.id,
      delete_message_days: days,
      reason: reason
    )
    
    interaction.respond(
      content: "Banned #{user.username}",
      ephemeral: true  # Only visible to command user
    )
  end
end
```

## Option Types

DiscordRDA supports all Discord option types:

### String

```ruby
cmd.string('message', 'The message to send',
  required: true,
  min_length: 1,
  max_length: 2000
)
```

### Integer

```ruby
cmd.integer('age', 'Your age',
  min_value: 13,
  max_value: 120
)
```

### Number (Decimal)

```ruby
cmd.number('price', 'Item price',
  min_value: 0.01,
  max_value: 999.99
)
```

### Boolean

```ruby
cmd.boolean('ephemeral', 'Show response only to you?')
```

### User

```ruby
cmd.user('target', 'User to target', required: true)
```

### Channel

```ruby
cmd.channel('destination', 'Target channel',
  channel_types: [0, 5]  # Text and news channels only
)
```

### Role

```ruby
cmd.role('rank', 'Role to assign')
```

### Mentionable

```ruby
cmd.mentionable('who', 'User or role to mention')
```

### Attachment

```ruby
cmd.attachment('file', 'File to upload')
```

## Command Options

### Choices (Predefined Options)

```ruby
cmd.string('color', 'Pick a color',
  choices: [
    { name: 'Red', value: '#FF0000' },
    { name: 'Green', value: '#00FF00' },
    { name: 'Blue', value: '#0000FF' }
  ]
)
```

### Optional Options

```ruby
cmd.string('note', 'Optional note', required: false)
```

### Required Options

```ruby
cmd.string('name', 'Required name', required: true)
```

## Guild vs Global Commands

### Global Commands

Available in all guilds (with 1-hour propagation delay):

```ruby
bot.slash('help', 'Show help') do |cmd|
  cmd.handler { |i| i.respond(content: 'Help text') }
end
```

### Guild Commands

Available immediately in specific guilds:

```ruby
bot.slash('admin', 'Admin command', guild_id: '123456789') do |cmd|
  cmd.default_permissions(:administrator)
  cmd.handler { |i| i.respond(content: 'Admin stuff') }
end
```

### Multiple Guilds

```ruby
ADMIN_GUILDS = ['123456789', '987654321']

ADMIN_GUILDS.each do |guild_id|
  bot.slash('beta', 'Beta command', guild_id: guild_id) do |cmd|
    cmd.handler { |i| i.respond(content: 'Beta feature') }
  end
end
```

## Subcommands

Organize complex commands with subcommands:

```ruby
bot.slash('settings', 'Server settings') do |cmd|
  # Subcommand: view
  cmd.subcommand('view', 'View current settings') do |sub|
    sub.handler do |interaction|
      # Get guild settings
      settings = get_settings(interaction.guild_id)
      interaction.respond(content: format_settings(settings))
    end
  end
  
  # Subcommand: set
  cmd.subcommand('set', 'Update settings') do |sub|
    sub.string('key', 'Setting to change', required: true)
    sub.string('value', 'New value', required: true)
    
    sub.handler do |interaction|
      key = interaction.option('key')
      value = interaction.option('value')
      
      update_setting(interaction.guild_id, key, value)
      interaction.respond(content: "Set #{key} to #{value}")
    end
  end
  
  # Subcommand: reset
  cmd.subcommand('reset', 'Reset to defaults') do |sub|
    sub.handler do |interaction|
      reset_settings(interaction.guild_id)
      interaction.respond(content: 'Settings reset!')
    end
  end
end
```

## Subcommand Groups

For even more organization:

```ruby
bot.slash('mod', 'Moderation commands') do |cmd|
  # Group: user
  cmd.group('user', 'User management') do |group|
    group.subcommand('ban', 'Ban a user') do |sub|
      sub.user('target', required: true)
      sub.string('reason')
      
      sub.handler do |i|
        # Handle ban
      end
    end
    
    group.subcommand('kick', 'Kick a user') do |sub|
      sub.user('target', required: true)
      sub.string('reason')
      
      sub.handler do |i|
        # Handle kick
      end
    end
  end
  
  # Group: channel
  cmd.group('channel', 'Channel management') do |group|
    group.subcommand('lock', 'Lock a channel') do |sub|
      sub.handler do |i|
        # Handle lock
      end
    end
    
    group.subcommand('unlock', 'Unlock a channel') do |sub|
      sub.handler do |i|
        # Handle unlock
      end
    end
  end
end
```

## Permissions

### Default Permissions

```ruby
bot.slash('ban', 'Ban a user') do |cmd|
  # Only users with ban_members can see/use this
  cmd.default_permissions(:ban_members, :kick_members)
  
  cmd.handler { |i| /* ... */ }
end
```

### DM Permissions

```ruby
bot.slash('help', 'Get help') do |cmd|
  cmd.dm_permission(true)   # Allow in DMs (default: true)
  # or
  cmd.dm_permission(false)  # Guild-only command
  
  cmd.handler { |i| /* ... */ }
end
```

## Deferred Responses

For slow commands, defer the response first:

```ruby
bot.slash('process', 'Process data') do |cmd|
  cmd.handler do |interaction|
    # Show "Bot is thinking..." immediately
    interaction.defer(ephemeral: true)
    
    # Do slow work
    result = heavy_processing()
    
    # Update the response
    interaction.edit_original(content: "Done! Result: #{result}")
  end
end
```

## Ephemeral Responses

Private responses only visible to the command user:

```ruby
bot.slash('secret', 'Secret command') do |cmd|
  cmd.handler do |interaction|
    interaction.respond(
      content: 'This is a secret!',
      ephemeral: true  # Only you can see this
    )
  end
end
```

## Rich Responses

### With Embeds

```ruby
bot.slash('serverinfo', 'Server information') do |cmd|
  cmd.handler do |interaction|
    guild = bot.guild(interaction.guild_id)
    
    interaction.respond do |builder|
      builder.embed do |embed|
        embed.title = guild.name
        embed.description = guild.description
        embed.color = 0x00ff00
        embed.thumbnail = guild.icon_url
        
        embed.add_field(name: 'Members', value: guild.member_count.to_s, inline: true)
        embed.add_field(name: 'Created', value: guild.created_at.strftime('%Y-%m-%d'), inline: true)
        embed.add_field(name: 'Owner', value: "<@#{guild.owner_id}>", inline: true)
        
        embed.timestamp = Time.now
        embed.footer = { text: 'Server Info' }
      end
    end
  end
end
```

### With Components

```ruby
bot.slash('confirm', 'Confirm action') do |cmd|
  cmd.handler do |interaction|
    interaction.respond(
      content: 'Are you sure?',
      components: [
        {
          type: 1,  # Action row
          components: [
            {
              type: 2,  # Button
              style: 3,  # Success (green)
              label: 'Yes',
              custom_id: 'confirm_yes'
            },
            {
              type: 2,
              style: 4,  # Danger (red)
              label: 'No',
              custom_id: 'confirm_no'
            }
          ]
        }
      ]
    )
  end
end
```

## Bulk Registration

Register multiple commands at once:

```ruby
commands = []

commands << DiscordRDA::CommandBuilder.new('ping', 'Ping!') do |cmd|
  cmd.handler { |i| i.respond(content: 'Pong!') }
end

commands << DiscordRDA::CommandBuilder.new('info', 'Bot info') do |cmd|
  cmd.handler { |i| i.respond(content: 'Bot v1.0') }
end

commands << DiscordRDA::CommandBuilder.new('help', 'Show help') do |cmd|
  cmd.handler { |i| i.respond(content: 'Help text') }
end

# Register all at once
bot.bulk_register_commands(commands)
```

## Deleting Commands

```ruby
# Delete global command
bot.delete_global_command(command_id)

# Delete guild command
bot.delete_guild_command(guild_id, command_id)

# Delete all global commands (careful!)
bot.bulk_register_commands([])
```

## Best Practices

1. **Use descriptive names** - Commands should be self-explanatory
2. **Provide descriptions** - Required by Discord, helps users
3. **Set appropriate permissions** - Don't expose admin commands
4. **Defer slow commands** - Prevent timeouts
5. **Use subcommands** - Organize complex commands
6. **Test in guild first** - Guild commands update immediately

## Complete Example

```ruby
require 'discord_rda'

bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  application_id: ENV['DISCORD_APP_ID'],
  intents: [:guilds]
)

# Simple command
bot.slash('ping', 'Check bot latency') do |cmd|
  cmd.handler do |interaction|
    interaction.respond(content: 'Pong! 🏓')
  end
end

# Command with options
bot.slash('echo', 'Repeat a message') do |cmd|
  cmd.string('message', 'Message to echo', required: true)
  cmd.boolean('ephemeral', 'Private response?')
  
  cmd.handler do |interaction|
    message = interaction.option('message')
    ephemeral = interaction.option('ephemeral') || false
    
    interaction.respond(
      content: message,
      ephemeral: ephemeral
    )
  end
end

# Command with subcommands
bot.slash('moderation', 'Moderation tools') do |cmd|
  cmd.subcommand('warn', 'Warn a user') do |sub|
    sub.user('user', required: true)
    sub.string('reason', required: true)
    
    sub.handler do |i|
      user = i.option('user')
      reason = i.option('reason')
      
      # Implement warning logic
      i.respond(content: "Warned #{user.mention}: #{reason}")
    end
  end
end

# Admin command with permissions
bot.slash('purge', 'Delete messages', guild_id: ADMIN_GUILD) do |cmd|
  cmd.integer('amount', 'Messages to delete', 
    required: true,
    min_value: 1,
    max_value: 100
  )
  cmd.default_permissions(:manage_messages)
  
  cmd.handler do |interaction|
    amount = interaction.option('amount')
    
    # Get messages and delete
    messages = bot.channel_messages(interaction.channel_id, limit: amount)
    bot.bulk_delete_messages(interaction.channel_id, messages.map(&:id))
    
    interaction.respond(
      content: "Deleted #{amount} messages",
      ephemeral: true
    )
  end
end

bot.run
```

## Next Steps

- **[Learn about Context Menus](./context-menus)** - Right-click commands
- **[Build Components](./buttons-components)** - Buttons and selects
- **[Add Autocomplete](./autocomplete)** - Smart suggestions
