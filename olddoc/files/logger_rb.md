# logger.rb

**Path**: `lib/discord_rda/core/logger.rb`

## Classes

### ContextualLogger

Logger with predefined context

*Defined at: `lib/discord_rda/core/logger.rb:151`*

#### Methods

**public** `instance.initialize(parent, context)` - instance method

*Defined at: `lib/discord_rda/core/logger.rb:152`*

**public** `instance.debug(message, **context)` - instance method

*Defined at: `lib/discord_rda/core/logger.rb:157`*

**public** `instance.info(message, **context)` - instance method

*Defined at: `lib/discord_rda/core/logger.rb:161`*

**public** `instance.warn(message, **context)` - instance method

*Defined at: `lib/discord_rda/core/logger.rb:165`*

**public** `instance.error(message, error, nil, **context)` - instance method

*Defined at: `lib/discord_rda/core/logger.rb:169`*

**public** `instance.fatal(message, error, nil, **context)` - instance method

*Defined at: `lib/discord_rda/core/logger.rb:173`*

**public** `instance.with_context(**additional_context)` - instance method

*Defined at: `lib/discord_rda/core/logger.rb:177`*

**public** `instance.merge_context(context)` - instance method

*Defined at: `lib/discord_rda/core/logger.rb:183`*

---

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/core/logger.rb:6`*

#### Methods

**public** `instance.build_structured_entry(timestamp, level, message, context)` - instance method

*Defined at: `lib/discord_rda/core/logger.rb:123`*

**public** `instance.build_simple_entry(timestamp, level, message, context)` - instance method

*Defined at: `lib/discord_rda/core/logger.rb:134`*

**public** `instance.format_value(value)` - instance method

*Defined at: `lib/discord_rda/core/logger.rb:142`*

#### Classes

- `Logger`

---

