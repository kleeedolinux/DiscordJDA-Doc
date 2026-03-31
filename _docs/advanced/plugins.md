---
layout: doc
title: Plugin System
description: Extend DiscordRDA with plugins
permalink: /advanced/plugins/
---


## Creating a Plugin

Plugins extend bot functionality modularly.

## Basic Plugin

```ruby
class MusicPlugin < DiscordRDA::Plugin
  def setup(bot)
    @bot = bot
    @players = {}
  end
  
  def ready(bot)
    bot.logger.info('Music plugin ready')
  end
  
  def register_commands
    @bot.slash('play', 'Play a song') do |cmd|
      cmd.string('query', 'Song name or URL', required: true)
      cmd.handler { |i| handle_play(i) }
    end
    
    @bot.slash('stop', 'Stop playing') do |cmd|
      cmd.handler { |i| handle_stop(i) }
    end
  end
  
  private
  
  def handle_play(interaction)
    query = interaction.option('query')
    # Play logic
    interaction.respond(content: "Playing: #{query}")
  end
  
  def handle_stop(interaction)
    # Stop logic
    interaction.respond(content: 'Stopped playing')
  end
end
```

## Registering Plugins

```ruby
bot = DiscordRDA::Bot.new(token: ENV['DISCORD_TOKEN'])
bot.register_plugin(MusicPlugin.new)
bot.run
```

## Plugin with Config

```ruby
class ModerationPlugin < DiscordRDA::Plugin
  def initialize(config = {})
    @config = {
      mute_role: 'Muted',
      log_channel: nil,
      max_warnings: 3
    }.merge(config)
  end
  
  def setup(bot)
    @bot = bot
    @warnings = {}
  end
end

# Register with config
bot.register_plugin(ModerationPlugin.new(
  mute_role: 'Silenced',
  log_channel: '123456789',
  max_warnings: 5
))
```

## Plugin Hooks

```ruby
class AnalyticsPlugin < DiscordRDA::Plugin
  def setup(bot)
    @bot = bot
    @metrics = {}
  end
  
  def ready(bot)
    start_metrics_collection
  end
  
  def message_received(event)
    increment_counter(:messages)
  end
  
  def command_executed(command, interaction)
    increment_counter("command:#{command}")
  end
  
  def guild_joined(guild)
    increment_counter(:guild_joins)
  end
  
  def guild_left(guild)
    increment_counter(:guild_leaves)
  end
  
  private
  
  def increment_counter(key)
    @metrics[key] = (@metrics[key] || 0) + 1
  end
end
```

## Plugin Dependencies

```ruby
class AdvancedMusicPlugin < DiscordRDA::Plugin
  depends_on :MusicPlugin
  
  def setup(bot)
    @music_plugin = bot.plugin(:music)
  end
  
  def ready(bot)
    # Can use @music_plugin here
  end
end
```
