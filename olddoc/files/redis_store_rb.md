# redis_store.rb

**Path**: `lib/discord_rda/cache/redis_store.rb`

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/cache/redis_store.rb:3`*

#### Methods

**public** `instance.delete(key)` - instance method

Delete a value from cache
@param key [String] Cache key
@return [void]

*Defined at: `lib/discord_rda/cache/redis_store.rb:58`*

**public** `instance.exist?(key)` - instance method

Check if key exists
@param key [String] Cache key
@return [Boolean] True if exists

*Defined at: `lib/discord_rda/cache/redis_store.rb:65`*

**public** `instance.clear()` - instance method

Clear all cached values (matching prefix)
@return [void]

*Defined at: `lib/discord_rda/cache/redis_store.rb:71`*

**public** `instance.mget(keys)` - instance method

Get multiple values
@param keys [Array<String>] Cache keys
@return [Hash] Key-value pairs

*Defined at: `lib/discord_rda/cache/redis_store.rb:79`*

#### Classes

- `RedisStore`

---

## Methods

### mset

**public** `instance.mset(pairs, ttl, nil)` - instance method

Set multiple values
@param pairs [Hash] Key-value pairs
@param ttl [Integer] Time to live
@return [void]

*Defined at: `lib/discord_rda/cache/redis_store.rb:94`*

---

### mset

**public** `instance.mset(pairs, ttl, nil)` - instance method

*Defined at: `lib/discord_rda/cache/redis_store.rb:94`*

---

### keys

**public** `instance.keys(pattern)` - instance method

Get keys matching a pattern using SCAN (non-blocking)
@param pattern [String, Regexp] Pattern to match
@return [Array<String>] Matching keys (without prefix)

*Defined at: `lib/discord_rda/cache/redis_store.rb:112`*

---

### keys

**public** `instance.keys(pattern)` - instance method

*Defined at: `lib/discord_rda/cache/redis_store.rb:112`*

---

### prefixed_key

**public** `instance.prefixed_key(key)` - instance method

*Defined at: `lib/discord_rda/cache/redis_store.rb:132`*

---

