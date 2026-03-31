---
title: Modals
description: Form modals for user input
---

## What are Modals?

Modals are popup forms that collect user input through text fields.

## Showing a Modal

```ruby
bot.slash('feedback', 'Submit feedback') do |cmd|
  cmd.handler do |interaction|
    interaction.modal(
      custom_id: 'feedback_modal',
      title: 'Send Feedback'
    ) do |modal|
      modal.short(
        custom_id: 'subject',
        label: 'Subject',
        placeholder: 'Brief summary',
        required: true,
        max_length: 100
      )
      modal.paragraph(
        custom_id: 'message',
        label: 'Your feedback',
        placeholder: 'Detailed description...',
        required: true,
        min_length: 10,
        max_length: 1000
      )
    end
  end
end
```

## Handling Modal Submission

```ruby
bot.on(:modal_submit) do |interaction|
  if interaction.custom_id == 'feedback_modal'
    subject = interaction.modal_value('subject')
    message = interaction.modal_value('message')
    
    # Save to database
    Feedback.create(
      user_id: interaction.user.id,
      subject: subject,
      message: message
    )
    
    interaction.respond(content: 'Thank you for your feedback!', ephemeral: true)
  end
end
```

## Input Types

### Short Input

Single-line text input:

```ruby
modal.short(
  custom_id: 'username',
  label: 'Username',
  placeholder: 'Enter username',
  required: true,
  min_length: 3,
  max_length: 32
)
```

### Paragraph Input

Multi-line text area:

```ruby
modal.paragraph(
  custom_id: 'description',
  label: 'Description',
  placeholder: 'Enter detailed description...',
  required: false,
  max_length: 2000
)
```

## Complex Modal Example

```ruby
bot.slash('report', 'Report a user') do |cmd|
  cmd.user('user', 'User to report', required: true)
  
  cmd.handler do |interaction|
    target_user = interaction.option('user')
    
    interaction.modal(
      custom_id: "report:#{target_user.id}",
      title: "Report #{target_user.username}"
    ) do |modal|
      modal.short(
        custom_id: 'reason_type',
        label: 'Reason',
        required: true
      )
      modal.paragraph(
        custom_id: 'details',
        label: 'Additional Details',
        placeholder: 'Provide evidence, links, context...'
      )
    end
  end
end

bot.on(:modal_submit) do |interaction|
  if interaction.custom_id.start_with?('report:')
    reported_user_id = interaction.custom_id.split(':').last
    reason = interaction.modal_value('reason_type')
    details = interaction.modal_value('details')
    
    Report.create(
      reporter_id: interaction.user.id,
      reported_user_id: reported_user_id,
      reason: reason,
      details: details
    )
    
    interaction.respond(content: 'Report submitted to moderators.', ephemeral: true)
  end
end
```

## Modal Validation

```ruby
bot.on(:modal_submit) do |interaction|
  if interaction.custom_id == 'signup_modal'
    email = interaction.modal_value('email')
    
    unless valid_email?(email)
      # Show error by responding with ephemeral message
      interaction.respond(
        content: '❌ Invalid email format. Please try again.',
        ephemeral: true
      )
      next
    end
    
    # Process valid submission
    User.create(email: email, name: interaction.modal_value('name'))
    interaction.respond(content: '✅ Signup successful!', ephemeral: true)
  end
end

def valid_email?(email)
  email.match?(/\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i)
end
```
