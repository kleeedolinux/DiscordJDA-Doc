---
layout: doc
title: Buttons
description: Interactive button components
permalink: /interactions/buttons/
---


## Button Basics

Buttons are interactive components that users can click.

## Button Styles

| Style | Description |
|-------|-------------|
| `:primary` | Blurple, for main actions |
| `:secondary` | Gray, for secondary actions |
| `:success` | Green, for success/confirmation |
| `:danger` | Red, for destructive actions |
| `:link` | URL buttons that open links |

## Sending Buttons

```ruby
bot.slash('menu', 'Show menu') do |cmd|
  cmd.handler do |interaction|
    interaction.respond(content: 'Choose an action:') do |builder|
      builder.components do |row|
        row.button(style: :primary, label: 'Confirm', custom_id: 'confirm')
        row.button(style: :danger, label: 'Cancel', custom_id: 'cancel')
      end
    end
  end
end
```

## Handling Button Clicks

```ruby
bot.on(:button_click) do |interaction|
  case interaction.custom_id
  when 'confirm'
    interaction.respond(content: 'Confirmed!', ephemeral: true)
  when 'cancel'
    interaction.respond(content: 'Cancelled!', ephemeral: true)
  end
end
```

## URL Buttons

```ruby
interaction.respond(content: 'Visit our documentation:') do |builder|
  builder.components do |row|
    row.button(
      style: :link,
      label: 'Read Docs',
      url: 'https://example.com/docs'
    )
  end
end
```

## Multi-Row Layout

```ruby
interaction.respond(content: 'Control panel:') do |builder|
  builder.components do |row1|
    row1.button(style: :primary, label: 'Play', custom_id: 'play', emoji: '▶️')
    row1.button(style: :secondary, label: 'Pause', custom_id: 'pause', emoji: '⏸️')
    row1.button(style: :secondary, label: 'Stop', custom_id: 'stop', emoji: '⏹️')
  end
  
  builder.components do |row2|
    row2.button(style: :success, label: 'Save', custom_id: 'save')
    row2.button(style: :danger, label: 'Delete', custom_id: 'delete')
  end
end
```

## Disabled Buttons

```ruby
interaction.respond(content: 'Processing...') do |builder|
  builder.components do |row|
    row.button(
      style: :primary,
      label: 'Loading...',
      custom_id: 'loading',
      disabled: true
    )
  end
end
```

## Dynamic Button Responses

```ruby
class PollManager
  def initialize
    @votes = Hash.new(0)
  end
  
  def handle_vote(interaction, option)
    @votes[option] += 1
    
    interaction.update_message do |builder|
      builder.content = "Poll Results:\n#{format_results}"
    end
  end
  
  def format_results
    @votes.map { |opt, count| "#{opt}: #{count} votes" }.join("\n")
  end
end

poll = PollManager.new

bot.slash('poll', 'Create a poll') do |cmd|
  cmd.string('question', 'Poll question', required: true)
  
  cmd.handler do |interaction|
    question = interaction.option('question')
    
    interaction.respond(content: "**#{question}**") do |builder|
      builder.components do |row|
        row.button(style: :primary, label: 'Yes', custom_id: 'poll:yes')
        row.button(style: :primary, label: 'No', custom_id: 'poll:no')
      end
    end
  end
end

bot.on(:button_click) do |interaction|
  if interaction.custom_id.start_with?('poll:')
    option = interaction.custom_id.split(':').last
    poll.handle_vote(interaction, option)
  end
end
```

## Button Timeouts

```ruby
# Buttons stop working after the message is too old
# For persistent buttons, use a database to track state

class PersistentButtonHandler
  def initialize(bot, db)
    @bot = bot
    @db = db
  end
  
  def register_handlers
    @bot.on(:button_click) do |interaction|
      record = @db.find_button(interaction.custom_id)
      next unless record
      
      # Handle based on stored action type
      case record[:action]
      when 'role_toggle'
        toggle_role(interaction, record[:role_id])
      when 'ticket_create'
        create_ticket(interaction)
      end
    end
  end
end
```
