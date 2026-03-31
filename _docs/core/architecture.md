---
layout: doc
title: Architecture
description: Understanding DiscordRDA's layered architecture
permalink: /core/architecture/
---


DiscordRDA follows a layered architecture designed for scalability and maintainability.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Application Layer                       │
│  (Your bot code, commands, event handlers, plugins)         │
├─────────────────────────────────────────────────────────────┤
│                      Interaction Layer                       │
│  (Slash commands, components, modals, autocomplete)         │
├─────────────────────────────────────────────────────────────┤
│                      Entity Layer                            │
│  (User, Message, Guild, Channel - Factory Pattern)         │
├─────────────────────────────────────────────────────────────┤
│                      Event System                            │
│  (EventBus, subscriptions, middleware chain)               │
├─────────────────────────────────────────────────────────────┤
│                    Connection Layer                          │
│  (Gateway WebSocket, REST API client)                      │
├─────────────────────────────────────────────────────────────┤
│                     Scalability Layer                        │
│  (Rate limiting, sharding, hot reload, caching)            │
├─────────────────────────────────────────────────────────────┤
│                      Core Runtime                            │
│  (Async scheduler, configuration, logging)                 │
└─────────────────────────────────────────────────────────────┘
```

## Layer Descriptions

### Core Runtime
The foundation providing async scheduling, configuration management, and logging infrastructure.

### Scalability Layer
Handles horizontal scaling concerns: rate limiting, automatic sharding, hot code reloading, and caching strategies.

### Connection Layer
Manages WebSocket gateway connections and REST API communication with Discord.

### Event System
Central event bus for pub/sub pattern, event subscriptions, and middleware chains.

### Entity Layer
Domain objects (User, Message, Guild, Channel) created via the Factory pattern for clean instantiation.

### Interaction Layer
Handles Discord's interaction system: slash commands, message components, modals, and autocomplete.

### Application Layer
Your bot code lives here - command implementations, event handlers, and business logic.

## Design Principles

1. **Immutable by Default**: Entities are frozen after creation for thread safety
2. **Async-First**: All I/O operations are non-blocking using Ruby's Fiber scheduler
3. **Type Safety**: Full type coercion with attributes system
4. **Zero-Cost Abstractions**: No unnecessary object allocations
5. **Extensibility**: Plugin system for modular functionality

## Factory Pattern

Entity creation uses the Factory pattern for consistency:

```ruby
# Entities are created through factories
user = DiscordRDA::EntityFactory.create_user(data)
message = DiscordRDA::EntityFactory.create_message(data)
```
