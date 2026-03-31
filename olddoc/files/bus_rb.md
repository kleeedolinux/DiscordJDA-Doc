# bus.rb

**Path**: `lib/discord_rda/event/bus.rb`

## Classes

### Subscription

Subscription object for managing handler lifecycle

*Defined at: `lib/discord_rda/event/bus.rb:189`*

#### Methods

**public** `instance.initialize(bus, event_type, handler)` - instance method

@return [Boolean] Whether active

*Defined at: `lib/discord_rda/event/bus.rb:202`*

**public** `instance.unsubscribe()` - instance method

Unsubscribe this handler
@return [void]

*Defined at: `lib/discord_rda/event/bus.rb:211`*

**public** `instance.subscribed?()` - instance method

Check if still subscribed
@return [Boolean] True if active

*Defined at: `lib/discord_rda/event/bus.rb:220`*

---

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/event/bus.rb:3`*

#### Methods

**public** `instance.once(event_type, handler = nil, &block)` - instance method

Subscribe to an event once
@param event_type [String, Symbol] Event type
@param handler [Proc, EventHandler] Handler
@yield Block to execute
@return [Subscription] Subscription object

*Defined at: `lib/discord_rda/event/bus.rb:53`*

#### Classes

- `EventBus`

---

## Methods

### publish

**public** `instance.publish(event_type, event)` - instance method

Publish an event to all subscribers
@param event_type [String, Symbol] Event type
@param event [Event] Event object
@return [void]

*Defined at: `lib/discord_rda/event/bus.rb:67`*

---

### publish

**public** `instance.publish(event_type, event)` - instance method

*Defined at: `lib/discord_rda/event/bus.rb:67`*

---

### off

**public** `instance.off(event_type, handler)` - instance method

Unsubscribe a handler
@param event_type [String, Symbol] Event type
@param handler [EventHandler] Handler to remove
@return [void]

*Defined at: `lib/discord_rda/event/bus.rb:84`*

---

### off

**public** `instance.off(event_type, handler)` - instance method

*Defined at: `lib/discord_rda/event/bus.rb:84`*

---

### use

**public** `instance.use(middleware)` - instance method

Add global middleware
@param middleware [Middleware] Middleware to add
@return [void]

*Defined at: `lib/discord_rda/event/bus.rb:97`*

---

### use

**public** `instance.use(middleware)` - instance method

*Defined at: `lib/discord_rda/event/bus.rb:97`*

---

### unuse

**public** `instance.unuse(middleware)` - instance method

Remove global middleware
@param middleware [Middleware] Middleware to remove
@return [void]

*Defined at: `lib/discord_rda/event/bus.rb:104`*

---

### unuse

**public** `instance.unuse(middleware)` - instance method

*Defined at: `lib/discord_rda/event/bus.rb:104`*

---

### event_types

**public** `instance.event_types()` - instance method

Get all registered event types
@return [Array<String>] Event types

*Defined at: `lib/discord_rda/event/bus.rb:110`*

---

### event_types

**public** `instance.event_types()` - instance method

*Defined at: `lib/discord_rda/event/bus.rb:110`*

---

### has_handlers?

**public** `instance.has_handlers?(event_type)` - instance method

Check if event type has handlers
@param event_type [String, Symbol] Event type
@return [Boolean] True if has handlers

*Defined at: `lib/discord_rda/event/bus.rb:117`*

---

### has_handlers?

**public** `instance.has_handlers?(event_type)` - instance method

*Defined at: `lib/discord_rda/event/bus.rb:117`*

---

### wait_for

**public** `instance.wait_for(event_type, timeout, nil, &block)` - instance method

Wait for an event (async)
@param event_type [String, Symbol] Event type to wait for
@param timeout [Float] Timeout in seconds
@yield Block to match event
@return [Event, nil] Event or nil if timeout

*Defined at: `lib/discord_rda/event/bus.rb:127`*

---

### wait_for

**public** `instance.wait_for(event_type, timeout, nil, &block)` - instance method

*Defined at: `lib/discord_rda/event/bus.rb:127`*

---

### normalize_event_type

**public** `instance.normalize_event_type(event_type)` - instance method

*Defined at: `lib/discord_rda/event/bus.rb:149`*

---

### dispatch_with_middleware

**public** `instance.dispatch_with_middleware(handler, event, middleware)` - instance method

*Defined at: `lib/discord_rda/event/bus.rb:153`*

---

### execute_with_chain

**public** `instance.execute_with_chain(chain, handler, event)` - instance method

*Defined at: `lib/discord_rda/event/bus.rb:164`*

---

### execute_handler

**public** `instance.execute_handler(handler, event)` - instance method

*Defined at: `lib/discord_rda/event/bus.rb:180`*

---

