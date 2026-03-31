---
sidebar_position: 2
---

# Installation

## Requirements

Before installing DiscordRDA, ensure you have:

- **Ruby 3.0 or higher** - Required for Fiber scheduler support
- **Bundler** - For dependency management
- **A Discord Bot Token** - Create one at the [Discord Developer Portal](https://discord.com/developers/applications)

## Installing via Gemfile

Add DiscordRDA to your application's Gemfile:

```ruby
gem 'discord_rda'
```

Then run:

```bash
bundle install
```

## Installing via Command Line

Alternatively, install it directly:

```bash
gem install discord_rda
```

## Verifying Installation

Verify the installation by running:

```bash
ruby -e "require 'discord_rda'; puts DiscordRDA::VERSION"
```

## Optional Dependencies

### Redis Cache Backend

For production bots using Redis caching:

```ruby
gem 'discord_rda'
gem 'redis'
```

### Development Dependencies

For development and testing:

```ruby
gem 'discord_rda'
gem 'rspec'
gem 'rubocop'
```

## Project Structure

A typical DiscordRDA project structure:

```
my_bot/
├── Gemfile
├── Gemfile.lock
├── config.rb          # Bot configuration
├── bot.rb             # Main entry point
├── commands/          # Command handlers
│   ├── ping.rb
│   └── help.rb
├── events/            # Event handlers
│   ├── ready.rb
│   └── message.rb
└── plugins/           # Custom plugins
    └── my_plugin.rb
```

## Next Steps

Now that you have DiscordRDA installed:

1. **[Create your first bot](./quick-start)** - Build a simple ping/pong bot
2. **[Learn about configuration](./configuration)** - Advanced configuration options
3. **[Explore core concepts](../core-concepts/bot)** - Understand the architecture
