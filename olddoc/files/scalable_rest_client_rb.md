# scalable_rest_client.rb

**Path**: `lib/discord_rda/connection/scalable_rest_client.rb`

## Classes

### APIError

**Inherits from**: `StandardError`

Error classes

*Defined at: `lib/discord_rda/connection/scalable_rest_client.rb:499`*

#### Methods

**public** `instance.initialize(status, data)` - instance method

*Defined at: `lib/discord_rda/connection/scalable_rest_client.rb:502`*

---

### BadRequestError

**Inherits from**: `APIError`

*Defined at: `lib/discord_rda/connection/scalable_rest_client.rb:510`*

---

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/connection/scalable_rest_client.rb:3`*

#### Methods

**public** `instance.start()` - instance method

Start the REST client
@return [void]

*Defined at: `lib/discord_rda/connection/scalable_rest_client.rb:87`*

**public** `instance.stop()` - instance method

Stop the REST client
@return [void]

*Defined at: `lib/discord_rda/connection/scalable_rest_client.rb:94`*

**public** `instance.get(route, options = {})` - instance method

Make a GET request
@param route [String] API route
@param options [Hash] Request options
@return [Hash] Response data

*Defined at: `lib/discord_rda/connection/scalable_rest_client.rb:103`*

**public** `instance.post(route, options = {})` - instance method

Make a POST request
@param route [String] API route
@param options [Hash] Request options
@return [Hash] Response data

*Defined at: `lib/discord_rda/connection/scalable_rest_client.rb:111`*

**public** `instance.put(route, options = {})` - instance method

Make a PUT request
@param route [String] API route
@param options [Hash] Request options
@return [Hash] Response data

*Defined at: `lib/discord_rda/connection/scalable_rest_client.rb:119`*

**public** `instance.patch(route, options = {})` - instance method

Make a PATCH request
@param route [String] API route
@param options [Hash] Request options
@return [Hash] Response data

*Defined at: `lib/discord_rda/connection/scalable_rest_client.rb:127`*

**public** `instance.delete(route, options = {})` - instance method

Make a DELETE request
@param route [String] API route
@param options [Hash] Request options
@return [Hash] Response data

*Defined at: `lib/discord_rda/connection/scalable_rest_client.rb:135`*

**public** `instance.simplify_url(url, method)` - instance method

Simplify URL for rate limit bucket identification
@param url [String] Full URL
@param method [Symbol] HTTP method
@return [String] Simplified URL for bucket

*Defined at: `lib/discord_rda/connection/scalable_rest_client.rb:143`*

#### Classes

- `ScalableRestClient`

---

## Methods

### check_rate_limits

**public** `instance.check_rate_limits(url, identifier)` - instance method

Check rate limits for a URL or bucket
@param url [String] URL or bucket ID
@param identifier [String] Queue identifier
@return [Integer, false] Milliseconds until reset, or false if not limited

*Defined at: `lib/discord_rda/connection/scalable_rest_client.rb:186`*

---

### check_rate_limits

**public** `instance.check_rate_limits(url, identifier)` - instance method

*Defined at: `lib/discord_rda/connection/scalable_rest_client.rb:186`*

---

### process_rate_limited_paths

**public** `instance.process_rate_limited_paths()` - instance method

Process rate limited paths (cleanup loop)
@return [void]

*Defined at: `lib/discord_rda/connection/scalable_rest_client.rb:207`*

---

### process_rate_limited_paths

**public** `instance.process_rate_limited_paths()` - instance method

*Defined at: `lib/discord_rda/connection/scalable_rest_client.rb:207`*

---

### update_token_queues

**public** `instance.update_token_queues(old_token, new_token)` - instance method

Update token in all queues (for token refresh)
@param old_token [String] Old token
@param new_token [String] New token
@return [void]

*Defined at: `lib/discord_rda/connection/scalable_rest_client.rb:236`*

---

### update_token_queues

**public** `instance.update_token_queues(old_token, new_token)` - instance method

*Defined at: `lib/discord_rda/connection/scalable_rest_client.rb:236`*

---

### make_request

**public** `instance.make_request(method, route, options = {})` - instance method

*Defined at: `lib/discord_rda/connection/scalable_rest_client.rb:280`*

---

### send_request

**public** `instance.send_request(request)` - instance method

*Defined at: `lib/discord_rda/connection/scalable_rest_client.rb:318`*

---

### make_http_request

**public** `instance.make_http_request(method, url, body, headers)` - instance method

*Defined at: `lib/discord_rda/connection/scalable_rest_client.rb:334`*

---

### process_response

**public** `instance.process_response(response, request)` - instance method

*Defined at: `lib/discord_rda/connection/scalable_rest_client.rb:353`*

---

### process_headers

**public** `instance.process_headers(url, headers, identifier)` - instance method

*Defined at: `lib/discord_rda/connection/scalable_rest_client.rb:397`*

---

### build_headers

**public** `instance.build_headers(additional = {})` - instance method

*Defined at: `lib/discord_rda/connection/scalable_rest_client.rb:455`*

---

### simplify_reactions_url

**public** `instance.simplify_reactions_url(parts)` - instance method

*Defined at: `lib/discord_rda/connection/scalable_rest_client.rb:472`*

---

### simplify_messages_url

**public** `instance.simplify_messages_url(method, parts)` - instance method

*Defined at: `lib/discord_rda/connection/scalable_rest_client.rb:477`*

---

