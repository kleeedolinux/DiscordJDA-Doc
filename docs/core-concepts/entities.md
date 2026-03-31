---
sidebar_position: 3
---

# Entities

Entities are Ruby objects that represent Discord resources like users, messages, channels, and guilds. DiscordRDA provides a rich object model with helper methods for common operations.

## Entity Architecture

All entities inherit from `Entity` and share common functionality:

```
Entity (base class)
├── User
├── Member
├── Guild
├── Channel
├── Message
├── Role
├── Emoji
├── Webhook
└── ... (more)
```

Common entity features:
- **Immutable** - Entities are frozen after creation (thread-safe)
- **ID accessor** - All entities have an `id` property (Snowflake)
- **Timestamp** - Created-at timestamps
- **to_h** - Convert to hash representation

## User

Represents a Discord user (global account).

### Properties

```ruby
user.id              # Snowflake - unique user ID
user.username        # String - username
user.discriminator   # String - 4-digit discriminator
user.global_name     # String - global display name
user.avatar          # String - avatar hash
user.bot?            # Boolean - is this a bot?
user.system?         # Boolean - is this a system user?
```

### Methods

```ruby
# Mention the user
user.mention         # "<@123456789>"

# Avatar URL
user.avatar_url      # Discord CDN URL
user.avatar_url(size: 128)  # Specify size

# Display name (nickname or username)
user.display_name    # Returns global_name or username

# Convert to hash
user.to_h
```

### Example

```ruby
bot.on(:message_create) do |event|
  author = event.author
  
  puts "User: #{author.username}##{author.discriminator}"
  puts "ID: #{author.id}"
  puts "Mention: #{author.mention}"
  puts "Avatar: #{author.avatar_url}"
  
  if author.bot?
    puts "This is a bot message"
  end
end
```

## Member

Represents a guild member (user + guild-specific data).

### Properties

```ruby
member.user              # User object
member.guild_id          # Guild ID
member.nick              # Nickname (or nil)
member.roles             # Array of role IDs
member.joined_at         # Time object
member.premium_since     # Nitro boost time (or nil)
member.deaf?             # Server deafened?
member.mute?             # Server muted?
member.pending?          # Membership screening pending?
member.flags             # Member flags
```

### Methods

```ruby
# Display name (nickname > global name > username)
member.display_name

# Mention
member.mention

# Avatar URL (guild-specific avatar if set)
member.avatar_url

# Check permissions
member.permission?(:manage_messages)
member.permission?(:administrator)
member.permissions  # Permission object

# Role checking
member.has_role?(role_id)
```

### Example

```ruby
bot.on(:guild_member_add) do |event|
  member = event.member
  
  puts "New member: #{member.display_name}"
  puts "Joined at: #{member.joined_at}"
  puts "Roles: #{member.roles.length}"
  
  # Welcome message
  # (Find welcome channel and send message)
end
```

## Guild (Server)

Represents a Discord server.

### Properties

```ruby
guild.id                      # Snowflake
guild.name                    # String
guild.icon                    # Icon hash
guild.splash                  # Splash hash
guild.owner_id                # Owner user ID
guild.region                  # Voice region
guild.afk_channel_id          # AFK channel ID
guild.afk_timeout             # AFK timeout in seconds
guild.verification_level      # 0-4
guild.default_message_notifications  # 0 = all, 1 = mentions
guild.explicit_content_filter # 0-2
guild.roles                   # Array of Role objects
guild.emojis                  # Array of Emoji objects
guild.features                # Array of feature strings
guild.mfa_level               # MFA requirement level
guild.system_channel_id       # System message channel
guild.rules_channel_id        # Rules channel
guild.max_presences           # Max online members
guild.max_members             # Max total members
guild.vanity_url_code         # Vanity invite code
guild.description             # Server description
guild.banner                  # Banner hash
guild.premium_tier            # Boost tier 0-3
guild.premium_subscription_count  # Number of boosts
guild.preferred_locale        # Server language
```

### Methods

```ruby
# Icon URL
guild.icon_url
guild.icon_url(format: :png, size: 128)

# Banner URL
guild.banner_url

# Member count (if available)
guild.member_count

# Check features
guild.feature?(:COMMUNITY)
guild.feature?(:VERIFIED)
guild.feature?(:PARTNERED)

# Convert to hash
guild.to_h
```

### Example

```ruby
bot.on(:guild_create) do |event|
  guild = event.guild
  
  puts "Joined guild: #{guild.name}"
  puts "ID: #{guild.id}"
  puts "Owner: #{guild.owner_id}"
  puts "Members: #{guild.member_count}"
  puts "Features: #{guild.features.join(', ')}"
  
  if guild.feature?(:COMMUNITY)
    puts "This is a community server"
  end
end
```

## Channel

Represents a Discord channel.

### Properties

```ruby
channel.id                 # Snowflake
channel.type               # Integer type
channel.guild_id           # Guild ID (nil if DM)
channel.position           # Position in channel list
channel.permission_overwrites  # Array of overwrites
channel.name               # Channel name
channel.topic              # Channel topic
channel.nsfw?              # NSFW flag
channel.last_message_id    # ID of last message
channel.bitrate            # Voice channel bitrate
channel.user_limit         # Voice channel user limit
channel.rate_limit_per_user  # Slowmode in seconds
channel.parent_id          # Category ID
channel.last_pin_timestamp # Last pinned message time
```

### Channel Types

```ruby
# Type constants (Discord API values)
DiscordRDA::Channel::TYPES = {
  guild_text: 0,
  dm: 1,
  guild_voice: 2,
  group_dm: 3,
  guild_category: 4,
  guild_news: 5,
  guild_store: 6,
  guild_news_thread: 10,
  guild_public_thread: 11,
  guild_private_thread: 12,
  guild_stage_voice: 13,
  guild_directory: 14,
  guild_forum: 15
}
```

### Methods

```ruby
# Type checking
channel.text?          # Text channel?
channel.voice?         # Voice channel?
channel.category?      # Category?
channel.dm?            # DM?
channel.thread?        # Thread?

# Mention
channel.mention        # "<#123456789>"

# Send message (requires bot instance)
bot.send_message(channel.id, "Hello!")

# Convert to hash
channel.to_h
```

### Example

```ruby
bot.on(:channel_create) do |event|
  channel = event.channel
  
  puts "Channel created: #{channel.name}"
  puts "Type: #{channel.type}"
  puts "Mention: #{channel.mention}"
  
  case channel.type
  when 0
    puts "Text channel"
  when 2
    puts "Voice channel"
  when 4
    puts "Category"
  end
end
```

## Message

Represents a Discord message.

### Properties

```ruby
message.id                    # Snowflake
message.channel_id            # Channel ID
message.guild_id              # Guild ID (nil if DM)
message.author                # User object
message.member                # Member object (if in guild)
message.content               # Message text
message.timestamp             # Creation time
message.edited_timestamp      # Edit time (or nil)
message.tts?                  # Text-to-speech?
message.mention_everyone?     # @everyone mentioned?
message.mentions              # Array of mentioned Users
message.mention_roles         # Array of mentioned role IDs
message.mention_channels      # Array of mentioned channels
message.attachments           # Array of Attachment objects
message.embeds                # Array of Embed objects
message.reactions             # Array of reaction data
message.nonce                 # Nonce (for deduplication)
message.pinned?               # Pinned?
message.webhook_id            # Webhook ID (if sent by webhook)
message.type                  # Message type
message.activity              # Message activity (group activities)
message.application           # Application data
message.message_reference     # Reply/reference data
message.flags                 # Message flags
```

### Methods

```ruby
# Reply to message
message.reply(content: "Response")
message.reply(content: "Response", embed: { title: "Embed" })

# Edit message
message.edit(content: "New content")

# Delete message
message.delete

# Add reaction
message.add_reaction("👍")
message.add_reaction("custom:123456")

# Pin/Unpin
message.pin
message.unpin

# Check if authored by bot
message.from_bot?

# Check if mentions user
message.mentions_user?(user_id)

# URL
message.url  # Jump URL

# Convert to hash
message.to_h
```

### Example

```ruby
bot.on(:message_create) do |event|
  message = event.message
  
  # Skip bot messages
  next if message.from_bot?
  
  puts "Message: #{message.content}"
  puts "Author: #{message.author.username}"
  puts "Attachments: #{message.attachments.length}"
  puts "Embeds: #{message.embeds.length}"
  
  # Reply
  if message.content == '!hello'
    message.reply(content: "Hello #{message.author.mention}!")
  end
end
```

## Role

Represents a guild role.

### Properties

```ruby
role.id                    # Snowflake
role.name                  # Role name
role.color                 # Integer color value
role.hoist?                # Display separately?
role.icon                  # Icon hash
role.unicode_emoji         # Unicode emoji
role.position              # Position in hierarchy
role.permissions           # Permission bitfield
role.managed?              # Managed by integration?
role.mentionable?          # Mentionable by everyone?
role.tags                  # Role tags (bot roles, etc.)
role.flags                 # Role flags
```

### Methods

```ruby
# Mention
role.mention              # "<@&123456789>"

# Color helpers
role.color_hex            # "#FF5733"
role.color_rgb            # [255, 87, 51]

# Check permission
role.permission?(:kick_members)
role.permission?(:administrator)
```

## Emoji

Represents a custom or standard emoji.

### Properties

```ruby
emoji.id              # Snowflake (nil for standard)
emoji.name            # Emoji name
emoji.roles           # Roles that can use it
emoji.user            # Creator (if custom)
emoji.require_colons? # Requires colons?
emoji.managed?        # Managed by integration?
emoji.animated?       # Animated emoji?
emoji.available?      # Available (not disabled by boost loss)
```

### Methods

```ruby
# Format for messages
emoji.to_s            # "<:name:id>" or "<a:name:id>" or "name"

# URL (custom emoji only)
emoji.url
```

## Snowflake IDs

Discord uses Snowflake IDs - unique 64-bit integers with embedded timestamps.

```ruby
snowflake = message.id

# Get timestamp from ID
timestamp = DiscordRDA::Snowflake.timestamp(snowflake)
# => Time object

# Get worker/process IDs
worker_id = DiscordRDA::Snowflake.worker_id(snowflake)
process_id = DiscordRDA::Snowflake.process_id(snowflake)

# Generate snowflake from timestamp
id = DiscordRDA::Snowflake.generate(Time.now)
```

## Working with Entities

### Fetching from Cache

```ruby
# Get from bot cache
user = bot.user_cache[user_id]
guild = bot.guild_cache[guild_id]
channel = bot.channel_cache[channel_id]
```

### Fetching from API

```ruby
# Force fetch from API
user = bot.rest.get_user(user_id)
guild = bot.rest.get_guild(guild_id)
```

### Entity Factory

Create entities from raw API data:

```ruby
# Parse raw data
user_data = { id: '123', username: 'Test', discriminator: '0001' }
user = DiscordRDA::EntityFactory.user(user_data)

# Used internally when processing gateway events
```

## Best Practices

1. **Use display_name** for showing user names (handles nicknames)
2. **Check for nil** - Some properties can be nil
3. **Don't modify entities** - They're immutable; create new objects if needed
4. **Use helper methods** - They provide common functionality
5. **Cache lookups** - Use `bot.user`, `bot.guild`, `bot.channel` methods

## Next Steps

- **[Learn about Caching](./caching)** - How entities are cached
- **[Explore Messages](../interactions/message-builder)** - Building rich messages
- **[Build slash commands](../interactions/slash-commands)** - Using entities in commands
