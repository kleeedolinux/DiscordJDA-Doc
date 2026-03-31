---
sidebar_position: 3
---

# Quick Start

Let's build your first Discord bot with DiscordRDA. This guide will walk you through creating a simple bot that responds to messages and slash commands.

## Step 1: Create a Bot Application

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to the "Bot" section and click "Add Bot"
4. Copy your bot token (keep this secret!)
5. In "Privileged Gateway Intents", enable:
   - Message Content Intent (for reading message content)
   - Server Members Intent (for member-related events)

## Step 2: Create Your Bot File

Create a file named `bot.rb`:

```ruby
require 'discord_rda'

# Create a new bot instance
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  intents: [:guilds, :guild_messages, :message_content]
)

# Respond to messages
bot.on(:message_create) do |event|
  if event.content == '!ping'
    event.message.respond(content: 'Pong! 🏓')
  end
end

# Run the bot
bot.run
```

## Step 3: Set Your Token

Set your Discord token as an environment variable:

```bash
export DISCORD_TOKEN="your-bot-token-here"
```

Or create a `.env` file:

```
DISCORD_TOKEN=your-bot-token-here
```

## Step 4: Run the Bot

```bash
ruby bot.rb
```

You should see output indicating the bot has connected. Invite the bot to your server and type `!ping` - it should respond with "Pong! 🏓".

## Adding a Slash Command

Let's add a modern slash command:

```ruby
require 'discord_rda'

bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  intents: [:guilds]
)

# Register a slash command
bot.slash('hello', 'Say hello') do |cmd|
  cmd.string('name', 'Your name', required: true)
  
  cmd.handler do |interaction|
    name = interaction.option('name')
    interaction.respond(content: "Hello, #{name}! 👋")
  end
end

bot.run
```

## Complete Example

Here's a more complete example with multiple features:

```ruby
require 'discord_rda'

bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  intents: [:guilds, :guild_messages, :message_content],
  log_level: :info
)

# Message event handler
bot.on(:message_create) do |event|
  case event.content
  when '!ping'
    event.message.respond(content: 'Pong!')
  when '!help'
    event.message.respond(content: 'Available commands: !ping, /hello, /info')
  end
end

# Slash command: hello
bot.slash('hello', 'Say hello') do |cmd|
  cmd.string('name', 'Your name', required: true)
  cmd.handler do |interaction|
    name = interaction.option('name')
    interaction.respond(content: "Hello, #{name}!")
  end
end

# Slash command: info
bot.slash('info', 'Bot information') do |cmd|
  cmd.handler do |interaction|
    interaction.respond(
      content: '**DiscordRDA Bot**\nVersion: 1.0\nRuby: 3.0+',
      ephemeral: true
    )
  end
end

# Ready event
bot.on(:ready) do |event|
  puts "Bot is ready! Logged in as #{event.user.username}"
end

bot.run
```

## Inviting Your Bot

To invite your bot to a server:

1. Go to Discord Developer Portal > OAuth2 > URL Generator
2. Select `bot` scope
3. Select `applications.commands` scope (for slash commands)
4. Select permissions your bot needs (e.g., Send Messages, Read Message History)
5. Copy and open the generated URL

## Next Steps

- **[Learn about configuration](./configuration)** - Configure intents, logging, caching
- **[Explore events](../core-concepts/events)** - Handle different Discord events
- **[Build slash commands](../interactions/slash-commands)** - Create advanced commands
