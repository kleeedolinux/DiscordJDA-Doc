---
sidebar_position: 1
---

# Rate Limiting

Discord's API has strict rate limits. DiscordRDA provides automatic rate limit handling to keep your bot compliant and running smoothly.

## Understanding Discord Rate Limits

Discord rate limits work on multiple levels:

### Global Rate Limits

- **50 requests per second** across all routes
- Resets every second

### Route-Specific Limits

Different endpoints have different limits:

| Route | Limit | Window |
|-------|-------|--------|
| Send Message | 5 | 5 sec per channel |
| Edit Message | 5 | 5 sec per channel |
| Delete Message | 5 | 1 sec per channel |
| Create Reaction | 1 | 0.25 sec per channel |
| Get Channel | 1 | 1 sec |
| Get Guild | 1 | 1 sec |
| Update Member | 1 | 1 sec |
| Bulk Delete | 1 | 1 sec (5+ messages) |

### Shard Limits

- **Identify**: 5 per 5 seconds per shard
- **Presence Update**: 5 per minute per shard

### Invalid Request Limits

Discord tracks invalid requests (401/403/429 errors):
- Too many = 1 hour ban from the API

## Automatic Rate Limiting

DiscordRDA handles rate limits automatically:

```ruby
bot = DiscordRDA::Bot.new(token: ENV['DISCORD_TOKEN'])

# Rate limiting is automatic - no extra code needed!
bot.send_message(channel_id, 'Message 1')  # Sends immediately
bot.send_message(channel_id, 'Message 2')  # Sends immediately
bot.send_message(channel_id, 'Message 3')  # Sends immediately
bot.send_message(channel_id, 'Message 4')  # Sends immediately
bot.send_message(channel_id, 'Message 5')  # Sends immediately
bot.send_message(channel_id, 'Message 6')  # Waits if needed, then sends
```

## Scalable REST Client

For high-traffic bots, enable the scalable REST client:

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  enable_scalable_rest: true
)
```

The scalable client provides:
- **Request queuing** - Orders requests efficiently
- **Priority handling** - Interactions get priority over background tasks
- **Burst management** - Handles rate limit resets optimally
- **Queue metrics** - Monitor queue depth and wait times

### Scalable REST with Proxy

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  enable_scalable_rest: true,
  rest_proxy: {
    url: 'http://rest-proxy.internal:8080',
    headers: {
      'Authorization' => 'internal-token'
    }
  }
)
```

## Rate Limit Information

### Checking Invalid Bucket

Monitor your invalid request status:

```ruby
status = bot.invalid_bucket_status

puts "Invalid requests: #{status[:count]}/#{status[:limit]}"
puts "Resets at: #{status[:reset_time]}"

if status[:count] > status[:limit] * 0.8
  puts "WARNING: Approaching invalid request limit!"
end
```

### Request Queue Status

With scalable REST enabled:

```ruby
queue_status = bot.rest_queue_status

puts "Queue depth: #{queue_status[:depth]}"
puts "Processing rate: #{queue_status[:rate]}/sec"
puts "Average wait: #{queue_status[:avg_wait]}ms"
```

## Manual Rate Limit Handling

### Respecting Rate Limits

If you need to handle rate limits manually:

```ruby
begin
  bot.send_message(channel_id, 'Hello')
rescue DiscordRDA::RateLimitedError => e
  puts "Rate limited! Retry after #{e.retry_after} seconds"
  sleep e.retry_after
  retry
end
```

### Pre-emptive Rate Limiting

Check before making requests:

```ruby
# Check if we can make a request
if bot.rate_limiter.can_request?(:send_message, channel_id: channel_id)
  bot.send_message(channel_id, 'Hello')
else
  wait_time = bot.rate_limiter.wait_time(:send_message, channel_id: channel_id)
  puts "Need to wait #{wait_time} seconds"
end
```

## Best Practices

### 1. Don't Spam

```ruby
# ❌ Bad: Sending many messages quickly
10.times do |i|
  bot.send_message(channel_id, "Message #{i}")  # Will hit rate limits
end

# ✅ Good: Batch messages
messages = 10.times.map { |i| "Message #{i}" }
combined = messages.join("\n")
bot.send_message(channel_id, combined)  # One request
```

### 2. Use Webhooks for Bulk Messages

```ruby
# ✅ Better for many messages
webhook = bot.create_webhook(channel_id, 'Bulk Poster')

10.times do |i|
  bot.execute_webhook(
    webhook.id,
    webhook.token,
    content: "Message #{i}"
  )
end
```

### 3. Cache Aggressively

```ruby
# ✅ Avoid repeated API calls
user = bot.user(user_id)  # Cached after first fetch
puts user.username        # Uses cache
puts user.avatar_url      # Uses cache
```

### 4. Handle Bulk Operations

```ruby
# ✅ Use bulk delete instead of individual deletes
message_ids = [1, 2, 3, 4, 5]
bot.bulk_delete_messages(channel_id, message_ids)  # One request

# ❌ Individual deletes
message_ids.each do |id|
  bot.delete_message(channel_id, id)  # Multiple requests
end
```

### 5. Prioritize User-Facing Operations

```ruby
# Configure request priority
bot.rest_client.priority(:interaction_response)  # High priority
bot.rest_client.priority(:presence_update, :low)  # Low priority
```

## Rate Limiter Configuration

### Custom Rate Limiter

```ruby
rate_limiter = DiscordRDA::RateLimiter.new(
  # Global rate limit
  global_limit: 50,
  global_window: 1,
  
  # Route-specific limits
  route_limits: {
    send_message: { limit: 5, window: 5 },
    edit_message: { limit: 5, window: 5 },
    delete_message: { limit: 5, window: 1 },
    create_reaction: { limit: 1, window: 0.25 }
  }
)

bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  rate_limiter: rate_limiter
)
```

### Request Queue Configuration

```ruby
queue = DiscordRDA::RequestQueue.new(
  max_size: 1000,        # Maximum queued requests
  timeout: 30,           # Maximum wait time
  priority_levels: 3,    # Number of priority levels
  workers: 5             # Concurrent workers
)

bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  request_queue: queue
)
```

## Monitoring

### Rate Limit Metrics

```ruby
# Set up monitoring
Thread.new do
  loop do
    sleep 60
    
    stats = bot.rate_limiter.stats
    
    puts "Rate Limit Stats:"
    puts "  Requests made: #{stats[:requests]}"
    puts "  Rate limited: #{stats[:rate_limited]}"
    puts "  Avg wait time: #{stats[:avg_wait]}ms"
    puts "  Current waits: #{stats[:waiting]}"
  end
end
```

### Alerting

```ruby
bot.on(:rate_limited) do |event|
  puts "⚠️ Rate limited on #{event.route}"
  puts "  Retry after: #{event.retry_after}s"
  
  # Send alert to monitoring
  send_alert("Rate limited: #{event.route}")
end
```

## Handling Rate Limit Errors

```ruby
begin
  bot.send_message(channel_id, 'Hello')
rescue DiscordRDA::RateLimitedError => e
  # Automatic retry is usually best
  puts "Rate limited: #{e.message}"
  puts "Retry after: #{e.retry_after}"
  puts "Global: #{e.global?}"
  
  # Log for analysis
  Logger.warn("Rate limit hit", {
    route: e.route,
    retry_after: e.retry_after,
    global: e.global?
  })
end
```

## Distributed Rate Limiting

For multi-shard/multi-process setups:

```ruby
# Use Redis for shared rate limit state
rate_limiter = DiscordRDA::RateLimiter.new(
  store: :redis,
  redis_config: {
    host: 'redis.internal',
    port: 6379
  }
)

bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  shards: :auto,
  rate_limiter: rate_limiter
)
```

## Complete Example

```ruby
require 'discord_rda'

bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  application_id: ENV['DISCORD_APP_ID'],
  intents: [:guilds, :guild_messages],
  
  # Enable scalable REST for production
  enable_scalable_rest: true,
  
  # Redis for distributed rate limiting
  rate_limiter: DiscordRDA::RateLimiter.new(
    store: :redis,
    redis_config: { host: 'localhost', port: 6379 }
  )
)

# Monitor rate limits
bot.on(:rate_limited) do |event|
  puts "[Rate Limit] #{event.route} - retry in #{event.retry_after}s"
end

# Command that respects rate limits
bot.slash('broadcast', 'Send message to all channels') do |cmd|
  cmd.string('message', 'Message to send', required: true)
  cmd.default_permissions(:administrator)
  
  cmd.handler do |interaction|
    message = interaction.option('message')
    guild = bot.guild(interaction.guild_id)
    
    # Defer - this might take a while
    interaction.defer(ephemeral: true)
    
    text_channels = guild.channels.select(&:text?)
    sent = 0
    
    text_channels.each do |channel|
      begin
        # Rate limiting is automatic
        bot.send_message(channel.id, message)
        sent += 1
        
        # Small delay to be extra safe
        sleep 0.5
      rescue DiscordRDA::RateLimitedError => e
        puts "Rate limited, waiting #{e.retry_after}s"
        sleep e.retry_after
        retry
      end
    end
    
    interaction.edit_original(
      content: "✅ Message sent to #{sent} channels"
    )
  end
end

# Check invalid bucket periodically
Thread.new do
  loop do
    sleep 300  # Every 5 minutes
    
    status = bot.invalid_bucket_status
    puts "[Invalid Bucket] #{status[:count]}/#{status[:limit]}"
    
    if status[:count] > status[:limit] * 0.8
      puts "⚠️ WARNING: Approaching invalid request limit!"
    end
  end
end

bot.run
```

## Troubleshooting

### Getting Rate Limited Too Often

```ruby
# Check your request patterns
# Common causes:
# - Sending many messages
# - Aggressive polling
# - Not using caching
# - Individual operations instead of bulk

# Solutions:
# 1. Increase cache TTL
# 2. Use webhooks for bulk messages
# 3. Add delays between operations
# 4. Enable scalable REST
```

### Invalid Request Ban

```ruby
# Check status
status = bot.invalid_bucket_status

if status[:count] >= status[:limit]
  puts "⚠️ INVALID REQUEST BAN!"
  puts "Retry after: #{status[:reset_time]}"
end

# Prevention:
# - Don't make requests with invalid tokens
# - Don't send messages to channels bot can't access
# - Don't edit other bots' messages
# - Don't delete messages you can't delete
```

## Next Steps

- **[Learn about Sharding](../core-concepts/sharding)** - Distribute load across shards
- **[Set up Caching](../core-concepts/caching)** - Reduce API calls
- **[Explore Scaling](./scaling)** - Horizontal scaling strategies
