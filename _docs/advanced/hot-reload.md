---
layout: doc
title: Hot Reload
description: Development-time code reloading
permalink: /advanced/hot-reload/
---


## Enabling Hot Reload

Reload code without restarting the bot during development.

## Basic Setup

```ruby
bot = DiscordRDA::Bot.new(token: ENV['DISCORD_TOKEN'])
bot.enable_hot_reload(watch_dir: 'lib')
bot.run
```

## Watch Patterns

```ruby
bot.enable_hot_reload(
  watch_dir: 'lib',
  patterns: ['**/*.rb'],
  ignore: ['**/spec/**/*', '**/*.spec.rb']
)
```

## State Preservation

```ruby
bot.enable_hot_reload(
  watch_dir: 'lib',
  preserve_state: true,
  state_file: 'tmp/bot_state.yml'
)
```

## Reload Callbacks

```ruby
class MyPlugin < DiscordRDA::Plugin
  def setup(bot)
    @bot = bot
  end
  
  def before_reload
    # Cleanup before reload
    @cleanup_done = true
  end
  
  def after_reload
    # Re-initialize after reload
    setup(@bot) unless @cleanup_done
  end
end
```

## Manual Reload

```ruby
# Trigger reload programmatically
bot.reload!
```
