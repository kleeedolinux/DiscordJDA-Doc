---
layout: doc
title: Slash Commands Overview
description: Introduction to Discord slash commands
permalink: /slash-commands/overview/
---


## What are Slash Commands?

Slash Commands are Discord's modern command interface. They provide:

- **Native UI**: Discord shows command suggestions as you type
- **Type Safety**: Arguments have defined types
- **Permissions**: Built-in permission system
- **Localization**: Support for multiple languages
- **Autocompletion**: Dynamic suggestions for arguments

## Command Types

DiscordRDA supports three types of application commands:

| Type | Description |
|------|-------------|
| **Chat Input** | Traditional slash commands (e.g., `/help`) |
| **User Context** | Right-click on users |
| **Message Context** | Right-click on messages |

## Basic Command Structure

```ruby
bot.slash('command_name', 'Description') do |cmd|
  # Options definition
  cmd.string('option_name', 'Option description', required: true)
  
  # Handler
  cmd.handler do |interaction|
    interaction.respond(content: 'Response!')
  end
end
```

## Command Registration

Commands are automatically registered when the bot starts:

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  application_id: ENV['DISCORD_APP_ID']
)

bot.slash('ping', 'Check bot latency') do |cmd|
  cmd.handler do |interaction|
    interaction.respond(content: 'Pong!')
  end
end

bot.run
```

<div class="tip-box">
  **Note**: Commands may take up to 1 hour to propagate globally. Use guild-specific commands for testing.
</div>
