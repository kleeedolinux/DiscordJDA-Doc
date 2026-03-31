---
layout: doc
title: Autocomplete
description: Real-time autocomplete for slash commands
permalink: /slash-commands/autocomplete/
---


## What is Autocomplete?

Autocomplete provides real-time suggestions as users type in command options.

## Basic Autocomplete

```ruby
bot.slash('search', 'Search items') do |cmd|
  cmd.string('query', 'Search term', required: true, autocomplete: true)
  
  cmd.handler do |interaction|
    query = interaction.option('query')
    results = perform_search(query)
    interaction.respond(content: "Found: #{results.join(', ')}")
  end
end

# Handle autocomplete
bot.on(:autocomplete) do |interaction|
  next unless interaction.command_name == 'search'
  
  query = interaction.focused_option.value.downcase
  
  choices = ITEM_DATABASE
    .select { |item| item.downcase.include?(query) }
    .first(25) # Discord max is 25 choices
    .map { |item| { name: item, value: item } }
  
  interaction.respond_autocomplete(choices)
end
```

## Dynamic Autocomplete

```ruby
# Database search autocomplete
bot.on(:autocomplete) do |interaction|
  case interaction.command_name
  when 'user_lookup'
    query = interaction.focused_option.value
    users = User.where('username ILIKE ?', "%#{query}%").limit(25)
    
    choices = users.map do |user|
      { name: "#{user.username} (ID: #{user.id})", value: user.id.to_s }
    end
    
    interaction.respond_autocomplete(choices)
    
  when 'role_lookup'
    query = interaction.focused_option.value.downcase
    guild = interaction.guild
    
    choices = guild.roles
      .select { |r| r.name.downcase.include?(query) }
      .first(25)
      .map { |r| { name: r.name, value: r.id.to_s } }
    
    interaction.respond_autocomplete(choices)
  end
end
```

## Cached Autocomplete

For expensive lookups, cache the results:

```ruby
require 'concurrent'

class AutocompleteCache
  def initialize
    @cache = Concurrent::Hash.new
  end
  
  def fetch(key, ttl: 60)
    cached = @cache[key]
    return cached[:value] if cached && cached[:expires_at] > Time.now
    
    value = yield
    @cache[key] = { value: value, expires_at: Time.now + ttl }
    value
  end
end

cache = AutocompleteCache.new

bot.on(:autocomplete) do |interaction|
  query = interaction.focused_option.value
  
  choices = cache.fetch("search:#{query}", ttl: 30) do
    perform_expensive_search(query)
  end
  
  interaction.respond_autocomplete(choices)
end
```

## Focused Option

Get which option the user is currently typing:

```ruby
bot.on(:autocomplete) do |interaction|
  focused = interaction.focused_option
  
  puts "User is typing in: #{focused.name}"
  puts "Current value: #{focused.value}"
  
  # Provide context-aware suggestions
  case focused.name
  when 'country'
    # Suggest countries
  when 'city'
    # Suggest cities based on selected country
    country = interaction.option('country')
    suggest_cities(country, focused.value)
  end
end
```
