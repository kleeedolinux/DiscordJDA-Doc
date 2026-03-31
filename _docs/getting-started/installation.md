---
layout: doc
title: Installation
description: How to install DiscordRDA in your Ruby project
permalink: /getting-started/installation/
---


## Requirements

- Ruby >= 3.0
- Bundler

## Gem Installation

Add this line to your application's Gemfile:

```ruby
gem 'discord_rda'
```

Then execute:

```bash
bundle install
```

Or install it yourself:

```bash
gem install discord_rda
```

## Verify Installation

Create a test file to verify the installation:

```ruby
require 'discord_rda'

puts DiscordRDA::VERSION
```

Run it:

```bash
ruby test.rb
```

## Optional Dependencies

### Redis Cache

For production deployments with Redis caching:

```ruby
gem 'redis'
```

### Development Tools

```ruby
group :development do
  gem 'rspec'
  gem 'rubocop'
end
```

<div class="tip-box">
  **Best Practice**: Use environment variables for your Discord token. Never commit tokens to version control.
</div>
