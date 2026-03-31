---
sidebar_position: 5
---

# Autocomplete

Autocomplete provides real-time suggestions as users type in command options. It's essential for commands with many options or dynamic data.

## How Autocomplete Works

When a user focuses on an option with autocomplete enabled:
1. Discord sends an `autocomplete` interaction
2. Your bot responds with matching choices
3. Discord displays choices in a dropdown

```
User types: /role assign role: ad
                  ↓
Discord sends: autocomplete interaction
                  ↓
Bot responds: ["admin", "moderator", "advertiser"]
                  ↓
User sees: ▼ admin
           ▼ moderator
           ▼ advertiser
```

## Enabling Autocomplete

### On Slash Commands

```ruby
bot.slash('role', 'Manage roles') do |cmd|
  # Enable autocomplete on this option
  cmd.string('role_name', 'Role to assign', 
    autocomplete: true,
    required: true
  )
  
  cmd.handler do |interaction|
    role_name = interaction.option('role_name')
    # Handle command...
  end
end
```

## Handling Autocomplete

### Basic Handler

```ruby
bot.on(:autocomplete) do |interaction|
  # Only handle our role command
  next unless interaction.command_name == 'role'
  
  # Get what the user is typing
  focused = interaction.focused_option
  query = focused['value'].downcase
  
  # Find matching roles
  guild = bot.guild(interaction.guild_id)
  roles = guild.roles
    .select { |r| r.name.downcase.include?(query) }
    .first(25)  # Discord limit
  
  # Build choices
  choices = roles.map do |role|
    {
      name: role.name,
      value: role.id  # Use ID as value for accuracy
    }
  end
  
  # Send choices back
  interaction.autocomplete(choices)
end
```

### Filtering by Field

```ruby
bot.on(:autocomplete) do |interaction|
  # Get which option has focus
  focused = interaction.focused_option
  option_name = focused['name']
  query = focused['value'].downcase
  
  choices = case option_name
  when 'role_name'
    search_roles(interaction.guild_id, query)
  when 'channel_name'
    search_channels(interaction.guild_id, query)
  when 'user_name'
    search_users(interaction.guild_id, query)
  else
    []
  end
  
  interaction.autocomplete(choices)
end
```

## Common Patterns

### Static Choices

For predefined lists:

```ruby
COMMANDS = ['ban', 'kick', 'mute', 'warn', 'purge']

bot.slash('help', 'Get command help') do |cmd|
  cmd.string('command', 'Command name', autocomplete: true)
  
  cmd.handler { |i| /* ... */ }
end

bot.on(:autocomplete) do |interaction|
  next unless interaction.command_name == 'help'
  
  query = interaction.focused_option['value'].downcase
  
  choices = COMMANDS
    .select { |c| c.include?(query) }
    .map { |c| { name: c.capitalize, value: c } }
  
  interaction.autocomplete(choices)
end
```

### Database Search

Search your database:

```ruby
bot.slash('tag', 'Send a tag') do |cmd|
  cmd.string('name', 'Tag name', autocomplete: true, required: true)
  cmd.handler { |i| /* ... */ }
end

bot.on(:autocomplete) do |interaction|
  next unless interaction.command_name == 'tag'
  
  query = interaction.focused_option['value']
  
  # Search database
  tags = Tag.where('name ILIKE ?', "%#{query}%")
    .limit(25)
    .pluck(:name, :id)
  
  choices = tags.map do |name, id|
    { name: name, value: id.to_s }
  end
  
  interaction.autocomplete(choices)
end
```

### API Search

Fetch from external APIs:

```ruby
bot.slash('weather', 'Get weather') do |cmd|
  cmd.string('city', 'City name', autocomplete: true, required: true)
  cmd.handler { |i| /* ... */ }
end

bot.on(:autocomplete) do |interaction|
  next unless interaction.command_name == 'weather'
  
  query = interaction.focused_option['value']
  
  # Search cities API
  cities = CityApi.search(query, limit: 25)
  
  choices = cities.map do |city|
    { 
      name: "#{city.name}, #{city.country}",
      value: city.id
    }
  end
  
  interaction.autocomplete(choices)
end
```

### Guild-Specific Data

```ruby
bot.slash('remind', 'Set a reminder') do |cmd|
  cmd.string('preset', 'Use a preset', autocomplete: true)
  cmd.handler { |i| /* ... */ }
end

bot.on(:autocomplete) do |interaction|
  next unless interaction.command_name == 'remind'
  
  guild_id = interaction.guild_id
  query = interaction.focused_option['value']
  
  # Get guild's saved presets
  presets = ReminderPreset.where(guild_id: guild_id)
    .where('name ILIKE ?', "%#{query}%")
    .limit(25)
  
  choices = presets.map do |preset|
    {
      name: "#{preset.name} (#{preset.duration}m)",
      value: preset.id.to_s
    }
  end
  
  interaction.autocomplete(choices)
end
```

## Advanced Patterns

### Fuzzy Matching

Better search with fuzzy matching:

```ruby
require 'fuzzy_match'

NAMES = ['Alice', 'Bob', 'Charlie', 'David', 'Eve']

bot.on(:autocomplete) do |interaction|
  query = interaction.focused_option['value']
  
  matcher = FuzzyMatch.new(NAMES)
  matches = matcher.find_all(query).first(25)
  
  choices = matches.map do |name|
    { name: name, value: name.downcase }
  end
  
  interaction.autocomplete(choices)
end
```

### Caching Results

Cache expensive lookups:

```ruby
# Cache for 5 minutes
AUTOCOMPLETE_CACHE = {}

bot.on(:autocomplete) do |interaction|
  cache_key = "#{interaction.command_name}:#{interaction.guild_id}"
  query = interaction.focused_option['value']
  
  # Check cache
  cached = AUTOCOMPLETE_CACHE[cache_key]
  
  if cached && cached[:expires] > Time.now
    results = cached[:data]
  else
    # Fetch fresh data
    results = fetch_all_items(interaction.guild_id)
    AUTOCOMPLETE_CACHE[cache_key] = {
      data: results,
      expires: Time.now + 300
    }
  end
  
  # Filter cached results
  choices = results
    .select { |r| r[:name].downcase.include?(query.downcase) }
    .first(25)
  
  interaction.autocomplete(choices)
end
```

### Multi-Field Autocomplete

```ruby
bot.slash('search', 'Search items') do |cmd|
  cmd.string('type', 'Item type', autocomplete: true)
  cmd.string('name', 'Item name', autocomplete: true)
  cmd.handler { |i| /* ... */ }
end

bot.on(:autocomplete) do |interaction|
  focused = interaction.focused_option
  
  case focused['name']
  when 'type'
    # Suggest types
    types = %w[weapon armor consumable material]
    choices = types.map { |t| { name: t.capitalize, value: t } }
    
  when 'name'
    # Suggest names based on selected type
    selected_type = interaction.options['type']
    query = focused['value']
    
    items = Item.where(type: selected_type)
      .where('name ILIKE ?', "%#{query}%")
      .limit(25)
    
    choices = items.map { |i| { name: i.name, value: i.id } }
  end
  
  interaction.autocomplete(choices)
end
```

### Grouped Choices

Use name formatting to create groups:

```ruby
bot.on(:autocomplete) do |interaction|
  query = interaction.focused_option['value']
  
  # Search both roles and channels
  guild = bot.guild(interaction.guild_id)
  
  role_choices = guild.roles
    .select { |r| r.name.downcase.include?(query) }
    .first(10)
    .map { |r| { name: "📋 Role: #{r.name}", value: "role:#{r.id}" } }
  
  channel_choices = guild.channels
    .select { |c| c.name.downcase.include?(query) }
    .first(10)
    .map { |c| { name: "#️⃣ Channel: ##{c.name}", value: "channel:#{c.id}" } }
  
  choices = role_choices + channel_choices
  choices = choices.first(25)
  
  interaction.autocomplete(choices)
end
```

## Best Practices

1. **Respond quickly** - Must respond within 3 seconds
2. **Limit to 25** - Discord's maximum choices
3. **Use IDs as values** - More reliable than names
4. **Handle empty queries** - Return popular/top items
5. **Cache expensive lookups** - Reduce database/API calls
6. **Make names descriptive** - Include helpful context
7. **Filter case-insensitively** - Better user experience

## Response Time

Autocomplete **must** respond within 3 seconds:

```ruby
bot.on(:autocomplete) do |interaction|
  # Defer not available for autocomplete
  # Must respond immediately
  
  begin
    choices = fast_lookup(interaction)
    interaction.autocomplete(choices)
  rescue => e
    # Log error but still respond
    puts "Autocomplete error: #{e}"
    interaction.autocomplete([])  # Empty response
  end
end
```

## Error Handling

```ruby
bot.on(:autocomplete) do |interaction|
  begin
    choices = fetch_choices(interaction)
  rescue DatabaseError => e
    puts "DB error: #{e}"
    choices = []
  rescue => e
    puts "Unexpected error: #{e}"
    choices = []
  end
  
  # Always respond, even with empty choices
  interaction.autocomplete(choices)
end
```

## Complete Example

```ruby
require 'discord_rda'

bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  application_id: ENV['DISCORD_APP_ID'],
  intents: [:guilds]
)

# Item database (simulated)
ITEMS = [
  { id: '1', name: 'Iron Sword', category: 'weapon', level: 5 },
  { id: '2', name: 'Iron Shield', category: 'armor', level: 5 },
  { id: '3', name: 'Steel Sword', category: 'weapon', level: 10 },
  { id: '4', name: 'Potion of Healing', category: 'consumable', level: 1 },
  { id: '5', name: 'Potion of Strength', category: 'consumable', level: 5 },
  # ... more items
]

# Shop command with autocomplete
bot.slash('buy', 'Buy an item') do |cmd|
  cmd.string('item', 'Item to buy', 
    autocomplete: true,
    required: true
  )
  cmd.integer('quantity', 'How many', min_value: 1, max_value: 99)
  
  cmd.handler do |interaction|
    item_id = interaction.option('item')
    quantity = interaction.option('quantity') || 1
    
    item = ITEMS.find { |i| i[:id] == item_id }
    
    unless item
      interaction.respond(content: 'Item not found!', ephemeral: true)
      return
    end
    
    # Process purchase
    total = item[:level] * 10 * quantity
    
    interaction.respond(
      content: "Bought #{quantity}x #{item[:name]} for #{total} gold!",
      ephemeral: true
    )
  end
end

# Autocomplete handler
bot.on(:autocomplete) do |interaction|
  next unless interaction.command_name == 'buy'
  
  focused = interaction.focused_option
  query = focused['value'].downcase
  
  # Filter and sort items
  matches = ITEMS
    .select { |i| i[:name].downcase.include?(query) }
    .sort_by { |i| i[:level] }
    .first(25)
  
  choices = matches.map do |item|
    {
      name: "#{item[:name]} (Lv.#{item[:level]} #{item[:category]})",
      value: item[:id]
    }
  end
  
  interaction.autocomplete(choices)
end

# User search command
bot.slash('userinfo', 'Get user information') do |cmd|
  cmd.user('user', 'User to look up')
  cmd.string('search', 'Search by name', autocomplete: true)
  
  cmd.handler do |interaction|
    if user = interaction.option('user')
      show_user_info(interaction, user)
    elsif search = interaction.option('search')
      # Handle from autocomplete
      user_id = search
      user = bot.user(user_id)
      show_user_info(interaction, user)
    end
  end
end

# Note: user option doesn't support autocomplete,
# but string option can search users

bot.run
```

## Next Steps

- **[Slash Commands](./slash-commands)** - Command structure
- **[Buttons & Components](./buttons-components)** - Interactive elements
- **[Learn about Interactions](../api/interaction)** - Full interaction API
