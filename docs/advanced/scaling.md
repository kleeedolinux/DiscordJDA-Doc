---
sidebar_position: 4
---

# Scaling

DiscordRDA provides features for scaling your bot to millions of guilds across multiple servers.

## Scaling Strategies

### Vertical Scaling

Run larger instances:
```ruby
# Single powerful server
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  shards: :auto,
  cache: :redis,
  enable_scalable_rest: true
)
```

**Pros:** Simple, no coordination needed
**Cons:** Single point of failure, hardware limits

### Horizontal Scaling

Run multiple smaller instances:
```
Server 1: Shards 0-7
Server 2: Shards 8-15
Server 3: Shards 16-23
```

**Pros:** Fault tolerant, unlimited scale
**Cons:** More complex, needs coordination

## Scalable REST Client

Enable for high-traffic bots:

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  enable_scalable_rest: true
)
```

Benefits:
- **Request queuing** - Orders requests optimally
- **Burst handling** - Manages rate limit resets
- **Priority system** - User-facing requests first

### REST Proxy

Offload REST to dedicated servers:

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  enable_scalable_rest: true,
  rest_proxy: {
    url: 'http://rest-proxy.internal:8080',
    headers: { 'Authorization' => 'proxy-token' }
  }
)
```

Proxy server handles:
- Rate limiting
- Request queuing
- Caching
- Request deduplication

### Distributed REST

Multiple REST workers:

```ruby
# On each app server
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  enable_scalable_rest: true,
  rest_config: {
    workers: 10,           # Concurrent workers
    queue_size: 10000,     # Max queue depth
    timeout: 30           # Request timeout
  }
)
```

## Distributed Caching

Share cache across all instances:

```ruby
# All shards use same Redis
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  cache: :redis,
  redis_config: {
    host: 'redis-cluster.internal',
    port: 6379,
    cluster: true  # Redis Cluster mode
  }
)
```

### Cache Invalidation

```ruby
# Invalidate across all instances
bot.cache.invalidate(:guild, guild_id)
# Automatically propagated to all shards
```

## Message Bus

Coordinate between instances:

```ruby
# Using Redis pub/sub
bus = DiscordRDA::EventBus.new(
  adapter: :redis,
  redis_config: { host: 'redis.internal' }
)

# Subscribe to events
bus.subscribe('broadcast') do |message|
  puts "Received: #{message}"
end

# Publish events
bus.publish('broadcast', { type: 'reload', data: {} })
```

## Session Management

### Session Transfer

Move guilds between shards:

```ruby
# Transfer guild from shard 5 to shard 10
bot.reshard_manager.transfer_guild(
  guild_id: '123456789',
  from_shard: 5,
  to_shard: 10
)
```

Use cases:
- Load balancing
- Shard maintenance
- Regional optimization

### Session Persistence

Maintain sessions across restarts:

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  shards: :auto,
  session_store: :redis  # Persist sessions
)

# On restart, sessions are restored
# Users don't see "bot typing" interruptions
```

## Load Balancing

### Gateway Load Balancing

Distribute shards evenly:

```ruby
# Kubernetes deployment
# Each pod gets shard assignment via env
shard_id = ENV['SHARD_ID'].to_i
total_shards = ENV['TOTAL_SHARDS'].to_i

bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  shards: [[shard_id, total_shards]],
  cache: :redis
)
```

### Health Checks

```ruby
# Kubernetes liveness probe
get '/health' do
  status = bot.status
  
  if status[:connected] && status[:latency] < 500
    200
  else
    503
  end
end

# Readiness probe
get '/ready' do
  if bot.status[:shards].all? { |s| s[:status] == :connected }
    200
  else
    503
  end
end
```

## Kubernetes Deployment

### Deployment Config

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: discord-bot
spec:
  replicas: 8  # 8 shards
  template:
    spec:
      containers:
      - name: bot
        image: my-bot:latest
        env:
        - name: SHARD_ID
          valueFrom:
            fieldRef:
              fieldPath: metadata.name  # Derive from pod name
        - name: TOTAL_SHARDS
          value: "8"
        - name: REDIS_HOST
          value: "redis-service"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

### Service Config

```yaml
apiVersion: v1
kind: Service
metadata:
  name: bot-metrics
spec:
  ports:
  - port: 8080
    name: metrics
  selector:
    app: discord-bot
```

## Monitoring at Scale

### Metrics Collection

```ruby
# Prometheus metrics
require 'prometheus/client'

bot.on(:dispatch) do |event|
  # Track events
  EVENT_COUNTER.increment(labels: { type: event.type })
end

bot.on(:rate_limited) do |event|
  # Track rate limits
  RATELIMIT_COUNTER.increment(labels: { route: event.route })
end

# Expose metrics
get '/metrics' do
  Prometheus::Client.registry.to_s
end
```

### Centralized Logging

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  log_format: :json,  # Structured logging
  log_level: :info
)

# Ship to ELK/Fluentd
```

### Tracing

```ruby
# OpenTelemetry tracing
require 'opentelemetry'

bot.use(DiscordRDA::OpenTelemetryMiddleware)

# Traces include:
# - Gateway events
# - REST requests
# - Cache operations
# - Command execution
```

## Database Scaling

### Read Replicas

```ruby
# Write to primary, read from replicas
DATABASE = {
  write: PG.connect(host: 'db-primary'),
  read: PG.connect(host: 'db-replica')
}

# Writes
DATABASE[:write].exec('INSERT ...')

# Reads
DATABASE[:read].exec('SELECT ...')
```

### Connection Pooling

```ruby
require 'connection_pool'

DB_POOL = ConnectionPool.new(size: 10, timeout: 5) do
  PG.connect(host: 'db.internal')
end

# Use in handlers
DB_POOL.with do |conn|
  conn.exec('SELECT * FROM users WHERE id = $1', [user_id])
end
```

### Caching Layer

```ruby
# Cache database queries
def get_user(user_id)
  # Check cache first
  if cached = bot.cache.get(:user_data, user_id)
    return cached
  end
  
  # Fetch from DB
  user = DB_POOL.with { |conn| conn.exec(...).first }
  
  # Cache result
  bot.cache.set(:user_data, user_id, user, ttl: 300)
  
  user
end
```

## Regional Deployment

### Regional Gateways

Deploy shards close to users:

```
US-EAST: Shards 0-7  (for North America guilds)
EU-WEST: Shards 8-15 (for European guilds)
ASIA:    Shards 16-23 (for Asian guilds)
```

Discord automatically routes guilds, but you can optimize:

```ruby
# Preferred regions for shard
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  shards: [[0, 24]],
  preferred_regions: ['us-east', 'us-central']
)
```

## Disaster Recovery

### Backup Strategy

```ruby
# Regular state backups
Thread.new do
  loop do
    sleep 3600  # Every hour
    
    backup = {
      timestamp: Time.now,
      guild_settings: GuildSettings.all.to_h,
      user_data: UserData.recent.to_h
    }
    
    # Save to S3/GCS
    S3.put_object(
      bucket: 'bot-backups',
      key: "backup-#{Time.now.to_i}.json",
      body: JSON.dump(backup)
    )
  end
end
```

### Failover

```ruby
# Primary-Secondary setup
if primary_healthy?
  bot.run
else
  # Promote secondary
  promote_to_primary!
  bot.run
end
```

## Performance Optimization

### Async Processing

```ruby
# Use Fibers for concurrent operations
bot.on(:message_create) do |event|
  # Handle asynchronously
  Fiber.new do
    process_message(event.message)
  end.resume
end
```

### Lazy Loading

```ruby
# Don't load until needed
def guild_config(guild_id)
  @guild_configs ||= {}
  @guild_configs[guild_id] ||= load_guild_config(guild_id)
end
```

### Connection Reuse

```ruby
# Keep-alive connections
HTTP_CLIENT = HTTP::Client.new(
  keep_alive_timeout: 30
)
```

## Cost Optimization

### Right-Sizing

```ruby
# Monitor resource usage
# Scale based on actual needs, not theoretical maximum
```

### Spot Instances

```ruby
# For non-critical shards
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  shards: [[0, 8]],
  on_shutdown: :transfer  # Transfer guilds to stable shards
)
```

## Complete Scaling Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Load Balancer                          │
│                    (CloudFlare/AWS ALB)                      │
└─────────────────────────────────────────────────────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        ▼                      ▼                      ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│  Bot Pod 1   │      │  Bot Pod 2   │      │  Bot Pod N   │
│  Shards 0-3  │      │  Shards 4-7  │      │  Shards N+   │
│              │      │              │      │              │
│ ┌──────────┐ │      │ ┌──────────┐ │      │ ┌──────────┐ │
│ │Shard 0   │ │      │ │Shard 4   │ │      │ │Shard N   │ │
│ │Shard 1   │ │      │ │Shard 5   │ │      │ │Shard N+1 │ │
│ │Shard 2   │ │      │ │Shard 6   │ │      │ │...       │ │
│ │Shard 3   │ │      │ │Shard 7   │ │      │ │          │ │
│ └──────────┘ │      │ └──────────┘ │      │ └──────────┘ │
└──────────────┘      └──────────────┘      └──────────────┘
        │                      │                      │
        └──────────────────────┼──────────────────────┘
                               ▼
                    ┌──────────────────┐
                    │  Redis Cluster   │
                    │  (Shared Cache)  │
                    └──────────────────┘
                               │
                    ┌──────────────────┐
                    │  PostgreSQL      │
                    │  (Primary+Replica)│
                    └──────────────────┘
```

## Next Steps

- **[Learn Sharding](../core-concepts/sharding)** - Foundation of scaling
- **[Rate Limiting](./rate-limiting)** - Critical for scale
- **[Caching](../core-concepts/caching)** - Reduce load
