---
layout: doc
title: Gateway Intents
description: Discord gateway intents reference
permalink: /reference/intents/
---


## What are Intents?

Intents control which events your bot receives from Discord's gateway.

## Intent Categories

### Guild Intents

| Intent | Description | Privileged |
|--------|-------------|------------|
| `:guilds` | Guild create/update/delete, channel updates | No |
| `:guild_members` | Member join/leave/update | Yes |
| `:guild_moderation` | Moderation events | No |
| `:guild_emojis` | Emoji updates | No |
| `:guild_integrations` | Integration updates | No |
| `:guild_webhooks` | Webhook updates | No |
| `:guild_invites` | Invite updates | No |
| `:guild_voice_states` | Voice state updates | No |
| `:guild_presences` | Presence/activity updates | Yes |
| `:guild_messages` | Message events in guilds | No |
| `:guild_message_reactions` | Reaction events in guilds | No |
| `:guild_message_typing` | Typing events in guilds | No |

### Direct Message Intents

| Intent | Description | Privileged |
|--------|-------------|------------|
| `:direct_messages` | DM events | No |
| `:direct_message_reactions` | DM reaction events | No |
| `:direct_message_typing` | DM typing events | No |

### Content Intents

| Intent | Description | Privileged |
|--------|-------------|------------|
| `:message_content` | Access to message content | Yes |

## Enabling Privileged Intents

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Select your application
3. Go to "Bot" section
4. Enable under "Privileged Gateway Intents"

## Common Intent Combinations

### Basic Bot

```ruby
intents: [:guilds, :guild_messages]
```

### Moderation Bot

```ruby
intents: [
  :guilds,
  :guild_members,
  :guild_moderation,
  :guild_messages,
  :message_content
]
```

### Music Bot

```ruby
intents: [
  :guilds,
  :guild_voice_states,
  :guild_messages
]
```

### Full Feature Bot

```ruby
intents: [
  :guilds,
  :guild_members,
  :guild_moderation,
  :guild_emojis,
  :guild_integrations,
  :guild_webhooks,
  :guild_invites,
  :guild_voice_states,
  :guild_presences,
  :guild_messages,
  :guild_message_reactions,
  :guild_message_typing,
  :direct_messages,
  :direct_message_reactions,
  :direct_message_typing,
  :message_content
]
```

<div class="warning-box">
  **Warning**: Privileged intents require verification for bots in 100+ servers. Plan accordingly.
</div>
