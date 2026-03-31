---
sidebar_position: 4
---

# Caching

DiscordRDA provides a sophisticated caching system that stores Discord entities (users, guilds, channels, messages) to reduce API calls and improve performance.

## Why Cache?

- **Reduce API calls** - Avoid hitting rate limits
- **Improve performance** - Sub-millisecond lookups vs API round-trips
- **Offline access** - Access data when Discord API is unavailable
- **Cross-shard sharing** - Redis enables data sharing across shards

## Cache Backends

DiscordRDA supports two cache backends:

### Memory Cache (Default)

Stores entities in Ruby memory. Fastest but limited to single process.

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  cache: :memory,
  max_cache_size: 10000  # Maximum entities to store
)
```

**Pros:**
- Fastest access times
- No external dependencies

**Cons:**
- Memory usage grows with guild count
- No sharing between shards/processes
- Data lost on restart

### Redis Cache

Stores entities in Redis. Slightly slower but enables sharing and persistence.

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

**Pros:**
- Share data across shards
- Survive bot restarts
- Distributed setups
- Configurable persistence

**Cons:**
- Requires Redis server
- Network overhead
- Serialization cost

## What Gets Cached

By default, DiscordRDA caches:

- **Users** - User data
- **Guilds** - Server information
- **Channels** - Channel data
- **Members** - Guild member data
- **Roles** - Role information
- **Messages** - Recent messages (configurable)

## Accessing Cached Data

### Bot Helper Methods

```ruby
# Get guild
guild = bot.guild(guild_id)
# Returns cached guild or fetches from API

# Get channel
channel = bot.channel(channel_id)

# Get user
user = bot.user(user_id)

# Get member
member = bot.guild_member(guild_id, user_id)
```

### Direct Cache Access

```ruby
# Access cache directly
cache = bot.cache

# Get specific entity
cache[:guild][guild_id]
cache[:channel][channel_id]
cache[:user][user_id]
cache[:member][[guild_id, user_id]]
```

## Cache Configuration

### Memory Cache Options

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  cache: :memory,
  max_cache_size: 50000,    # Maximum entities
  message_cache_size: 100   # Messages per channel
)
```

### Redis Cache Options

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  cache: :redis,
  redis_config: {
    host: 'localhost',
    port: 6379,
    db: 0,
    password: ENV['REDIS_PASSWORD'],
    timeout: 5.0,
    reconnect_attempts: 3
  },
  cache_ttl: 3600  # Time-to-live in seconds
)
```

## Cache Invalidation

### Manual Invalidation

```ruby
# Invalidate specific entity
bot.cache.invalidate(:user, user_id)
bot.cache.invalidate(:guild, guild_id)
bot.cache.invalidate(:channel, channel_id)

# Invalidate guild member
bot.cache.invalidate(:member, [guild_id, user_id])

# Clear entire cache
bot.cache.clear

# Clear specific type
bot.cache.clear_type(:message)
```

### Pattern-Based Invalidation

```ruby
# Invalidate by pattern
bot.cache.invalidate_pattern(:user, '123*')  # Users with IDs starting with 123
bot.cache.invalidate_guild(guild_id)  # Clear all data for a guild
```

## Custom Cache Store

Implement your own cache store:

```ruby
class MyCustomCache < DiscordRDA::CacheStore
  def initialize(config = {})
    @store = {}
    @config = config
  end
  
  def get(key)
    @store[key]
  end
  
  def set(key, value, ttl = nil)
    @store[key] = value
  end
  
  def delete(key)
    @store.delete(key)
  end
  
  def clear
    @store.clear
  end
  
  def keys
    @store.keys
  end
end

# Use custom cache
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  cache: MyCustomCache.new(custom_option: 'value')
)
```

## Configurable Cache

For fine-grained control over what gets cached:

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN']
)

# Configure cache policies
cache = DiscordRDA::ConfigurableCache.new(
  store: :redis,
  policies: {
    user: { ttl: 3600, max_size: 10000 },
    guild: { ttl: nil, max_size: 1000 },      # Never expire
    channel: { ttl: 1800, max_size: 5000 },
    member: { ttl: 600, max_size: 50000 },
    message: { ttl: 300, max_size: 1000 }     # 5 min TTL
  }
)

bot.cache = cache
```

## Cache Events

Monitor cache operations:

```ruby
bot.cache.on(:hit) do |key, type|
  puts "Cache hit: #{type} #{key}"
end

bot.cache.on(:miss) do |key, type|
  puts "Cache miss: #{type} #{key}"
end

bot.cache.on(:evict) do |key, type|
  puts "Cache evict: #{type} #{key}"
end
```

## Best Practices

### Production Recommendations

1. **Use Redis for multi-shard bots** - Enables data sharing
2. **Set appropriate TTLs** - Balance freshness vs API calls
3. **Monitor hit rates** - Optimize TTL values
4. **Clear on guild removal** - Clean up when bot leaves guild

```ruby
bot.on(:guild_delete) do |event|
  # Clear guild data from cache
  bot.cache.invalidate_guild(event.id)
end
```

### Memory Management

```ruby
# Limit memory for memory cache
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  cache: :memory,
  max_cache_size: 100_000
)

# Use LRU eviction for messages
cache = DiscordRDA::MemoryStore.new(
  max_size: 10000,
  eviction_policy: :lru  # Least Recently Used
)
```

### Cache Warming

Pre-populate cache on startup:

```ruby
bot.on(:ready) do |event|
  # Warm user cache
  event.guilds.each do |guild|
    members = bot.guild_members(guild.id, limit: 1000)
    members.each do |member|
      bot.cache.set(:user, member.user.id, member.user)
    end
  end
end
```

## Cache Monitoring

```ruby
# Get cache statistics
stats = bot.cache.stats
puts "Cache hits: #{stats[:hits]}"
puts "Cache misses: #{stats[:misses]}"
puts "Hit rate: #{stats[:hit_rate]}%"
puts "Size: #{stats[:size]}"

# For Redis cache
stats = bot.cache.redis.info
puts "Used memory: #{stats['used_memory_human']}"
```

## Troubleshooting

### High Memory Usage

```ruby
# Reduce cache size
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  cache: :memory,
  max_cache_size: 5000,  # Reduce from default
  message_cache_size: 50  # Fewer messages
)
```

### Stale Data

```ruby
# Invalidate when you know data changed
bot.on(:guild_member_update) do |event|
  # Clear member from cache to fetch fresh data
  bot.cache.invalidate(:member, [event.guild_id, event.user.id])
end
```

### Redis Connection Issues

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  cache: :redis,
  redis_config: {
    host: 'localhost',
    port: 6379,
    reconnect_attempts: 5,
    reconnect_delay: 1.0,
    # Fallback to memory on Redis failure
    fallback_store: :memory
  }
)
```

## Next Steps

- **[Learn about Sharding](./sharding)** - Caching across shards
- **[Build slash commands](../interactions/slash-commands)** - Using cached data
- **[Explore API reference](../api/entity-cache)** - Cache class documentation
