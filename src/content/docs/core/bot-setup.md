---
title: Bot Setup
description: Setting up and running your Discord bot
---

## Creating a Bot

### Basic Setup

```ruby
require 'discord_rda'

bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  intents: [:guilds, :guild_messages]
)
```

### Production Setup

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  application_id: ENV['DISCORD_APP_ID'],
  shards: :auto,
  cache: :redis,
  redis_config: { host: ENV['REDIS_HOST'] },
  log_level: :warn
)
```

## Running the Bot

### Blocking Run

```ruby
bot.run
```

### Non-blocking Run

```ruby
bot.run_async
# Do other work...
bot.wait
```

### Graceful Shutdown

```ruby
trap('INT') { bot.stop }
trap('TERM') { bot.stop }

bot.run
```

## Bot Lifecycle

1. **Initialize**: Configuration and dependency setup
2. **Connect**: WebSocket gateway connection
3. **Identify**: Authentication with Discord
4. **Ready**: Bot is ready to receive events
5. **Run**: Event loop processing
6. **Shutdown**: Cleanup and disconnection

## Error Handling

```ruby
bot.on(:error) do |error|
  logger.error("Bot error: #{error.message}")
end

bot.run
```
