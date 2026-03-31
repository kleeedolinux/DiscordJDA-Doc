# channel.rb

**Path**: `lib/discord_rda/entity/channel.rb`

## Classes

### MessageIterator

Iterator for paginating through channel messages

*Defined at: `lib/discord_rda/entity/channel.rb:365`*

#### Methods

**public** `instance.initialize(channel, batch_size, direction, backwards)` - instance method

Initialize iterator
@param channel [Channel] Channel to iterate
@param batch_size [Integer] Messages per batch
@param direction [Symbol] :backwards (older first) or :forwards (newer first)

*Defined at: `lib/discord_rda/entity/channel.rb:381`*

**public** `instance.next()` - instance method

Get next message
@return [Message, nil] Next message or nil if exhausted

*Defined at: `lib/discord_rda/entity/channel.rb:392`*

**public** `instance.more?()` - instance method

Check if there are more messages
@return [Boolean] True if more messages available

*Defined at: `lib/discord_rda/entity/channel.rb:400`*

**public** `instance.each()` - instance method

Iterate over all messages
@yield [Message]

*Defined at: `lib/discord_rda/entity/channel.rb:406`*

---

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/entity/channel.rb:3`*

#### Methods

**public** `instance.active?()` - instance method

Check if the channel is considered active (has recent messages)
@return [Boolean] True if active

*Defined at: `lib/discord_rda/entity/channel.rb:255`*

**public** `instance.last_message_age()` - instance method

Get the age of the last message
@return [Float, nil] Seconds since last message

*Defined at: `lib/discord_rda/entity/channel.rb:262`*

**public** `instance.news?()` - instance method

Check if this is a news/announcement channel
@return [Boolean] True if news channel

*Defined at: `lib/discord_rda/entity/channel.rb:269`*

**public** `instance.auto_archive_days()` - instance method

Get the default auto archive duration in days
@return [Integer] Days

*Defined at: `lib/discord_rda/entity/channel.rb:275`*

**public** `instance.fetch_messages(limit, before, nil, after, nil, around, nil)` - instance method

Fetch messages from the channel with pagination support
@param limit [Integer] Number of messages (1-100, default 50)
@param before [String, Snowflake] Get messages before this message ID
@param after [String, Snowflake] Get messages after this message ID
@param around [String, Snowflake] Get messages around this message ID (returns 25 before + 25 after)
@return [Array<Message>] Messages

*Defined at: `lib/discord_rda/entity/channel.rb:285`*

**public** `instance.fetch_all_messages(max, nil, batch_size, direction, backwards)` - instance method

Fetch all messages from the channel with automatic pagination
@param max [Integer] Maximum messages to fetch (nil for all)
@param batch_size [Integer] Messages per request (1-100)
@param direction [Symbol] :backwards (older first) or :forwards (newer first)
@yield [Message] Optional block called for each message
@return [Array<Message>] All fetched messages

*Defined at: `lib/discord_rda/entity/channel.rb:303`*

#### Classes

- `Channel`

---

## Methods

### messages_iterator

**public** `instance.messages_iterator(batch_size, direction, backwards)` - instance method

Create an iterator for fetching messages
@param batch_size [Integer] Messages per request (1-100)
@param direction [Symbol] :backwards (older first) or :forwards (newer first)
@return [MessageIterator] Iterator instance

*Defined at: `lib/discord_rda/entity/channel.rb:338`*

---

### messages_iterator

**public** `instance.messages_iterator(batch_size, direction, backwards)` - instance method

*Defined at: `lib/discord_rda/entity/channel.rb:338`*

---

### search_messages

**public** `instance.search_messages(content, nil, author_id, nil, limit)` - instance method

Search for messages by content (client-side filtering)
Note: Discord API doesn't support server-side message search, this fetches and filters
@param content [String] Content to search for
@param author_id [String] Filter by author ID
@param limit [Integer] Maximum messages to search
@return [Array<Message>] Matching messages

*Defined at: `lib/discord_rda/entity/channel.rb:348`*

---

### search_messages

**public** `instance.search_messages(content, nil, author_id, nil, limit)` - instance method

*Defined at: `lib/discord_rda/entity/channel.rb:348`*

---

### reset

**public** `instance.reset()` - instance method

Reset the iterator
@return [self]

*Defined at: `lib/discord_rda/entity/channel.rb:419`*

---

### reset

**public** `instance.reset()` - instance method

*Defined at: `lib/discord_rda/entity/channel.rb:419`*

---

### fill_buffer

**public** `instance.fill_buffer()` - instance method

*Defined at: `lib/discord_rda/entity/channel.rb:428`*

---

