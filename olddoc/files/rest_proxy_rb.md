# rest_proxy.rb

**Path**: `lib/discord_rda/connection/rest_proxy.rb`

## Classes

### APIError

**Inherits from**: `StandardError`

*Defined at: `lib/discord_rda/connection/rest_proxy.rb:146`*

#### Methods

**public** `instance.initialize(status, data)` - instance method

*Defined at: `lib/discord_rda/connection/rest_proxy.rb:149`*

---

### RateLimitedError

**Inherits from**: `APIError`

*Defined at: `lib/discord_rda/connection/rest_proxy.rb:156`*

#### Methods

**public** `instance.initialize(status, data, retry_after)` - instance method

*Defined at: `lib/discord_rda/connection/rest_proxy.rb:159`*

---

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/connection/rest_proxy.rb:3`*

#### Methods

**public** `instance.health_check()` - instance method

Get proxy health/status
@return [Hash] Status information

*Defined at: `lib/discord_rda/connection/rest_proxy.rb:80`*

#### Classes

- `RestProxy`

---

## Methods

### register_bot

**public** `instance.register_bot(bot_id, token)` - instance method

Register a bot instance with the proxy
@param bot_id [String] Bot ID
@param token [String] Bot token
@return [Hash] Registration response

*Defined at: `lib/discord_rda/connection/rest_proxy.rb:101`*

---

### register_bot

**public** `instance.register_bot(bot_id, token)` - instance method

*Defined at: `lib/discord_rda/connection/rest_proxy.rb:101`*

---

### update_token

**public** `instance.update_token(old_token, new_token)` - instance method

Update bearer token (for OAuth2 bots)
@param old_token [String] Old token
@param new_token [String] New token
@return [void]

*Defined at: `lib/discord_rda/connection/rest_proxy.rb:118`*

---

### update_token

**public** `instance.update_token(old_token, new_token)` - instance method

*Defined at: `lib/discord_rda/connection/rest_proxy.rb:118`*

---

### handle_response

**public** `instance.handle_response(response)` - instance method

*Defined at: `lib/discord_rda/connection/rest_proxy.rb:131`*

---

