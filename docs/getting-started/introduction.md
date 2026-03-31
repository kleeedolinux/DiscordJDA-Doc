---
sidebar_position: 1
slug: /
---

# DiscordRDA Documentation

Welcome to **DiscordRDA** - a modern, scalable Ruby library for Discord bot development with full Slash Commands and Component V2 support.

## What is DiscordRDA?

DiscordRDA (Ruby Development API) is a high-performance Ruby library designed for building Discord bots. It provides:

- **⚡ Async Runtime**: Built on Ruby 3.0+ Fiber scheduler for true concurrency
- **🏭 Factory Pattern**: Clean entity creation with `EntityFactory`
- **📡 Auto Sharding**: Automatic and manual sharding with zero-downtime resharding
- **💾 Pluggable Cache**: Memory or Redis backends with pattern-based invalidation
- **🔌 Plugin System**: Extensible architecture for commands and features
- **📊 Rate Limiting**: Advanced Discord API rate limit handling with queue management

## Slash Commands & Interactions

DiscordRDA provides comprehensive support for Discord's modern interaction system:

- **Full Slash Command API**: Create, edit, delete global and guild commands
- **Context Menu Commands**: User and Message context menu support
- **Autocomplete**: Real-time autocomplete with dynamic choices
- **Modals**: Custom modal forms with text inputs
- **Component V2**: Latest Discord components (buttons, selects, containers)

## Enterprise Features

Built for production bots:

- **Zero-Downtime Resharding**: Add shards without stopping the bot
- **Hot Reload**: File system event-based code reloading
- **Session Transfer**: Migrate guilds between shards seamlessly
- **REST Proxy Support**: Horizontal scaling with proxy servers
- **State Preservation**: Maintain sessions across reloads

## Quick Example

```ruby
require 'discord_rda'

bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  intents: [:guilds, :guild_messages, :message_content]
)

bot.on(:message_create) do |event|
  if event.content == '!ping'
    event.message.respond(content: 'Pong!')
  end
end

bot.run
```

## Documentation Structure

This documentation is organized into sections:

- **[Getting Started](./getting-started/installation)** - Installation, setup, and your first bot
- **[Core Concepts](./core-concepts/bot)** - Bot architecture, events, entities, caching
- **[Interactions & Commands](./interactions/slash-commands)** - Slash commands, components, modals
- **[Advanced Topics](./advanced/rate-limiting)** - Sharding, rate limiting, plugins
- **[API Reference](./api/bot)** - Complete class and method documentation

## Requirements

- **Ruby**: >= 3.0 (for Fiber scheduler support)
- **Discord Bot Token**: Get one from the [Discord Developer Portal](https://discord.com/developers/applications)

## Getting Help

- [GitHub Issues](https://github.com/kleeedolinux/discordrda/issues)
- [RubyDoc API Reference](https://rubydoc.info/github/kleeedolinux/discordrda)

---

**License**: MIT  
**Author**: Júlia Klee
