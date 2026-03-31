# configurable_cache.rb

**Path**: `lib/discord_rda/cache/configurable_cache.rb`

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:3`*

#### Methods

**public** `instance.get(type, id)` - instance method

Get cached entity
@param type [Symbol] Entity type
@param id [String, Snowflake] Entity ID
@return [Entity, nil] Cached entity or nil

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:79`*

**public** `instance.should_cache?(type)` - instance method

Check if entity should be cached
@param type [Symbol] Entity type
@return [Boolean] True if should cache

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:89`*

#### Classes

- `ConfigurableCache`

---

## Methods

### invalidate

**public** `instance.invalidate(type, id)` - instance method

Invalidate an entity
@param type [Symbol] Entity type
@param id [String, Snowflake] Entity ID
@return [void]

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:106`*

---

### invalidate

**public** `instance.invalidate(type, id)` - instance method

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:106`*

---

### clear

**public** `instance.clear()` - instance method

Clear all cached data
@return [void]

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:113`*

---

### clear

**public** `instance.clear()` - instance method

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:113`*

---

### stats

**public** `instance.stats()` - instance method

Get cache statistics
@return [Hash] Statistics

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:119`*

---

### stats

**public** `instance.stats()` - instance method

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:119`*

---

### with

**public** `instance.with(**overrides)` - instance method

Create a new cache with different settings (immutable)
@param overrides [Hash] Settings to override
@return [ConfigurableCache] New cache instance

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:132`*

---

### with

**public** `instance.with(**overrides)` - instance method

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:132`*

---

### filter_properties

**public** `instance.filter_properties(entity, properties)` - instance method

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:144`*

---

### advanced_filter

**public** `instance.advanced_filter(entity, config = {})` - instance method

Advanced property filtering with transforms
@param entity [Entity] Entity to filter
@param config [Hash] Filter config with :only, :except, :transform options
@return [Entity] Filtered entity

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:182`*

---

### advanced_filter

**public** `instance.advanced_filter(entity, config = {})` - instance method

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:182`*

---

### filter_by

**public** `instance.filter_by(type)` - instance method

Filter entities by custom predicate
@param type [Symbol] Entity type
@yield Block to filter entities
@return [Array<Entity>] Filtered entities

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:212`*

---

### filter_by

**public** `instance.filter_by(type)` - instance method

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:212`*

---

### filter_for

**public** `instance.filter_for(type)` - instance method

Get filtered properties configuration for an entity type
@param type [Symbol] Entity type
@return [Array<Symbol>, nil] Properties to cache, or nil for all

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:224`*

---

### filter_for

**public** `instance.filter_for(type)` - instance method

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:224`*

---

### set_filter

**public** `instance.set_filter(type, *properties)` - instance method

Set filtered properties for an entity type
@param type [Symbol] Entity type
@param properties [Array<Symbol>] Properties to cache
@return [void]

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:232`*

---

### set_filter

**public** `instance.set_filter(type, *properties)` - instance method

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:232`*

---

### clear_filter

**public** `instance.clear_filter(type)` - instance method

Clear filter for an entity type
@param type [Symbol] Entity type
@return [void]

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:239`*

---

### clear_filter

**public** `instance.clear_filter(type)` - instance method

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:239`*

---

### cache_batch

**public** `instance.cache_batch(type, entities, ttl)` - instance method

Batch cache entities with property filtering
@param type [Symbol] Entity type
@param entities [Array<Entity>] Entities to cache
@param ttl [Integer] Time to live in seconds
@return [void]

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:248`*

---

### cache_batch

**public** `instance.cache_batch(type, entities, ttl)` - instance method

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:248`*

---

### get_many

**public** `instance.get_many(type, ids)` - instance method

Get multiple entities by IDs
@param type [Symbol] Entity type
@param ids [Array<String, Snowflake>] Entity IDs
@return [Array<Entity>] Found entities

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:260`*

---

### get_many

**public** `instance.get_many(type, ids)` - instance method

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:260`*

---

### invalidate_many

**public** `instance.invalidate_many(type, ids)` - instance method

Invalidate multiple entities
@param type [Symbol] Entity type
@param ids [Array<String, Snowflake>] Entity IDs
@return [void]

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:270`*

---

### invalidate_many

**public** `instance.invalidate_many(type, ids)` - instance method

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:270`*

---

### invalidate_pattern

**public** `instance.invalidate_pattern(pattern)` - instance method

Invalidate by pattern
@param pattern [String] Pattern to match (e.g., "guild:*:members")
@return [Integer] Number of entries invalidated

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:277`*

---

### invalidate_pattern

**public** `instance.invalidate_pattern(pattern)` - instance method

*Defined at: `lib/discord_rda/cache/configurable_cache.rb:277`*

---

