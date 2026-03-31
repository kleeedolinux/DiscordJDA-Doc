---
layout: doc
title: Sharding
description: Scale your bot with automatic sharding
permalink: /advanced/sharding/
---


## What is Sharding?

Sharding splits your bot across multiple WebSocket connections to handle more guilds.

## Automatic Sharding

DiscordRDA automatically calculates required shards:

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  shards: :auto
)
```

## Manual Sharding

Specify exact shard range:

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  shards: [[0, 4], [1, 4]]  # Shard 0 of 4, and shard 1 of 4
)
```

## Zero-Downtime Resharding

Add shards without stopping:

```ruby
bot = DiscordRDA::Bot.new(token: token, shards: :auto)

# Enable auto-resharding
bot.enable_auto_reshard(
  max_guilds_per_shard: 1000,
  check_interval: 300  # Check every 5 minutes
)
```

## Manual Resharding

```ruby
# Reshard to 8 shards
bot.reshard_to(8)

# This migrates guilds seamlessly between old and new shards
```

## Session Transfer

Move guilds between shards:

```ruby
# Transfer a guild to a different shard
bot.transfer_guild(guild_id: '123456789', to_shard: 3)
```

## Shard Status

```ruby
bot.shards.each do |shard|
  puts "Shard #{shard.id}: #{shard.status}"
  puts "  Guilds: #{shard.guild_count}"
  puts "  Ping: #{shard.ping}ms"
  puts "  Session: #{shard.session_id}"
end
```

## Per-Shard Configuration

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  shards: [[0, 4], [1, 4]],
  shard_config: {
    0 => { intents: [:guilds, :guild_messages] },
    1 => { intents: [:guilds] }
  }
)
```
