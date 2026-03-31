---
sidebar_position: 1
---

# The Bot Class

The `Bot` class is the heart of DiscordRDA. It manages the connection to Discord, handles events, and provides methods for interacting with the Discord API.

## Creating a Bot

### Basic Creation

```ruby
require 'discord_rda'

bot = DiscordRDA::Bot.new(token: ENV['DISCORD_TOKEN'])
```

### With Options

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  application_id: ENV['DISCORD_APP_ID'],
  intents: [:guilds, :guild_messages, :message_content],
  log_level: :info
)
```

## Bot Lifecycle

### Starting the Bot

```ruby
# Blocking call - runs until bot is stopped
bot.run

# Non-blocking (for running alongside other services)
bot.run(async: true)
```

### Stopping the Bot

```ruby
# Graceful shutdown
bot.stop

# Stop with cleanup
bot.stop(cleanup: true)
```

### Checking Status

```ruby
# Get bot status information
status = bot.status
puts status[:connected]  # true/false
puts status[:shard_count]
puts status[:guild_count]
```

## Event Handling

### Registering Event Handlers

```ruby
# Handle all events of a type
bot.on(:message_create) do |event|
  puts "New message: #{event.content}"
end

# One-time handler (auto-removes after first trigger)
bot.once(:ready) do |event|
  puts "Bot is ready!"
end
```

### Available Events

Common events you'll handle:

```ruby
# Bot is ready and connected
bot.on(:ready) do |event|
  puts "Logged in as #{event.user.username}"
end

# New message received
bot.on(:message_create) do |event|
  # Handle message
end

# Message updated
bot.on(:message_update) do |event|
  # Handle edit
end

# Message deleted
bot.on(:message_delete) do |event|
  # Handle deletion
end

# Member joined guild
bot.on(:guild_member_add) do |event|
  # Welcome new member
end

# Reaction added
bot.on(:message_reaction_add) do |event|
  # Handle reaction
end
```

### Waiting for Events

```ruby
# Wait for a specific message (with timeout)
response = bot.wait_for(:message_create, timeout: 30) do |event|
  event.channel_id == target_channel_id && event.content.include?('yes')
end

if response
  puts "Got response: #{response.content}"
else
  puts "Timeout - no response"
end
```

## API Methods

### Messages

```ruby
# Send a message
bot.send_message(channel_id, 'Hello!')

# Send with embed
bot.send_message(channel_id, '', embed: {
  title: 'My Embed',
  description: 'Embed content',
  color: 0x00ff00
})

# Get messages
messages = bot.channel_messages(channel_id, limit: 10)

# Get specific message
message = bot.channel_message(channel_id, message_id)

# Delete messages
bot.bulk_delete_messages(channel_id, [msg_id1, msg_id2])
```

### Guild Management

```ruby
# Get guild
guild = bot.guild(guild_id)

# Get guild members
members = bot.guild_members(guild_id, limit: 100)

# Get specific member
member = bot.guild_member(guild_id, user_id)

# Modify member
bot.modify_guild_member(
  guild_id,
  user_id,
  nick: 'New Nickname',
  roles: [role_id1, role_id2]
)

# Add/remove roles
bot.add_guild_member_role(guild_id, user_id, role_id)
bot.remove_guild_member_role(guild_id, user_id, role_id)
```

### Channels

```ruby
# Get channel
channel = bot.channel(channel_id)

# Get guild channels
channels = bot.guild_channels(guild_id)

# Create channel
new_channel = bot.create_guild_channel(
  guild_id,
  'new-channel',
  type: 0,  # 0 = text, 2 = voice, 4 = category
  parent_id: category_id
)

# Modify channel
bot.modify_channel(channel_id, name: 'renamed-channel')

# Delete channel
bot.delete_channel(channel_id)
```

### Roles

```ruby
# Get guild roles
roles = bot.guild_roles(guild_id)

# Create role
role = bot.create_guild_role(
  guild_id,
  'New Role',
  color: 0xff0000,
  permissions: [:send_messages, :read_message_history]
)

# Modify role
bot.modify_guild_role(guild_id, role_id, color: 0x00ff00)

# Delete role
bot.delete_guild_role(guild_id, role_id)
```

### Bans

```ruby
# Get bans
bans = bot.guild_bans(guild_id)

# Ban user
bot.create_guild_ban(
  guild_id,
  user_id,
  delete_message_days: 1,
  reason: 'Spam'
)

# Unban user
bot.remove_guild_ban(guild_id, user_id)
```

### Reactions

```ruby
# Add reaction
bot.add_reaction(channel_id, message_id, '👍')
bot.add_reaction(channel_id, message_id, 'custom_emoji:123456')

# Remove reactions
bot.remove_reaction(channel_id, message_id, '👍', user_id)
bot.remove_all_reactions(channel_id, message_id)

# Get reactions
users = bot.get_reactions(channel_id, message_id, '👍', limit: 25)
```

### Webhooks

```ruby
# Create webhook
webhook = bot.create_webhook(channel_id, 'My Webhook')

# Execute webhook
bot.execute_webhook(
  webhook_id,
  webhook_token,
  content: 'Webhook message',
  username: 'Custom Name'
)

# Delete webhook
bot.delete_webhook(webhook_id)
```

## Utility Methods

### Bot Information

```ruby
# Get bot user
bot_user = bot.me
puts bot_user.username
puts bot_user.id

# Update presence
bot.update_presence(
  status: :online,  # :online, :idle, :dnd, :invisible
  activity: {
    name: 'with Ruby',
    type: 0  # 0 = playing, 1 = streaming, 2 = listening, 3 = watching
  }
)
```

### Analytics (with plugin)

```ruby
# Register analytics plugin first
bot.register_plugin(DiscordRDA::AnalyticsPlugin.new)

# Get analytics data
data = bot.analytics
puts data[:commands_executed]
puts data[:events_received]
```

## Architecture

The Bot class orchestrates several internal components:

```
┌─────────────────────────────────────────┐
│              Bot                        │
├─────────────────────────────────────────┤
│  - Event handlers                       │
│  - Command registry                     │
│  - Plugin registry                      │
├─────────────────────────────────────────┤
│  GatewayClient  │  RestClient          │
│  (WebSocket)    │  (HTTP API)          │
├─────────────────────────────────────────┤
│  EntityCache    │  RateLimiter         │
│  (Caching)      │  (Rate limiting)     │
└─────────────────────────────────────────┘
```

## Best Practices

1. **Use environment variables** for tokens and sensitive data
2. **Handle errors gracefully** in event handlers
3. **Use appropriate intents** - only request what you need
4. **Enable caching** for better performance
5. **Use slash commands** for modern Discord bots
6. **Register handlers before calling `run`**

## Example: Complete Bot Setup

```ruby
require 'discord_rda'

class MyBot
  def initialize
    @bot = DiscordRDA::Bot.new(
      token: ENV['DISCORD_TOKEN'],
      application_id: ENV['DISCORD_APP_ID'],
      intents: [:guilds, :guild_messages, :message_content],
      cache: :redis,
      redis_config: { host: 'localhost', port: 6379 },
      log_level: :info
    )
    
    setup_handlers
  end
  
  def setup_handlers
    # Ready event
    @bot.on(:ready) do |event|
      puts "✅ Bot ready as #{event.user.username}"
      @bot.update_presence(
        status: :online,
        activity: { name: 'Ruby code', type: 2 }
      )
    end
    
    # Message handler
    @bot.on(:message_create) do |event|
      handle_message(event)
    end
  end
  
  def handle_message(event)
    return if event.author.bot?  # Ignore bot messages
    
    case event.content
    when '!ping'
      event.message.respond(content: 'Pong! 🏓')
    when '!info'
      event.message.respond(content: "I'm running on DiscordRDA!")
    end
  end
  
  def run
    @bot.run
  end
  
  def stop
    @bot.stop
  end
end

# Start the bot
MyBot.new.run
```

## Next Steps

- **[Learn about Events](./events)** - Deep dive into the event system
- **[Explore Entities](./entities)** - Understanding Discord entities
- **[Set up Slash Commands](../interactions/slash-commands)** - Modern command handling
