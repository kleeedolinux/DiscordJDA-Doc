---
sidebar_position: 3
---

# Hot Reload

Hot reload automatically reloads your bot code when files change, without restarting the bot. This dramatically speeds up development.

## How Hot Reload Works

```
File Changed ──► Detect Change ──► Reload Code ──► Apply Updates
     ↑                                                       │
     └───────────────────────────────────────────────────────┘
```

Hot reload:
1. Watches files for changes
2. Reloads changed code
3. Updates running bot
4. Preserves connections and state

## Enabling Hot Reload

### Basic Setup

```ruby
bot = DiscordRDA::Bot.new(token: ENV['DISCORD_TOKEN'])

# Enable hot reload
bot.enable_hot_reload(watch_dir: 'lib')

bot.run
```

### With Options

```ruby
bot.enable_hot_reload(
  watch_dir: 'lib',           # Directory to watch
  extensions: ['.rb'],        # File extensions
  ignore: ['spec/', 'tmp/'],  # Patterns to ignore
  debounce: 1.0,              # Seconds to wait after change
  verbose: true               # Log reloads
)
```

## What Gets Reloaded

### Command Files

```ruby
# lib/commands/ping.rb
bot.slash('ping', 'Check latency') do |cmd|
  cmd.handler do |interaction|
    interaction.respond(content: 'Pong! v2')  # Change this
  end
end
```

When you save, the command is updated immediately.

### Event Handlers

```ruby
# lib/events/message.rb
bot.on(:message_create) do |event|
  # Modify this handler
  if event.content == '!test'
    event.message.respond(content: 'Updated!')
  end
end
```

### Plugins

```ruby
# lib/plugins/my_plugin.rb
class MyPlugin < DiscordRDA::Plugin
  def ready(bot)
    puts "Plugin v3 ready!"  # Change version
  end
end
```

## Project Structure for Hot Reload

Recommended structure:

```
my_bot/
├── bot.rb              # Entry point (don't reload this)
├── lib/
│   ├── commands/       # Command definitions
│   │   ├── ping.rb
│   │   └── info.rb
│   ├── events/         # Event handlers
│   │   ├── ready.rb
│   │   └── message.rb
│   └── plugins/        # Plugin definitions
│       └── my_plugin.rb
└── config/
    └── bot_config.rb
```

### Entry Point (bot.rb)

```ruby
require 'discord_rda'

bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  application_id: ENV['DISCORD_APP_ID'],
  intents: [:guilds, :guild_messages]
)

# Load all commands and handlers
Dir['lib/commands/*.rb'].each { |f| load f }
Dir['lib/events/*.rb'].each { |f| load f }
Dir['lib/plugins/*.rb'].each { |f| load f }

# Enable hot reload
bot.enable_hot_reload(watch_dir: 'lib')

bot.run
```

## Reload Strategies

### Full Reload

Reload entire files (default):

```ruby
bot.enable_hot_reload(
  watch_dir: 'lib',
  strategy: :full  # Reload entire file
)
```

### Selective Reload

Only reload changed methods (experimental):

```ruby
bot.enable_hot_reload(
  watch_dir: 'lib',
  strategy: :selective
)
```

## Handling State

### Preserving State Across Reloads

```ruby
# Use a singleton or global for state
module BotState
  class << self
    attr_accessor :message_count, :user_cache
  end
  
  self.message_count = 0
  self.user_cache = {}
end

# lib/events/message.rb
bot.on(:message_create) do |event|
  BotState.message_count += 1
  puts "Messages: #{BotState.message_count}"
end
```

### State Persistence

```ruby
class StateManager
  STATE_FILE = 'bot_state.json'
  
  def self.load
    if File.exist?(STATE_FILE)
      JSON.parse(File.read(STATE_FILE))
    else
      {}
    end
  end
  
  def self.save(state)
    File.write(STATE_FILE, JSON.dump(state))
  end
end

# Load state on startup
STATE = StateManager.load

# Save before reload
bot.hot_reload_manager.before_reload do
  StateManager.save(STATE)
end
```

## Reload Hooks

### Before Reload

```ruby
bot.hot_reload_manager.before_reload do
  puts "Reloading..."
  
  # Save state
  # Cleanup resources
  # Unregister temporary handlers
end
```

### After Reload

```ruby
bot.hot_reload_manager.after_reload do
  puts "Reloaded!"
  
  # Restore state
  # Re-register handlers
  # Verify bot health
end
```

### On Error

```ruby
bot.hot_reload_manager.on_error do |error|
  puts "Reload failed: #{error}"
  
  # Notify developer
  # Log error
  # Potentially revert
end
```

## Limitations

### What Can't Be Reloaded

1. **Bot configuration** - Token, intents, etc.
2. **Active connections** - WebSocket connections persist
3. **Running threads** - Must manage thread lifecycle
4. **Global constants** - Class/module definitions

### Workarounds

```ruby
# For constants, use methods instead
# ❌ Won't reload
VERSION = '1.0.0'

# ✅ Will reload
def version
  '1.0.0'  # Change this
end

# For class definitions, use composition
# ❌ Won't reload behavior
class MyHandler
  def handle
    # Old behavior
  end
end

# ✅ Will reload
class MyHandler
  def handle
    # Delegate to reloadable module
    reloadable_handle
  end
  
  def reloadable_handle
    # Put actual logic here
  end
end
```

## Development Workflow

### Typical Development Session

```bash
# 1. Start bot
ruby bot.rb
# => [Hot Reload] Watching lib/
# => [Hot Reload] Bot ready

# 2. Edit a file
vim lib/commands/ping.rb
# Change: "Pong!" to "Pong! v2"
# Save file

# 3. See reload
# => [Hot Reload] File changed: lib/commands/ping.rb
# => [Hot Reload] Reloading...
# => [Hot Reload] Reloaded successfully

# 4. Test in Discord
# Type /ping
# See: "Pong! v2"
```

### Multiple Changes

```ruby
bot.enable_hot_reload(
  watch_dir: 'lib',
  debounce: 2.0  # Wait 2 seconds after last change
)
```

With debounce, if you save 3 files quickly, it only reloads once after the last save.

## Best Practices

### 1. Separate Code from Config

```ruby
# ✅ Good - code in lib/
# lib/commands/ping.rb
bot.slash('ping', 'Ping!') { |cmd| ... }

# ❌ Bad - code mixed with config
# bot.rb
bot.slash('ping', 'Ping!') { |cmd| ... }  # Can't reload easily
```

### 2. Use Idempotent Handlers

```ruby
# ✅ Good - can be re-registered
bot.on(:message_create) do |event|
  # Handle message
end

# ❌ Bad - accumulates on reload
counter = 0
bot.on(:message_create) do |event|
  counter += 1  # This resets on reload!
end
```

### 3. Clean Up Resources

```ruby
before_reload do
  # Stop background threads
  @worker_thread&.kill
  
  # Close file handles
  @log_file&.close
  
  # Unsubscribe from external services
  @webhook_client&.stop
end

after_reload do
  # Restart resources
  start_worker_thread
  @log_file = File.open('new.log', 'a')
  @webhook_client = WebhookClient.new
end
```

## Debugging Reloads

### Verbose Mode

```ruby
bot.enable_hot_reload(
  watch_dir: 'lib',
  verbose: true  # Log all reload activity
)
```

Output:
```
[Hot Reload] Watching: lib/
[Hot Reload] File changed: lib/commands/ping.rb
[Hot Reload] Calculating changes...
[Hot Reload] Reloading: lib/commands/ping.rb
[Hot Reload] Success: lib/commands/ping.rb
[Hot Reload] Total reload time: 45ms
```

### Reload History

```ruby
# Get recent reloads
history = bot.hot_reload_manager.history

history.each do |reload|
  puts "#{reload.time}: #{reload.file}"
  puts "  Status: #{reload.status}"
  puts "  Error: #{reload.error}" if reload.error
end
```

## Complete Example

```ruby
require 'discord_rda'

# Load configuration
CONFIG = {
  token: ENV['DISCORD_TOKEN'],
  application_id: ENV['DISCORD_APP_ID'],
  intents: [:guilds, :guild_messages]
}

bot = DiscordRDA::Bot.new(**CONFIG)

# State that persists across reloads
$message_count = 0
$user_commands = {}

# Load all command files
Dir['lib/commands/*.rb'].each { |f| load f }

# Load all event handlers
Dir['lib/events/*.rb'].each { |f| load f }

# Enable hot reload with hooks
bot.enable_hot_reload(
  watch_dir: 'lib',
  extensions: ['.rb'],
  debounce: 1.0,
  verbose: true
)

# Pre-reload hook
bot.hot_reload_manager.before_reload do
  puts "[Reload] Saving state..."
  # State is in global variables, automatically preserved
  # (in production, use proper state management)
end

# Post-reload hook
bot.hot_reload_manager.after_reload do
  puts "[Reload] Restoring state..."
  puts "[Reload] Message count: #{$message_count}"
  puts "[Reload] User commands: #{$user_commands.length}"
end

puts "Starting bot..."
puts "Hot reload enabled - edit files in lib/ to see changes"
bot.run
```

### lib/commands/ping.rb

```ruby
# This file can be edited and reloaded
bot.slash('ping', 'Check bot latency') do |cmd|
  cmd.handler do |interaction|
    $message_count += 1
    
    interaction.respond(
      content: "🏓 Pong! (processed #{$message_count} messages)"
    )
  end
end
```

### lib/events/ready.rb

```ruby
bot.on(:ready) do |event|
  puts "Bot ready as #{event.user.username}"
  puts "Hot reload active - make some changes!"
end
```

## Troubleshooting

### Reload Not Working

```ruby
# Check watch directory exists
puts File.exist?('lib')  # Should be true

# Check file extensions
bot.enable_hot_reload(
  watch_dir: 'lib',
  extensions: ['.rb']  # Must match your files
)

# Check with verbose mode
bot.enable_hot_reload(
  watch_dir: 'lib',
  verbose: true
)
# Look for "File changed" messages
```

### Syntax Errors on Reload

```ruby
# Reload hooks help identify issues
bot.hot_reload_manager.on_error do |error|
  puts "❌ Reload failed!"
  puts error.message
  puts error.backtrace.first(5)
  
  # Optionally notify via Discord
  admin_user = bot.user(ADMIN_ID)
  admin_user.dm("Reload failed: #{error.message}")
end
```

### State Loss

```ruby
# ❌ Local variable - lost on reload
counter = 0

# ✅ Global variable - preserved
counter = 0  # Define at top-level

# ✅ Constant with refresh
def config
  @config ||= load_config  # Lazy load, refreshable
end
```

## Next Steps

- **[Plugin System](./plugins)** - Modular code organization
- **[Examples](../examples/basic-bot)** - Complete working examples
