---
sidebar_position: 2
---

# Command Bot Example

A bot with a comprehensive command system, permissions, and moderation features.

## Project Structure

```
command_bot/
├── Gemfile
├── bot.rb
├── config.rb
├── commands/
│   ├── moderation.rb
│   ├── utility.rb
│   └── fun.rb
└── .env
```

## Files

### Gemfile

```ruby
source 'https://rubygems.org'

gem 'discord_rda'
gem 'dotenv'
gem 'sqlite3'
```

### config.rb

```ruby
require 'dotenv'
Dotenv.load

module BotConfig
  TOKEN = ENV['DISCORD_TOKEN']
  APP_ID = ENV['DISCORD_APP_ID']
  
  INTENTS = [
    :guilds,
    :guild_messages,
    :message_content,
    :guild_members,
    :guild_moderation
  ]
  
  LOG_LEVEL = ENV['RACK_ENV'] == 'development' ? :debug : :info
  
  MODERATOR_ROLES = ['Admin', 'Moderator']
  LOG_CHANNEL = ENV['LOG_CHANNEL_ID']
end
```

### commands/moderation.rb

```ruby
module Commands
  module Moderation
    def self.register(bot)
      # Kick command
      bot.slash('kick', 'Kick a user from the server') do |cmd|
        cmd.user('user', 'User to kick', required: true)
        cmd.string('reason', 'Reason for kick')
        cmd.default_permissions(:kick_members)
        
        cmd.handler do |interaction|
          user = interaction.option('user')
          reason = interaction.option('reason') || 'No reason provided'
          
          # Check if user is kickable
          target_member = bot.guild_member(interaction.guild_id, user.id)
          
          if target_member.permissions.administrator?
            interaction.respond(
              content: '❌ Cannot kick an administrator!',
              ephemeral: true
            )
            return
          end
          
          # Kick the user
          bot.remove_guild_member(
            interaction.guild_id,
            user.id,
            reason: reason
          )
          
          # Log action
          log_moderation_action(
            bot,
            interaction.guild_id,
            'Kick',
            interaction.user,
            user,
            reason
          )
          
          interaction.respond(
            content: "👢 Kicked #{user.username}\n**Reason:** #{reason}",
            ephemeral: true
          )
        end
      end
      
      # Ban command
      bot.slash('ban', 'Ban a user from the server') do |cmd|
        cmd.user('user', 'User to ban', required: true)
        cmd.string('reason', 'Reason for ban')
        cmd.integer('days', 'Days of messages to delete (0-7)',
          min_value: 0,
          max_value: 7
        )
        cmd.default_permissions(:ban_members)
        
        cmd.handler do |interaction|
          user = interaction.option('user')
          reason = interaction.option('reason') || 'No reason provided'
          days = interaction.option('days') || 0
          
          # Ban the user
          bot.create_guild_ban(
            interaction.guild_id,
            user.id,
            delete_message_days: days,
            reason: reason
          )
          
          # Log action
          log_moderation_action(
            bot,
            interaction.guild_id,
            'Ban',
            interaction.user,
            user,
            reason
          )
          
          interaction.respond(
            content: "🔨 Banned #{user.username}\n**Reason:** #{reason}\n**Delete Messages:** #{days} days",
            ephemeral: true
          )
        end
      end
      
      # Mute command (timeout)
      bot.slash('mute', 'Timeout a user') do |cmd|
        cmd.user('user', 'User to mute', required: true)
        cmd.integer('minutes', 'Duration in minutes', required: true)
        cmd.string('reason', 'Reason')
        cmd.default_permissions(:moderate_members)
        
        cmd.handler do |interaction|
          user = interaction.option('user')
          minutes = interaction.option('minutes')
          reason = interaction.option('reason') || 'No reason'
          
          # Calculate timeout until
          timeout_until = Time.now + (minutes * 60)
          
          # Apply timeout
          bot.modify_guild_member(
            interaction.guild_id,
            user.id,
            communication_disabled_until: timeout_until.iso8601
          )
          
          log_moderation_action(
            bot,
            interaction.guild_id,
            'Mute',
            interaction.user,
            user,
            "#{minutes}min - #{reason}"
          )
          
          interaction.respond(
            content: "🔇 Muted #{user.username} for #{minutes} minutes",
            ephemeral: true
          )
        end
      end
      
      # Purge command
      bot.slash('purge', 'Delete multiple messages') do |cmd|
        cmd.integer('amount', 'Number of messages to delete',
          required: true,
          min_value: 1,
          max_value: 100
        )
        cmd.user('user', 'Only delete messages from this user')
        cmd.default_permissions(:manage_messages)
        
        cmd.handler do |interaction|
          amount = interaction.option('amount')
          target_user = interaction.option('user')
          
          # Defer since this might take a moment
          interaction.defer(ephemeral: true)
          
          # Get messages
          messages = bot.channel_messages(
            interaction.channel_id,
            limit: amount
          )
          
          # Filter by user if specified
          if target_user
            messages = messages.select { |m| m.author.id == target_user.id }
          end
          
          # Must be 2-100 messages for bulk delete
          if messages.length < 2
            interaction.edit_original(
              content: 'Not enough messages to delete (need at least 2)'
            )
            return
          end
          
          # Delete messages
          bot.bulk_delete_messages(
            interaction.channel_id,
            messages.map(&:id)
          )
          
          log_moderation_action(
            bot,
            interaction.guild_id,
            'Purge',
            interaction.user,
            nil,
            "Deleted #{messages.length} messages"
          )
          
          interaction.edit_original(
            content: "🗑️ Deleted #{messages.length} messages"
          )
        end
      end
      
      # Warn command
      bot.slash('warn', 'Warn a user') do |cmd|
        cmd.user('user', 'User to warn', required: true)
        cmd.string('reason', 'Reason for warning', required: true)
        cmd.default_permissions(:kick_members)
        
        cmd.handler do |interaction|
          user = interaction.option('user')
          reason = interaction.option('reason')
          
          # Store warning (in production, use database)
          warn_id = store_warning(
            guild_id: interaction.guild_id,
            user_id: user.id,
            moderator_id: interaction.user.id,
            reason: reason
          )
          
          # Count total warnings
          total_warns = count_warnings(interaction.guild_id, user.id)
          
          # DM the user
          begin
            bot.send_message(
              user.id,
              "You received a warning in **#{interaction.guild.name}**\n" \
              "**Reason:** #{reason}\n" \
              "**Total warnings:** #{total_warns}"
            )
          rescue
            # Can't DM user
          end
          
          log_moderation_action(
            bot,
            interaction.guild_id,
            'Warning',
            interaction.user,
            user,
            reason
          )
          
          interaction.respond(
            content: "⚠️ Warned #{user.username}\n**Reason:** #{reason}\n**Total warnings:** #{total_warns}",
            ephemeral: true
          )
        end
      end
      
      # Warnings command
      bot.slash('warnings', 'View user warnings') do |cmd|
        cmd.user('user', 'User to check', required: true)
        cmd.default_permissions(:kick_members)
        
        cmd.handler do |interaction|
          user = interaction.option('user')
          
          warnings = get_warnings(interaction.guild_id, user.id)
          
          if warnings.empty?
            interaction.respond(
              content: "#{user.username} has no warnings",
              ephemeral: true
            )
            return
          end
          
          list = warnings.map do |w|
            "**##{w[:id]}** - #{w[:reason]}\n" \
            "By <@#{w[:moderator_id]}> - <t:#{w[:timestamp].to_i}:R>"
          end.join("\n\n")
          
          interaction.respond(
            content: "⚠️ Warnings for #{user.username} (#{warnings.length} total):\n\n#{list}",
            ephemeral: true
          )
        end
      end
    end
    
    private
    
    def self.log_moderation_action(bot, guild_id, action, moderator, target, reason)
      return unless BotConfig::LOG_CHANNEL
      
      target_text = target ? "#{target.username} (#{target.id})" : 'N/A'
      
      embed = {
        title: "#{action} Action",
        color: case action
               when 'Ban' then 0xff0000
               when 'Kick' then 0xffa500
               when 'Mute' then 0xffff00
               else 0x808080
               end,
        fields: [
          { name: 'Moderator', value: "#{moderator.username} (#{moderator.id})", inline: true },
          { name: 'Target', value: target_text, inline: true },
          { name: 'Reason', value: reason, inline: false }
        ],
        timestamp: Time.now.iso8601
      }
      
      bot.send_message(
        BotConfig::LOG_CHANNEL,
        '',
        embeds: [embed]
      )
    end
    
    # In production, use a database
    @@warnings = []
    
    def self.store_warning(data)
      @@warnings << data.merge(id: @@warnings.length + 1, timestamp: Time.now)
      @@warnings.length
    end
    
    def self.count_warnings(guild_id, user_id)
      @@warnings.count { |w| w[:guild_id] == guild_id && w[:user_id] == user_id }
    end
    
    def self.get_warnings(guild_id, user_id)
      @@warnings.select { |w| w[:guild_id] == guild_id && w[:user_id] == user_id }
    end
  end
end
```

### commands/utility.rb

```ruby
module Commands
  module Utility
    def self.register(bot)
      # User info
      bot.slash('userinfo', 'Get user information') do |cmd|
        cmd.user('user', 'User to look up')
        
        cmd.handler do |interaction|
          user = interaction.option('user') || interaction.user
          member = user.id == interaction.user.id ? 
                   interaction.member : 
                   bot.guild_member(interaction.guild_id, user.id)
          
          embed = {
            title: user.username,
            thumbnail: { url: user.avatar_url },
            color: 0x7289da,
            fields: [
              { name: 'ID', value: user.id, inline: true },
              { name: 'Created', value: "<t:#{user.created_at.to_i}:R>", inline: true }
            ]
          }
          
          if member
            embed[:fields].concat([
              { name: 'Nickname', value: member.nick || 'None', inline: true },
              { name: 'Joined', value: "<t:#{member.joined_at.to_i}:R>", inline: true },
              { name: 'Roles', value: member.roles.length.to_s, inline: true },
              { name: 'Boosting Since', value: member.premium_since ? "<t:#{member.premium_since.to_i}:R>" : 'Not boosting', inline: true }
            ])
          end
          
          interaction.respond(embeds: [embed], ephemeral: true)
        end
      end
      
      # Avatar command
      bot.slash('avatar', 'Get user avatar') do |cmd|
        cmd.user('user', 'User to get avatar of')
        
        cmd.handler do |interaction|
          user = interaction.option('user') || interaction.user
          
          embed = {
            title: "#{user.username}'s Avatar",
            image: { url: user.avatar_url(size: 4096) },
            color: 0x7289da
          }
          
          interaction.respond(embeds: [embed])
        end
      end
      
      # Poll command
      bot.slash('poll', 'Create a poll') do |cmd|
        cmd.string('question', 'Poll question', required: true)
        cmd.string('option1', 'First option', required: true)
        cmd.string('option2', 'Second option', required: true)
        cmd.string('option3', 'Third option')
        cmd.string('option4', 'Fourth option')
        
        cmd.handler do |interaction|
          question = interaction.option('question')
          options = [
            interaction.option('option1'),
            interaction.option('option2'),
            interaction.option('option3'),
            interaction.option('option4')
          ].compact
          
          emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣']
          
          options_text = options.map.with_index do |opt, i|
            "#{emojis[i]} #{opt}"
          end.join("\n")
          
          message = interaction.respond(
            content: "📊 **#{question}**\n\n#{options_text}"
          )
          
          # Add reactions
          options.length.times do |i|
            bot.add_reaction(interaction.channel_id, message.id, emojis[i])
          end
        end
      end
      
      # Remind command
      bot.slash('remind', 'Set a reminder') do |cmd|
        cmd.string('message', 'What to remind you about', required: true)
        cmd.integer('minutes', 'Minutes from now', required: true, min_value: 1)
        
        cmd.handler do |interaction|
          message = interaction.option('message')
          minutes = interaction.option('minutes')
          
          remind_at = Time.now + (minutes * 60)
          
          # Schedule reminder
          Thread.new do
            sleep(minutes * 60)
            
            begin
              bot.send_message(
                interaction.channel_id,
                "⏰ #{interaction.user.mention} Reminder: #{message}"
              )
            rescue
              # Channel no longer accessible
            end
          end
          
          interaction.respond(
            content: "⏰ I'll remind you in #{minutes} minutes (<t:#{remind_at.to_i}:R>)",
            ephemeral: true
          )
        end
      end
    end
  end
end
```

### commands/fun.rb

```ruby
module Commands
  module Fun
    def self.register(bot)
      # 8ball
      bot.slash('8ball', 'Ask the magic 8-ball') do |cmd|
        cmd.string('question', 'Your question', required: true)
        
        cmd.handler do |interaction|
          responses = [
            'It is certain.',
            'It is decidedly so.',
            'Without a doubt.',
            'Yes definitely.',
            'You may rely on it.',
            'As I see it, yes.',
            'Most likely.',
            'Outlook good.',
            'Yes.',
            'Signs point to yes.',
            'Reply hazy, try again.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.',
            "Don't count on it.",
            'My reply is no.',
            'My sources say no.',
            'Outlook not so good.',
            'Very doubtful.'
          ]
          
          question = interaction.option('question')
          answer = responses.sample
          
          embed = {
            title: '🎱 Magic 8-Ball',
            fields: [
              { name: 'Question', value: question },
              { name: 'Answer', value: answer }
            ],
            color: 0x4b0082
          }
          
          interaction.respond(embeds: [embed])
        end
      end
      
      # Roll dice
      bot.slash('roll', 'Roll dice') do |cmd|
        cmd.integer('sides', 'Number of sides', min_value: 2, max_value: 100)
        cmd.integer('count', 'Number of dice', min_value: 1, max_value: 10)
        
        cmd.handler do |interaction|
          sides = interaction.option('sides') || 6
          count = interaction.option('count') || 1
          
          rolls = count.times.map { rand(1..sides) }
          total = rolls.sum
          
          if count == 1
            result = "🎲 Rolled **#{rolls.first}** (d#{sides})"
          else
            result = "🎲 Rolled: #{rolls.join(', ')}\n**Total:** #{total}"
          end
          
          interaction.respond(content: result)
        end
      end
      
      # Coin flip
      bot.slash('coinflip', 'Flip a coin') do |cmd|
        cmd.handler do |interaction|
          result = ['Heads', 'Tails'].sample
          emoji = result == 'Heads' ? '👤' : '🦅'
          
          interaction.respond(content: "#{emoji} **#{result}**")
        end
      end
      
      # Choose
      bot.slash('choose', 'Choose between options') do |cmd|
        cmd.string('options', 'Comma-separated options', required: true)
        
        cmd.handler do |interaction|
          options = interaction.option('options').split(',').map(&:strip)
          
          if options.length < 2
            interaction.respond(
              content: '❌ Please provide at least 2 options separated by commas',
              ephemeral: true
            )
            return
          end
          
          choice = options.sample
          
          interaction.respond(
            content: "🤔 I choose: **#{choice}**"
          )
        end
      end
    end
  end
end
```

### bot.rb

```ruby
require 'discord_rda'
require_relative 'config'
require_relative 'commands/moderation'
require_relative 'commands/utility'
require_relative 'commands/fun'

# Create bot
bot = DiscordRDA::Bot.new(
  token: BotConfig::TOKEN,
  application_id: BotConfig::APP_ID,
  intents: BotConfig::INTENTS,
  log_level: BotConfig::LOG_LEVEL
)

# Register commands
Commands::Moderation.register(bot)
Commands::Utility.register(bot)
Commands::Fun.register(bot)

# Ready event
bot.on(:ready) do |event|
  puts "✅ Command Bot ready!"
  puts "Logged in as: #{event.user.username}"
  puts "Guilds: #{bot.status[:guild_count]}"
end

# Error handling
bot.on(:dispatch) do |event|
  begin
    # Let it process
  rescue => e
    puts "Error handling event: #{e.message}"
    puts e.backtrace.first(5)
  end
end

puts "Starting command bot..."
bot.run
```

## Running

```bash
bundle install
export DISCORD_TOKEN="your_token"
export DISCORD_APP_ID="your_app_id"
ruby bot.rb
```

## Features

- ✅ Moderation: kick, ban, mute, warn, purge
- ✅ Utility: userinfo, avatar, poll, remind
- ✅ Fun: 8ball, roll, coinflip, choose
- ✅ Permission checks
- ✅ Logging
- ✅ DM notifications for warnings

## See Also

- [Moderation Concepts](../interactions/slash-commands)
- [Slash Commands Guide](../interactions/slash-commands)
- [Basic Bot Example](./basic-bot)
