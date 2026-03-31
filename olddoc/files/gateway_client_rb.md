# gateway_client.rb

**Path**: `lib/discord_rda/connection/gateway_client.rb`

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/connection/gateway_client.rb:9`*

#### Classes

- `GatewayClient`

---

## Methods

### run

**public** `instance.run()` - instance method

Run the gateway event loop
@return [void]

*Defined at: `lib/discord_rda/connection/gateway_client.rb:112`*

---

### run

**public** `instance.run()` - instance method

*Defined at: `lib/discord_rda/connection/gateway_client.rb:112`*

---

### disconnect

**public** `instance.disconnect()` - instance method

Disconnect from the Gateway
@return [void]

*Defined at: `lib/discord_rda/connection/gateway_client.rb:118`*

---

### disconnect

**public** `instance.disconnect()` - instance method

*Defined at: `lib/discord_rda/connection/gateway_client.rb:118`*

---

### identify

**public** `instance.identify()` - instance method

Send an identify payload
@return [void]

*Defined at: `lib/discord_rda/connection/gateway_client.rb:128`*

---

### identify

**public** `instance.identify()` - instance method

*Defined at: `lib/discord_rda/connection/gateway_client.rb:128`*

---

### resume

**public** `instance.resume()` - instance method

Send a resume payload
@return [void]

*Defined at: `lib/discord_rda/connection/gateway_client.rb:151`*

---

### resume

**public** `instance.resume()` - instance method

*Defined at: `lib/discord_rda/connection/gateway_client.rb:151`*

---

### update_presence

**public** `instance.update_presence(status, online, activity, nil, afk, false)` - instance method

Update presence
@param status [String] online, idle, dnd, invisible
@param activity [Hash] Activity data
@param afk [Boolean] Whether AFK
@return [void]

*Defined at: `lib/discord_rda/connection/gateway_client.rb:172`*

---

### update_presence

**public** `instance.update_presence(status, online, activity, nil, afk, false)` - instance method

*Defined at: `lib/discord_rda/connection/gateway_client.rb:172`*

---

### request_guild_members

**public** `instance.request_guild_members(guild_id, query, limit, presences, false, user_ids, nil, nonce, nil)` - instance method

Request guild members (chunking)
@param guild_id [String] Guild ID
@param query [String] Query string
@param limit [Integer] Member limit
@param presences [Boolean] Include presences
@param user_ids [Array<String>] Specific user IDs
@param nonce [String] Nonce for response
@return [void]

*Defined at: `lib/discord_rda/connection/gateway_client.rb:194`*

---

### request_guild_members

**public** `instance.request_guild_members(guild_id, query, limit, presences, false, user_ids, nil, nonce, nil)` - instance method

*Defined at: `lib/discord_rda/connection/gateway_client.rb:194`*

---

### fetch_gateway_url

**public** `instance.fetch_gateway_url()` - instance method

*Defined at: `lib/discord_rda/connection/gateway_client.rb:212`*

---

### build_endpoint

**public** `instance.build_endpoint(url)` - instance method

*Defined at: `lib/discord_rda/connection/gateway_client.rb:218`*

---

### handle_messages

**public** `instance.handle_messages()` - instance method

*Defined at: `lib/discord_rda/connection/gateway_client.rb:222`*

---

### process_message

**public** `instance.process_message(message)` - instance method

*Defined at: `lib/discord_rda/connection/gateway_client.rb:231`*

---

### decompress_if_needed

**public** `instance.decompress_if_needed(message)` - instance method

*Defined at: `lib/discord_rda/connection/gateway_client.rb:241`*

---

### handle_payload

**public** `instance.handle_payload(payload)` - instance method

*Defined at: `lib/discord_rda/connection/gateway_client.rb:259`*

---

### handle_dispatch

**public** `instance.handle_dispatch(event_type, data)` - instance method

*Defined at: `lib/discord_rda/connection/gateway_client.rb:284`*

---

### handle_hello

**public** `instance.handle_hello(data)` - instance method

*Defined at: `lib/discord_rda/connection/gateway_client.rb:301`*

---

### handle_heartbeat_ack

**public** `instance.handle_heartbeat_ack()` - instance method

*Defined at: `lib/discord_rda/connection/gateway_client.rb:316`*

---

### handle_reconnect

**public** `instance.handle_reconnect()` - instance method

*Defined at: `lib/discord_rda/connection/gateway_client.rb:321`*

---

### handle_invalid_session

**public** `instance.handle_invalid_session(resumable)` - instance method

*Defined at: `lib/discord_rda/connection/gateway_client.rb:328`*

---

### handle_disconnect

**public** `instance.handle_disconnect()` - instance method

*Defined at: `lib/discord_rda/connection/gateway_client.rb:342`*

---

### start_heartbeat

**public** `instance.start_heartbeat()` - instance method

*Defined at: `lib/discord_rda/connection/gateway_client.rb:354`*

---

### send_heartbeat

**public** `instance.send_heartbeat()` - instance method

*Defined at: `lib/discord_rda/connection/gateway_client.rb:363`*

---

### send_payload

**public** `instance.send_payload(payload)` - instance method

*Defined at: `lib/discord_rda/connection/gateway_client.rb:375`*

---

