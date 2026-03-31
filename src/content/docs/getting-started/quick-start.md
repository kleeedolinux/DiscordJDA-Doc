---
title: Quick Start
description: Get your first Discord bot running in minutes
---

## Basic Bot

Create a file named `bot.rb`:

```ruby
require 'discord_rda'

bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  intents: [:guilds, :guild_messages, :message_content]
)

bot.on(:message_create) do |event|
  if event.content == '!ping'
    event.message.respond(content: 'Pong!')
  end
end

bot.run
```

Set your environment variable and run:

```bash
export DISCORD_TOKEN='your-bot-token'
ruby bot.rb
```

## Slash Command Bot

Create a modern bot with slash commands:

```ruby
require 'discord_rda'

bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  application_id: ENV['DISCORD_APP_ID'],
  intents: [:guilds]
)

bot.slash('hello', 'Say hello') do |cmd|
  cmd.string('name', 'Your name', required: true)
  cmd.handler do |interaction|
    name = interaction.option('name')
    interaction.respond(content: "Hello, #{name}!")
  end
end

bot.run
```

## Bot with Components

Add interactive buttons to your bot:

```ruby
bot.slash('menu', 'Show menu') do |cmd|
  cmd.handler do |interaction|
    interaction.respond(content: 'Choose an option:') do |builder|
      builder.components do |row|
        row.button(style: :primary, label: 'Option 1', custom_id: 'opt1')
        row.button(style: :secondary, label: 'Option 2', custom_id: 'opt2')
      end
    end
  end
end

bot.on(:button_click) do |interaction|
  case interaction.custom_id
  when 'opt1'
    interaction.respond(content: 'You chose Option 1!', ephemeral: true)
  when 'opt2'
    interaction.respond(content: 'You chose Option 2!', ephemeral: true)
  end
end
```

## Next Steps

- Learn about [configuration options](/getting-started/configuration)
- Explore [slash commands](/slash-commands/overview)
- Understand the [architecture](/core/architecture)
