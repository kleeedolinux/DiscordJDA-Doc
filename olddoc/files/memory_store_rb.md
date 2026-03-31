# memory_store.rb

**Path**: `lib/discord_rda/cache/memory_store.rb`

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/cache/memory_store.rb:5`*

#### Methods

**public** `instance.set(key, value, ttl, nil)` - instance method

Set a value in cache
@param key [String] Cache key
@param value [Object] Value to cache
@param ttl [Integer] Time to live in seconds
@return [void]

*Defined at: `lib/discord_rda/cache/memory_store.rb:43`*

#### Classes

- `MemoryStore`

---

## Methods

### delete

**public** `instance.delete(key)` - instance method

Delete a value from cache
@param key [String] Cache key
@return [void]

*Defined at: `lib/discord_rda/cache/memory_store.rb:53`*

---

### delete

**public** `instance.delete(key)` - instance method

*Defined at: `lib/discord_rda/cache/memory_store.rb:53`*

---

### exist?

**public** `instance.exist?(key)` - instance method

Check if key exists and is not expired
@param key [String] Cache key
@return [Boolean] True if exists

*Defined at: `lib/discord_rda/cache/memory_store.rb:63`*

---

### exist?

**public** `instance.exist?(key)` - instance method

*Defined at: `lib/discord_rda/cache/memory_store.rb:63`*

---

### clear

**public** `instance.clear()` - instance method

Clear all cached values
@return [void]

*Defined at: `lib/discord_rda/cache/memory_store.rb:72`*

---

### clear

**public** `instance.clear()` - instance method

*Defined at: `lib/discord_rda/cache/memory_store.rb:72`*

---

### size

**public** `instance.size()` - instance method

Get current cache size
@return [Integer] Number of cached items

*Defined at: `lib/discord_rda/cache/memory_store.rb:81`*

---

### size

**public** `instance.size()` - instance method

*Defined at: `lib/discord_rda/cache/memory_store.rb:81`*

---

### stats

**public** `instance.stats()` - instance method

Get cache statistics
@return [Hash] Statistics

*Defined at: `lib/discord_rda/cache/memory_store.rb:90`*

---

### stats

**public** `instance.stats()` - instance method

*Defined at: `lib/discord_rda/cache/memory_store.rb:90`*

---

### keys

**public** `instance.keys(pattern)` - instance method

Get keys matching a pattern
@param pattern [String, Regexp] Pattern to match (supports globs like "member:123:*")
@return [Array<String>] Matching keys

*Defined at: `lib/discord_rda/cache/memory_store.rb:104`*

---

### keys

**public** `instance.keys(pattern)` - instance method

*Defined at: `lib/discord_rda/cache/memory_store.rb:104`*

---

### check_ttl

**public** `instance.check_ttl(key)` - instance method

*Defined at: `lib/discord_rda/cache/memory_store.rb:124`*

---

### clean_expired

**public** `instance.clean_expired()` - instance method

*Defined at: `lib/discord_rda/cache/memory_store.rb:134`*

---

