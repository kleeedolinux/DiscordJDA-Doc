# command_system.rb

**Path**: `lib/discord_rda/interactions/command_system.rb`

## Classes

### Command

Represents a registered command

*Defined at: `lib/discord_rda/interactions/command_system.rb:193`*

#### Methods

**public** `instance.initialize(name, description, options, subcommands, subcommand_groups)` - instance method

@return [CommandSystem] Parent command system

*Defined at: `lib/discord_rda/interactions/command_system.rb:224`*

**public** `instance.execute(context)` - instance method

Execute the command
@param context [CommandContext] Command context
@return [Object] Handler result

*Defined at: `lib/discord_rda/interactions/command_system.rb:241`*

---

### Subcommand

Represents a subcommand

*Defined at: `lib/discord_rda/interactions/command_system.rb:326`*

#### Methods

**public** `instance.initialize(name, description, options, permissions, handler, parent)` - instance method

*Defined at: `lib/discord_rda/interactions/command_system.rb:329`*

**public** `instance.execute(context)` - instance method

Execute subcommand
@param context [CommandContext] Command context

*Defined at: `lib/discord_rda/interactions/command_system.rb:340`*

---

### SubcommandGroup

Represents a subcommand group

*Defined at: `lib/discord_rda/interactions/command_system.rb:367`*

#### Methods

**public** `instance.initialize(name, description, subcommands, parent)` - instance method

*Defined at: `lib/discord_rda/interactions/command_system.rb:370`*

---

### CommandContext

Context for command execution

*Defined at: `lib/discord_rda/interactions/command_system.rb:379`*

#### Methods

**public** `instance.initialize(interaction, system)` - instance method

@return [Channel] The channel where the command was invoked

*Defined at: `lib/discord_rda/interactions/command_system.rb:398`*

**public** `instance.options()` - instance method

Get command options
@return [Hash] Option name to value mapping

*Defined at: `lib/discord_rda/interactions/command_system.rb:409`*

**public** `instance.option(name)` - instance method

Get a specific option value
@param name [String] Option name
@return [Object] Option value

*Defined at: `lib/discord_rda/interactions/command_system.rb:416`*

**public** `instance.subcommand()` - instance method

Get subcommand name
@return [String, nil] Subcommand name

*Defined at: `lib/discord_rda/interactions/command_system.rb:422`*

**public** `instance.subcommand_group()` - instance method

Get subcommand group name
@return [String, nil] Group name

*Defined at: `lib/discord_rda/interactions/command_system.rb:432`*

**public** `instance.guild_id()` - instance method

Get guild ID
@return [String, nil] Guild ID

*Defined at: `lib/discord_rda/interactions/command_system.rb:442`*

**public** `instance.channel_id()` - instance method

Get channel ID
@return [String] Channel ID

*Defined at: `lib/discord_rda/interactions/command_system.rb:448`*

**public** `instance.respond(content = nil, **options, &block)` - instance method

Respond to the interaction
@param content [String] Message content
@param options [Hash] Response options

*Defined at: `lib/discord_rda/interactions/command_system.rb:455`*

**public** `instance.defer(ephemeral, false)` - instance method

Defer the response
@param ephemeral [Boolean] Whether to make response ephemeral

*Defined at: `lib/discord_rda/interactions/command_system.rb:461`*

**public** `instance.followup(content = nil, **options, &block)` - instance method

Send a followup message
@param content [String] Message content
@param options [Hash] Message options

*Defined at: `lib/discord_rda/interactions/command_system.rb:468`*

**public** `instance.guild?()` - instance method

Check if this is a guild context
@return [Boolean] True if in guild

*Defined at: `lib/discord_rda/interactions/command_system.rb:474`*

**public** `instance.dm?()` - instance method

Check if this is a DM context
@return [Boolean] True if in DM

*Defined at: `lib/discord_rda/interactions/command_system.rb:480`*

---

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/interactions/command_system.rb:3`*

#### Methods

**public** `instance.cooldown_remaining(command_name, user_id, guild_id, nil)` - instance method

Check if a command is on cooldown
@param command_name [String] Command name
@param user_id [String] User ID
@param guild_id [String] Guild ID (optional)
@return [Float, nil] Seconds remaining on cooldown, or nil if not on cooldown

*Defined at: `lib/discord_rda/interactions/command_system.rb:145`*

**public** `instance.apply_cooldown(command_name, duration, user_id, guild_id, nil, scope, user)` - instance method

Apply cooldown for a command
@param command_name [String] Command name
@param duration [Integer] Cooldown duration in seconds
@param user_id [String] User ID
@param guild_id [String] Guild ID (optional)
@param scope [Symbol] Cooldown scope (:user, :guild, :channel)

*Defined at: `lib/discord_rda/interactions/command_system.rb:160`*

**public** `instance.clear_cooldowns()` - instance method

Clear all cooldowns

*Defined at: `lib/discord_rda/interactions/command_system.rb:166`*

**public** `instance.to_discord_commands()` - instance method

Get all commands as Discord application command JSON
@return [Array<Hash>] Commands as Discord API format

*Defined at: `lib/discord_rda/interactions/command_system.rb:172`*

**public** `instance.cooldown_key(command_name, user_id, guild_id, scope = :user)` - instance method

*Defined at: `lib/discord_rda/interactions/command_system.rb:178`*

#### Classes

- `CommandSystem`

---

## Methods

### check_permissions

**public** `instance.check_permissions(context)` - instance method

Check if user has required permissions
@param context [CommandContext] Command context
@return [Boolean] True if has permissions

*Defined at: `lib/discord_rda/interactions/command_system.rb:291`*

---

### check_permissions

**public** `instance.check_permissions(context)` - instance method

*Defined at: `lib/discord_rda/interactions/command_system.rb:291`*

---

### to_discord_format

**public** `instance.to_discord_format()` - instance method

Convert to Discord API format
@return [Hash] Discord command JSON

*Defined at: `lib/discord_rda/interactions/command_system.rb:300`*

---

### to_discord_format

**public** `instance.to_discord_format()` - instance method

*Defined at: `lib/discord_rda/interactions/command_system.rb:300`*

---

### check_permissions

**public** `instance.check_permissions(context)` - instance method

*Defined at: `lib/discord_rda/interactions/command_system.rb:349`*

---

### to_option_format

**public** `instance.to_option_format()` - instance method

*Defined at: `lib/discord_rda/interactions/command_system.rb:356`*

---

