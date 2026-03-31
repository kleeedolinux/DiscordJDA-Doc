# support.rb

**Path**: `lib/discord_rda/entity/support.rb`

## Classes

### MemberFlags

Represents member flags


*Defined at: `lib/discord_rda/entity/support.rb:121`*

#### Methods

**public** `instance.initialize(value = 0)` - instance method

Initialize flags
@param value [Integer] Flag value

*Defined at: `lib/discord_rda/entity/support.rb:139`*

**public** `instance.has?(flag)` - instance method

Check if a flag is set
@param flag [Symbol] Flag name
@return [Boolean] True if set

*Defined at: `lib/discord_rda/entity/support.rb:146`*

---

### ResolvedData

Represents resolved data from interactions


*Defined at: `lib/discord_rda/entity/support.rb:160`*

#### Methods

**public** `instance.initialize(data)` - instance method

Initialize resolved data
@param data [Hash] Resolved data

*Defined at: `lib/discord_rda/entity/support.rb:166`*

**public** `instance.users()` - instance method

Get resolved users
@return [Hash<Snowflake, User>] Resolved users

*Defined at: `lib/discord_rda/entity/support.rb:172`*

**public** `instance.members()` - instance method

Get resolved members
@return [Hash<Snowflake, Member>] Resolved members

*Defined at: `lib/discord_rda/entity/support.rb:180`*

**public** `instance.roles()` - instance method

Get resolved roles
@return [Hash<Snowflake, Role>] Resolved roles

*Defined at: `lib/discord_rda/entity/support.rb:188`*

**public** `instance.channels()` - instance method

Get resolved channels
@return [Hash<Snowflake, Channel>] Resolved channels

*Defined at: `lib/discord_rda/entity/support.rb:196`*

**public** `instance.messages()` - instance method

Get resolved messages
@return [Hash<Snowflake, Message>] Resolved messages

*Defined at: `lib/discord_rda/entity/support.rb:204`*

**public** `instance.attachments()` - instance method

Get resolved attachments
@return [Hash<Snowflake, Attachment>] Resolved attachments

*Defined at: `lib/discord_rda/entity/support.rb:212`*

---

### Sticker

**Inherits from**: `Entity`

Represents a sticker


*Defined at: `lib/discord_rda/entity/support.rb:221`*

#### Methods

**public** `instance.standard?()` - instance method

Check if standard sticker
@return [Boolean] True if standard

*Defined at: `lib/discord_rda/entity/support.rb:248`*

**public** `instance.guild?()` - instance method

Check if guild sticker
@return [Boolean] True if guild

*Defined at: `lib/discord_rda/entity/support.rb:254`*

**public** `instance.format()` - instance method

Get format type name
@return [Symbol] Format type

*Defined at: `lib/discord_rda/entity/support.rb:260`*

**public** `instance.animated?()` - instance method

Check if animated
@return [Boolean] True if animated

*Defined at: `lib/discord_rda/entity/support.rb:266`*

**public** `instance.url()` - instance method

Get sticker URL
@return [String] Sticker URL

*Defined at: `lib/discord_rda/entity/support.rb:272`*

---

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/entity/support.rb:3`*

#### Classes

- `RoleTags`
- `MessageFlags`

---

## Methods

### guild_id

**public** `instance.guild_id()` - instance method

Get guild ID
@return [Snowflake, nil] Guild ID

*Defined at: `lib/discord_rda/entity/support.rb:284`*

---

### guild_id

**public** `instance.guild_id()` - instance method

*Defined at: `lib/discord_rda/entity/support.rb:284`*

---

### creator

**public** `instance.creator()` - instance method

Get creator
@return [User, nil] Creator

*Defined at: `lib/discord_rda/entity/support.rb:290`*

---

### creator

**public** `instance.creator()` - instance method

*Defined at: `lib/discord_rda/entity/support.rb:290`*

---

