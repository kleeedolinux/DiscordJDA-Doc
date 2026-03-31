# bot.rb

**Path**: `lib/discord_rda/bot.rb`

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/bot.rb:3`*

#### Classes

- `Bot`

---

## Methods

### context_menu

**public** `instance.context_menu(type, name, **options, &block)` - instance method

Register a context menu command (user or message)
@param type [Symbol] :user or :message
@param name [String] Command name
@param options [Hash] Command options
@yield [Interaction] Handler block
@return [ApplicationCommand] Registered command

*Defined at: `lib/discord_rda/bot.rb:123`*

---

### context_menu

**public** `instance.context_menu(type, name, **options, &block)` - instance method

*Defined at: `lib/discord_rda/bot.rb:123`*

---

### bulk_register_commands

**public** `instance.bulk_register_commands(commands)` - instance method

Bulk register global commands (replaces existing)
@param commands [Array<CommandBuilder>] Commands to register
@return [Array<ApplicationCommand>] Registered commands

*Defined at: `lib/discord_rda/bot.rb:134`*

---

### bulk_register_commands

**public** `instance.bulk_register_commands(commands)` - instance method

*Defined at: `lib/discord_rda/bot.rb:134`*

---

### delete_global_command

**public** `instance.delete_global_command(command_id)` - instance method

Delete a global command
@param command_id [String] Command ID
@return [void]

*Defined at: `lib/discord_rda/bot.rb:147`*

---

### delete_global_command

**public** `instance.delete_global_command(command_id)` - instance method

*Defined at: `lib/discord_rda/bot.rb:147`*

---

### delete_guild_command

**public** `instance.delete_guild_command(guild_id, command_id)` - instance method

Delete a guild command
@param guild_id [String] Guild ID
@param command_id [String] Command ID
@return [void]

*Defined at: `lib/discord_rda/bot.rb:155`*

---

### delete_guild_command

**public** `instance.delete_guild_command(guild_id, command_id)` - instance method

*Defined at: `lib/discord_rda/bot.rb:155`*

---

### on

**public** `instance.on(event, &block)` - instance method

Register an event handler
@param event [String, Symbol] Event type
@yield Event handler block
@return [Subscription] Subscription object

*Defined at: `lib/discord_rda/bot.rb:163`*

---

### on

**public** `instance.on(event, &block)` - instance method

*Defined at: `lib/discord_rda/bot.rb:163`*

---

### once

**public** `instance.once(event, &block)` - instance method

Register a one-time event handler
@param event [String, Symbol] Event type
@yield Event handler block
@return [Subscription] Subscription object

*Defined at: `lib/discord_rda/bot.rb:171`*

---

### once

**public** `instance.once(event, &block)` - instance method

*Defined at: `lib/discord_rda/bot.rb:171`*

---

### wait_for

**public** `instance.wait_for(event, timeout, nil, &block)` - instance method

Wait for an event
@param event [String, Symbol] Event type
@param timeout [Float] Timeout in seconds
@yield Block to match event
@return [Event, nil] Event or nil if timeout

*Defined at: `lib/discord_rda/bot.rb:180`*

---

### wait_for

**public** `instance.wait_for(event, timeout, nil, &block)` - instance method

*Defined at: `lib/discord_rda/bot.rb:180`*

---

### register_command

**public** `instance.register_command(name, description = '', options = [], &block)` - instance method

Register a command
@param name [String] Command name
@param description [String] Command description
@param options [Array<Hash>] Command options
@yield Command handler
@return [void]

*Defined at: `lib/discord_rda/bot.rb:190`*

---

### register_command

**public** `instance.register_command(name, description = '', options = [], &block)` - instance method

*Defined at: `lib/discord_rda/bot.rb:190`*

---

### register_plugin

**public** `instance.register_plugin(plugin)` - instance method

Register a plugin
@param plugin [Plugin] Plugin to register
@return [Boolean] True if registered

*Defined at: `lib/discord_rda/bot.rb:202`*

---

### register_plugin

**public** `instance.register_plugin(plugin)` - instance method

*Defined at: `lib/discord_rda/bot.rb:202`*

---

### use

**public** `instance.use(middleware)` - instance method

Use middleware
@param middleware [Middleware] Middleware to use
@return [void]

*Defined at: `lib/discord_rda/bot.rb:210`*

---

### use

**public** `instance.use(middleware)` - instance method

*Defined at: `lib/discord_rda/bot.rb:210`*

---

### run

**public** `instance.run(async, false)` - instance method

Run the bot
@param async [Boolean] Run asynchronously
@return [void]

*Defined at: `lib/discord_rda/bot.rb:217`*

---

### run

**public** `instance.run(async, false)` - instance method

*Defined at: `lib/discord_rda/bot.rb:217`*

---

### stop

**public** `instance.stop()` - instance method

Stop the bot
@return [void]

*Defined at: `lib/discord_rda/bot.rb:244`*

---

### stop

**public** `instance.stop()` - instance method

*Defined at: `lib/discord_rda/bot.rb:244`*

---

### update_presence

**public** `instance.update_presence(status, online, activity, nil)` - instance method

Update bot presence
@param status [String] online, idle, dnd, invisible
@param activity [Hash] Activity data
@return [void]

*Defined at: `lib/discord_rda/bot.rb:255`*

---

### update_presence

**public** `instance.update_presence(status, online, activity, nil)` - instance method

*Defined at: `lib/discord_rda/bot.rb:255`*

---

### status

**public** `instance.status()` - instance method

Get bot status
@return [Hash] Status information

*Defined at: `lib/discord_rda/bot.rb:263`*

---

### status

**public** `instance.status()` - instance method

*Defined at: `lib/discord_rda/bot.rb:263`*

---

### me

**public** `instance.me()` - instance method

Fetch current user
@return [User] Bot user

*Defined at: `lib/discord_rda/bot.rb:274`*

---

### me

**public** `instance.me()` - instance method

*Defined at: `lib/discord_rda/bot.rb:274`*

---

### guild

**public** `instance.guild(guild_id)` - instance method

Get a guild by ID
@param guild_id [String, Snowflake] Guild ID
@return [Guild, nil] Guild or nil

*Defined at: `lib/discord_rda/bot.rb:282`*

---

### guild

**public** `instance.guild(guild_id)` - instance method

*Defined at: `lib/discord_rda/bot.rb:282`*

---

### channel

**public** `instance.channel(channel_id)` - instance method

Get a channel by ID
@param channel_id [String, Snowflake] Channel ID
@return [Channel, nil] Channel or nil

*Defined at: `lib/discord_rda/bot.rb:297`*

---

### channel

**public** `instance.channel(channel_id)` - instance method

*Defined at: `lib/discord_rda/bot.rb:297`*

---

### send_message

**public** `instance.send_message(channel_id, content = nil, **options)` - instance method

Send a message to a channel
@param channel_id [String, Snowflake] Channel ID
@param content [String] Message content
@param options [Hash] Message options
@return [Message] Sent message

*Defined at: `lib/discord_rda/bot.rb:314`*

---

### send_message

**public** `instance.send_message(channel_id, content = nil, **options)` - instance method

*Defined at: `lib/discord_rda/bot.rb:314`*

---

### channel_messages

**public** `instance.channel_messages(channel_id, limit, before, nil, after, nil, around, nil)` - instance method

Get messages from a channel with pagination (simplified)
@param channel_id [String, Snowflake] Channel ID
@param limit [Integer] Max messages to fetch (1-100, default 50)
@param before [String, Snowflake] Get messages before this ID
@param after [String, Snowflake] Get messages after this ID
@param around [String, Snowflake] Get messages around this ID
@return [Array<Message>] Messages

*Defined at: `lib/discord_rda/bot.rb:327`*

---

### channel_messages

**public** `instance.channel_messages(channel_id, limit, before, nil, after, nil, around, nil)` - instance method

*Defined at: `lib/discord_rda/bot.rb:327`*

---

### channel_message

**public** `instance.channel_message(channel_id, message_id)` - instance method

Get a single message from a channel
@param channel_id [String, Snowflake] Channel ID
@param message_id [String, Snowflake] Message ID
@return [Message, nil] Message or nil

*Defined at: `lib/discord_rda/bot.rb:341`*

---

### channel_message

**public** `instance.channel_message(channel_id, message_id)` - instance method

*Defined at: `lib/discord_rda/bot.rb:341`*

---

### enable_scalable_rest

**public** `instance.enable_scalable_rest(proxy, nil)` - instance method

Enable scalable REST client (queue-based rate limiting)
@param proxy [Hash] Optional proxy configuration
@return [void]

*Defined at: `lib/discord_rda/bot.rb:351`*

---

### enable_scalable_rest

**public** `instance.enable_scalable_rest(proxy, nil)` - instance method

*Defined at: `lib/discord_rda/bot.rb:351`*

---

### enable_hot_reload

**public** `instance.enable_hot_reload(watch_dir, lib)` - instance method

Enable hot reload for development
@param watch_dir [String] Directory to watch
@return [void]

*Defined at: `lib/discord_rda/bot.rb:360`*

---

### enable_hot_reload

**public** `instance.enable_hot_reload(watch_dir, lib)` - instance method

*Defined at: `lib/discord_rda/bot.rb:360`*

---

### reshard_to

**public** `instance.reshard_to(new_shard_count)` - instance method

Trigger zero-downtime resharding
@param new_shard_count [Integer] New shard count
@return [void]

*Defined at: `lib/discord_rda/bot.rb:369`*

---

### reshard_to

**public** `instance.reshard_to(new_shard_count)` - instance method

*Defined at: `lib/discord_rda/bot.rb:369`*

---

### enable_auto_reshard

**public** `instance.enable_auto_reshard(max_guilds_per_shard)` - instance method

Enable auto-resharding based on guild count
@param max_guilds_per_shard [Integer] Max guilds per shard
@return [void]

*Defined at: `lib/discord_rda/bot.rb:377`*

---

### enable_auto_reshard

**public** `instance.enable_auto_reshard(max_guilds_per_shard)` - instance method

*Defined at: `lib/discord_rda/bot.rb:377`*

---

### invalid_bucket_status

**public** `instance.invalid_bucket_status()` - instance method

Get invalid request bucket status
@return [Hash, nil] Invalid bucket status

*Defined at: `lib/discord_rda/bot.rb:386`*

---

### invalid_bucket_status

**public** `instance.invalid_bucket_status()` - instance method

*Defined at: `lib/discord_rda/bot.rb:386`*

---

### analytics

**public** `instance.analytics()` - instance method

Get analytics data (if analytics plugin registered)
@return [Hash] Analytics data

*Defined at: `lib/discord_rda/bot.rb:392`*

---

### analytics

**public** `instance.analytics()` - instance method

*Defined at: `lib/discord_rda/bot.rb:392`*

---

### add_reaction

**public** `instance.add_reaction(channel_id, message_id, emoji)` - instance method

Add a reaction to a message
@param channel_id [String, Snowflake] Channel ID
@param message_id [String, Snowflake] Message ID
@param emoji [String, Emoji] Emoji (unicode or name:id format)
@return [void]

*Defined at: `lib/discord_rda/bot.rb:404`*

---

### add_reaction

**public** `instance.add_reaction(channel_id, message_id, emoji)` - instance method

*Defined at: `lib/discord_rda/bot.rb:404`*

---

### remove_reaction

**public** `instance.remove_reaction(channel_id, message_id, emoji, user_id, me)` - instance method

Remove a reaction from a message
@param channel_id [String, Snowflake] Channel ID
@param message_id [String, Snowflake] Message ID
@param emoji [String, Emoji] Emoji
@param user_id [String, Snowflake] User ID (default: @me)
@return [void]

*Defined at: `lib/discord_rda/bot.rb:415`*

---

### remove_reaction

**public** `instance.remove_reaction(channel_id, message_id, emoji, user_id, me)` - instance method

*Defined at: `lib/discord_rda/bot.rb:415`*

---

### get_reactions

**public** `instance.get_reactions(channel_id, message_id, emoji, limit)` - instance method

Get reactions for a message (simplified - no pagination)
@param channel_id [String, Snowflake] Channel ID
@param message_id [String, Snowflake] Message ID
@param emoji [String, Emoji] Emoji filter
@param limit [Integer] Max users to return (1-100, default 25)
@return [Array<User>] Users who reacted

*Defined at: `lib/discord_rda/bot.rb:426`*

---

### get_reactions

**public** `instance.get_reactions(channel_id, message_id, emoji, limit)` - instance method

*Defined at: `lib/discord_rda/bot.rb:426`*

---

### remove_all_reactions

**public** `instance.remove_all_reactions(channel_id, message_id)` - instance method

Remove all reactions from a message
@param channel_id [String, Snowflake] Channel ID
@param message_id [String, Snowflake] Message ID
@return [void]

*Defined at: `lib/discord_rda/bot.rb:436`*

---

### remove_all_reactions

**public** `instance.remove_all_reactions(channel_id, message_id)` - instance method

*Defined at: `lib/discord_rda/bot.rb:436`*

---

### guild_member

**public** `instance.guild_member(guild_id, user_id)` - instance method

Get a guild member
@param guild_id [String, Snowflake] Guild ID
@param user_id [String, Snowflake] User ID
@return [Member, nil] Member or nil

*Defined at: `lib/discord_rda/bot.rb:446`*

---

### guild_member

**public** `instance.guild_member(guild_id, user_id)` - instance method

*Defined at: `lib/discord_rda/bot.rb:446`*

---

### guild_members

**public** `instance.guild_members(guild_id, limit, after, nil)` - instance method

List guild members (simplified - basic pagination)
@param guild_id [String, Snowflake] Guild ID
@param limit [Integer] Max members (1-1000, default 100)
@param after [String, Snowflake] Get members after this user ID
@return [Array<Member>] Members

*Defined at: `lib/discord_rda/bot.rb:458`*

---

### guild_members

**public** `instance.guild_members(guild_id, limit, after, nil)` - instance method

*Defined at: `lib/discord_rda/bot.rb:458`*

---

### search_guild_members

**public** `instance.search_guild_members(guild_id, query, limit)` - instance method

Search guild members by query (simplified)
@param guild_id [String, Snowflake] Guild ID
@param query [String] Search query (username/nickname prefix)
@param limit [Integer] Max results (1-100, default 25)
@return [Array<Member>] Matching members

*Defined at: `lib/discord_rda/bot.rb:470`*

---

### search_guild_members

**public** `instance.search_guild_members(guild_id, query, limit)` - instance method

*Defined at: `lib/discord_rda/bot.rb:470`*

---

### modify_guild_member

**public** `instance.modify_guild_member(guild_id, user_id, **options)` - instance method

Modify a guild member (simplified)
@param guild_id [String, Snowflake] Guild ID
@param user_id [String, Snowflake] User ID
@param options [Hash] Options to modify (nick, roles, mute, deaf, channel_id)
@return [Member] Updated member

*Defined at: `lib/discord_rda/bot.rb:481`*

---

### modify_guild_member

**public** `instance.modify_guild_member(guild_id, user_id, **options)` - instance method

*Defined at: `lib/discord_rda/bot.rb:481`*

---

### add_guild_member_role

**public** `instance.add_guild_member_role(guild_id, user_id, role_id, reason, nil)` - instance method

Add role to guild member
@param guild_id [String, Snowflake] Guild ID
@param user_id [String, Snowflake] User ID
@param role_id [String, Snowflake] Role ID
@param reason [String] Audit log reason
@return [void]

*Defined at: `lib/discord_rda/bot.rb:493`*

---

### add_guild_member_role

**public** `instance.add_guild_member_role(guild_id, user_id, role_id, reason, nil)` - instance method

*Defined at: `lib/discord_rda/bot.rb:493`*

---

### remove_guild_member_role

**public** `instance.remove_guild_member_role(guild_id, user_id, role_id, reason, nil)` - instance method

Remove role from guild member
@param guild_id [String, Snowflake] Guild ID
@param user_id [String, Snowflake] User ID
@param role_id [String, Snowflake] Role ID
@param reason [String] Audit log reason
@return [void]

*Defined at: `lib/discord_rda/bot.rb:504`*

---

### remove_guild_member_role

**public** `instance.remove_guild_member_role(guild_id, user_id, role_id, reason, nil)` - instance method

*Defined at: `lib/discord_rda/bot.rb:504`*

---

### remove_guild_member

**public** `instance.remove_guild_member(guild_id, user_id, reason, nil)` - instance method

Remove guild member (kick)
@param guild_id [String, Snowflake] Guild ID
@param user_id [String, Snowflake] User ID
@param reason [String] Audit log reason
@return [void]

*Defined at: `lib/discord_rda/bot.rb:514`*

---

### remove_guild_member

**public** `instance.remove_guild_member(guild_id, user_id, reason, nil)` - instance method

*Defined at: `lib/discord_rda/bot.rb:514`*

---

### guild_roles

**public** `instance.guild_roles(guild_id)` - instance method

Get guild roles
@param guild_id [String, Snowflake] Guild ID
@return [Array<Role>] Roles

*Defined at: `lib/discord_rda/bot.rb:524`*

---

### guild_roles

**public** `instance.guild_roles(guild_id)` - instance method

*Defined at: `lib/discord_rda/bot.rb:524`*

---

### create_guild_role

**public** `instance.create_guild_role(guild_id, name, **options)` - instance method

Create guild role (simplified)
@param guild_id [String, Snowflake] Guild ID
@param name [String] Role name
@param options [Hash] Optional settings (permissions, color, hoist, mentionable)
@return [Role] Created role

*Defined at: `lib/discord_rda/bot.rb:534`*

---

### create_guild_role

**public** `instance.create_guild_role(guild_id, name, **options)` - instance method

*Defined at: `lib/discord_rda/bot.rb:534`*

---

### modify_guild_role

**public** `instance.modify_guild_role(guild_id, role_id, **options)` - instance method

Modify guild role
@param guild_id [String, Snowflake] Guild ID
@param role_id [String, Snowflake] Role ID
@param options [Hash] Settings to modify
@return [Role] Updated role

*Defined at: `lib/discord_rda/bot.rb:545`*

---

### modify_guild_role

**public** `instance.modify_guild_role(guild_id, role_id, **options)` - instance method

*Defined at: `lib/discord_rda/bot.rb:545`*

---

### delete_guild_role

**public** `instance.delete_guild_role(guild_id, role_id, reason, nil)` - instance method

Delete guild role
@param guild_id [String, Snowflake] Guild ID
@param role_id [String, Snowflake] Role ID
@param reason [String] Audit log reason
@return [void]

*Defined at: `lib/discord_rda/bot.rb:556`*

---

### delete_guild_role

**public** `instance.delete_guild_role(guild_id, role_id, reason, nil)` - instance method

*Defined at: `lib/discord_rda/bot.rb:556`*

---

### guild_bans

**public** `instance.guild_bans(guild_id, limit)` - instance method

Get guild bans (simplified - no pagination)
@param guild_id [String, Snowflake] Guild ID
@param limit [Integer] Max bans (1-1000, default 100)
@return [Array<Hash>] Bans (user + reason data)

*Defined at: `lib/discord_rda/bot.rb:567`*

---

### guild_bans

**public** `instance.guild_bans(guild_id, limit)` - instance method

*Defined at: `lib/discord_rda/bot.rb:567`*

---

### guild_ban

**public** `instance.guild_ban(guild_id, user_id)` - instance method

Get a specific guild ban
@param guild_id [String, Snowflake] Guild ID
@param user_id [String, Snowflake] User ID
@return [Hash, nil] Ban data or nil

*Defined at: `lib/discord_rda/bot.rb:576`*

---

### guild_ban

**public** `instance.guild_ban(guild_id, user_id)` - instance method

*Defined at: `lib/discord_rda/bot.rb:576`*

---

### create_guild_ban

**public** `instance.create_guild_ban(guild_id, user_id, delete_message_days, nil, reason, nil)` - instance method

Create guild ban
@param guild_id [String, Snowflake] Guild ID
@param user_id [String, Snowflake] User ID
@param delete_message_days [Integer] Days of messages to delete (0-7)
@param reason [String] Audit log reason
@return [void]

*Defined at: `lib/discord_rda/bot.rb:589`*

---

### create_guild_ban

**public** `instance.create_guild_ban(guild_id, user_id, delete_message_days, nil, reason, nil)` - instance method

*Defined at: `lib/discord_rda/bot.rb:589`*

---

### remove_guild_ban

**public** `instance.remove_guild_ban(guild_id, user_id, reason, nil)` - instance method

Remove guild ban (unban)
@param guild_id [String, Snowflake] Guild ID
@param user_id [String, Snowflake] User ID
@param reason [String] Audit log reason
@return [void]

*Defined at: `lib/discord_rda/bot.rb:601`*

---

### remove_guild_ban

**public** `instance.remove_guild_ban(guild_id, user_id, reason, nil)` - instance method

*Defined at: `lib/discord_rda/bot.rb:601`*

---

### create_webhook

**public** `instance.create_webhook(channel_id, name, avatar, nil)` - instance method

Create a webhook
@param channel_id [String, Snowflake] Channel ID
@param name [String] Webhook name
@param avatar [String] Base64-encoded avatar image (optional)
@return [Hash] Webhook data

*Defined at: `lib/discord_rda/bot.rb:613`*

---

### create_webhook

**public** `instance.create_webhook(channel_id, name, avatar, nil)` - instance method

*Defined at: `lib/discord_rda/bot.rb:613`*

---

### channel_webhooks

**public** `instance.channel_webhooks(channel_id)` - instance method

Get channel webhooks
@param channel_id [String, Snowflake] Channel ID
@return [Array<Hash>] Webhooks

*Defined at: `lib/discord_rda/bot.rb:622`*

---

### channel_webhooks

**public** `instance.channel_webhooks(channel_id)` - instance method

*Defined at: `lib/discord_rda/bot.rb:622`*

---

### guild_webhooks

**public** `instance.guild_webhooks(guild_id)` - instance method

Get guild webhooks
@param guild_id [String, Snowflake] Guild ID
@return [Array<Hash>] Webhooks

*Defined at: `lib/discord_rda/bot.rb:629`*

---

### guild_webhooks

**public** `instance.guild_webhooks(guild_id)` - instance method

*Defined at: `lib/discord_rda/bot.rb:629`*

---

### execute_webhook

**public** `instance.execute_webhook(webhook_id, token, content = nil, **options)` - instance method

Execute webhook (simplified)
@param webhook_id [String, Snowflake] Webhook ID
@param token [String] Webhook token
@param content [String] Message content
@param options [Hash] Options (username, avatar_url, embeds, etc.)
@return [void]

*Defined at: `lib/discord_rda/bot.rb:639`*

---

### execute_webhook

**public** `instance.execute_webhook(webhook_id, token, content = nil, **options)` - instance method

*Defined at: `lib/discord_rda/bot.rb:639`*

---

### delete_webhook

**public** `instance.delete_webhook(webhook_id, token, nil)` - instance method

Delete a webhook
@param webhook_id [String, Snowflake] Webhook ID
@param token [String] Webhook token (optional, for webhook-owned deletes)
@return [void]

*Defined at: `lib/discord_rda/bot.rb:648`*

---

### delete_webhook

**public** `instance.delete_webhook(webhook_id, token, nil)` - instance method

*Defined at: `lib/discord_rda/bot.rb:648`*

---

### guild_channels

**public** `instance.guild_channels(guild_id)` - instance method

Get guild channels
@param guild_id [String, Snowflake] Guild ID
@return [Array<Channel>] Channels

*Defined at: `lib/discord_rda/bot.rb:658`*

---

### guild_channels

**public** `instance.guild_channels(guild_id)` - instance method

*Defined at: `lib/discord_rda/bot.rb:658`*

---

### create_guild_channel

**public** `instance.create_guild_channel(guild_id, name, type, **options)` - instance method

Create guild channel (simplified)
@param guild_id [String, Snowflake] Guild ID
@param name [String] Channel name
@param type [Integer] Channel type (0=text, 2=voice, 4=category, etc.)
@param options [Hash] Optional settings
@return [Channel] Created channel

*Defined at: `lib/discord_rda/bot.rb:669`*

---

### create_guild_channel

**public** `instance.create_guild_channel(guild_id, name, type, **options)` - instance method

*Defined at: `lib/discord_rda/bot.rb:669`*

---

### modify_channel

**public** `instance.modify_channel(channel_id, **options)` - instance method

Modify channel
@param channel_id [String, Snowflake] Channel ID
@param options [Hash] Settings to modify
@return [Channel] Updated channel

*Defined at: `lib/discord_rda/bot.rb:679`*

---

### modify_channel

**public** `instance.modify_channel(channel_id, **options)` - instance method

*Defined at: `lib/discord_rda/bot.rb:679`*

---

### delete_channel

**public** `instance.delete_channel(channel_id, reason, nil)` - instance method

Delete channel
@param channel_id [String, Snowflake] Channel ID
@param reason [String] Audit log reason
@return [Channel] Deleted channel

*Defined at: `lib/discord_rda/bot.rb:689`*

---

### delete_channel

**public** `instance.delete_channel(channel_id, reason, nil)` - instance method

*Defined at: `lib/discord_rda/bot.rb:689`*

---

### bulk_delete_messages

**public** `instance.bulk_delete_messages(channel_id, message_ids, reason, nil)` - instance method

Bulk delete messages
@param channel_id [String, Snowflake] Channel ID
@param message_ids [Array<String, Snowflake>] Message IDs to delete (2-100)
@param reason [String] Audit log reason
@return [void]

*Defined at: `lib/discord_rda/bot.rb:700`*

---

### bulk_delete_messages

**public** `instance.bulk_delete_messages(channel_id, message_ids, reason, nil)` - instance method

*Defined at: `lib/discord_rda/bot.rb:700`*

---

### setup_interaction_handlers

**public** `instance.setup_interaction_handlers()` - instance method

*Defined at: `lib/discord_rda/bot.rb:705`*

---

### handle_slash_command

**public** `instance.handle_slash_command(interaction)` - instance method

*Defined at: `lib/discord_rda/bot.rb:722`*

---

### handle_component

**public** `instance.handle_component(interaction)` - instance method

*Defined at: `lib/discord_rda/bot.rb:745`*

---

### handle_autocomplete

**public** `instance.handle_autocomplete(interaction)` - instance method

*Defined at: `lib/discord_rda/bot.rb:764`*

---

### handle_modal_submit

**public** `instance.handle_modal_submit(interaction)` - instance method

*Defined at: `lib/discord_rda/bot.rb:775`*

---

### build_cache

**public** `instance.build_cache()` - instance method

*Defined at: `lib/discord_rda/bot.rb:787`*

---

### setup_event_handlers

**public** `instance.setup_event_handlers()` - instance method

*Defined at: `lib/discord_rda/bot.rb:798`*

---

### start_shards

**public** `instance.start_shards()` - instance method

*Defined at: `lib/discord_rda/bot.rb:827`*

---

