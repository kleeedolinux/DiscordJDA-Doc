---
sidebar_position: 2
---

# Plugin System

DiscordRDA's plugin system allows you to extend bot functionality in a modular way. Plugins can add commands, handle events, and provide reusable features.

## What are Plugins?

Plugins are self-contained modules that:
- Register their own commands
- Handle their own events
- Have lifecycle hooks
- Can be enabled/disabled dynamically

```
┌─────────────────────────────────────────┐
│                 Bot                     │
│  ┌─────────────────────────────────────┐│
│  │           Plugin Registry           ││
│  │  ┌─────────┐ ┌─────────┐ ┌───────┐ ││
│  │  │ Music   │ │ Moderation│ │ Games │ ││
│  │  │ Plugin  │ │ Plugin  │ │ Plugin│ ││
│  │  └─────────┘ └─────────┘ └───────┘ ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

## Creating a Plugin

### Basic Plugin

```ruby
class HelloPlugin < DiscordRDA::Plugin
  def setup(bot)
    @bot = bot
    @greeting_count = 0
  end
  
  def ready(bot)
    puts "HelloPlugin ready!"
    
    # Register commands
    bot.slash('hello', 'Say hello') do |cmd|
      cmd.handler do |interaction|
        @greeting_count += 1
        interaction.respond(
          content: "Hello! (Greeting ##{@greeting_count})"
        )
      end
    end
  end
  
  def shutdown
    puts "HelloPlugin shutting down. Total greetings: #{@greeting_count}"
  end
end

# Register the plugin
bot.register_plugin(HelloPlugin.new)
```

### Plugin with Events

```ruby
class WelcomePlugin < DiscordRDA::Plugin
  def setup(bot)
    @bot = bot
    @welcome_channel = nil
  end
  
  def ready(bot)
    puts "WelcomePlugin ready!"
  end
  
  def register_handlers(bot)
    # Handle member joins
    bot.on(:guild_member_add) do |event|
      member = event.member
      
      # Send welcome message
      if channel = find_welcome_channel(event.guild_id)
        bot.send_message(
          channel,
          "Welcome #{member.user.mention} to the server! 🎉"
        )
      end
    end
    
    # Handle member leaves
    bot.on(:guild_member_remove) do |event|
      puts "#{event.user.username} left"
    end
  end
  
  private
  
  def find_welcome_channel(guild_id)
    # Logic to find welcome channel
    # Could be stored in config
    '123456789'
  end
end
```

## Plugin Lifecycle

```ruby
class LifecycleDemoPlugin < DiscordRDA::Plugin
  # Called when plugin is registered (before bot starts)
  def setup(bot)
    @bot = bot
    puts "1. Setup"
  end
  
  # Called when bot is ready (connected to Discord)
  def ready(bot)
    puts "2. Ready"
    
    # Register commands, start background tasks
  end
  
  # Called when bot is stopping
  def shutdown
    puts "3. Shutdown"
    
    # Cleanup, save state
  end
end
```

## Built-in Plugins

### Analytics Plugin

Track bot usage:

```ruby
# Register analytics plugin
bot.register_plugin(DiscordRDA::AnalyticsPlugin.new)

# Access analytics data
stats = bot.analytics
puts "Commands: #{stats[:commands_executed]}"
puts "Events: #{stats[:events_received]}"
puts "Uptime: #{stats[:uptime]}"
```

### Command Logger Plugin

Log all commands:

```ruby
class CommandLoggerPlugin < DiscordRDA::Plugin
  def setup(bot)
    @bot = bot
  end
  
  def ready(bot)
    bot.on(:interaction_create) do |event|
      interaction = event.interaction
      
      if interaction.command?
        log_command(interaction)
      end
    end
  end
  
  private
  
  def log_command(interaction)
    puts "[#{Time.now}] #{interaction.user.username}: /#{interaction.command_name}"
    
    # Could also log to file/database
    File.open('commands.log', 'a') do |f|
      f.puts "#{Time.now.iso8601} #{interaction.user.id} #{interaction.command_name}"
    end
  end
end
```

## Plugin Communication

### Plugin Registry

```ruby
# Access the registry
registry = bot.plugin_registry

# List plugins
registry.plugins.each do |plugin|
  puts "Plugin: #{plugin.class.name}"
end

# Check if plugin is loaded
registry.has_plugin?(:analytics)

# Get plugin by name
plugin = registry.get('AnalyticsPlugin')
```

### Inter-Plugin Communication

```ruby
class MusicPlugin < DiscordRDA::Plugin
  def setup(bot)
    @bot = bot
    @currently_playing = {}
  end
  
  def currently_playing(guild_id)
    @currently_playing[guild_id]
  end
end

class NowPlayingCommandPlugin < DiscordRDA::Plugin
  def setup(bot)
    @bot = bot
  end
  
  def ready(bot)
    bot.slash('nowplaying', 'Show current song') do |cmd|
      cmd.handler do |interaction|
        # Access other plugin
        music = bot.plugin_registry.get('MusicPlugin')
        
        if song = music.currently_playing(interaction.guild_id)
          interaction.respond(content: "🎵 #{song.title}")
        else
          interaction.respond(content: 'Nothing playing')
        end
      end
    end
  end
end
```

## Plugin Configuration

### Configurable Plugins

```ruby
class ConfigurablePlugin < DiscordRDA::Plugin
  def initialize(config = {})
    @config = {
      prefix: '!',
      enabled: true,
      log_level: :info
    }.merge(config)
  end
  
  def setup(bot)
    @bot = bot
    puts "Prefix: #{@config[:prefix]}"
  end
  
  def ready(bot)
    return unless @config[:enabled]
    
    # Register commands with configured prefix
    # (for message-based commands)
  end
end

# Use with configuration
bot.register_plugin(ConfigurablePlugin.new(
  prefix: '?',
  enabled: true,
  log_level: :debug
))
```

## Dynamic Plugin Management

### Loading Plugins at Runtime

```ruby
# Load a new plugin
plugin = MusicPlugin.new
bot.register_plugin(plugin)

# Unload a plugin
bot.unregister_plugin('MusicPlugin')

# Reload a plugin
bot.unregister_plugin('MusicPlugin')
bot.register_plugin(MusicPlugin.new)
```

### Hot Reloading Plugins

```ruby
# plugins/my_plugin.rb
class MyPlugin < DiscordRDA::Plugin
  def setup(bot)
    puts "Plugin v2 loaded!"
  end
end

# Enable hot reload
bot.enable_hot_reload(watch_dir: 'plugins')

# When plugins/my_plugin.rb changes:
# 1. Old plugin is unregistered
# 2. File is reloaded
# 3. New plugin is registered
```

## Advanced Plugin Patterns

### Plugin with Database

```ruby
class TodoPlugin < DiscordRDA::Plugin
  def setup(bot)
    @bot = bot
    # Connect to database
    @db = SQLite3::Database.new('todos.db')
    create_tables
  end
  
  def ready(bot)
    bot.slash('todo', 'Manage todos') do |cmd|
      cmd.subcommand('add', 'Add a todo') do |sub|
        sub.string('task', required: true)
        sub.handler { |i| add_todo(i) }
      end
      
      cmd.subcommand('list', 'List todos') do |sub|
        sub.handler { |i| list_todos(i) }
      end
      
      cmd.subcommand('done', 'Mark done') do |sub|
        sub.integer('id', required: true)
        sub.handler { |i| complete_todo(i) }
      end
    end
  end
  
  def shutdown
    @db.close
  end
  
  private
  
  def create_tables
    @db.execute <<-SQL
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY,
        user_id TEXT,
        task TEXT,
        completed BOOLEAN DEFAULT 0,
        created_at TIMESTAMP
      );
    SQL
  end
  
  def add_todo(interaction)
    task = interaction.option('task')
    
    @db.execute(
      'INSERT INTO todos (user_id, task, created_at) VALUES (?, ?, ?)',
      [interaction.user.id, task, Time.now.to_i]
    )
    
    interaction.respond(content: '✅ Todo added!')
  end
  
  def list_todos(interaction)
    todos = @db.execute(
      'SELECT id, task, completed FROM todos WHERE user_id = ?',
      interaction.user.id
    )
    
    content = todos.map do |id, task, done|
      status = done == 1 ? '✅' : '⬜'
      "#{status} #{id}. #{task}"
    end.join("\n")
    
    interaction.respond(
      content: content.empty? ? 'No todos!' : content,
      ephemeral: true
    )
  end
  
  def complete_todo(interaction)
    id = interaction.option('id')
    
    @db.execute(
      'UPDATE todos SET completed = 1 WHERE id = ? AND user_id = ?',
      [id, interaction.user.id]
    )
    
    interaction.respond(content: '✅ Marked as done!')
  end
end
```

### Plugin with Background Tasks

```ruby
class ReminderPlugin < DiscordRDA::Plugin
  def setup(bot)
    @bot = bot
    @reminders = []
    @mutex = Mutex.new
  end
  
  def ready(bot)
    # Start background thread
    @reminder_thread = Thread.new { reminder_loop }
    
    bot.slash('remind', 'Set a reminder') do |cmd|
      cmd.string('message', required: true)
      cmd.integer('minutes', required: true, min_value: 1)
      
      cmd.handler do |interaction|
        message = interaction.option('message')
        minutes = interaction.option('minutes')
        
        add_reminder(
          user_id: interaction.user.id,
          channel_id: interaction.channel_id,
          message: message,
          time: Time.now + (minutes * 60)
        )
        
        interaction.respond(
          content: "⏰ Reminder set for #{minutes} minutes!"
        )
      end
    end
  end
  
  def shutdown
    @reminder_thread&.kill
  end
  
  private
  
  def add_reminder(**data)
    @mutex.synchronize do
      @reminders << data
    end
  end
  
  def reminder_loop
    loop do
      sleep 10  # Check every 10 seconds
      
      now = Time.now
      due = []
      
      @mutex.synchronize do
        due, @reminders = @reminders.partition { |r| r[:time] <= now }
      end
      
      due.each do |reminder|
        send_reminder(reminder)
      end
    end
  end
  
  def send_reminder(reminder)
    @bot.send_message(
      reminder[:channel_id],
      "⏰ #{reminder[:user_id]}: #{reminder[:message]}"
    )
  rescue => e
    puts "Failed to send reminder: #{e}"
  end
end
```

## Best Practices

1. **Keep plugins focused** - One concern per plugin
2. **Use lifecycle hooks** - Proper setup and cleanup
3. **Handle errors gracefully** - Don't crash the bot
4. **Document dependencies** - What other plugins are needed
5. **Version your plugins** - Track changes
6. **Test independently** - Plugins should be testable alone

## Plugin Template

```ruby
# plugins/my_plugin.rb
class MyPlugin < DiscordRDA::Plugin
  VERSION = '1.0.0'
  
  def initialize(config = {})
    @config = default_config.merge(config)
  end
  
  def setup(bot)
    @bot = bot
  end
  
  def ready(bot)
    register_commands(bot)
    register_handlers(bot)
  end
  
  def shutdown
    cleanup
  end
  
  private
  
  def default_config
    {
      enabled: true,
      # Add default options
    }
  end
  
  def register_commands(bot)
    # Register slash commands
  end
  
  def register_handlers(bot)
    # Register event handlers
  end
  
  def cleanup
    # Cleanup resources
  end
end
```

## Next Steps

- **[Learn Hot Reload](./hot-reload)** - Dynamic code reloading
- **[Explore Examples](../examples/command-bot)** - Complete plugin examples
- **[Build Slash Commands](../interactions/slash-commands)** - Command structure
