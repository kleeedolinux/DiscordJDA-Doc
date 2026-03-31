# application_command.rb

**Path**: `lib/discord_rda/interactions/application_command.rb`

## Classes

### CommandBuilder

Builder for creating application commands with DSL

*Defined at: `lib/discord_rda/interactions/application_command.rb:206`*

#### Methods

**public** `instance.initialize(name, description = nil)` - instance method

*Defined at: `lib/discord_rda/interactions/application_command.rb:207`*

**public** `instance.localized_name(locale, name)` - instance method

Set localized name
@param locale [String] Locale code (e.g., 'en-US', 'pt-BR')
@param name [String] Localized name

*Defined at: `lib/discord_rda/interactions/application_command.rb:222`*

**public** `instance.localized_description(locale, description)` - instance method

Set localized description
@param locale [String] Locale code
@param description [String] Localized description

*Defined at: `lib/discord_rda/interactions/application_command.rb:230`*

**public** `instance.string(name, description, required, false, choices, nil, min_length, nil, max_length, nil, autocomplete, false)` - instance method

Add a string option
@param name [String] Option name
@param description [String] Option description
@param required [Boolean] Whether required
@param choices [Array<Hash>] Predefined choices
@param min_length [Integer] Minimum length
@param max_length [Integer] Maximum length
@param autocomplete [Boolean] Enable autocomplete

*Defined at: `lib/discord_rda/interactions/application_command.rb:243`*

**public** `instance.integer(name, description, required, false, choices, nil, min_value, nil, max_value, nil, autocomplete, false)` - instance method

Add an integer option
@param name [String] Option name
@param description [String] Option description
@param required [Boolean] Whether required
@param choices [Array<Hash>] Predefined choices
@param min_value [Integer] Minimum value
@param max_value [Integer] Maximum value

*Defined at: `lib/discord_rda/interactions/application_command.rb:260`*

**public** `instance.boolean(name, description, required, false)` - instance method

Add a boolean option
@param name [String] Option name
@param description [String] Option description
@param required [Boolean] Whether required

*Defined at: `lib/discord_rda/interactions/application_command.rb:274`*

**public** `instance.user(name, description, required, false)` - instance method

Add a user option
@param name [String] Option name
@param description [String] Option description
@param required [Boolean] Whether required

*Defined at: `lib/discord_rda/interactions/application_command.rb:283`*

**public** `instance.channel(name, description, required, false, channel_types, nil)` - instance method

Add a channel option
@param name [String] Option name
@param description [String] Option description
@param required [Boolean] Whether required
@param channel_types [Array<Integer>] Allowed channel types

*Defined at: `lib/discord_rda/interactions/application_command.rb:293`*

**public** `instance.role(name, description, required, false)` - instance method

Add a role option
@param name [String] Option name
@param description [String] Option description
@param required [Boolean] Whether required

*Defined at: `lib/discord_rda/interactions/application_command.rb:304`*

**public** `instance.mentionable(name, description, required, false)` - instance method

Add a mentionable option (user or role)
@param name [String] Option name
@param description [String] Option description
@param required [Boolean] Whether required

*Defined at: `lib/discord_rda/interactions/application_command.rb:313`*

**public** `instance.number(name, description, required, false, choices, nil, min_value, nil, max_value, nil, autocomplete, false)` - instance method

Add a number (float) option
@param name [String] Option name
@param description [String] Option description
@param required [Boolean] Whether required
@param choices [Array<Hash>] Predefined choices
@param min_value [Float] Minimum value
@param max_value [Float] Maximum value

*Defined at: `lib/discord_rda/interactions/application_command.rb:325`*

**public** `instance.attachment(name, description, required, false)` - instance method

Add an attachment option
@param name [String] Option name
@param description [String] Option description
@param required [Boolean] Whether required

*Defined at: `lib/discord_rda/interactions/application_command.rb:339`*

**public** `instance.subcommand(name, description, &block)` - instance method

Add a subcommand
@param name [String] Subcommand name
@param description [String] Subcommand description
@yield [CommandBuilder] Block for building subcommand options

*Defined at: `lib/discord_rda/interactions/application_command.rb:348`*

**public** `instance.group(name, description, &block)` - instance method

Add a subcommand group
@param name [String] Group name
@param description [String] Group description
@yield [CommandBuilder] Block for building subcommands in this group

*Defined at: `lib/discord_rda/interactions/application_command.rb:360`*

**public** `instance.default_permissions(permissions)` - instance method

Set default member permissions
@param permissions [Integer, Array<Symbol>] Permission bits or symbols

*Defined at: `lib/discord_rda/interactions/application_command.rb:370`*

---

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/interactions/application_command.rb:3`*

#### Methods

**public** `instance.delete(bot)` - instance method

Delete this command
@param bot [Bot] Bot instance
@return [void]

*Defined at: `lib/discord_rda/interactions/application_command.rb:176`*

#### Classes

- `ApplicationCommand`

---

## Methods

### permissions

**public** `instance.permissions(bot)` - instance method

Get command permissions for this guild command
@param bot [Bot] Bot instance
@return [Hash] Command permissions

*Defined at: `lib/discord_rda/interactions/application_command.rb:187`*

---

### permissions

**public** `instance.permissions(bot)` - instance method

*Defined at: `lib/discord_rda/interactions/application_command.rb:187`*

---

### edit_permissions

**public** `instance.edit_permissions(bot, permissions)` - instance method

Edit command permissions
@param bot [Bot] Bot instance
@param permissions [Array<Hash>] Permission overwrites
@return [Hash] Updated permissions

*Defined at: `lib/discord_rda/interactions/application_command.rb:197`*

---

### edit_permissions

**public** `instance.edit_permissions(bot, permissions)` - instance method

*Defined at: `lib/discord_rda/interactions/application_command.rb:197`*

---

### dm_allowed

**public** `instance.dm_allowed(allowed = true)` - instance method

Set DM permission
@param allowed [Boolean] Whether command works in DMs

*Defined at: `lib/discord_rda/interactions/application_command.rb:381`*

---

### dm_allowed

**public** `instance.dm_allowed(allowed = true)` - instance method

*Defined at: `lib/discord_rda/interactions/application_command.rb:381`*

---

### nsfw

**public** `instance.nsfw(nsfw = true)` - instance method

Set NSFW flag
@param nsfw [Boolean] Whether command is age-restricted

*Defined at: `lib/discord_rda/interactions/application_command.rb:388`*

---

### nsfw

**public** `instance.nsfw(nsfw = true)` - instance method

*Defined at: `lib/discord_rda/interactions/application_command.rb:388`*

---

### handler

**public** `instance.handler(&block)` - instance method

Define the handler block
@yield [Interaction] Interaction handler

*Defined at: `lib/discord_rda/interactions/application_command.rb:395`*

---

### handler

**public** `instance.handler(&block)` - instance method

*Defined at: `lib/discord_rda/interactions/application_command.rb:395`*

---

### to_h

**public** `instance.to_h()` - instance method

Convert to hash for API
@return [Hash] Command hash

*Defined at: `lib/discord_rda/interactions/application_command.rb:402`*

---

### to_h

**public** `instance.to_h()` - instance method

*Defined at: `lib/discord_rda/interactions/application_command.rb:402`*

---

### build

**public** `instance.build()` - instance method

Build and return ApplicationCommand
@return [ApplicationCommand] Command instance

*Defined at: `lib/discord_rda/interactions/application_command.rb:417`*

---

### build

**public** `instance.build()` - instance method

*Defined at: `lib/discord_rda/interactions/application_command.rb:417`*

---

### build_option

**public** `instance.build_option(type, name, description, required, false)` - instance method

*Defined at: `lib/discord_rda/interactions/application_command.rb:425`*

---

