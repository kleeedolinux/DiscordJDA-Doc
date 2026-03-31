# base.rb

**Path**: `lib/discord_rda/plugin/base.rb`

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/plugin/base.rb:3`*

#### Methods

**public** `instance.metadata()` - instance method

Plugin metadata
@return [Hash] Metadata

*Defined at: `lib/discord_rda/plugin/base.rb:89`*

**public** `instance.command(name, description, options, &block)` - instance method

Define a command
@param name [String] Command name
@param description [String] Command description
@param options [Array<Hash>] Command options
@yield Command handler block

*Defined at: `lib/discord_rda/plugin/base.rb:109`*

**public** `instance.on(event, &block)` - instance method

Define an event handler
@param event [String, Symbol] Event type
@yield Event handler block

*Defined at: `lib/discord_rda/plugin/base.rb:117`*

**public** `instance.middleware(&block)` - instance method

Define middleware
@yield Middleware block

*Defined at: `lib/discord_rda/plugin/base.rb:124`*

**public** `instance.before_setup(&block)` - instance method

Define a before_setup hook
@yield Block to run before setup

*Defined at: `lib/discord_rda/plugin/base.rb:131`*

**public** `instance.after_setup(&block)` - instance method

Define an after_setup hook
@yield Block to run after setup

*Defined at: `lib/discord_rda/plugin/base.rb:137`*

**public** `instance.commands()` - instance method

Get defined commands
@return [Array<Hash>] Commands

*Defined at: `lib/discord_rda/plugin/base.rb:143`*

**public** `instance.handlers()` - instance method

Get defined handlers
@return [Array<Hash>] Handlers

*Defined at: `lib/discord_rda/plugin/base.rb:149`*

**public** `instance.middlewares()` - instance method

Get defined middlewares
@return [Array<Proc>] Middlewares

*Defined at: `lib/discord_rda/plugin/base.rb:155`*

**public** `instance.before_setup_hook()` - instance method

Get before_setup hook
@return [Proc, nil] Hook

*Defined at: `lib/discord_rda/plugin/base.rb:161`*

**public** `instance.after_setup_hook()` - instance method

Get after_setup hook
@return [Proc, nil] Hook

*Defined at: `lib/discord_rda/plugin/base.rb:167`*

**public** `instance.register_commands(bot)` - instance method

Register commands with the bot
@param bot [Bot] Bot instance
@return [void]

*Defined at: `lib/discord_rda/plugin/base.rb:175`*

#### Classes

- `Plugin`

---

## Methods

### register_handlers

**public** `instance.register_handlers(bot)` - instance method

Register event handlers with the bot
@param bot [Bot] Bot instance
@return [void]

*Defined at: `lib/discord_rda/plugin/base.rb:184`*

---

### register_handlers

**public** `instance.register_handlers(bot)` - instance method

*Defined at: `lib/discord_rda/plugin/base.rb:184`*

---

