---
title: API Reference
description: DiscordRDA API reference
---

## Bot Class

### Constructor

```ruby
DiscordRDA::Bot.new(options)
```

#### Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `token` | String | Yes | Discord bot token |
| `application_id` | String | No | Application ID for slash commands |
| `intents` | Array | No | Gateway intents |
| `shards` | Symbol/Array | No | Sharding configuration |
| `cache` | Symbol | No | Cache backend |
| `log_level` | Symbol | No | Logging level |

### Methods

#### Event Handling

```ruby
bot.on(event_type, filters = {}) { |event| ... }
bot.once(event_type) { |event| ... }
bot.off(event_type, handler)
```

#### Commands

```ruby
bot.slash(name, description, options = {}) { |command| ... }
bot.context_menu(type:, name:, options = {}) { |interaction| ... }
```

#### Lifecycle

```ruby
bot.run              # Start bot (blocking)
bot.run_async        # Start bot (non-blocking)
bot.stop             # Stop bot
bot.wait             # Wait for async run
bot.reload!          # Hot reload
```

## Interaction Class

### Response Methods

```ruby
interaction.respond(content:, ephemeral: false, components: nil)
interaction.defer(ephemeral: false)
interaction.edit_original(content:)
interaction.send_followup(content:, ephemeral: false)
interaction.modal(custom_id:, title:) { |modal| ... }
interaction.respond_autocomplete(choices)
```

### Properties

```ruby
interaction.id
interaction.type
interaction.user
interaction.guild
interaction.channel
interaction.command_name
interaction.custom_id
interaction.options
interaction.focused_option
```

## Entity Classes

### User

```ruby
user.id
user.username
user.discriminator
user.avatar_url
user.bot?
user.mention
user.created_at
```

### Guild

```ruby
guild.id
guild.name
guild.owner_id
guild.member_count
guild.channels
guild.roles
guild.members
```

### Message

```ruby
message.id
message.content
message.author
message.channel
message.timestamp
message.edited_timestamp
message.embeds
message.attachments
message.respond(content:)
message.edit(content:)
message.delete
```
