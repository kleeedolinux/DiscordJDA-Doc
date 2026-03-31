---
sidebar_position: 4
---

# Modals

Modals (also called Form Interactions) provide a pop-up form for collecting user input. They're ideal for multi-field data collection.

## When to Use Modals

Use modals when you need:
- Multiple input fields
- Large text input (paragraphs)
- Complex data collection
- Confirmation with notes

## Creating a Modal

### Basic Modal

```ruby
bot.slash('feedback', 'Submit feedback') do |cmd|
  cmd.handler do |interaction|
    # Open a modal
    interaction.modal(
      custom_id: 'feedback_modal',
      title: 'Send Feedback'
    ) do |modal|
      # Add text inputs
      modal.short(
        custom_id: 'subject',
        label: 'Subject',
        required: true,
        max_length: 100
      )
      
      modal.paragraph(
        custom_id: 'message',
        label: 'Your feedback',
        required: true,
        max_length: 1000
      )
    end
  end
end
```

### Handling Modal Submission

```ruby
bot.on(:modal_submit) do |interaction|
  # Check which modal was submitted
  next unless interaction.custom_id == 'feedback_modal'
  
  # Get values from inputs
  subject = interaction.modal_value('subject')
  message = interaction.modal_value('message')
  
  # Process the feedback
  save_feedback(
    user_id: interaction.user.id,
    subject: subject,
    message: message
  )
  
  # Respond (must respond to modal submissions)
  interaction.respond(
    content: 'Thank you for your feedback!',
    ephemeral: true
  )
end
```

## Text Input Types

### Short Input

Single-line text input:

```ruby
modal.short(
  custom_id: 'username',
  label: 'Username',
  placeholder: 'Enter your username',
  required: true,
  min_length: 3,
  max_length: 32,
  value: 'default_value'  # Pre-filled value
)
```

### Paragraph Input

Multi-line text area:

```ruby
modal.paragraph(
  custom_id: 'description',
  label: 'Description',
  placeholder: 'Enter a detailed description...',
  required: true,
  min_length: 10,
  max_length: 2000
)
```

## Modal Structure

### Maximum Fields

- Up to **5** text input fields per modal
- Mix of `short` and `paragraph` types

```ruby
interaction.modal(
  custom_id: 'application_form',
  title: 'Application Form'
) do |modal|
  # Field 1: Short
  modal.short(
    custom_id: 'name',
    label: 'Full Name',
    required: true
  )
  
  # Field 2: Short
  modal.short(
    custom_id: 'email',
    label: 'Email Address',
    required: true
  )
  
  # Field 3: Paragraph
  modal.paragraph(
    custom_id: 'experience',
    label: 'Previous Experience',
    required: true
  )
  
  # Field 4: Paragraph
  modal.paragraph(
    custom_id: 'why_join',
    label: 'Why do you want to join?',
    required: true
  )
  
  # Field 5: Short (optional)
  modal.short(
    custom_id: 'referral',
    label: 'Referral Code (optional)',
    required: false
  )
end
```

## Opening Modals

Modals can be opened from:

### Slash Commands

```ruby
bot.slash('report', 'Report a bug') do |cmd|
  cmd.handler do |interaction|
    interaction.modal(
      custom_id: 'bug_report_modal',
      title: 'Bug Report'
    ) do |modal|
      modal.short(
        custom_id: 'title',
        label: 'Bug Title',
        required: true
      )
      modal.paragraph(
        custom_id: 'description',
        label: 'Description',
        required: true
      )
    end
  end
end
```

### Button Clicks

```ruby
# Send a message with a button
interaction.respond(content: 'Found an issue?') do |builder|
  builder.components do |row|
    row.button(
      style: :danger,
      label: 'Report Bug',
      custom_id: 'report_bug_btn'
    )
  end
end

# Handle button click
bot.on(:button_click) do |interaction|
  next unless interaction.custom_id == 'report_bug_btn'
  
  interaction.modal(
    custom_id: 'bug_report_modal',
    title: 'Report Bug'
  ) do |modal|
    modal.paragraph(
      custom_id: 'details',
      label: 'What went wrong?',
      required: true
    )
  end
end
```

### Context Menu

```ruby
bot.context_menu(type: :message, name: 'Add Note') do |interaction|
  interaction.modal(
    custom_id: 'note_modal',
    title: 'Add Note'
  ) do |modal|
    modal.paragraph(
      custom_id: 'note_content',
      label: 'Note',
      placeholder: 'Enter your note about this message...',
      required: true
    )
  end
end
```

## Retrieving Modal Values

### Single Value

```ruby
bot.on(:modal_submit) do |interaction|
  value = interaction.modal_value('field_custom_id')
  puts value  # => "User's input"
end
```

### All Values

```ruby
bot.on(:modal_submit) do |interaction|
  # Get all values as a hash
  values = interaction.modal_values
  # => { 'subject' => '...', 'message' => '...' }
  
  values.each do |field_id, value|
    puts "#{field_id}: #{value}"
  end
end
```

### Checking Fields

```ruby
bot.on(:modal_submit) do |interaction|
  # Check if field exists
  if interaction.has_modal_value?('optional_field')
    value = interaction.modal_value('optional_field')
  end
end
```

## Validation

### Client-Side Validation

Discord enforces these at the UI level:

```ruby
modal.short(
  custom_id: 'age',
  label: 'Age',
  min_length: 1,      # Minimum characters
  max_length: 3,      # Maximum characters
  required: true      # Must be filled
)
```

### Server-Side Validation

Always validate on the server too:

```ruby
bot.on(:modal_submit) do |interaction|
  age = interaction.modal_value('age')
  
  # Validate
  unless age =~ /^\d+$/
    interaction.respond(
      content: '❌ Age must be a number!',
      ephemeral: true
    )
    return
  end
  
  age_num = age.to_i
  unless (13..120).include?(age_num)
    interaction.respond(
      content: '❌ Age must be between 13 and 120!',
      ephemeral: true
    )
    return
  end
  
  # Process valid data
  interaction.respond(content: "Age set to #{age_num}")
end
```

## Advanced Patterns

### Multi-Step Forms

Chain multiple modals for complex workflows:

```ruby
bot.slash('setup', 'Server setup wizard') do |cmd|
  cmd.handler do |interaction|
    # Step 1: Basic info
    interaction.modal(
      custom_id: 'setup_step_1',
      title: 'Setup (Step 1/3)'
    ) do |modal|
      modal.short(
        custom_id: 'server_name',
        label: 'Server Name',
        required: true
      )
    end
  end
end

bot.on(:modal_submit) do |interaction|
  case interaction.custom_id
  when 'setup_step_1'
    # Save step 1 data
    server_name = interaction.modal_value('server_name')
    
    # Open step 2
    interaction.modal(
      custom_id: 'setup_step_2',
      title: 'Setup (Step 2/3)'
    ) do |modal|
      modal.paragraph(
        custom_id: 'description',
        label: 'Server Description',
        required: true
      )
    end
    
  when 'setup_step_2'
    # Open step 3
    interaction.modal(
      custom_id: 'setup_step_3',
      title: 'Setup (Step 3/3)'
    ) do |modal|
      modal.short(
        custom_id: 'rules_channel',
        label: 'Rules Channel Name',
        required: true
      )
    end
    
  when 'setup_step_3'
    # Complete
    interaction.respond(
      content: '✅ Setup complete!',
      ephemeral: true
    )
  end
end
```

### Confirmation Modal

```ruby
def confirm_with_note(interaction, action)
  interaction.modal(
    custom_id: 'confirm_modal',
    title: 'Confirm Action'
  ) do |modal|
    modal.paragraph(
      custom_id: 'reason',
      label: 'Reason for #{action}',
      placeholder: 'Optional note...',
      required: false
    )
  end
end

bot.on(:modal_submit) do |interaction|
  next unless interaction.custom_id == 'confirm_modal'
  
  reason = interaction.modal_value('reason')
  
  if reason && !reason.empty?
    interaction.respond(content: "Action confirmed. Note: #{reason}")
  else
    interaction.respond(content: 'Action confirmed.')
  end
end
```

### Pre-filled Data

```ruby
# Open modal with existing data
interaction.modal(
  custom_id: 'edit_profile',
  title: 'Edit Profile'
) do |modal|
  modal.short(
    custom_id: 'display_name',
    label: 'Display Name',
    value: current_name,  # Pre-filled
    required: true
  )
  
  modal.paragraph(
    custom_id: 'bio',
    label: 'Bio',
    value: current_bio,  # Pre-filled
    required: false
  )
end
```

## Error Handling

### Required Response

You **must** respond to modal submissions within 3 seconds:

```ruby
bot.on(:modal_submit) do |interaction|
  begin
    # Defer if processing takes time
    interaction.defer(ephemeral: true)
    
    # Do work
    result = process_data(interaction.modal_values)
    
    # Edit the deferred response
    interaction.edit_original(content: "Result: #{result}")
    
  rescue => e
    interaction.edit_original(
      content: "❌ Error: #{e.message}"
    )
  end
end
```

### Invalid Custom ID

```ruby
bot.on(:modal_submit) do |interaction|
  # Route to appropriate handler
  case interaction.custom_id
  when /^feedback_/
    handle_feedback(interaction)
  when /^report_/
    handle_report(interaction)
  when /^application_/
    handle_application(interaction)
  else
    interaction.respond(
      content: 'Unknown form type',
      ephemeral: true
    )
  end
end
```

## Best Practices

1. **Keep titles short** - Discord limits to 45 characters
2. **Clear field labels** - Users should understand what's needed
3. **Use appropriate types** - Short for brief input, paragraph for long
4. **Validate server-side** - Always double-check input
5. **Handle errors gracefully** - Inform users of issues
6. **Pre-fill when editing** - Show existing values
7. **Use placeholders** - Give examples of expected input

## Complete Examples

### Bug Report System

```ruby
require 'discord_rda'

bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  application_id: ENV['DISCORD_APP_ID'],
  intents: [:guilds]
)

# Report command
bot.slash('bug', 'Report a bug') do |cmd|
  cmd.handler do |interaction|
    interaction.modal(
      custom_id: 'bug_report',
      title: 'Bug Report'
    ) do |modal|
      modal.short(
        custom_id: 'title',
        label: 'Bug Title',
        placeholder: 'Brief description',
        required: true,
        max_length: 100
      )
      
      modal.short(
        custom_id: 'severity',
        label: 'Severity',
        placeholder: 'Low/Medium/High/Critical',
        required: true
      )
      
      modal.paragraph(
        custom_id: 'steps',
        label: 'Steps to Reproduce',
        placeholder: '1. Go to...\n2. Click...\n3. See error...',
        required: true
      )
      
      modal.paragraph(
        custom_id: 'expected',
        label: 'Expected Behavior',
        required: true
      )
      
      modal.short(
        custom_id: 'contact',
        label: 'Discord Username (for follow-up)',
        required: false
      )
    end
  end
end

# Store reports
bug_reports = []

bot.on(:modal_submit) do |interaction|
  next unless interaction.custom_id == 'bug_report'
  
  report = {
    id: bug_reports.length + 1,
    user_id: interaction.user.id,
    username: interaction.user.username,
    title: interaction.modal_value('title'),
    severity: interaction.modal_value('severity'),
    steps: interaction.modal_value('steps'),
    expected: interaction.modal_value('expected'),
    contact: interaction.modal_value('contact'),
    timestamp: Time.now,
    status: 'open'
  }
  
  bug_reports << report
  
  # Send to admin channel
  admin_channel = '123456789'
  admin_msg = <<~MSG
    **New Bug Report ##{report[:id]}**
    **From:** #{interaction.user.mention}
    **Title:** #{report[:title]}
    **Severity:** #{report[:severity]}
    
    **Steps:**
    #{report[:steps]}
    
    **Expected:**
    #{report[:expected]}
  MSG
  
  bot.send_message(admin_channel, admin_msg)
  
  # Confirm to user
  interaction.respond(
    content: "✅ Bug report ##{report[:id]} submitted! We'll investigate.",
    ephemeral: true
  )
end

bot.run
```

### Application System

```ruby
bot.slash('apply', 'Apply for staff') do |cmd|
  cmd.handler do |interaction|
    # Check if already applied
    if has_pending_application?(interaction.user.id)
      interaction.respond(
        content: 'You already have a pending application!',
        ephemeral: true
      )
      return
    end
    
    interaction.modal(
      custom_id: 'staff_application',
      title: 'Staff Application'
    ) do |modal|
      modal.short(
        custom_id: 'age',
        label: 'Age',
        required: true
      )
      
      modal.short(
        custom_id: 'timezone',
        label: 'Timezone',
        placeholder: 'e.g., EST, PST, GMT+1',
        required: true
      )
      
      modal.paragraph(
        custom_id: 'experience',
        label: 'Moderation Experience',
        required: true
      )
      
      modal.paragraph(
        custom_id: 'why',
        label: 'Why should we choose you?',
        required: true
      )
      
      modal.short(
        custom_id: 'availability',
        label: 'Hours available per week',
        required: true
      )
    end
  end
end

bot.on(:modal_submit) do |interaction|
  next unless interaction.custom_id == 'staff_application'
  
  # Validate age
  age = interaction.modal_value('age').to_i
  
  if age < 16
    interaction.respond(
      content: '❌ You must be at least 16 years old to apply.',
      ephemeral: true
    )
    return
  end
  
  # Save application
  save_application(
    user_id: interaction.user.id,
    age: age,
    timezone: interaction.modal_value('timezone'),
    experience: interaction.modal_value('experience'),
    why: interaction.modal_value('why'),
    availability: interaction.modal_value('availability')
  )
  
  interaction.respond(
    content: "✅ Application submitted! We'll review it soon.",
    ephemeral: true
  )
end
```

## Next Steps

- **[Buttons & Components](./buttons-components)** - Interactive message elements
- **[Autocomplete](./autocomplete)** - Smart suggestions
- **[Slash Commands](./slash-commands)** - Command structure
