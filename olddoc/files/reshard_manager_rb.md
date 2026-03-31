# reshard_manager.rb

**Path**: `lib/discord_rda/connection/reshard_manager.rb`

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/connection/reshard_manager.rb:3`*

#### Methods

**public** `instance.calculate_guilds_per_shard(shard_count)` - instance method

Calculate optimal guilds per shard
@param shard_count [Integer] Target shard count
@return [Integer] Guilds per shard

*Defined at: `lib/discord_rda/connection/reshard_manager.rb:89`*

**public** `instance.status()` - instance method

Get reshard status
@return [Hash] Status information

*Defined at: `lib/discord_rda/connection/reshard_manager.rb:96`*

#### Classes

- `ReshardManager`

---

## Methods

### start_new_shards

**public** `instance.start_new_shards(old_count, new_count)` - instance method

*Defined at: `lib/discord_rda/connection/reshard_manager.rb:109`*

---

### wait_for_new_shards_ready

**public** `instance.wait_for_new_shards_ready()` - instance method

*Defined at: `lib/discord_rda/connection/reshard_manager.rb:128`*

---

### transfer_sessions

**public** `instance.transfer_sessions()` - instance method

*Defined at: `lib/discord_rda/connection/reshard_manager.rb:143`*

---

### mark_old_shards_for_shutdown

**public** `instance.mark_old_shards_for_shutdown()` - instance method

*Defined at: `lib/discord_rda/connection/reshard_manager.rb:194`*

---

### wait_for_old_shards_drain

**public** `instance.wait_for_old_shards_drain()` - instance method

*Defined at: `lib/discord_rda/connection/reshard_manager.rb:203`*

---

### shard_drained?

**public** `instance.shard_drained?(shard)` - instance method

*Defined at: `lib/discord_rda/connection/reshard_manager.rb:230`*

---

### finalize_reshard

**public** `instance.finalize_reshard()` - instance method

*Defined at: `lib/discord_rda/connection/reshard_manager.rb:289`*

---

### auto_reshard_if_needed

**public** `instance.auto_reshard_if_needed(guild_count, max_guilds_per_shard)` - instance method

Auto-reshard based on guild count
@param guild_count [Integer] Current guild count
@param max_guilds_per_shard [Integer] Maximum guilds per shard
@return [Boolean] True if resharding was triggered

*Defined at: `lib/discord_rda/connection/reshard_manager.rb:310`*

---

### auto_reshard_if_needed

**public** `instance.auto_reshard_if_needed(guild_count, max_guilds_per_shard)` - instance method

*Defined at: `lib/discord_rda/connection/reshard_manager.rb:310`*

---

