---
layout: doc
title: Command Options & Arguments
description: Working with slash command options
permalink: /slash-commands/options/
---


## Option Types

DiscordRDA supports all Discord option types:

| Type | Method | Example Value |
|------|--------|---------------|
| String | `string()` | `"Hello"` |
| Integer | `integer()` | `42` |
| Number | `number()` | `3.14` |
| Boolean | `boolean()` | `true` |
| User | `user()` | User entity |
| Channel | `channel()` | Channel entity |
| Role | `role()` | Role entity |
| Mentionable | `mentionable()` | User or Role |
| Attachment | `attachment()` | File attachment |

## String Option

```ruby
bot.slash('echo', 'Repeat a message') do |cmd|
  cmd.string('message', 'Message to echo', required: true)
  cmd.boolean('ephemeral', 'Show only to you')
  
  cmd.handler do |interaction|
    message = interaction.option('message')
    ephemeral = interaction.option('ephemeral') || false
    interaction.respond(content: message, ephemeral: ephemeral)
  end
end
```

## Choices

Predefined choices for an option:

```ruby
bot.slash('color', 'Choose a color') do |cmd|
  cmd.string('color', 'Favorite color', required: true) do |opt|
    opt.choice('Red', 'red')
    opt.choice('Green', 'green')
    opt.choice('Blue', 'blue')
  end
  
  cmd.handler do |interaction|
    color = interaction.option('color')
    interaction.respond(content: "You chose: #{color}")
  end
end
```

## Numeric Options

```ruby
bot.slash('calculate', 'Do math') do |cmd|
  cmd.number('a', 'First number', required: true)
  cmd.number('b', 'Second number', required: true)
  cmd.string('operation', 'Operation', required: true) do |opt|
    opt.choice('Add', 'add')
    opt.choice('Subtract', 'sub')
    opt.choice('Multiply', 'mul')
    opt.choice('Divide', 'div')
  end
  
  cmd.handler do |interaction|
    a = interaction.option('a')
    b = interaction.option('b')
    op = interaction.option('operation')
    
    result = case op
             when 'add' then a + b
             when 'sub' then a - b
             when 'mul' then a * b
             when 'div' then a / b
             end
    
    interaction.respond(content: "Result: #{result}")
  end
end
```

## Entity Options

```ruby
bot.slash('info', 'Get user info') do |cmd|
  cmd.user('user', 'User to lookup', required: true)
  
  cmd.handler do |interaction|
    user = interaction.option('user')
    interaction.respond(
      content: "**#{user.username}**\nID: #{user.id}\nBot: #{user.bot?}"
    )
  end
end
```

## Optional Parameters

```ruby
bot.slash('greet', 'Greet someone') do |cmd|
  cmd.user('user', 'User to greet')
  cmd.string('message', 'Custom message')
  
  cmd.handler do |interaction|
    user = interaction.option('user') || interaction.user
    message = interaction.option('message') || 'Hello!'
    
    interaction.respond(content: "#{message} #{user.mention}")
  end
end
```
