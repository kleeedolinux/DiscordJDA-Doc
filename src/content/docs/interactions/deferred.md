---
title: Deferred Responses
description: Handle long-running operations
---

## Why Defer?

Discord requires responses within 3 seconds. For slow operations, defer the response first.

## Basic Defer

```ruby
bot.slash('slow', 'Long running command') do |cmd|
  cmd.handler do |interaction|
    # Acknowledge immediately
    interaction.defer(ephemeral: true)
    
    # Do slow work (can take up to 15 minutes)
    result = perform_slow_operation
    
    # Send actual response
    interaction.edit_original(content: "Done! Result: #{result}")
  end
end
```

## Deferred with Loading State

```ruby
bot.slash('generate', 'Generate image') do |cmd|
  cmd.string('prompt', 'Image description', required: true)
  
  cmd.handler do |interaction|
    prompt = interaction.option('prompt')
    
    # Defer with thinking state
    interaction.defer
    
    # Show progress updates
    interaction.edit_original(content: '⏳ Generating image...')
    
    image = generate_image(prompt)
    
    interaction.edit_original(
      content: "Generated: #{prompt}",
      attachments: [image]
    )
  end
end
```

## Ephemeral Defer

```ruby
bot.slash('admin', 'Admin command') do |cmd|
  cmd.default_permissions(:administrator)
  
  cmd.handler do |interaction|
    # Only the command user sees the "thinking" state
    interaction.defer(ephemeral: true)
    
    # Perform admin operation
    audit_log = perform_audit
    
    interaction.edit_original(
      content: "✅ Operation complete.\n```\n#{audit_log}\n```",
      ephemeral: true
    )
  end
end
```

## Progress Updates

```ruby
class ProgressTracker
  def initialize(interaction)
    @interaction = interaction
    @steps = 0
    @total = 100
  end
  
  def update(step, message)
    @steps = step
    percentage = (@steps.to_f / @total * 100).round
    bar = '█' * (percentage / 5) + '░' * (20 - percentage / 5)
    
    @interaction.edit_original(
      content: "#{message}\n`#{bar}` #{percentage}%"
    )
  end
end

bot.slash('process', 'Process data') do |cmd|
  cmd.handler do |interaction|
    interaction.defer
    
    progress = ProgressTracker.new(interaction)
    
    items = fetch_items
    total = items.length
    
    items.each_with_index do |item, idx|
      process_item(item)
      
      # Update every 10 items
      if idx % 10 == 0
        progress.update(idx, "Processing item #{idx}/#{total}")
      end
    end
    
    interaction.edit_original(content: '✅ All items processed!')
  end
end
```

## Webhook Follow-ups

After deferring, you can send follow-up messages:

```ruby
bot.slash('notify', 'Send notifications') do |cmd|
  cmd.handler do |interaction|
    interaction.defer(ephemeral: true)
    
    # Initial response
    interaction.edit_original(content: 'Processing notifications...')
    
    users = fetch_users
    
    users.each do |user|
      send_notification(user)
      
      # Send follow-up for each notification
      interaction.send_followup(
        content: "✅ Notified #{user.username}",
        ephemeral: true
      )
    end
    
    interaction.send_followup(content: 'All notifications sent!')
  end
end
```
