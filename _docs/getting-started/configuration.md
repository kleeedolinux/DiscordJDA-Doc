---
layout: doc
title: Configuration
description: Configure DiscordRDA for your needs
permalink: /getting-started/configuration/
---


## Basic Configuration

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  application_id: ENV['DISCORD_APP_ID'],
  shards: :auto,
  cache: :redis,
  intents: [:guilds, :guild_messages, :message_content],
  log_level: :info,
  log_format: :json
)
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `token` | String | required | Discord bot token |
| `application_id` | String | nil | Discord application ID |
| `shards` | Symbol/Array | :auto | Sharding configuration |
| `cache` | Symbol | :memory | Cache backend |
| `intents` | Array | [:guilds] | Gateway intents |
| `log_level` | Symbol | :info | Logging level |
| `log_format` | Symbol | :text | Log format |

## Advanced Configuration

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  shards: [[0, 4], [1, 4]],
  cache: :redis,
  redis_config: { host: 'localhost', port: 6379 },
  enable_scalable_rest: true,
  intents: [:guilds, :guild_members, :guild_messages, :message_content]
)
```

## Environment-Based Config

```ruby
# config/bot.rb
module BotConfig
  def self.for_environment(env)
    base = {
      token: ENV['DISCORD_TOKEN'],
      application_id: ENV['DISCORD_APP_ID'],
      intents: [:guilds, :guild_messages]
    }
    
    case env
    when :production
      base.merge(
        cache: :redis,
        redis_config: { host: ENV['REDIS_HOST'], port: ENV['REDIS_PORT'] },
        shards: :auto,
        enable_scalable_rest: true,
        log_level: :warn,
        log_format: :json
      )
    when :development
      base.merge(
        cache: :memory,
        log_level: :debug,
        enable_hot_reload: true
      )
    else
      base
    end
  end
end

bot = DiscordRDA::Bot.new(**BotConfig.for_environment(:production))
```

## Intents Reference

| Intent | Description |
|--------|-------------|
| `:guilds` | Guild create/update/delete, role updates |
| `:guild_members` | Member join/leave/update |
| `:guild_moderation` | Moderation events |
| `:guild_emojis` | Emoji updates |
| `:guild_integrations` | Integration updates |
| `:guild_webhooks` | Webhook updates |
| `:guild_invites` | Invite updates |
| `:guild_voice_states` | Voice state updates |
| `:guild_presences` | Presence updates |
| `:guild_messages` | Message events in guilds |
| `:guild_message_reactions` | Reaction events in guilds |
| `:guild_message_typing` | Typing events in guilds |
| `:direct_messages` | DM events |
| `:direct_message_reactions` | DM reaction events |
| `:direct_message_typing` | DM typing events |
| `:message_content` | Access to message content |

<div class="important-box">
  **Important**: The `:message_content` intent requires enabling in the Discord Developer Portal under "Privileged Gateway Intents".
</div>
