---
sidebar_position: 4
---

# Configuration

DiscordRDA provides extensive configuration options to customize your bot's behavior, from basic settings to advanced enterprise features.

## Basic Configuration

### Minimal Setup

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN']
)
```

### Recommended Setup

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  application_id: ENV['DISCORD_APP_ID'],
  intents: [:guilds, :guild_messages, :message_content],
  log_level: :info,
  log_format: :json
)
```

## Configuration Options

### Token (Required)

Your Discord bot token from the Developer Portal:

```ruby
token: ENV['DISCORD_TOKEN']  # Recommended: use environment variables
```

### Application ID

Required for slash commands and interactions:

```ruby
application_id: '1234567890123456789'
```

### Intents

Gateway Intents determine which events your bot receives:

```ruby
intents: [
  :guilds,                    # Guild create/update/delete
  :guild_members,             # Member join/update/leave
  :guild_messages,             # Message events
  :message_content,           # Read message content (privileged)
  :guild_presences,           # Presence updates (privileged)
  :direct_messages            # DM events
]
```

:::caution Privileged Intents
`:message_content` and `:guild_presences` require manual approval in the Developer Portal for bots in 100+ servers.
:::

### Sharding Configuration

#### Automatic Sharding

Let DiscordRDA determine optimal shard count:

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  shards: :auto
)
```

#### Manual Sharding

Specify shard IDs and total shards:

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  shards: [[0, 4], [1, 4], [2, 4], [3, 4]]  # 4 shards, this instance runs all
)
```

For distributed sharding (multiple processes):

```ruby
# Process 1 - shards 0-1 of 4
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  shards: [[0, 4], [1, 4]]
)

# Process 2 - shards 2-3 of 4
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  shards: [[2, 4], [3, 4]]
)
```

### Cache Configuration

#### Memory Cache (Default)

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  cache: :memory,
  max_cache_size: 10000  # Maximum cached entities
)
```

#### Redis Cache

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  cache: :redis,
  redis_config: {
    host: 'localhost',
    port: 6379,
    db: 0,
    password: nil
  }
)
```

### Logging Configuration

#### Log Levels

- `:debug` - Detailed debugging information
- `:info` - General operational information (default)
- `:warn` - Warning messages
- `:error` - Error messages
- `:fatal` - Fatal errors only

#### Log Formats

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  log_level: :info,
  log_format: :json,      # JSON format for log aggregation
  log_output: $stdout     # Or: File.open('bot.log', 'a')
)
```

## Advanced Configuration

### Scalable REST Client

Enable for high-traffic bots:

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  enable_scalable_rest: true,
  rest_proxy: {
    url: 'http://rest-proxy.internal:8080',
    headers: { 'Authorization' => 'proxy-secret' }
  }
)
```

### Hot Reload

Enable for development (automatically reloads code on file changes):

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN']
)

bot.enable_hot_reload(watch_dir: 'lib')
```

### Auto-Resharding

Automatically add shards as your bot grows:

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  shards: :auto
)

bot.enable_auto_reshard(
  max_guilds_per_shard: 1000,  # Recommended: 1000 for optimal performance
  check_interval: 300          # Check every 5 minutes
)
```

## Complete Configuration Example

```ruby
require 'discord_rda'

bot = DiscordRDA::Bot.new(
  # Required
  token: ENV['DISCORD_TOKEN'],
  application_id: ENV['DISCORD_APP_ID'],
  
  # Gateway Intents
  intents: [
    :guilds,
    :guild_members,
    :guild_messages,
    :message_content,
    :direct_messages
  ],
  
  # Sharding
  shards: :auto,
  
  # Caching
  cache: :redis,
  redis_config: {
    host: ENV['REDIS_HOST'] || 'localhost',
    port: ENV['REDIS_PORT'] || 6379
  },
  max_cache_size: 50000,
  
  # Logging
  log_level: ENV['LOG_LEVEL'] || :info,
  log_format: :json,
  
  # Production features
  enable_scalable_rest: ENV['SCALABLE_REST'] == 'true'
)

# Enable auto-resharding for growing bots
if ENV['ENABLE_AUTOSHARD'] == 'true'
  bot.enable_auto_reshard(max_guilds_per_shard: 1000)
end

# Enable hot reload in development
if ENV['RACK_ENV'] == 'development'
  bot.enable_hot_reload(watch_dir: 'lib')
end

bot.run
```

## Environment-Based Configuration

Use different configurations for development and production:

```ruby
require 'discord_rda'

config = {
  token: ENV['DISCORD_TOKEN'],
  application_id: ENV['DISCORD_APP_ID'],
  intents: [:guilds, :guild_messages, :message_content]
}

case ENV['RACK_ENV']
when 'development'
  config.merge!(
    log_level: :debug,
    cache: :memory,
    log_format: :pretty
  )
when 'production'
  config.merge!(
    log_level: :info,
    cache: :redis,
    redis_config: { host: ENV['REDIS_HOST'] },
    enable_scalable_rest: true,
    log_format: :json
  )
end

bot = DiscordRDA::Bot.new(**config)

# Add hot reload in development
bot.enable_hot_reload(watch_dir: 'lib') if ENV['RACK_ENV'] == 'development'

bot.run
```

## Configuration Best Practices

1. **Use environment variables** for sensitive data (tokens, passwords)
2. **Enable scalable REST** for production bots with high traffic
3. **Use Redis caching** for distributed/multi-shard setups
4. **Set appropriate log levels** - debug for development, info/warn for production
5. **Enable auto-resharding** for bots expecting growth
6. **Request only needed intents** to reduce gateway load

## Next Steps

- **[Learn about the Bot class](../core-concepts/bot)** - Understanding the main bot object
- **[Explore events](../core-concepts/events)** - Handle Discord events
- **[Set up caching](../core-concepts/caching)** - Optimize performance with caching
