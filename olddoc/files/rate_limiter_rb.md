# rate_limiter.rb

**Path**: `lib/discord_rda/connection/rate_limiter.rb`

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/connection/rate_limiter.rb:6`*

#### Classes

- `RateLimiter`

---

## Methods

### update

**public** `instance.update(route, response)` - instance method

Update rate limit info from response headers with precise timing
@param route [String] Route identifier
@param response [Protocol::HTTP::Response] HTTP response
@return [void]

*Defined at: `lib/discord_rda/connection/rate_limiter.rb:64`*

---

### update

**public** `instance.update(route, response)` - instance method

*Defined at: `lib/discord_rda/connection/rate_limiter.rb:64`*

---

### info

**public** `instance.info(route)` - instance method

Get rate limit info for a route
@param route [String] Route identifier
@return [RateLimitInfo, nil] Rate limit info

*Defined at: `lib/discord_rda/connection/rate_limiter.rb:110`*

---

### info

**public** `instance.info(route)` - instance method

*Defined at: `lib/discord_rda/connection/rate_limiter.rb:110`*

---

### limited?

**public** `instance.limited?(route)` - instance method

Check if route is rate limited
@param route [String] Route identifier
@return [Boolean] True if limited

*Defined at: `lib/discord_rda/connection/rate_limiter.rb:117`*

---

### limited?

**public** `instance.limited?(route)` - instance method

*Defined at: `lib/discord_rda/connection/rate_limiter.rb:117`*

---

### time_until_reset

**public** `instance.time_until_reset(route)` - instance method

Get time until reset for a route
@param route [String] Route identifier
@return [Float, nil] Seconds until reset, or nil if not limited

*Defined at: `lib/discord_rda/connection/rate_limiter.rb:135`*

---

### time_until_reset

**public** `instance.time_until_reset(route)` - instance method

*Defined at: `lib/discord_rda/connection/rate_limiter.rb:135`*

---

### reset_time

**public** `instance.reset_time(route)` - instance method

Get reset time for a route
@param route [String] Route identifier
@return [Time, nil] Reset time

*Defined at: `lib/discord_rda/connection/rate_limiter.rb:147`*

---

### reset_time

**public** `instance.reset_time(route)` - instance method

*Defined at: `lib/discord_rda/connection/rate_limiter.rb:147`*

---

### bucket_id

**public** `instance.bucket_id(route)` - instance method

Get bucket ID for a route
@param route [String] Route identifier
@return [String, nil] Bucket ID

*Defined at: `lib/discord_rda/connection/rate_limiter.rb:154`*

---

### bucket_id

**public** `instance.bucket_id(route)` - instance method

*Defined at: `lib/discord_rda/connection/rate_limiter.rb:154`*

---

### wait_for_route

**public** `instance.wait_for_route(route)` - instance method

Wait for a route to be available (async-friendly)
@param route [String] Route identifier
@return [void]

*Defined at: `lib/discord_rda/connection/rate_limiter.rb:161`*

---

### wait_for_route

**public** `instance.wait_for_route(route)` - instance method

*Defined at: `lib/discord_rda/connection/rate_limiter.rb:161`*

---

### clear

**public** `instance.clear()` - instance method

Clear all rate limits
@return [void]

*Defined at: `lib/discord_rda/connection/rate_limiter.rb:182`*

---

### clear

**public** `instance.clear()` - instance method

*Defined at: `lib/discord_rda/connection/rate_limiter.rb:182`*

---

### status

**public** `instance.status()` - instance method

Get comprehensive status
@return [Hash] Rate limiter status

*Defined at: `lib/discord_rda/connection/rate_limiter.rb:193`*

---

### status

**public** `instance.status()` - instance method

*Defined at: `lib/discord_rda/connection/rate_limiter.rb:193`*

---

### wait_for_global

**public** `instance.wait_for_global()` - instance method

*Defined at: `lib/discord_rda/connection/rate_limiter.rb:214`*

---

### precise_sleep

**public** `instance.precise_sleep(seconds)` - instance method

*Defined at: `lib/discord_rda/connection/rate_limiter.rb:226`*

---

### schedule_global_reset

**public** `instance.schedule_global_reset(seconds)` - instance method

*Defined at: `lib/discord_rda/connection/rate_limiter.rb:237`*

---

### schedule_route_reset

**public** `instance.schedule_route_reset(route, seconds)` - instance method

*Defined at: `lib/discord_rda/connection/rate_limiter.rb:247`*

---

### notify_waiters

**public** `instance.notify_waiters(route)` - instance method

*Defined at: `lib/discord_rda/connection/rate_limiter.rb:266`*

---

### notify_all_waiters

**public** `instance.notify_all_waiters()` - instance method

*Defined at: `lib/discord_rda/connection/rate_limiter.rb:271`*

---

