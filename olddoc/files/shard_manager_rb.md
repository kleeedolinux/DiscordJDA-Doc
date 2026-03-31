# shard_manager.rb

**Path**: `lib/discord_rda/connection/shard_manager.rb`

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/connection/shard_manager.rb:3`*

#### Methods

**public** `self.self(shard_for_guild, guild_id, total_shards)` - class method

Get shard ID for a guild
@param guild_id [String, Integer] Guild ID
@param total_shards [Integer] Total shard count
@return [Integer] Shard ID

*Defined at: `lib/discord_rda/connection/shard_manager.rb:67`*

**public** `instance.start(shard_ids = nil)` - instance method

Start all shards
@param shard_ids [Array<Integer>] Specific shard IDs to start (nil for all)
@return [void]

*Defined at: `lib/discord_rda/connection/shard_manager.rb:74`*

#### Classes

- `ShardManager`

---

## Methods

### stop

**public** `instance.stop()` - instance method

Stop all shards
@return [void]

*Defined at: `lib/discord_rda/connection/shard_manager.rb:89`*

---

### stop

**public** `instance.stop()` - instance method

*Defined at: `lib/discord_rda/connection/shard_manager.rb:89`*

---

### shard

**public** `instance.shard(shard_id)` - instance method

Get shard by ID
@param shard_id [Integer] Shard ID
@return [GatewayClient, nil] Gateway client

*Defined at: `lib/discord_rda/connection/shard_manager.rb:99`*

---

### shard

**public** `instance.shard(shard_id)` - instance method

*Defined at: `lib/discord_rda/connection/shard_manager.rb:99`*

---

### status

**public** `instance.status()` - instance method

Get status of all shards
@return [Hash] Status information

*Defined at: `lib/discord_rda/connection/shard_manager.rb:105`*

---

### status

**public** `instance.status()` - instance method

*Defined at: `lib/discord_rda/connection/shard_manager.rb:105`*

---

### shard_ready?

**public** `instance.shard_ready?(shard_id)` - instance method

Check if shard is ready
@param shard_id [Integer] Shard ID
@return [Boolean] True if ready

*Defined at: `lib/discord_rda/connection/shard_manager.rb:124`*

---

### shard_ready?

**public** `instance.shard_ready?(shard_id)` - instance method

*Defined at: `lib/discord_rda/connection/shard_manager.rb:124`*

---

### update_guild_count

**public** `instance.update_guild_count(count)` - instance method

Update total guild count
@param count [Integer] Total guilds
@return [void]

*Defined at: `lib/discord_rda/connection/shard_manager.rb:131`*

---

### update_guild_count

**public** `instance.update_guild_count(count)` - instance method

*Defined at: `lib/discord_rda/connection/shard_manager.rb:131`*

---

### reconnect_shard

**public** `instance.reconnect_shard(shard_id)` - instance method

Reconnect a specific shard
@param shard_id [Integer] Shard ID
@return [void]

*Defined at: `lib/discord_rda/connection/shard_manager.rb:138`*

---

### reconnect_shard

**public** `instance.reconnect_shard(shard_id)` - instance method

*Defined at: `lib/discord_rda/connection/shard_manager.rb:138`*

---

### respawn

**public** `instance.respawn(new_shard_count)` - instance method

Spawn additional shards (hot scaling)
@param new_shard_count [Integer] New total shard count
@return [void]

*Defined at: `lib/discord_rda/connection/shard_manager.rb:151`*

---

### respawn

**public** `instance.respawn(new_shard_count)` - instance method

*Defined at: `lib/discord_rda/connection/shard_manager.rb:151`*

---

### fetch_session_info

**public** `instance.fetch_session_info(rest_client)` - instance method

Get session information from Discord
@param rest_client [RestClient] REST client
@return [Hash] Session info with url, shards, session_start_limit

*Defined at: `lib/discord_rda/connection/shard_manager.rb:167`*

---

### fetch_session_info

**public** `instance.fetch_session_info(rest_client)` - instance method

*Defined at: `lib/discord_rda/connection/shard_manager.rb:167`*

---

### fetch_recommended_shards

**public** `instance.fetch_recommended_shards(rest_client)` - instance method

*Defined at: `lib/discord_rda/connection/shard_manager.rb:173`*

---

### start_shard

**public** `instance.start_shard(shard_id, shard_count)` - instance method

*Defined at: `lib/discord_rda/connection/shard_manager.rb:183`*

---

### wait_for_ready

**public** `instance.wait_for_ready()` - instance method

*Defined at: `lib/discord_rda/connection/shard_manager.rb:202`*

---

