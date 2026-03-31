---
sidebar_position: 2
---

# Event System

DiscordRDA's event system is the primary way your bot responds to Discord activities. Events are dispatched when things happen in Discord - messages sent, users joining, reactions added, and more.

## How Events Work

Discord uses Gateway WebSocket connections to push real-time events to your bot. DiscordRDA handles the connection and converts raw Discord events into easy-to-use Ruby objects.

```
Discord Gateway ──► GatewayClient ──► EventBus ──► Your Handlers
```

## Registering Event Handlers

### Basic Handler

```ruby
bot.on(:message_create) do |event|
  puts "Message: #{event.content}"
end
```

### One-Time Handler

```ruby
bot.once(:ready) do |event|
  puts "Bot is ready - this only runs once!"
end
```

### With Priority

Handlers execute in order of registration:

```ruby
# This runs first
bot.on(:message_create) do |event|
  puts "First handler"
end

# This runs second
bot.on(:message_create) do |event|
  puts "Second handler"
end
```

## Common Events

### Ready Event

Fires when the bot successfully connects to Discord:

```ruby
bot.on(:ready) do |event|
  puts "Logged in as #{event.user.username}##{event.user.discriminator}"
  puts "Serving #{event.guild_count} guilds"
end
```

### Message Events

```ruby
# New message
bot.on(:message_create) do |event|
  message = event.message
  puts "#{message.author.username}: #{message.content}"
  
  # Message properties
  puts message.id           # Snowflake ID
  puts message.channel_id   # Channel ID
  puts message.guild_id     # Guild ID (nil if DM)
  puts message.timestamp    # Time object
  puts message.content      # Message text
  puts message.embeds       # Array of embeds
  puts message.attachments  # Array of attachments
end

# Message updated
bot.on(:message_update) do |event|
  puts "Message #{event.message.id} was edited"
  puts "New content: #{event.message.content}"
end

# Message deleted
bot.on(:message_delete) do |event|
  puts "Message #{event.id} deleted in channel #{event.channel_id}"
end

# Multiple messages deleted (bulk delete)
bot.on(:message_delete_bulk) do |event|
  puts "#{event.ids.length} messages deleted"
end
```

### Guild Events

```ruby
# Bot joined a new guild
bot.on(:guild_create) do |event|
  guild = event.guild
  puts "Joined guild: #{guild.name} (#{guild.member_count} members)"
end

# Bot left a guild
bot.on(:guild_delete) do |event|
  puts "Left guild: #{event.id}"
  puts "Was unavailable: #{event.unavailable}"  # true if Discord outage
end

# Guild updated
bot.on(:guild_update) do |event|
  puts "Guild #{event.guild.name} was updated"
end
```

### Member Events

```ruby
# Member joined
bot.on(:guild_member_add) do |event|
  member = event.member
  puts "#{member.user.username} joined #{event.guild_id}"
  
  # Welcome message
  # Find a welcome channel and send a greeting
end

# Member left
bot.on(:guild_member_remove) do |event|
  puts "#{event.user.username} left #{event.guild_id}"
end

# Member updated (roles, nickname, etc.)
bot.on(:guild_member_update) do |event|
  puts "Member #{event.user.id} was updated"
  puts "New roles: #{event.member.roles}"
end
```

### Role Events

```ruby
# Role created
bot.on(:guild_role_create) do |event|
  puts "Role created: #{event.role.name}"
end

# Role updated
bot.on(:guild_role_update) do |event|
  puts "Role #{event.role.name} updated"
  puts "New color: #{event.role.color}"
end

# Role deleted
bot.on(:guild_role_delete) do |event|
  puts "Role #{event.role_id} deleted"
end
```

### Channel Events

```ruby
# Channel created
bot.on(:channel_create) do |event|
  channel = event.channel
  puts "Channel created: #{channel.name} (#{channel.type})"
end

# Channel updated
bot.on(:channel_update) do |event|
  puts "Channel #{event.channel.name} was updated"
end

# Channel deleted
bot.on(:channel_delete) do |event|
  puts "Channel #{event.id} was deleted"
end

# Channel pins updated
bot.on(:channel_pins_update) do |event|
  puts "Pins updated in channel #{event.channel_id}"
  puts "Last pin: #{event.last_pin_timestamp}"
end
```

### Reaction Events

```ruby
# Reaction added
bot.on(:message_reaction_add) do |event|
  emoji = event.emoji
  puts "#{event.user_id} reacted with #{emoji.name}"
  
  # Check for specific emoji
  if emoji.name == '🎉'
    puts "Party reaction!"
  end
end

# Reaction removed
bot.on(:message_reaction_remove) do |event|
  puts "Reaction removed: #{event.emoji.name}"
end

# All reactions removed from message
bot.on(:message_reaction_remove_all) do |event|
  puts "All reactions cleared from message #{event.message_id}"
end
```

### Ban Events

```ruby
# User banned
bot.on(:guild_ban_add) do |event|
  puts "#{event.user.username} was banned from #{event.guild_id}"
end

# User unbanned
bot.on(:guild_ban_remove) do |event|
  puts "#{event.user.username} was unbanned from #{event.guild_id}"
end
```

### Thread Events

```ruby
# Thread created
bot.on(:thread_create) do |event|
  thread = event.thread
  puts "Thread created: #{thread.name}"
end

# Thread updated
bot.on(:thread_update) do |event|
  puts "Thread #{event.thread.name} updated"
end

# Thread deleted
bot.on(:thread_delete) do |event|
  puts "Thread #{event.id} deleted"
end
```

### Scheduled Events

```ruby
# Scheduled event created
bot.on(:guild_scheduled_event_create) do |event|
  scheduled_event = event.scheduled_event
  puts "Event created: #{scheduled_event.name}"
  puts "Starts at: #{scheduled_event.scheduled_start_time}"
end

# Scheduled event updated
bot.on(:guild_scheduled_event_update) do |event|
  puts "Event #{event.scheduled_event.name} updated"
end

# Scheduled event deleted
bot.on(:guild_scheduled_event_delete) do |event|
  puts "Event #{event.scheduled_event.name} cancelled"
end
```

### Auto Moderation Events

```ruby
# Auto moderation rule triggered
bot.on(:auto_moderation_action_execution) do |event|
  puts "Auto-mod action: #{event.action.type}"
  puts "On message by #{event.user_id}"
  puts "Rule: #{event.rule_id}"
end
```

## Event Objects

Each event provides different data. Common event objects include:

### MessageCreateEvent

```ruby
bot.on(:message_create) do |event|
  event.message       # Message object
  event.channel_id    # Channel ID
  event.guild_id      # Guild ID (nil if DM)
  event.author        # User object
  event.member        # Member object (if in guild)
end
```

### ReadyEvent

```ruby
bot.on(:ready) do |event|
  event.user          # Bot user object
  event.guilds        # Array of guild objects
  event.shard         # [shard_id, total_shards]
  event.session_id    # Gateway session ID
end
```

## Waiting for Events

Sometimes you need to wait for a specific event:

```ruby
# Wait for a response
response = bot.wait_for(:message_create, timeout: 60) do |event|
  event.channel_id == channel_id && 
  event.author.id == user_id &&
  event.content.downcase == 'yes'
end

if response
  puts "User said yes!"
else
  puts "Timeout - no response"
end
```

Useful for:
- Confirmation dialogs
- Interactive commands
- Games and quizzes
- Timeout handling

## Error Handling

Always handle errors in event handlers:

```ruby
bot.on(:message_create) do |event|
  begin
    # Your handler code
    process_message(event.message)
  rescue DiscordRDA::APIError => e
    puts "API error: #{e.message}"
  rescue => e
    puts "Error: #{e.message}"
    puts e.backtrace.first(5).join("\n")
  end
end
```

## Event Middleware

Apply middleware to all events:

```ruby
# Log all events
bot.use(Class.new(DiscordRDA::Middleware) do
  def call(event)
    puts "[Event] #{event.type}"
    yield  # Continue to handler
  end
end)

# Rate limit per user
bot.use(Class.new(DiscordRDA::Middleware) do
  def initialize
    @limits = {}
  end
  
  def call(event)
    return unless event.respond_to?(:author)
    
    user_id = event.author.id
    return if @limits[user_id] && @limits[user_id] > Time.now
    
    @limits[user_id] = Time.now + 1  # 1 second cooldown
    yield
  end
end)
```

## Best Practices

1. **Filter early** - Check conditions before processing
2. **Handle errors** - Wrap handler code in begin/rescue
3. **Don't block** - Use async operations for long tasks
4. **Use intents** - Only subscribe to events you need
5. **Debounce** - Rate limit rapid events

## Example: Event Logger

```ruby
bot.on(:message_create) do |event|
  next if event.author.bot?
  
  puts "[#{Time.now}] #{event.guild_id || 'DM'}/#{event.channel_id}"
  puts "  #{event.author.username}: #{event.content[0..50]}"
end

bot.on(:guild_member_add) do |event|
  puts "[#{Time.now}] Member joined: #{event.member.user.username}"
end

bot.on(:guild_member_remove) do |event|
  puts "[#{Time.now}] Member left: #{event.user.username}"
end
```

## Next Steps

- **[Learn about Entities](./entities)** - Objects passed in events
- **[Build slash commands](../interactions/slash-commands)** - Modern interactions
- **[Explore caching](./caching)** - Optimize event handling
