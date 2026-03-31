---
title: Creating Commands
description: How to create slash commands
---

## Basic Command

```ruby
bot.slash('hello', 'Say hello') do |cmd|
  cmd.handler do |interaction|
    interaction.respond(content: 'Hello, World!')
  end
end
```

## Guild-Specific Commands

For testing, register commands to a specific guild:

```ruby
bot.slash('test', 'Test command', guild_id: '123456789') do |cmd|
  cmd.handler do |interaction|
    interaction.respond(content: 'Test successful!', ephemeral: true)
  end
end
```

## Global Commands

Omit `guild_id` for global commands:

```ruby
bot.slash('help', 'Show help') do |cmd|
  cmd.handler do |interaction|
    interaction.respond(content: 'Available commands: /help, /ping')
  end
end
```

## Command with Permissions

```ruby
bot.slash('ban', 'Ban a user') do |cmd|
  cmd.default_permissions(:ban_members)
  cmd.user('user', 'User to ban', required: true)
  cmd.string('reason', 'Ban reason')
  
  cmd.handler do |interaction|
    user = interaction.option('user')
    reason = interaction.option('reason') || 'No reason'
    # Ban logic here
    interaction.respond(content: "Banned #{user.username}", ephemeral: true)
  end
end
```

## Subcommands

```ruby
bot.slash('mod', 'Moderation commands') do |cmd|
  cmd.subcommand('ban', 'Ban a user') do |sub|
    sub.user('user', 'User to ban', required: true)
    sub.handler { |i| /* ... */ }
  end
  
  cmd.subcommand('kick', 'Kick a user') do |sub|
    sub.user('user', 'User to kick', required: true)
    sub.handler { |i| /* ... */ }
  end
end
```

## Command Groups

```ruby
bot.slash('settings', 'Bot settings') do |cmd|
  cmd.group('user', 'User settings') do |group|
    group.subcommand('profile', 'Edit profile') do |sub|
      sub.handler { |i| /* ... */ }
    end
  end
  
  cmd.group('server', 'Server settings') do |group|
    group.subcommand('prefix', 'Change prefix') do |sub|
      sub.handler { |i| /* ... */ }
    end
  end
end
```
