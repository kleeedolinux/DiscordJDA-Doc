---
sidebar_position: 2
---

# Context Menus

Context Menus (also called Application Commands) appear when users right-click on messages or users. They provide quick actions without typing commands.

## Types of Context Menus

Discord supports two types:
- **User Context Menu** - Right-click on a user
- **Message Context Menu** - Right-click on a message

## User Context Menu

### Basic User Menu

```ruby
bot.context_menu(type: :user, name: 'High Five') do |interaction|
  target_user = interaction.target_user
  
  interaction.respond(
    content: "🙌 #{interaction.user.mention} high-fived #{target_user.mention}!"
  )
end
```

### User Information

```ruby
bot.context_menu(type: :user, name: 'User Info') do |interaction|
  target_user = interaction.target_user
  member = interaction.target_member  # nil if not in guild
  
  content = <<~INFO
    **User Information**
    Name: #{target_user.username}
    ID: #{target_user.id}
    Created: #{target_user.created_at.strftime('%Y-%m-%d')}
  INFO
  
  if member
    content += <<~INFO
      
      **Member Information**
      Nickname: #{member.nick || 'None'}
      Joined: #{member.joined_at.strftime('%Y-%m-%d')}
      Roles: #{member.roles.length}
    INFO
  end
  
  interaction.respond(content: content, ephemeral: true)
end
```

### Kick User

```ruby
bot.context_menu(type: :user, name: 'Kick', default_permissions: [:kick_members]) do |interaction|
  target_user = interaction.target_user
  target_member = interaction.target_member
  
  unless target_member
    interaction.respond(content: 'User is not in this server!', ephemeral: true)
    return
  end
  
  # Check if target is higher role
  if target_member.permissions.administrator?
    interaction.respond(content: 'Cannot kick an administrator!', ephemeral: true)
    return
  end
  
  bot.remove_guild_member(interaction.guild_id, target_user.id)
  
  interaction.respond(
    content: "Kicked #{target_user.username}",
    ephemeral: true
  )
end
```

## Message Context Menu

### Basic Message Menu

```ruby
bot.context_menu(type: :message, name: 'Quote') do |interaction|
  target_message = interaction.target_message
  
  quote = <<~QUOTE
    > #{target_message.content.gsub("\n", "\n> ")}
    
    — #{target_message.author.mention}, <t:#{target_message.timestamp.to_i}:f>
  QUOTE
  
  interaction.respond(content: quote)
end
```

### Pin Message

```ruby
bot.context_menu(type: :message, name: 'Quick Pin', default_permissions: [:manage_messages]) do |interaction|
  target_message = interaction.target_message
  
  target_message.pin
  
  interaction.respond(
    content: "📌 Pinned message from #{target_message.author.mention}",
    ephemeral: true
  )
end
```

### Report Message

```ruby
bot.context_menu(type: :message, name: 'Report') do |interaction|
  target_message = interaction.target_message
  
  # Send to mod channel
  mod_channel = '123456789'  # Your mod channel ID
  
  report = <<~REPORT
    **Message Report**
    Reporter: #{interaction.user.mention}
    Author: #{target_message.author.mention}
    Channel: #{target_message.channel.mention}
    Content: #{target_message.content[0..500]}
    [Jump to message](#{target_message.url})
  REPORT
  
  bot.send_message(mod_channel, report)
  
  interaction.respond(
    content: 'Report sent to moderators. Thank you!',
    ephemeral: true
  )
end
```

## Context with Guild Restriction

```ruby
bot.context_menu(
  type: :user,
  name: 'Admin Action',
  guild_id: ADMIN_GUILD_ID,
  default_permissions: [:administrator]
) do |interaction|
  # Only available in admin guild
  interaction.respond(content: 'Admin panel opened', ephemeral: true)
end
```

## Working with Target Data

### User Context Properties

```ruby
bot.context_menu(type: :user, name: 'Analyze') do |interaction|
  # Target user (who was right-clicked)
  target = interaction.target_user
  puts target.id
  puts target.username
  puts target.avatar_url
  
  # Target member (if in same guild)
  member = interaction.target_member
  if member
    puts member.nick
    puts member.roles
    puts member.joined_at
  end
  
  # Command user (who clicked the menu)
  user = interaction.user
  member = interaction.member
  
  interaction.respond(content: 'Analysis complete', ephemeral: true)
end
```

### Message Context Properties

```ruby
bot.context_menu(type: :message, name: 'Analyze') do |interaction|
  # Target message (what was right-clicked)
  message = interaction.target_message
  
  puts message.id
  puts message.content
  puts message.author
  puts message.timestamp
  puts message.attachments.length
  puts message.embeds.length
  puts message.reactions
  
  # Can also access the author as a user object
  author = message.author
  
  interaction.respond(content: 'Message analyzed', ephemeral: true)
end
```

## Responding to Context Menus

### Immediate Response

```ruby
bot.context_menu(type: :user, name: 'Greet') do |interaction|
  interaction.respond(content: "Hello #{interaction.target_user.mention}!")
end
```

### Deferred Response

```ruby
bot.context_menu(type: :user, name: 'Fetch Stats') do |interaction|
  interaction.defer(ephemeral: true)
  
  # Fetch user stats from database
  stats = fetch_user_stats(interaction.target_user.id)
  
  interaction.edit_original(content: format_stats(stats))
end
```

### With Modal

```ruby
bot.context_menu(type: :message, name: 'Add Note') do |interaction|
  interaction.modal(
    custom_id: 'add_note_modal',
    title: 'Add Note to Message'
  ) do |modal|
    modal.paragraph(
      custom_id: 'note_content',
      label: 'Note',
      required: true,
      max_length: 1000
    )
  end
end

# Handle modal submission
bot.on(:modal_submit) do |interaction|
  next unless interaction.custom_id == 'add_note_modal'
  
  note = interaction.modal_value('note_content')
  
  # Save note to database
  save_note(interaction.user.id, note)
  
  interaction.respond(content: 'Note saved!', ephemeral: true)
end
```

## Best Practices

1. **Keep names short** - Discord limits to 32 characters
2. **Be descriptive** - Users should understand what it does
3. **Use emojis** - Visual indicators help (in responses)
4. **Check permissions** - Verify user can perform action
5. **Handle errors** - Graceful failure messages
6. **Use ephemeral responses** - For admin/sensitive actions

## Examples Gallery

### User Menus

```ruby
# Avatar
bot.context_menu(type: :user, name: 'Get Avatar') do |interaction|
  user = interaction.target_user
  
  interaction.respond do |builder|
    builder.embed do |embed|
      embed.title = "#{user.username}'s Avatar"
      embed.image = { url: user.avatar_url(size: 4096) }
      embed.color = 0x7289da
    end
  end
end

# Ban
bot.context_menu(
  type: :user,
  name: 'Ban User',
  default_permissions: [:ban_members]
) do |interaction|
  user = interaction.target_user
  
  interaction.modal(
    custom_id: 'ban_modal',
    title: 'Ban User'
  ) do |modal|
    modal.short(
      custom_id: 'reason',
      label: 'Reason',
      required: true
    )
    modal.short(
      custom_id: 'days',
      label: 'Delete messages (days)',
      value: '1'
    )
  end
end
```

### Message Menus

```ruby
# Copy to Channel
bot.context_menu(
  type: :message,
  name: 'Publish to News',
  default_permissions: [:manage_messages]
) do |interaction|
  message = interaction.target_message
  news_channel = '123456789'
  
  bot.send_message(
    news_channel,
    content: message.content,
    embeds: message.embeds.map(&:to_h)
  )
  
  interaction.respond(content: 'Published!', ephemeral: true)
end

# Save Bookmark
bot.context_menu(type: :message, name: 'Bookmark') do |interaction|
  message = interaction.target_message
  
  # Save to user's bookmarks
  save_bookmark(
    user_id: interaction.user.id,
    message_url: message.url,
    content: message.content[0..200]
  )
  
  interaction.respond(
    content: '🔖 Bookmark saved! View with /bookmarks',
    ephemeral: true
  )
end
```

## Complete Example

```ruby
require 'discord_rda'

bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  application_id: ENV['DISCORD_APP_ID'],
  intents: [:guilds, :guild_messages]
)

# User context menus
bot.context_menu(type: :user, name: 'User Info') do |interaction|
  user = interaction.target_user
  member = interaction.target_member
  
  embed = {
    title: user.username,
    thumbnail: { url: user.avatar_url },
    fields: [
      { name: 'ID', value: user.id, inline: true },
      { name: 'Created', value: "<t:#{user.created_at.to_i}:R>", inline: true }
    ],
    color: 0x7289da
  }
  
  if member
    embed[:fields].concat([
      { name: 'Nickname', value: member.nick || 'None', inline: true },
      { name: 'Joined', value: "<t:#{member.joined_at.to_i}:R>", inline: true },
      { name: 'Roles', value: member.roles.length.to_s, inline: true }
    ])
  end
  
  interaction.respond(embeds: [embed], ephemeral: true)
end

# Message context menus
bot.context_menu(type: :message, name: 'Raw Content') do |interaction|
  message = interaction.target_message
  
  # Escape markdown for display
  raw = message.content.gsub('`', '\\`')
  
  interaction.respond(
    content: "```\n#{raw[0..1990]}\n```",
    ephemeral: true
  )
end

bot.context_menu(
  type: :message,
  name: 'Delete',
  default_permissions: [:manage_messages]
) do |interaction|
  message = interaction.target_message
  
  message.delete
  
  interaction.respond(
    content: "🗑️ Deleted message from #{message.author.mention}",
    ephemeral: true
  )
end

bot.run
```

## Next Steps

- **[Build Components](./buttons-components)** - Add buttons to responses
- **[Create Modals](./modals)** - Form inputs from context menus
- **[Slash Commands](./slash-commands)** - Traditional commands
