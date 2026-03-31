# invalid_bucket.rb

**Path**: `lib/discord_rda/connection/invalid_bucket.rb`

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/connection/invalid_bucket.rb:3`*

#### Classes

- `InvalidRequestBucket`

---

## Methods

### request_allowed?

**public** `instance.request_allowed?()` - instance method

Check if a request is allowed
@return [Boolean] True if request can be made

*Defined at: `lib/discord_rda/connection/invalid_bucket.rb:80`*

---

### request_allowed?

**public** `instance.request_allowed?()` - instance method

*Defined at: `lib/discord_rda/connection/invalid_bucket.rb:80`*

---

### handle_request

**public** `instance.handle_request(status)` - instance method

Handle a completed request response
@param status [Integer] HTTP status code
@return [void]

*Defined at: `lib/discord_rda/connection/invalid_bucket.rb:94`*

---

### handle_request

**public** `instance.handle_request(status)` - instance method

*Defined at: `lib/discord_rda/connection/invalid_bucket.rb:94`*

---

### release_pause

**public** `instance.release_pause()` - instance method

Release global pause (call after interval or manual intervention)
@return [void]

*Defined at: `lib/discord_rda/connection/invalid_bucket.rb:121`*

---

### release_pause

**public** `instance.release_pause()` - instance method

*Defined at: `lib/discord_rda/connection/invalid_bucket.rb:121`*

---

### reset

**public** `instance.reset()` - instance method

Reset the bucket (after interval has passed)
@return [void]

*Defined at: `lib/discord_rda/connection/invalid_bucket.rb:132`*

---

### reset

**public** `instance.reset()` - instance method

*Defined at: `lib/discord_rda/connection/invalid_bucket.rb:132`*

---

### status

**public** `instance.status()` - instance method

Get current status with detailed information
@return [Hash] Bucket status

*Defined at: `lib/discord_rda/connection/invalid_bucket.rb:151`*

---

### status

**public** `instance.status()` - instance method

*Defined at: `lib/discord_rda/connection/invalid_bucket.rb:151`*

---

### healthy?

**public** `instance.healthy?()` - instance method

Check if bucket is healthy
@return [Boolean] True if well above warning threshold

*Defined at: `lib/discord_rda/connection/invalid_bucket.rb:179`*

---

### healthy?

**public** `instance.healthy?()` - instance method

*Defined at: `lib/discord_rda/connection/invalid_bucket.rb:179`*

---

### health_percentage

**public** `instance.health_percentage()` - instance method

Get percentage of remaining requests
@return [Float] Percentage (0-100)

*Defined at: `lib/discord_rda/connection/invalid_bucket.rb:185`*

---

### health_percentage

**public** `instance.health_percentage()` - instance method

*Defined at: `lib/discord_rda/connection/invalid_bucket.rb:185`*

---

### invalid_status?

**public** `instance.invalid_status?(status)` - instance method

*Defined at: `lib/discord_rda/connection/invalid_bucket.rb:191`*

---

### schedule_reset

**public** `instance.schedule_reset()` - instance method

*Defined at: `lib/discord_rda/connection/invalid_bucket.rb:196`*

---

