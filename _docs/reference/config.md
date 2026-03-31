---
layout: doc
title: Configuration Options
description: Complete configuration reference
permalink: /reference/config/
---


## Bot Configuration

### Basic Options

```ruby
DiscordRDA::Bot.new(
  # Required
  token: ENV['DISCORD_TOKEN'],
  
  # Optional - Application
  application_id: ENV['DISCORD_APP_ID'],
  
  # Optional - Gateway
  intents: [:guilds, :guild_messages],
  compress: false,
  
  # Optional - Sharding
  shards: :auto,
  shard_id: 0,
  shard_count: 1,
  
  # Optional - Caching
  cache: :memory,
  max_cache_size: 10000,
  redis_config: { host: 'localhost', port: 6379 },
  
  # Optional - REST
  enable_scalable_rest: false,
  rest_workers: 1,
  rest_proxy_urls: [],
  
  # Optional - Logging
  log_level: :info,
  log_format: :text,
  log_output: STDOUT,
  
  # Optional - Development
  enable_hot_reload: false,
  hot_reload_dir: 'lib',
  
  # Optional - Rate Limiting
  rate_limit_strategy: :queue,
  rate_limit_buffer: 0.5
)
```

### Environment-Specific Presets

#### Development

```ruby
{
  log_level: :debug,
  enable_hot_reload: true,
  cache: :memory,
  intents: [:guilds, :guild_messages, :guild_members]
}
```

#### Production

```ruby
{
  log_level: :warn,
  log_format: :json,
  shards: :auto,
  cache: :redis,
  enable_scalable_rest: true,
  rate_limit_strategy: :conservative
}
```

## Slash Command Options

```ruby
bot.slash('command', 'Description',
  guild_id: '123456789',      # Guild-specific
  default_permissions: [:administrator],  # Required permissions
  dm_permission: false         # Disable in DMs
)
```

## Option Types Configuration

```ruby
cmd.string('name', 'Description',
  required: true,
  min_length: 1,
  max_length: 100
)

cmd.integer('count', 'Description',
  required: false,
  min_value: 0,
  max_value: 100
)

cmd.number('price', 'Description',
  min_value: 0.0,
  max_value: 9999.99
)
```
