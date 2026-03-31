# request_queue.rb

**Path**: `lib/discord_rda/connection/request_queue.rb`

## Classes

### TimeoutError

**Inherits from**: `StandardError`

*Defined at: `lib/discord_rda/connection/request_queue.rb:339`*

---

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/connection/request_queue.rb:3`*

#### Methods

**public** `instance.schedule_processing()` - instance method

Schedule processing asynchronously
@return [void]

*Defined at: `lib/discord_rda/connection/request_queue.rb:75`*

**public** `instance.process_pending()` - instance method

Process pending requests in the queue with proper async
@return [void]

*Defined at: `lib/discord_rda/connection/request_queue.rb:81`*

#### Classes

- `RequestQueue`

---

## Methods

### send_with_retry

**public** `instance.send_with_retry(request)` - instance method

Send request with retry logic
@param request [Hash] Request data
@return [void]

*Defined at: `lib/discord_rda/connection/request_queue.rb:149`*

---

### send_with_retry

**public** `instance.send_with_retry(request)` - instance method

*Defined at: `lib/discord_rda/connection/request_queue.rb:149`*

---

### handle_completed_request

**public** `instance.handle_completed_request(headers)` - instance method

Handle completed request response (update rate limit info)
@param headers [Hash] Response headers
@return [void]

*Defined at: `lib/discord_rda/connection/request_queue.rb:208`*

---

### handle_completed_request

**public** `instance.handle_completed_request(headers)` - instance method

*Defined at: `lib/discord_rda/connection/request_queue.rb:208`*

---

### request_allowed?

**public** `instance.request_allowed?()` - instance method

Check if request is allowed
@return [Boolean] True if request can be made

*Defined at: `lib/discord_rda/connection/request_queue.rb:227`*

---

### request_allowed?

**public** `instance.request_allowed?()` - instance method

*Defined at: `lib/discord_rda/connection/request_queue.rb:227`*

---

### wait_until_request_available

**public** `instance.wait_until_request_available()` - instance method

Wait until request is available with async support
@return [void]

*Defined at: `lib/discord_rda/connection/request_queue.rb:239`*

---

### wait_until_request_available

**public** `instance.wait_until_request_available()` - instance method

*Defined at: `lib/discord_rda/connection/request_queue.rb:239`*

---

### calculate_wait_time

**public** `instance.calculate_wait_time()` - instance method

Calculate wait time for rate limit
@return [Float] Seconds to wait

*Defined at: `lib/discord_rda/connection/request_queue.rb:263`*

---

### calculate_wait_time

**public** `instance.calculate_wait_time()` - instance method

*Defined at: `lib/discord_rda/connection/request_queue.rb:263`*

---

### cleanup

**public** `instance.cleanup()` - instance method

Clean up queue if empty
@return [void]

*Defined at: `lib/discord_rda/connection/request_queue.rb:275`*

---

### cleanup

**public** `instance.cleanup()` - instance method

*Defined at: `lib/discord_rda/connection/request_queue.rb:275`*

---

### clearable?

**public** `instance.clearable?()` - instance method

Check if queue can be cleared
@return [Boolean] True if queue can be deleted

*Defined at: `lib/discord_rda/connection/request_queue.rb:298`*

---

### clearable?

**public** `instance.clearable?()` - instance method

*Defined at: `lib/discord_rda/connection/request_queue.rb:298`*

---

### status

**public** `instance.status()` - instance method

Get queue status
@return [Hash] Queue status

*Defined at: `lib/discord_rda/connection/request_queue.rb:306`*

---

### status

**public** `instance.status()` - instance method

*Defined at: `lib/discord_rda/connection/request_queue.rb:306`*

---

### schedule_reset

**public** `instance.schedule_reset(interval = nil)` - instance method

*Defined at: `lib/discord_rda/connection/request_queue.rb:324`*

---

