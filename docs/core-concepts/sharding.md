---
sidebar_position: 5
---

# Sharding

Sharding allows your bot to scale across multiple WebSocket connections. Discord requires sharding when your bot grows beyond a certain number of guilds.

## What is Sharding?

Discord's Gateway has limits on how many guilds can be handled per connection. Sharding splits your bot's guilds across multiple Gateway connections (shards).

```
Without Sharding:
┌─────────────────────────────────────┐
│           One Gateway                │
│  ┌─────────────────────────────┐   │
│  │  All Guilds (2500+)         │   │
│  │  ├─ Guild 1                 │   │
│  │  ├─ Guild 2                 │   │
│  │  ├─ ...                     │   │
│  │  └─ Guild 2500              │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘

With Sharding:
┌─────────────────────────────────────┐
│         Multiple Gateways            │
│  ┌─────────┐  ┌─────────┐          │
│  │ Shard 0 │  │ Shard 1 │  ...      │
│  │ Guilds  │  │ Guilds  │           │
│  │ 1-1250  │  │1251-2500│           │
│  └─────────┘  └─────────┘           │
└─────────────────────────────────────┘
```

## When to Shard

Discord requires sharding when your bot reaches:
- **2500 guilds** (automatic sharding recommended)
- **100+ guilds** (optional, for better performance)

## Sharding Modes

### Automatic Sharding

Let DiscordRDA determine optimal shard count:

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  shards: :auto
)
```

DiscordRDA will:
1. Connect to Gateway
2. Get recommended shard count from Discord
3. Start all shards automatically

### Manual Sharding

Specify exact shard configuration:

```ruby
# Single shard instance (shard 0 of 4)
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  shards: [[0, 4]]
)

# Multiple shards in one process
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  shards: [[0, 4], [1, 4], [2, 4], [3, 4]]
)
```

### Distributed Sharding

Run shards across multiple processes/machines:

```ruby
# Process 1 - shards 0-1 of 4
shard_bot_0 = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  shards: [[0, 4], [1, 4]]
)

# Process 2 - shards 2-3 of 4
shard_bot_1 = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  shards: [[2, 4], [3, 4]]
)
```

## How Sharding Works

### Guild Distribution

Discord assigns guilds to shards based on a formula:

```
shard_id = (guild_id >> 22) % num_shards
```

This ensures:
- Guilds always map to the same shard
- Even distribution across shards
- Consistent routing

### Event Handling

Each shard receives events only for its assigned guilds:

```ruby
bot.on(:message_create) do |event|
  # This event is automatically from a guild
  # on this shard - no filtering needed
  puts "Shard #{event.shard_id}: Message in #{event.guild_id}"
end
```

## Shard Management

### Getting Shard Info

```ruby
bot = DiscordRDA::Bot.new(token: token, shards: :auto)

# After connecting
status = bot.status
puts "Running #{status[:shard_count]} shards"
puts "Total guilds: #{status[:guild_count]}"

# Per-shard info
status[:shards].each do |shard|
  puts "Shard #{shard[:id]}: #{shard[:guild_count]} guilds"
  puts "  Status: #{shard[:status]}"
  puts "  Latency: #{shard[:latency]}ms"
end
```

### Handling Shard Events

```ruby
# Shard connects
bot.on(:shard_connect) do |event|
  puts "Shard #{event.shard_id} connected"
end

# Shard disconnects
bot.on(:shard_disconnect) do |event|
  puts "Shard #{event.shard_id} disconnected"
  puts "Will auto-reconnect..."
end

# Shard resumes after disconnect
bot.on(:shard_resume) do |event|
  puts "Shard #{event.shard_id} resumed"
end

# Shard encounters error
bot.on(:shard_error) do |event|
  puts "Shard #{event.shard_id} error: #{event.error}"
end
```

## Zero-Downtime Resharding

Add shards without stopping your bot:

### Manual Resharding

```ruby
# Current: 4 shards
# Grow to: 8 shards

bot.reshard_to(8)

# DiscordRDA will:
# 1. Start new shards 4-7
# 2. Migrate guilds seamlessly
# 3. Keep old shards until migration complete
# 4. Bot stays online throughout
```

### Auto-Resharding

Automatically add shards as you grow:

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  shards: :auto
)

# Enable auto-resharding
bot.enable_auto_reshard(
  max_guilds_per_shard: 1000,  # Recommended: 1000
  check_interval: 300            # Check every 5 minutes
)

# Bot automatically adds shards when:
# - Guild count / shard_count > max_guilds_per_shard
```

## Session Management

### Session IDs

Each shard maintains a session ID for resuming:

```ruby
bot.on(:shard_resume) do |event|
  # Resumed with existing session
  puts "Resumed session #{event.session_id}"
  puts "Replayed #{event.seq} events"
end
```

### Sequence Numbers

Track event sequence numbers for debugging:

```ruby
bot.on(:dispatch) do |event|
  puts "Shard #{event.shard_id} seq: #{event.seq}"
end
```

## Best Practices

### Process per Shard

For large bots, run one shard per process:

```ruby
# shard_manager.rb
SHARD_COUNT = 8

SHARD_COUNT.times do |shard_id|
  fork do
    bot = DiscordRDA::Bot.new(
      token: ENV['DISCORD_TOKEN'],
      shards: [[shard_id, SHARD_COUNT]],
      cache: :redis  # Shared cache
    )
    
    bot.run
  end
end

Process.waitall
```

### Load Balancing

Distribute shards across servers:

```ruby
# Server 1: Shards 0-3
shards = (0..3).map { |i| [i, 8] }

# Server 2: Shards 4-7
shards = (4..7).map { |i| [i, 8] }
```

### Monitoring

Monitor shard health:

```ruby
bot.on(:ready) do
  Thread.new do
    loop do
      sleep 60
      
      bot.status[:shards].each do |shard|
        if shard[:latency] > 500
          puts "WARNING: Shard #{shard[:id]} high latency!"
        end
        
        if shard[:status] != :connected
          puts "WARNING: Shard #{shard[:id]} not connected!"
        end
      end
    end
  end
end
```

## Common Patterns

### Guild Count per Shard

Check if resharding is needed:

```ruby
def check_reshard_needed(bot, max_guilds: 1000)
  status = bot.status
  
  status[:shards].each do |shard|
    if shard[:guild_count] > max_guilds
      puts "Shard #{shard[:id]} has #{shard[:guild_count]} guilds"
      puts "Consider resharding!"
    end
  end
end
```

### Broadcasting to All Shards

Send a command to all shards:

```ruby
# Using Redis pub/sub with shared cache
bot.cache.redis.publish('bot:command', {
  type: 'update_presence',
  activity: 'New Status'
}.to_json)
```

### Shard-Aware Rate Limiting

Some rate limits are per-shard:

```ruby
# Discord's Identify rate limit: 5 per 5 seconds per shard
# DiscordRDA handles this automatically
```

## Troubleshooting

### Shard Won't Connect

```ruby
bot.on(:shard_error) do |event|
  puts "Shard #{event.shard_id} error: #{event.error}"
  
  # Common issues:
  # - Invalid token
  # - Connection issues
  # - Rate limited (identify limit)
end
```

### Uneven Guild Distribution

Guild distribution follows a hash - it won't be perfectly even:

```ruby
# This is normal - some shards may have more guilds
# Discord's algorithm ensures consistency over evenness
```

### Memory Issues

Each shard uses memory. For large bots:

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  shards: :auto,
  cache: :redis,           # Use Redis to share memory
  max_cache_size: 1000     # Limit per-shard cache
)
```

## Complete Example

```ruby
require 'discord_rda'

class ShardedBot
  def initialize
    @bot = DiscordRDA::Bot.new(
      token: ENV['DISCORD_TOKEN'],
      application_id: ENV['DISCORD_APP_ID'],
      shards: :auto,
      intents: [:guilds, :guild_messages],
      cache: :redis,
      redis_config: { host: 'localhost', port: 6379 },
      log_level: :info
    )
    
    setup_handlers
    enable_auto_reshard if ENV['ENABLE_AUTOSHARD']
  end
  
  def setup_handlers
    @bot.on(:ready) do |event|
      shard_info = event.shard ? "[Shard #{event.shard.join('/')}]" : ""
      puts "#{shard_info} Ready as #{event.user.username}"
    end
    
    @bot.on(:shard_connect) do |event|
      puts "Shard #{event.shard_id} connected (#{event.guild_count} guilds)"
    end
    
    @bot.on(:shard_disconnect) do |event|
      puts "Shard #{event.shard_id} disconnected"
    end
    
    @bot.on(:message_create) do |event|
      handle_message(event)
    end
  end
  
  def enable_auto_reshard
    @bot.enable_auto_reshard(
      max_guilds_per_shard: 1000,
      check_interval: 300
    )
    puts "Auto-resharding enabled"
  end
  
  def handle_message(event)
    return unless event.content.start_with?('!')
    
    case event.content
    when '!ping'
      event.message.respond(content: 'Pong!')
    when '!status'
      status = @bot.status
      event.message.respond(content: format_status(status))
    end
  end
  
  def format_status(status)
    shards = status[:shards].map do |s|
      "Shard #{s[:id]}: #{s[:guild_count]} guilds (#{s[:latency]}ms)"
    end
    
    "**Bot Status**\nTotal Guilds: #{status[:guild_count]}\n" +
    "Shards: #{status[:shard_count]}\n\n" +
    shards.join("\n")
  end
  
  def run
    @bot.run
  end
end

ShardedBot.new.run
```

## Next Steps

- **[Learn about Caching](./caching)** - Cache sharing across shards
- **[Explore Rate Limiting](../advanced/rate-limiting)** - Shard-aware limits
- **[Set up REST Proxy](../advanced/scaling)** - Horizontal scaling
