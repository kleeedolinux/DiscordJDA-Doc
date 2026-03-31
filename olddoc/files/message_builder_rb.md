# message_builder.rb

**Path**: `lib/discord_rda/entity/message_builder.rb`

## Classes

### EmbedBuilder

Builder for embed details

*Defined at: `lib/discord_rda/entity/message_builder.rb:113`*

#### Methods

**public** `instance.initialize(base = {})` - instance method

*Defined at: `lib/discord_rda/entity/message_builder.rb:114`*

**public** `instance.title(text)` - instance method

Set embed title

*Defined at: `lib/discord_rda/entity/message_builder.rb:119`*

**public** `instance.description(text)` - instance method

Set embed description

*Defined at: `lib/discord_rda/entity/message_builder.rb:125`*

**public** `instance.color(value)` - instance method

Set embed color

*Defined at: `lib/discord_rda/entity/message_builder.rb:131`*

**public** `instance.url(link)` - instance method

Set embed URL

*Defined at: `lib/discord_rda/entity/message_builder.rb:137`*

**public** `instance.timestamp(time)` - instance method

Set embed timestamp

*Defined at: `lib/discord_rda/entity/message_builder.rb:143`*

**public** `instance.field(name, value, inline, false)` - instance method

Add a field to the embed

*Defined at: `lib/discord_rda/entity/message_builder.rb:149`*

**public** `instance.footer(text, icon_url, nil)` - instance method

Set embed footer

*Defined at: `lib/discord_rda/entity/message_builder.rb:156`*

**public** `instance.image(url)` - instance method

Set embed image

*Defined at: `lib/discord_rda/entity/message_builder.rb:163`*

**public** `instance.thumbnail(url)` - instance method

Set embed thumbnail

*Defined at: `lib/discord_rda/entity/message_builder.rb:169`*

**public** `instance.author(name, url, nil, icon_url, nil)` - instance method

Set embed author

*Defined at: `lib/discord_rda/entity/message_builder.rb:175`*

**public** `instance.to_h()` - instance method

Convert to hash

*Defined at: `lib/discord_rda/entity/message_builder.rb:183`*

---

### ComponentBuilder

Builder for message components (buttons, select menus)

*Defined at: `lib/discord_rda/entity/message_builder.rb:189`*

#### Methods

**public** `instance.initialize(components_array)` - instance method

*Defined at: `lib/discord_rda/entity/message_builder.rb:190`*

**public** `instance.button(style, label, custom_id, nil, url, nil, emoji, nil, disabled, false)` - instance method

Add a button component
@param style [Integer] Button style (1=primary, 2=secondary, 3=success, 4=danger, 5=link)
@param label [String] Button label
@param custom_id [String] Custom ID for button interaction
@param url [String] URL for link buttons
@param emoji [String] Emoji for the button
@param disabled [Boolean] Whether button is disabled
@return [self]

*Defined at: `lib/discord_rda/entity/message_builder.rb:202`*

**public** `instance.primary_button(label, custom_id, emoji, nil, disabled, false)` - instance method

Add a primary button (style 1)
@param label [String] Button label
@param custom_id [String] Custom ID for interaction
@param emoji [String] Optional emoji
@param disabled [Boolean] Whether disabled
@return [self]

*Defined at: `lib/discord_rda/entity/message_builder.rb:223`*

**public** `instance.secondary_button(label, custom_id, emoji, nil, disabled, false)` - instance method

Add a secondary button (style 2)
@param label [String] Button label
@param custom_id [String] Custom ID for interaction
@param emoji [String] Optional emoji
@param disabled [Boolean] Whether disabled
@return [self]

*Defined at: `lib/discord_rda/entity/message_builder.rb:233`*

**public** `instance.success_button(label, custom_id, emoji, nil, disabled, false)` - instance method

Add a success button (style 3)
@param label [String] Button label
@param custom_id [String] Custom ID for interaction
@param emoji [String] Optional emoji
@param disabled [Boolean] Whether disabled
@return [self]

*Defined at: `lib/discord_rda/entity/message_builder.rb:243`*

**public** `instance.danger_button(label, custom_id, emoji, nil, disabled, false)` - instance method

Add a danger button (style 4)
@param label [String] Button label
@param custom_id [String] Custom ID for interaction
@param emoji [String] Optional emoji
@param disabled [Boolean] Whether disabled
@return [self]

*Defined at: `lib/discord_rda/entity/message_builder.rb:253`*

**public** `instance.link_button(label, url, emoji, nil, disabled, false)` - instance method

Add a link button (style 5)
@param label [String] Button label
@param url [String] URL to open
@param emoji [String] Optional emoji
@param disabled [Boolean] Whether disabled
@return [self]

*Defined at: `lib/discord_rda/entity/message_builder.rb:263`*

**public** `instance.select_menu(custom_id, options, placeholder, nil, min_values, max_values, disabled, false)` - instance method

Add a string select menu (type 3)
@param custom_id [String] Custom ID for select interaction
@param options [Array<Hash>] Select options
@param placeholder [String] Placeholder text
@param min_values [Integer] Minimum values to select
@param max_values [Integer] Maximum values to select
@param disabled [Boolean] Whether disabled
@return [self]

*Defined at: `lib/discord_rda/entity/message_builder.rb:275`*

**public** `instance.user_select(custom_id, placeholder, nil, min_values, max_values, disabled, false)` - instance method

Add a user select menu (type 5)
@param custom_id [String] Custom ID for interaction
@param placeholder [String] Placeholder text
@param min_values [Integer] Minimum values
@param max_values [Integer] Maximum values
@param disabled [Boolean] Whether disabled
@return [self]

*Defined at: `lib/discord_rda/entity/message_builder.rb:296`*

**public** `instance.role_select(custom_id, placeholder, nil, min_values, max_values, disabled, false)` - instance method

Add a role select menu (type 6)
@param custom_id [String] Custom ID for interaction
@param placeholder [String] Placeholder text
@param min_values [Integer] Minimum values
@param max_values [Integer] Maximum values
@param disabled [Boolean] Whether disabled
@return [self]

*Defined at: `lib/discord_rda/entity/message_builder.rb:316`*

**public** `instance.mentionable_select(custom_id, placeholder, nil, min_values, max_values, disabled, false)` - instance method

Add a mentionable select menu (type 7)
@param custom_id [String] Custom ID for interaction
@param placeholder [String] Placeholder text
@param min_values [Integer] Minimum values
@param max_values [Integer] Maximum values
@param disabled [Boolean] Whether disabled
@return [self]

*Defined at: `lib/discord_rda/entity/message_builder.rb:336`*

**public** `instance.channel_select(custom_id, placeholder, nil, channel_types, nil, min_values, max_values, disabled, false)` - instance method

Add a channel select menu (type 8)
@param custom_id [String] Custom ID for interaction
@param placeholder [String] Placeholder text
@param channel_types [Array<Integer>] Channel types to show
@param min_values [Integer] Minimum values
@param max_values [Integer] Maximum values
@param disabled [Boolean] Whether disabled
@return [self]

*Defined at: `lib/discord_rda/entity/message_builder.rb:357`*

---

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/entity/message_builder.rb:3`*

#### Methods

**public** `instance.components(type, &block)` - instance method

Add components (buttons, select menus) to the message
@param type [Integer] Component type (1 for action row)
@yield [ComponentBuilder] Block for building components
@return [self]

*Defined at: `lib/discord_rda/entity/message_builder.rb:50`*

#### Classes

- `MessageBuilder`

---

## Methods

### tts

**public** `instance.tts(enabled = true)` - instance method

Set whether this is a TTS message
@param enabled [Boolean] TTS enabled
@return [self]

*Defined at: `lib/discord_rda/entity/message_builder.rb:67`*

---

### tts

**public** `instance.tts(enabled = true)` - instance method

*Defined at: `lib/discord_rda/entity/message_builder.rb:67`*

---

### allowed_mentions

**public** `instance.allowed_mentions(parse, nil, roles, nil, users, nil, replied_user, nil)` - instance method

Set allowed mentions for the message
@param parse [Array<String>] Parse types (roles, users, everyone)
@param roles [Array<String>] Specific role IDs to mention
@param users [Array<String>] Specific user IDs to mention
@param replied_user [Boolean] Whether to mention the replied user
@return [self]

*Defined at: `lib/discord_rda/entity/message_builder.rb:78`*

---

### allowed_mentions

**public** `instance.allowed_mentions(parse, nil, roles, nil, users, nil, replied_user, nil)` - instance method

*Defined at: `lib/discord_rda/entity/message_builder.rb:78`*

---

### attachment

**public** `instance.attachment(filename, description, nil)` - instance method

Add attachments (requires multipart/form-data, not supported in basic builder)
@param filename [String] Attachment filename
@param description [String] Attachment description
@return [self]

*Defined at: `lib/discord_rda/entity/message_builder.rb:91`*

---

### attachment

**public** `instance.attachment(filename, description, nil)` - instance method

*Defined at: `lib/discord_rda/entity/message_builder.rb:91`*

---

### flags

**public** `instance.flags(flags)` - instance method

Set message flags
@param flags [Integer] Message flags
@return [self]

*Defined at: `lib/discord_rda/entity/message_builder.rb:100`*

---

### flags

**public** `instance.flags(flags)` - instance method

*Defined at: `lib/discord_rda/entity/message_builder.rb:100`*

---

### to_h

**public** `instance.to_h()` - instance method

Convert builder to hash payload
@return [Hash] Message payload

*Defined at: `lib/discord_rda/entity/message_builder.rb:107`*

---

### to_h

**public** `instance.to_h()` - instance method

*Defined at: `lib/discord_rda/entity/message_builder.rb:107`*

---

