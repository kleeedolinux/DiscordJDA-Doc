---
layout: doc
title: Caching
description: Configure caching for optimal performance
permalink: /advanced/caching/
---


## Cache Backends

DiscordRDA supports multiple cache backends.

## Memory Cache (Default)

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  cache: :memory,
  max_cache_size: 10000  # Maximum entities to cache
)
```

## Redis Cache

For distributed deployments:

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  cache: :redis,
  redis_config: {
    host: 'localhost',
    port: 6379,
    db: 0,
    password: ENV['REDIS_PASSWORD']
  }
)
```

## Cache Operations

### Fetch

```ruby
user = bot.cache.fetch_user(user_id)
guild = bot.cache.fetch_guild(guild_id)
channel = bot.cache.fetch_channel(channel_id)
```

### Invalidate

```ruby
# Invalidate specific entity
bot.cache.invalidate(:user, user_id)
bot.cache.invalidate(:guild, guild_id)

# Invalidate by pattern
bot.cache.invalidate_pattern(:user, 'admin_*')

# Clear guild cache
bot.cache.invalidate_guild(guild_id)

# Clear all cache
bot.cache.clear
```

## Custom Cache

Implement your own cache backend:

```ruby
class CustomCache < DiscordRDA::Cache::Base
  def initialize(options = {})
    @store = {}
  end
  
  def get(key)
    @store[key]
  end
  
  def set(key, value, ttl: nil)
    @store[key] = value
  end
  
  def delete(key)
    @store.delete(key)
  end
  
  def clear
    @store.clear
  end
end

bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  cache: CustomCache.new
)
```

## Cache Warming

Pre-populate cache on startup:

```ruby
bot.on(:ready) do |event|
  # Pre-fetch frequently accessed data
  popular_guilds.each do |guild_id|
    bot.cache.warm(:guild, guild_id)
  end
end
```
