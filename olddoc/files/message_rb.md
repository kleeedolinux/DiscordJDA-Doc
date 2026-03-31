# message.rb

**Path**: `lib/discord_rda/entity/message.rb`

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/entity/message.rb:6`*

#### Methods

**public** `instance.mentioned_users()` - instance method

Get mentioned users
@return [Array<User>] Mentioned users

*Defined at: `lib/discord_rda/entity/message.rb:113`*

**public** `instance.mentioned_roles()` - instance method

Get mentioned roles as snowflakes
@return [Array<Snowflake>] Mentioned role IDs

*Defined at: `lib/discord_rda/entity/message.rb:119`*

**public** `instance.mentioned_channels()` - instance method

Get mentioned channels
@return [Array<Channel>] Mentioned channels

*Defined at: `lib/discord_rda/entity/message.rb:125`*

**public** `instance.attachments()` - instance method

Get attachments
@return [Array<Attachment>] Attachments

*Defined at: `lib/discord_rda/entity/message.rb:131`*

**public** `instance.embeds()` - instance method

Get embeds
@return [Array<Embed>] Embeds

*Defined at: `lib/discord_rda/entity/message.rb:137`*

**public** `instance.reactions()` - instance method

Get reactions
@return [Array<Reaction>] Reactions

*Defined at: `lib/discord_rda/entity/message.rb:143`*

**public** `instance.tts?()` - instance method

Check if message is TTS
@return [Boolean] True if TTS

*Defined at: `lib/discord_rda/entity/message.rb:149`*

**public** `instance.mention_everyone?()` - instance method

Check if message mentions everyone
@return [Boolean] True if mentions everyone

*Defined at: `lib/discord_rda/entity/message.rb:155`*

**public** `instance.pinned?()` - instance method

Check if message is pinned
@return [Boolean] True if pinned

*Defined at: `lib/discord_rda/entity/message.rb:161`*

**public** `instance.edited?()` - instance method

Check if message was edited
@return [Boolean] True if edited

*Defined at: `lib/discord_rda/entity/message.rb:167`*

**public** `instance.edited_at()` - instance method

Get edit timestamp
@return [Time, nil] Edit time

*Defined at: `lib/discord_rda/entity/message.rb:173`*

**public** `instance.reply?()` - instance method

Check if this is a reply to another message
@return [Boolean] True if reply

*Defined at: `lib/discord_rda/entity/message.rb:179`*

**public** `instance.referenced_message()` - instance method

Get the referenced (replied to) message
@return [Message, nil] Referenced message

*Defined at: `lib/discord_rda/entity/message.rb:185`*

**public** `instance.message_reference()` - instance method

Get the message reference data
@return [Hash, nil] Message reference

*Defined at: `lib/discord_rda/entity/message.rb:192`*

**public** `instance.jump_url()` - instance method

Get the jump URL for this message
@return [String] Jump URL

*Defined at: `lib/discord_rda/entity/message.rb:198`*

#### Classes

- `Message`

---

## Methods

### webhook?

**public** `instance.webhook?()` - instance method

Check if message is from a webhook
@return [Boolean] True if webhook message

*Defined at: `lib/discord_rda/entity/message.rb:209`*

---

### webhook?

**public** `instance.webhook?()` - instance method

*Defined at: `lib/discord_rda/entity/message.rb:209`*

---

### has_embeds?

**public** `instance.has_embeds?()` - instance method

Check if message has embeds
@return [Boolean] True if has embeds

*Defined at: `lib/discord_rda/entity/message.rb:215`*

---

### has_embeds?

**public** `instance.has_embeds?()` - instance method

*Defined at: `lib/discord_rda/entity/message.rb:215`*

---

### has_attachments?

**public** `instance.has_attachments?()` - instance method

Check if message has attachments
@return [Boolean] True if has attachments

*Defined at: `lib/discord_rda/entity/message.rb:221`*

---

### has_attachments?

**public** `instance.has_attachments?()` - instance method

*Defined at: `lib/discord_rda/entity/message.rb:221`*

---

### has_reactions?

**public** `instance.has_reactions?()` - instance method

Check if message has reactions
@return [Boolean] True if has reactions

*Defined at: `lib/discord_rda/entity/message.rb:227`*

---

### has_reactions?

**public** `instance.has_reactions?()` - instance method

*Defined at: `lib/discord_rda/entity/message.rb:227`*

---

### reaction_count

**public** `instance.reaction_count()` - instance method

Get total reaction count
@return [Integer] Total reactions

*Defined at: `lib/discord_rda/entity/message.rb:233`*

---

### reaction_count

**public** `instance.reaction_count()` - instance method

*Defined at: `lib/discord_rda/entity/message.rb:233`*

---

### system?

**public** `instance.system?()` - instance method

Check if message is a system message
@return [Boolean] True if system message

*Defined at: `lib/discord_rda/entity/message.rb:239`*

---

### system?

**public** `instance.system?()` - instance method

*Defined at: `lib/discord_rda/entity/message.rb:239`*

---

### deleted?

**public** `instance.deleted?()` - instance method

Check if message was deleted
@return [Boolean] True if deleted (not present in data)

*Defined at: `lib/discord_rda/entity/message.rb:245`*

---

### deleted?

**public** `instance.deleted?()` - instance method

*Defined at: `lib/discord_rda/entity/message.rb:245`*

---

### has_components?

**public** `instance.has_components?()` - instance method

Check if message has components (buttons, select menus)
@return [Boolean] True if has components

*Defined at: `lib/discord_rda/entity/message.rb:251`*

---

### has_components?

**public** `instance.has_components?()` - instance method

*Defined at: `lib/discord_rda/entity/message.rb:251`*

---

### has_poll?

**public** `instance.has_poll?()` - instance method

Check if message has a poll
@return [Boolean] True if has poll

*Defined at: `lib/discord_rda/entity/message.rb:257`*

---

### has_poll?

**public** `instance.has_poll?()` - instance method

*Defined at: `lib/discord_rda/entity/message.rb:257`*

---

### stickers

**public** `instance.stickers()` - instance method

Get sticker items
@return [Array<Sticker>] Sticker items

*Defined at: `lib/discord_rda/entity/message.rb:263`*

---

### stickers

**public** `instance.stickers()` - instance method

*Defined at: `lib/discord_rda/entity/message.rb:263`*

---

### message_flags

**public** `instance.message_flags()` - instance method

Get message flags
@return [MessageFlags] Flags object

*Defined at: `lib/discord_rda/entity/message.rb:269`*

---

### message_flags

**public** `instance.message_flags()` - instance method

*Defined at: `lib/discord_rda/entity/message.rb:269`*

---

### thread

**public** `instance.thread()` - instance method

Get thread associated with this message
@return [Channel, nil] Thread if created from this message

*Defined at: `lib/discord_rda/entity/message.rb:275`*

---

### thread

**public** `instance.thread()` - instance method

*Defined at: `lib/discord_rda/entity/message.rb:275`*

---

### application

**public** `instance.application()` - instance method

Get application
@return [Application, nil] Application

*Defined at: `lib/discord_rda/entity/message.rb:283`*

---

### application

**public** `instance.application()` - instance method

*Defined at: `lib/discord_rda/entity/message.rb:283`*

---

### resolved_data

**public** `instance.resolved_data()` - instance method

Get resolved data for interactions
@return [ResolvedData, nil] Resolved data

*Defined at: `lib/discord_rda/entity/message.rb:291`*

---

### resolved_data

**public** `instance.resolved_data()` - instance method

*Defined at: `lib/discord_rda/entity/message.rb:291`*

---

### position

**public** `instance.position()` - instance method

Get position in thread
@return [Integer, nil] Position

*Defined at: `lib/discord_rda/entity/message.rb:299`*

---

### position

**public** `instance.position()` - instance method

*Defined at: `lib/discord_rda/entity/message.rb:299`*

---

### respond

**public** `instance.respond(content = nil, **options, &block)` - instance method

Respond to this message (send reply)
@param content [String] Message content
@param options [Hash] Additional options (embeds, components, etc.)
@yieldparam builder [MessageBuilder] Optional builder block
@return [Message] The sent message

*Defined at: `lib/discord_rda/entity/message.rb:308`*

---

### respond

**public** `instance.respond(content = nil, **options, &block)` - instance method

*Defined at: `lib/discord_rda/entity/message.rb:308`*

---

### react

**public** `instance.react(emoji)` - instance method

React to this message with an emoji
@param emoji [String, Emoji] Emoji to react with (can be unicode emoji or emoji ID string)
@return [void]

*Defined at: `lib/discord_rda/entity/message.rb:333`*

---

### react

**public** `instance.react(emoji)` - instance method

*Defined at: `lib/discord_rda/entity/message.rb:333`*

---

### delete

**public** `instance.delete(reason, nil)` - instance method

Delete this message
@param reason [String] Audit log reason
@return [void]

*Defined at: `lib/discord_rda/entity/message.rb:345`*

---

### delete

**public** `instance.delete(reason, nil)` - instance method

*Defined at: `lib/discord_rda/entity/message.rb:345`*

---

### pin

**public** `instance.pin(reason, nil)` - instance method

Pin this message
@param reason [String] Audit log reason
@return [void]

*Defined at: `lib/discord_rda/entity/message.rb:357`*

---

### pin

**public** `instance.pin(reason, nil)` - instance method

*Defined at: `lib/discord_rda/entity/message.rb:357`*

---

### unpin

**public** `instance.unpin(reason, nil)` - instance method

Unpin this message
@param reason [String] Audit log reason
@return [void]

*Defined at: `lib/discord_rda/entity/message.rb:369`*

---

### unpin

**public** `instance.unpin(reason, nil)` - instance method

*Defined at: `lib/discord_rda/entity/message.rb:369`*

---

### edit

**public** `instance.edit(content = nil, **options, &block)` - instance method

Edit this message
@param content [String] New content
@param options [Hash] Additional options (embeds, components, etc.)
@yieldparam builder [MessageBuilder] Optional builder block
@return [Message] The edited message

*Defined at: `lib/discord_rda/entity/message.rb:383`*

---

### edit

**public** `instance.edit(content = nil, **options, &block)` - instance method

*Defined at: `lib/discord_rda/entity/message.rb:383`*

---

### created_at

**public** `instance.created_at()` - instance method

Get creation time
@return [Time] Message creation time

*Defined at: `lib/discord_rda/entity/message.rb:401`*

---

### created_at

**public** `instance.created_at()` - instance method

*Defined at: `lib/discord_rda/entity/message.rb:401`*

---

