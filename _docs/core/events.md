---
layout: doc
title: Event Handling
description: Working with Discord gateway events
permalink: /core/events/
---


## Event System

DiscordRDA uses a pub/sub event system for handling Discord gateway events.

## Basic Event Handling

```ruby
bot.on(:message_create) do |event|
  puts "Received: #{event.content}"
end
```

## Common Events

| Event | Description |
|-------|-------------|
| `:ready` | Bot successfully connected |
| `:message_create` | New message received |
| `:message_update` | Message edited |
| `:message_delete` | Message deleted |
| `:guild_create` | Bot joined guild |
| `:guild_delete` | Bot left guild |
| `:guild_member_add` | New member joined |
| `:interaction_create` | Slash command or component used |

## Event Middleware

```ruby
bot.middleware do |event, next_handler|
  logger.info("Processing: #{event.type}")
  next_handler.call(event)
end
```

## Async Event Handling

Events are handled asynchronously by default:

```ruby
bot.on(:message_create) do |event|
  # This runs in a separate Fiber
  result = fetch_data_async
  event.message.respond(content: result)
end
```

## Event Filtering

```ruby
bot.on(:message_create, where: { guild_id: '123456789' }) do |event|
  # Only triggers for specific guild
end
```
