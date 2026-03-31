# interaction.rb

**Path**: `lib/discord_rda/interactions/interaction.rb`

## Classes

### ModalBuilder

Builder for creating modals

*Defined at: `lib/discord_rda/interactions/interaction.rb:497`*

#### Methods

**public** `instance.initialize(data = {})` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:498`*

**public** `instance.short(custom_id, label, placeholder, nil, min_length, nil, max_length, nil, required, true, value, nil)` - instance method

Add a short text input
@param custom_id [String] Input custom ID
@param label [String] Input label
@param placeholder [String] Placeholder text
@param min_length [Integer] Minimum length
@param max_length [Integer] Maximum length
@param required [Boolean] Whether required
@param value [String] Default value

*Defined at: `lib/discord_rda/interactions/interaction.rb:511`*

**public** `instance.paragraph(custom_id, label, placeholder, nil, min_length, nil, max_length, nil, required, true, value, nil)` - instance method

Add a paragraph text input
@param custom_id [String] Input custom ID
@param label [String] Input label
@param placeholder [String] Placeholder text
@param min_length [Integer] Minimum length
@param max_length [Integer] Maximum length
@param required [Boolean] Whether required
@param value [String] Default value

*Defined at: `lib/discord_rda/interactions/interaction.rb:523`*

**public** `instance.to_h()` - instance method

Convert to hash for API
@return [Hash] Modal data

*Defined at: `lib/discord_rda/interactions/interaction.rb:529`*

**public** `instance.add_text_input(style, custom_id, label, placeholder, nil, min_length, nil, max_length, nil, required, true, value, nil)` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:536`*

---

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/interactions/interaction.rb:3`*

#### Methods

**public** `instance.member()` - instance method

Get the guild member who triggered the interaction
@return [Member, nil] Member entity (nil if not in guild)

*Defined at: `lib/discord_rda/interactions/interaction.rb:127`*

**public** `instance.command_data()` - instance method

Get the command data for application command interactions
@return [Hash, nil] Command data

*Defined at: `lib/discord_rda/interactions/interaction.rb:134`*

**public** `instance.command_name()` - instance method

Get the command name
@return [String, nil] Command name

*Defined at: `lib/discord_rda/interactions/interaction.rb:141`*

**public** `instance.options()` - instance method

Get command options as a hash
@return [Hash] Option name to value mapping

*Defined at: `lib/discord_rda/interactions/interaction.rb:147`*

#### Classes

- `Interaction`

---

## Methods

### option

**public** `instance.option(name)` - instance method

Get a specific option value
@param name [String] Option name
@return [Object, nil] Option value

*Defined at: `lib/discord_rda/interactions/interaction.rb:160`*

---

### option

**public** `instance.option(name)` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:160`*

---

### focused_option

**public** `instance.focused_option()` - instance method

Get focused option for autocomplete
@return [Hash, nil] Focused option data

*Defined at: `lib/discord_rda/interactions/interaction.rb:166`*

---

### focused_option

**public** `instance.focused_option()` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:166`*

---

### component_data

**public** `instance.component_data()` - instance method

Get component data for message component interactions
@return [Hash, nil] Component data

*Defined at: `lib/discord_rda/interactions/interaction.rb:173`*

---

### component_data

**public** `instance.component_data()` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:173`*

---

### custom_id

**public** `instance.custom_id()` - instance method

Get custom ID from component
@return [String, nil] Custom ID

*Defined at: `lib/discord_rda/interactions/interaction.rb:180`*

---

### custom_id

**public** `instance.custom_id()` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:180`*

---

### component_type

**public** `instance.component_type()` - instance method

Get component type
@return [Integer, nil] Component type

*Defined at: `lib/discord_rda/interactions/interaction.rb:186`*

---

### component_type

**public** `instance.component_type()` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:186`*

---

### selected_values

**public** `instance.selected_values()` - instance method

Get selected values from select menu
@return [Array<String>] Selected values

*Defined at: `lib/discord_rda/interactions/interaction.rb:192`*

---

### selected_values

**public** `instance.selected_values()` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:192`*

---

### modal_data

**public** `instance.modal_data()` - instance method

Get modal submit data
@return [Hash, nil] Modal data with components

*Defined at: `lib/discord_rda/interactions/interaction.rb:198`*

---

### modal_data

**public** `instance.modal_data()` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:198`*

---

### modal_values

**public** `instance.modal_values()` - instance method

Get values from modal submission
@return [Hash] Component custom_id to value mapping

*Defined at: `lib/discord_rda/interactions/interaction.rb:205`*

---

### modal_values

**public** `instance.modal_values()` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:205`*

---

### modal_value

**public** `instance.modal_value(id)` - instance method

Get a modal value by custom_id
@param id [String] Component custom_id
@return [String, nil] Component value

*Defined at: `lib/discord_rda/interactions/interaction.rb:222`*

---

### modal_value

**public** `instance.modal_value(id)` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:222`*

---

### original_message

**public** `instance.original_message()` - instance method

Get the original message that triggered this component interaction
@return [Message, nil] Original message

*Defined at: `lib/discord_rda/interactions/interaction.rb:228`*

---

### original_message

**public** `instance.original_message()` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:228`*

---

### respond

**public** `instance.respond(content = nil, **options, &block)` - instance method

Respond to the interaction with a message
@param content [String] Message content
@param options [Hash] Response options (embeds, components, etc.)
@yield [MessageBuilder] Optional builder block
@return [void]

*Defined at: `lib/discord_rda/interactions/interaction.rb:238`*

---

### respond

**public** `instance.respond(content = nil, **options, &block)` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:238`*

---

### defer

**public** `instance.defer(ephemeral, false)` - instance method

Defer the response (show "thinking..." state)
@param ephemeral [Boolean] Whether the eventual response should be ephemeral
@return [void]

*Defined at: `lib/discord_rda/interactions/interaction.rb:260`*

---

### defer

**public** `instance.defer(ephemeral, false)` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:260`*

---

### defer_update

**public** `instance.defer_update()` - instance method

Defer updating the original message (for components)
@return [void]

*Defined at: `lib/discord_rda/interactions/interaction.rb:274`*

---

### defer_update

**public** `instance.defer_update()` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:274`*

---

### update_message

**public** `instance.update_message(content = nil, **options, &block)` - instance method

Update the original message (for components)
@param content [String] New content
@param options [Hash] Update options
@yield [MessageBuilder] Optional builder block
@return [void]

*Defined at: `lib/discord_rda/interactions/interaction.rb:290`*

---

### update_message

**public** `instance.update_message(content = nil, **options, &block)` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:290`*

---

### autocomplete

**public** `instance.autocomplete(choices)` - instance method

Respond with autocomplete choices
@param choices [Array<Hash>] Choice objects with name and value
@return [void]

*Defined at: `lib/discord_rda/interactions/interaction.rb:313`*

---

### autocomplete

**public** `instance.autocomplete(choices)` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:313`*

---

### modal

**public** `instance.modal(custom_id, title, components, nil, &block)` - instance method

Respond with a modal
@param custom_id [String] Modal custom ID
@param title [String] Modal title
@param components [Array<Hash>] Modal components (text inputs)
@yield [ModalBuilder] Optional builder block
@return [void]

*Defined at: `lib/discord_rda/interactions/interaction.rb:331`*

---

### modal

**public** `instance.modal(custom_id, title, components, nil, &block)` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:331`*

---

### edit_original

**public** `instance.edit_original(content = nil, **options, &block)` - instance method

Edit the original interaction response
@param content [String] New content
@param options [Hash] Edit options
@yield [MessageBuilder] Optional builder block
@return [Message] Updated message

*Defined at: `lib/discord_rda/interactions/interaction.rb:359`*

---

### edit_original

**public** `instance.edit_original(content = nil, **options, &block)` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:359`*

---

### delete_original

**public** `instance.delete_original()` - instance method

Delete the original interaction response
@return [void]

*Defined at: `lib/discord_rda/interactions/interaction.rb:376`*

---

### delete_original

**public** `instance.delete_original()` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:376`*

---

### followup

**public** `instance.followup(content = nil, **options, &block)` - instance method

Create a followup message
@param content [String] Message content
@param options [Hash] Message options
@yield [MessageBuilder] Optional builder block
@return [Message] Created message

*Defined at: `lib/discord_rda/interactions/interaction.rb:387`*

---

### followup

**public** `instance.followup(content = nil, **options, &block)` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:387`*

---

### get_followup

**public** `instance.get_followup(message_id)` - instance method

Get a followup message
@param message_id [String] Followup message ID
@return [Message] Followup message

*Defined at: `lib/discord_rda/interactions/interaction.rb:405`*

---

### get_followup

**public** `instance.get_followup(message_id)` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:405`*

---

### edit_followup

**public** `instance.edit_followup(message_id, content = nil, **options, &block)` - instance method

Edit a followup message
@param message_id [String] Followup message ID
@param content [String] New content
@param options [Hash] Edit options
@yield [MessageBuilder] Optional builder block
@return [Message] Updated message

*Defined at: `lib/discord_rda/interactions/interaction.rb:418`*

---

### edit_followup

**public** `instance.edit_followup(message_id, content = nil, **options, &block)` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:418`*

---

### delete_followup

**public** `instance.delete_followup(message_id)` - instance method

Delete a followup message
@param message_id [String] Followup message ID
@return [void]

*Defined at: `lib/discord_rda/interactions/interaction.rb:436`*

---

### delete_followup

**public** `instance.delete_followup(message_id)` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:436`*

---

### premium_required

**public** `instance.premium_required()` - instance method

Show premium required response
@return [void]

*Defined at: `lib/discord_rda/interactions/interaction.rb:444`*

---

### premium_required

**public** `instance.premium_required()` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:444`*

---

### resolve_option_value

**public** `instance.resolve_option_value(opt)` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:456`*

---

### resolve_user

**public** `instance.resolve_user(user_id)` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:474`*

---

### resolve_channel

**public** `instance.resolve_channel(channel_id)` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:480`*

---

### resolve_role

**public** `instance.resolve_role(role_id)` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:485`*

---

### resolve_attachment

**public** `instance.resolve_attachment(attachment_id)` - instance method

*Defined at: `lib/discord_rda/interactions/interaction.rb:490`*

---

