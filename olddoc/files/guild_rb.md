# guild.rb

**Path**: `lib/discord_rda/entity/guild.rb`

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/entity/guild.rb:3`*

#### Methods

**public** `instance.file_wrapper(content_type)` - instance method

Set content type if not already set

*Defined at: `lib/discord_rda/entity/guild.rb:453`*

#### Classes

- `Guild`

---

## Methods

### file_wrapper

**public** `instance.file_wrapper(original_filename)` - instance method

*Defined at: `lib/discord_rda/entity/guild.rb:460`*

---

### modify_sticker

**public** `instance.modify_sticker(sticker_id, name, nil, description, nil, tags, nil, reason, nil)` - instance method

Modify a guild sticker
@param sticker_id [String, Snowflake] Sticker ID
@param name [String] New name
@param description [String] New description
@param tags [String] New tags
@param reason [String] Audit log reason
@return [Sticker] Updated sticker

*Defined at: `lib/discord_rda/entity/guild.rb:491`*

---

### modify_sticker

**public** `instance.modify_sticker(sticker_id, name, nil, description, nil, tags, nil, reason, nil)` - instance method

*Defined at: `lib/discord_rda/entity/guild.rb:491`*

---

### delete_sticker

**public** `instance.delete_sticker(sticker_id, reason, nil)` - instance method

Delete a guild sticker
@param sticker_id [String, Snowflake] Sticker ID
@param reason [String] Audit log reason
@return [void]

*Defined at: `lib/discord_rda/entity/guild.rb:507`*

---

### delete_sticker

**public** `instance.delete_sticker(sticker_id, reason, nil)` - instance method

*Defined at: `lib/discord_rda/entity/guild.rb:507`*

---

### fetch_widget_settings

**public** `instance.fetch_widget_settings()` - instance method

Fetch widget settings
@return [Hash, nil] Widget settings

*Defined at: `lib/discord_rda/entity/guild.rb:518`*

---

### fetch_widget_settings

**public** `instance.fetch_widget_settings()` - instance method

*Defined at: `lib/discord_rda/entity/guild.rb:518`*

---

### widget_url

**public** `instance.widget_url()` - instance method

Get widget URL
@return [String] Widget URL

*Defined at: `lib/discord_rda/entity/guild.rb:528`*

---

### widget_url

**public** `instance.widget_url()` - instance method

*Defined at: `lib/discord_rda/entity/guild.rb:528`*

---

### vanity_invite_url

**public** `instance.vanity_invite_url()` - instance method

Get guild vanity URL with code
@return [String, nil] Vanity URL

*Defined at: `lib/discord_rda/entity/guild.rb:534`*

---

### vanity_invite_url

**public** `instance.vanity_invite_url()` - instance method

*Defined at: `lib/discord_rda/entity/guild.rb:534`*

---

### has_vanity_url?

**public** `instance.has_vanity_url?()` - instance method

Check if guild has vanity URL feature
@return [Boolean] True if has vanity URL

*Defined at: `lib/discord_rda/entity/guild.rb:542`*

---

### has_vanity_url?

**public** `instance.has_vanity_url?()` - instance method

*Defined at: `lib/discord_rda/entity/guild.rb:542`*

---

### has_description?

**public** `instance.has_description?()` - instance method

Check if guild has description
@return [Boolean] True if has description

*Defined at: `lib/discord_rda/entity/guild.rb:548`*

---

### has_description?

**public** `instance.has_description?()` - instance method

*Defined at: `lib/discord_rda/entity/guild.rb:548`*

---

### role_count

**public** `instance.role_count()` - instance method

Get role count
@return [Integer] Number of roles

*Defined at: `lib/discord_rda/entity/guild.rb:554`*

---

### role_count

**public** `instance.role_count()` - instance method

*Defined at: `lib/discord_rda/entity/guild.rb:554`*

---

### emoji_count

**public** `instance.emoji_count()` - instance method

Get emoji count
@return [Integer] Number of emojis

*Defined at: `lib/discord_rda/entity/guild.rb:560`*

---

### emoji_count

**public** `instance.emoji_count()` - instance method

*Defined at: `lib/discord_rda/entity/guild.rb:560`*

---

### likely_community?

**public** `instance.likely_community?()` - instance method

Check if guild is likely community server
@return [Boolean] True if community guild

*Defined at: `lib/discord_rda/entity/guild.rb:566`*

---

### likely_community?

**public** `instance.likely_community?()` - instance method

*Defined at: `lib/discord_rda/entity/guild.rb:566`*

---

### moderation_level

**public** `instance.moderation_level()` - instance method

Get moderation level description
@return [String] Moderation level

*Defined at: `lib/discord_rda/entity/guild.rb:572`*

---

### moderation_level

**public** `instance.moderation_level()` - instance method

*Defined at: `lib/discord_rda/entity/guild.rb:572`*

---

### requires_verification?

**public** `instance.requires_verification?()` - instance method

Check if guild requires verification
@return [Boolean] True if requires verification

*Defined at: `lib/discord_rda/entity/guild.rb:578`*

---

### requires_verification?

**public** `instance.requires_verification?()` - instance method

*Defined at: `lib/discord_rda/entity/guild.rb:578`*

---

### requires_2fa?

**public** `instance.requires_2fa?()` - instance method

Check if guild has 2FA requirement for moderation
@return [Boolean] True if requires 2FA

*Defined at: `lib/discord_rda/entity/guild.rb:584`*

---

### requires_2fa?

**public** `instance.requires_2fa?()` - instance method

*Defined at: `lib/discord_rda/entity/guild.rb:584`*

---

### has_content_filter?

**public** `instance.has_content_filter?()` - instance method

Check if guild has explicit content filter enabled
@return [Boolean] True if has content filter

*Defined at: `lib/discord_rda/entity/guild.rb:590`*

---

### has_content_filter?

**public** `instance.has_content_filter?()` - instance method

*Defined at: `lib/discord_rda/entity/guild.rb:590`*

---

### nsfw_allowed?

**public** `instance.nsfw_allowed?()` - instance method

Check if guild has NSFW content allowed
@return [Boolean] True if NSFW allowed

*Defined at: `lib/discord_rda/entity/guild.rb:596`*

---

### nsfw_allowed?

**public** `instance.nsfw_allowed?()` - instance method

*Defined at: `lib/discord_rda/entity/guild.rb:596`*

---

### summary

**public** `instance.summary()` - instance method

Get human-readable guild summary
@return [Hash] Guild summary

*Defined at: `lib/discord_rda/entity/guild.rb:602`*

---

### summary

**public** `instance.summary()` - instance method

*Defined at: `lib/discord_rda/entity/guild.rb:602`*

---

