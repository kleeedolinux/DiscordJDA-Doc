---
sidebar_position: 1
---

# Basic Bot Example

A complete, simple Discord bot with essential features.

## Project Structure

```
basic_bot/
├── Gemfile
├── bot.rb
└── .env
```

## Files

### Gemfile

```ruby
source 'https://rubygems.org'

gem 'discord_rda'
gem 'dotenv'
```

### .env

```
DISCORD_TOKEN=your_bot_token_here
DISCORD_APP_ID=your_app_id_here
```

### bot.rb

```ruby
require 'discord_rda'
require 'dotenv'

Dotenv.load

# Create bot
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  application_id: ENV['DISCORD_APP_ID'],
  intents: [:guilds, :guild_messages, :message_content],
  log_level: :info
)

# Ready event - bot is connected
bot.on(:ready) do |event|
  puts "✅ Bot is ready!"
  puts "Logged in as: #{event.user.username}##{event.discriminator}"
  puts "ID: #{event.user.id}"
  
  # Set presence
  bot.update_presence(
    status: :online,
    activity: {
      name: 'Ruby tutorials',
      type: 3  # Watching
    }
  )
end

# Message handler - respond to messages
bot.on(:message_create) do |event|
  message = event.message
  
  # Ignore bot messages
  return if message.author.bot?
  
  # Ignore DMs
  return unless message.guild_id
  
  case message.content.downcase
  when '!ping'
    # Simple ping command
    message.reply(content: '🏓 Pong!')
    
  when '!hello'
    # Greeting with mention
    message.reply(content: "👋 Hello #{message.author.mention}!")
    
  when '!info'
    # Bot info
    info = <<~INFO
      **Bot Information**
      Library: DiscordRDA
      Version: #{DiscordRDA::VERSION}
      Ruby: #{RUBY_VERSION}
      
      **Server Stats**
      Guilds: #{bot.status[:guild_count]}
    INFO
    
    message.reply(content: info)
    
  when '!help'
    # Help message
    help = <<~HELP
      **Available Commands**
      
      `!ping` - Check if bot is alive
      `!hello` - Get a greeting
      `!info` - Bot information
      `!help` - Show this help
      `/help` - Slash command help
      
      **Slash Commands**
      Use `/` to see all slash commands
    HELP
    
    message.reply(content: help)
  end
end

# Slash command: ping
bot.slash('ping', 'Check bot latency') do |cmd|
  cmd.handler do |interaction|
    interaction.respond(content: '🏓 Pong!')
  end
end

# Slash command: hello
bot.slash('hello', 'Say hello') do |cmd|
  cmd.string('name', 'Your name', required: true)
  
  cmd.handler do |interaction|
    name = interaction.option('name')
    interaction.respond(content: "👋 Hello, #{name}!")
  end
end

# Slash command: info
bot.slash('info', 'Get bot information') do |cmd|
  cmd.handler do |interaction|
    embed = {
      title: 'Bot Information',
      description: 'A basic Discord bot built with DiscordRDA',
      color: 0x7289da,
      fields: [
        {
          name: 'Library',
          value: 'DiscordRDA',
          inline: true
        },
        {
          name: 'Ruby Version',
          value: RUBY_VERSION,
          inline: true
        },
        {
          name: 'Servers',
          value: bot.status[:guild_count].to_s,
          inline: true
        }
      ],
      timestamp: Time.now.iso8601,
      footer: {
        text: 'Built with ❤️ using DiscordRDA'
      }
    }
    
    interaction.respond(embeds: [embed])
  end
end

# Slash command: echo
bot.slash('echo', 'Echo a message') do |cmd|
  cmd.string('message', 'Message to echo', required: true)
  cmd.boolean('ephemeral', 'Only visible to you')
  
  cmd.handler do |interaction|
    message = interaction.option('message')
    ephemeral = interaction.option('ephemeral') || false
    
    interaction.respond(
      content: message,
      ephemeral: ephemeral
    )
  end
end

# Slash command: serverinfo
bot.slash('serverinfo', 'Get server information') do |cmd|
  cmd.handler do |interaction|
    guild = bot.guild(interaction.guild_id)
    
    owner = bot.user(guild.owner_id)
    
    embed = {
      title: guild.name,
      thumbnail: { url: guild.icon_url },
      color: 0x7289da,
      fields: [
        {
          name: 'Owner',
          value: owner.mention,
          inline: true
        },
        {
          name: 'Members',
          value: guild.member_count.to_s,
          inline: true
        },
        {
          name: 'Created',
          value: "<t:#{guild.created_at.to_i}:R>",
          inline: true
        },
        {
          name: 'Channels',
          value: bot.guild_channels(guild.id).length.to_s,
          inline: true
        },
        {
          name: 'Roles',
          value: guild.roles.length.to_s,
          inline: true
        }
      ],
      footer: {
        text: "ID: #{guild.id}"
      }
    }
    
    interaction.respond(embeds: [embed])
  end
end

# Member join handler
bot.on(:guild_member_add) do |event|
  member = event.member
  guild = bot.guild(event.guild_id)
  
  puts "#{member.user.username} joined #{guild.name}"
  
  # Find welcome channel (you'd store this in config)
  # For this example, we'll skip sending
end

# Error handling
bot.on(:dispatch) do |event|
  # Log all events in debug mode
  # puts "[#{Time.now}] #{event.type}"
end

# Start the bot
puts "Starting bot..."
bot.run
```

## Running the Bot

```bash
# Install dependencies
bundle install

# Set environment variables (or use .env file)
export DISCORD_TOKEN="your_token"
export DISCORD_APP_ID="your_app_id"

# Run the bot
ruby bot.rb
```

## Expected Output

```
Starting bot...
✅ Bot is ready!
Logged in as: MyBot#1234
ID: 123456789012345678
```

## Features

- ✅ Responds to message commands (`!ping`, `!hello`, etc.)
- ✅ Modern slash commands (`/ping`, `/hello`, etc.)
- ✅ Rich embeds
- ✅ Presence/activity status
- ✅ Member join logging
- ✅ Error handling

## Next Steps

- Add more commands
- Add a database
- Add moderation features
- Set up sharding for growth

## See Also

- [Quick Start Guide](../getting-started/quick-start)
- [Bot Concepts](../core-concepts/bot)
- [Slash Commands](../interactions/slash-commands)
