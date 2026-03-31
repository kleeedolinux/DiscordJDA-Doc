# user.rb

**Path**: `lib/discord_rda/entity/user.rb`

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/entity/user.rb:6`*

#### Classes

- `User`

---

## Methods

### self

**public** `self.self(get_connections)` - class method

Get user connections (for current user only)
@return [Array<Hash>] Connected accounts

*Defined at: `lib/discord_rda/entity/user.rb:196`*

---

### self

**public** `self.self(get_connections)` - class method

*Defined at: `lib/discord_rda/entity/user.rb:196`*

---

### self

**public** `self.self(get_application_role_connection, application_id)` - class method

Get user's application role connection
@param application_id [String, Snowflake] Application ID
@return [Hash, nil] Role connection metadata

*Defined at: `lib/discord_rda/entity/user.rb:205`*

---

### self

**public** `self.self(get_application_role_connection, application_id)` - class method

*Defined at: `lib/discord_rda/entity/user.rb:205`*

---

### self

**public** `self.self(update_application_role_connection, application_id, platform_name, nil, platform_username, nil, metadata)` - class method

Update user's application role connection
@param application_id [String, Snowflake] Application ID
@param platform_name [String] Platform name
@param platform_username [String] Platform username
@param metadata [Hash] Role connection metadata
@return [Hash] Updated role connection

*Defined at: `lib/discord_rda/entity/user.rb:219`*

---

### self

**public** `self.self(update_application_role_connection, application_id, platform_name, nil, platform_username, nil, metadata)` - class method

*Defined at: `lib/discord_rda/entity/user.rb:219`*

---

