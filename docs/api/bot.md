---
sidebar_position: 1
---

# Bot API Reference

Complete API reference for the `DiscordRDA::Bot` class.

## Class Overview

```ruby
class DiscordRDA::Bot
  # Main bot class for Discord interaction
end
```

## Constructor

### `Bot.new(options = {})`

Creates a new bot instance.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `token` | String | Yes | - | Discord bot token |
| `application_id` | String | No | nil | Application ID for interactions |
| `intents` | Array | No | [:guilds] | Gateway intents |
| `shards` | Array/Symbol | No | :auto | Shard configuration |
| `cache` | Symbol | No | :memory | Cache backend |
| `log_level` | Symbol | No | :info | Logging level |
| `enable_scalable_rest` | Boolean | No | false | Enable scalable REST |

**Example:**

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  application_id: ENV['DISCORD_APP_ID'],
  intents: [:guilds, :guild_messages, :message_content],
  shards: :auto,
  cache: :redis,
  redis_config: { host: 'localhost', port: 6379 }
)
```

## Lifecycle Methods

### `run(async = false)`

Starts the bot and connects to Discord.

```ruby
# Blocking (recommended for simple bots)
bot.run

# Non-blocking
bot.run(async: true)
sleep  # Keep process alive
```

### `stop(cleanup = true)`

Stops the bot gracefully.

```ruby
bot.stop          # Graceful shutdown
bot.stop(cleanup: false)  # Fast shutdown
```

### `status`

Returns bot status information.

```ruby
status = bot.status
# => {
#   connected: true,
#   shard_count: 4,
#   guild_count: 2500,
#   latency: 45,
#   shards: [...]
# }
```

## Event Handling

### `on(event, &block)`

Register an event handler.

```ruby
bot.on(:message_create) do |event|
  puts event.message.content
end
```

**Events:**
- `:ready` - Bot connected
- `:message_create` - New message
- `:message_update` - Message edited
- `:message_delete` - Message deleted
- `:guild_member_add` - Member joined
- `:guild_member_remove` - Member left
- `:interaction_create` - Interaction received

### `once(event, &block)`

Register a one-time event handler.

```ruby
bot.once(:ready) do |event|
  puts "Bot is ready!"
end
```

### `wait_for(event, timeout = nil, &block)`

Wait for a specific event.

```ruby
response = bot.wait_for(:message_create, timeout: 30) do |event|
  event.channel_id == target_channel && event.content == 'yes'
end
```

## Slash Commands

### `slash(name, description, options = {}, &block)`

Register a slash command.

```ruby
bot.slash('hello', 'Say hello') do |cmd|
  cmd.string('name', 'Your name', required: true)
  cmd.handler do |interaction|
    name = interaction.option('name')
    interaction.respond(content: "Hello, #{name}!")
  end
end
```

**Options:**
- `guild_id` - Guild-specific command

### `context_menu(type:, name:, **options, &block)`

Register a context menu command.

```ruby
bot.context_menu(type: :user, name: 'High Five') do |interaction|
  user = interaction.target_user
  interaction.respond(content: "High-fived #{user.mention}!")
end
```

**Types:**
- `:user` - User context menu
- `:message` - Message context menu

### `bulk_register_commands(commands)`

Register multiple commands at once.

```ruby
commands = [
  DiscordRDA::CommandBuilder.new('ping', 'Ping!'),
  DiscordRDA::CommandBuilder.new('info', 'Bot info')
]

bot.bulk_register_commands(commands)
```

### `delete_global_command(command_id)`

Delete a global command.

```ruby
bot.delete_global_command('123456789')
```

### `delete_guild_command(guild_id, command_id)`

Delete a guild command.

```ruby
bot.delete_guild_command('987654321', '123456789')
```

## Message Methods

### `send_message(channel_id, content = nil, **options)`

Send a message to a channel.

```ruby
bot.send_message(channel_id, 'Hello!')

bot.send_message(channel_id, '', embed: { title: 'Embed' })

bot.send_message(channel_id, 'Hello', components: [...])
```

**Options:**
- `embed` - Embed hash
- `embeds` - Array of embeds
- `components` - Component array
- `tts` - Text-to-speech
- `allowed_mentions` - Mention controls

### `channel_messages(channel_id, limit: 50, before: nil, after: nil, around: nil)`

Get messages from a channel.

```ruby
messages = bot.channel_messages(channel_id, limit: 10)
messages.each { |m| puts m.content }
```

### `channel_message(channel_id, message_id)`

Get a specific message.

```ruby
message = bot.channel_message(channel_id, message_id)
```

### `bulk_delete_messages(channel_id, message_ids, reason: nil)`

Delete multiple messages.

```ruby
bot.bulk_delete_messages(channel_id, [id1, id2, id3])
```

## Guild Methods

### `guild(guild_id)`

Get a guild by ID.

```ruby
guild = bot.guild('123456789')
puts guild.name
```

### `guild_members(guild_id, limit: 100, after: nil)`

Get guild members.

```ruby
members = bot.guild_members(guild_id, limit: 100)
```

### `guild_member(guild_id, user_id)`

Get a specific member.

```ruby
member = bot.guild_member(guild_id, user_id)
```

### `modify_guild_member(guild_id, user_id, **options)`

Modify a guild member.

```ruby
bot.modify_guild_member(
  guild_id,
  user_id,
  nick: 'New Nickname',
  roles: [role_id1, role_id2],
  mute: false,
  deaf: false
)
```

### `add_guild_member_role(guild_id, user_id, role_id, reason: nil)`

Add a role to a member.

```ruby
bot.add_guild_member_role(guild_id, user_id, role_id)
```

### `remove_guild_member_role(guild_id, user_id, role_id, reason: nil)`

Remove a role from a member.

```ruby
bot.remove_guild_member_role(guild_id, user_id, role_id)
```

### `remove_guild_member(guild_id, user_id, reason: nil)`

Kick a member from the guild.

```ruby
bot.remove_guild_member(guild_id, user_id, reason: 'Spam')
```

## Channel Methods

### `channel(channel_id)`

Get a channel by ID.

```ruby
channel = bot.channel('123456789')
```

### `guild_channels(guild_id)`

Get all channels in a guild.

```ruby
channels = bot.guild_channels(guild_id)
```

### `create_guild_channel(guild_id, name, type: 0, **options)`

Create a new channel.

```ruby
channel = bot.create_guild_channel(
  guild_id,
  'new-channel',
  type: 0,  # Text channel
  topic: 'Channel topic',
  parent_id: category_id
)
```

### `modify_channel(channel_id, **options)`

Modify a channel.

```ruby
bot.modify_channel(
  channel_id,
  name: 'new-name',
  topic: 'New topic',
  nsfw: false
)
```

### `delete_channel(channel_id, reason: nil)`

Delete a channel.

```ruby
bot.delete_channel(channel_id)
```

## Role Methods

### `guild_roles(guild_id)`

Get all roles in a guild.

```ruby
roles = bot.guild_roles(guild_id)
```

### `create_guild_role(guild_id, name, **options)`

Create a new role.

```ruby
role = bot.create_guild_role(
  guild_id,
  'New Role',
  color: 0xff0000,
  permissions: [:send_messages],
  hoist: true,
  mentionable: true
)
```

### `modify_guild_role(guild_id, role_id, **options)`

Modify a role.

```ruby
bot.modify_guild_role(
  guild_id,
  role_id,
  name: 'Updated Name',
  color: 0x00ff00
)
```

### `delete_guild_role(guild_id, role_id, reason: nil)`

Delete a role.

```ruby
bot.delete_guild_role(guild_id, role_id)
```

## Ban Methods

### `guild_bans(guild_id, limit: 100)`

Get guild bans.

```ruby
bans = bot.guild_bans(guild_id)
```

### `guild_ban(guild_id, user_id)`

Get a specific ban.

```ruby
ban = bot.guild_ban(guild_id, user_id)
```

### `create_guild_ban(guild_id, user_id, delete_message_days: nil, reason: nil)`

Ban a user.

```ruby
bot.create_guild_ban(
  guild_id,
  user_id,
  delete_message_days: 1,
  reason: 'Spam'
)
```

### `remove_guild_ban(guild_id, user_id, reason: nil)`

Unban a user.

```ruby
bot.remove_guild_ban(guild_id, user_id)
```

## Reaction Methods

### `add_reaction(channel_id, message_id, emoji)`

Add a reaction to a message.

```ruby
bot.add_reaction(channel_id, message_id, '👍')
bot.add_reaction(channel_id, message_id, 'custom_emoji:123456')
```

### `remove_reaction(channel_id, message_id, emoji, user_id: '@me')`

Remove a reaction.

```ruby
bot.remove_reaction(channel_id, message_id, '👍')
bot.remove_reaction(channel_id, message_id, '👍', user_id: other_user_id)
```

### `get_reactions(channel_id, message_id, emoji, limit: 25)`

Get users who reacted.

```ruby
users = bot.get_reactions(channel_id, message_id, '👍', limit: 25)
```

### `remove_all_reactions(channel_id, message_id)`

Remove all reactions from a message.

```ruby
bot.remove_all_reactions(channel_id, message_id)
```

## Webhook Methods

### `create_webhook(channel_id, name, avatar: nil)`

Create a webhook.

```ruby
webhook = bot.create_webhook(channel_id, 'My Webhook')
```

### `channel_webhooks(channel_id)`

Get channel webhooks.

```ruby
webhooks = bot.channel_webhooks(channel_id)
```

### `guild_webhooks(guild_id)`

Get guild webhooks.

```ruby
webhooks = bot.guild_webhooks(guild_id)
```

### `execute_webhook(webhook_id, token, content = nil, **options)`

Execute a webhook.

```ruby
bot.execute_webhook(
  webhook_id,
  token,
  content: 'Webhook message',
  username: 'Custom Name',
  avatar_url: 'https://...'
)
```

### `delete_webhook(webhook_id, token: nil)`

Delete a webhook.

```ruby
bot.delete_webhook(webhook_id)
```

## Bot User Methods

### `me`

Get the bot user.

```ruby
bot_user = bot.me
puts bot_user.username
```

### `update_presence(status:, activity: nil)`

Update bot presence.

```ruby
bot.update_presence(
  status: :online,  # :online, :idle, :dnd, :invisible
  activity: {
    name: 'with Ruby',
    type: 0  # 0=playing, 1=streaming, 2=listening, 3=watching
  }
)
```

## Plugin Methods

### `register_plugin(plugin)`

Register a plugin.

```ruby
bot.register_plugin(MyPlugin.new)
```

### `use(middleware)`

Use middleware.

```ruby
bot.use(MyMiddleware.new)
```

## Advanced Methods

### `enable_scalable_rest(proxy: nil)`

Enable scalable REST client.

```ruby
bot.enable_scalable_rest

# With proxy
bot.enable_scalable_rest(proxy: { url: 'http://proxy:8080' })
```

### `enable_hot_reload(watch_dir: 'lib')`

Enable hot reload for development.

```ruby
bot.enable_hot_reload(watch_dir: 'lib')
```

### `reshard_to(shard_count)`

Reshard to a new shard count.

```ruby
bot.reshard_to(8)
```

### `enable_auto_reshard(max_guilds_per_shard: 1000)`

Enable automatic resharding.

```ruby
bot.enable_auto_reshard(max_guilds_per_shard: 1000)
```

### `invalid_bucket_status`

Get invalid request bucket status.

```ruby
status = bot.invalid_bucket_status
puts status[:count]
puts status[:limit]
puts status[:reset_time]
```

### `analytics`

Get analytics data (requires AnalyticsPlugin).

```ruby
stats = bot.analytics
puts stats[:commands_executed]
puts stats[:events_received]
```

## Properties

### `cache`

Access the entity cache.

```ruby
bot.cache.get(:guild, guild_id)
bot.cache.invalidate(:user, user_id)
```

### `rest_client`

Access the REST client.

```ruby
bot.rest_client.get_user(user_id)
```

### `gateway_client`

Access the Gateway client.

```ruby
bot.gateway_client.shard_count
```

### `shard_manager`

Access the shard manager.

```ruby
bot.shard_manager.shards.each { |s| puts s.status }
```

## Complete Example

```ruby
require 'discord_rda'

bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  application_id: ENV['DISCORD_APP_ID'],
  intents: [:guilds, :guild_messages, :message_content],
  shards: :auto,
  cache: :redis,
  redis_config: { host: 'localhost', port: 6379 }
)

# Event handlers
bot.on(:ready) do |event|
  puts "Ready as #{event.user.username}"
  
  bot.update_presence(
    status: :online,
    activity: { name: 'Ruby', type: 0 }
  )
end

bot.on(:message_create) do |event|
  message = event.message
  
  if message.content == '!info'
    guild = bot.guild(message.guild_id)
    
    message.reply(content: <<~INFO)
      Server: #{guild.name}
      Members: #{guild.member_count}
      Created: #{guild.created_at.strftime('%Y-%m-%d')}
    INFO
  end
end

# Slash commands
bot.slash('ping', 'Check latency') do |cmd|
  cmd.handler do |interaction|
    interaction.respond(content: 'Pong!')
  end
end

bot.slash('kick', 'Kick a user') do |cmd|
  cmd.user('user', 'User to kick', required: true)
  cmd.string('reason', 'Reason')
  cmd.default_permissions(:kick_members)
  
  cmd.handler do |interaction|
    user = interaction.option('user')
    reason = interaction.option('reason') || 'No reason'
    
    bot.remove_guild_member(
      interaction.guild_id,
      user.id,
      reason: reason
    )
    
    interaction.respond(content: "Kicked #{user.username}")
  end
end

bot.run
```

## See Also

- [Bot Guide](../core-concepts/bot) - Conceptual overview
- [Examples](../examples/basic-bot) - Working examples
