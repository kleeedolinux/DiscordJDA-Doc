---
layout: doc
title: Entities
description: Understanding DiscordRDA entities and the Factory pattern
permalink: /core/entities/
---


## Entity System

DiscordRDA uses immutable entities with a Factory pattern for creation.

## Core Entities

### User

```ruby
user = event.author
user.id          # User ID
user.username    # Username
user.discriminator  # Discriminator (legacy)
user.avatar_url  # Avatar URL
user.bot?        # Is bot account?
```

### Guild

```ruby
guild = event.guild
guild.id          # Guild ID
guild.name        # Guild name
guild.owner_id    # Owner user ID
guild.member_count # Number of members
guild.channels    # List of channels
```

### Message

```ruby
message = event.message
message.id        # Message ID
message.content   # Message content
message.author    # User who sent it
message.channel   # Channel it was sent in
message.timestamp # When it was sent
```

### Channel

```ruby
channel = event.channel
channel.id        # Channel ID
channel.name      # Channel name
channel.type      # Channel type (:text, :voice, etc)
channel.guild     # Parent guild
```

## Entity Factory

Entities are created through the Factory:

```ruby
# Raw data from Discord API
data = {
  'id' => '123456789',
  'username' => 'example',
  'discriminator' => '0001'
}

user = DiscordRDA::EntityFactory.create_user(data)
```

## Immutability

Entities are frozen after creation:

```ruby
user = DiscordRDA::EntityFactory.create_user(data)
user.frozen?  # => true
```

To get updated data, fetch fresh entities:

```ruby
fresh_user = bot.cache.fetch_user(user.id)
```
