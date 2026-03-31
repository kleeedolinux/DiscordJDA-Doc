---
layout: doc
title: Context Menu Commands
description: User and Message context menu commands
permalink: /slash-commands/context-menus/
---


## Context Menu Overview

Context menus appear when right-clicking users or messages in Discord.

## User Context Menu

Right-click on a user:

```ruby
bot.context_menu(type: :user, name: 'High Five') do |interaction|
  user = interaction.target_user
  interaction.respond(content: "You high-fived #{user.username}!")
end
```

## Message Context Menu

Right-click on a message:

```ruby
bot.context_menu(type: :message, name: 'Quote') do |interaction|
  message = interaction.target_message
  interaction.respond(
    content: "> #{message.content}\n— #{message.author.username}",
    ephemeral: true
  )
end
```

## Advanced User Command

```ruby
bot.context_menu(type: :user, name: 'User Info') do |interaction|
  user = interaction.target_user
  member = interaction.target_member
  
  content = <<~INFO
    **User Information**
    Username: #{user.username}
    ID: #{user.id}
    Created: #{user.created_at}
    
    **Member Information**
    Joined: #{member.joined_at}
    Roles: #{member.roles.map(&:name).join(', ')}
  INFO
  
  interaction.respond(content: content, ephemeral: true)
end
```

## Permissions

```ruby
bot.context_menu(
  type: :user,
  name: 'Ban',
  default_permissions: :ban_members
) do |interaction|
  user = interaction.target_user
  guild = interaction.guild
  
  guild.ban(user.id)
  interaction.respond(content: "Banned #{user.username}", ephemeral: true)
end
```

## Guild-Specific Context Menus

```ruby
bot.context_menu(
  type: :user,
  name: 'Server Profile',
  guild_id: '123456789'
) do |interaction|
  member = interaction.target_member
  interaction.respond(
    content: "Nickname: #{member.nick || 'None'}",
    ephemeral: true
  )
end
```
