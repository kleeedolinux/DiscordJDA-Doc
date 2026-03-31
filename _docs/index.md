---
layout: doc
title: DiscordRDA Documentation
description: Modern Ruby library for Discord bot development
permalink: /index/
---


import  from '@astrojs/starlight/components';

## Features


  
  
  
  
  
</CardGrid>

## Quick Example

```ruby
require 'discord_rda'

bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  intents: [:guilds, :guild_messages]
)

bot.slash('hello', 'Say hello') do |cmd|
  cmd.string('name', 'Your name', required: true)
  cmd.handler do |interaction|
    name = interaction.option('name')
    interaction.respond(content: "Hello, #!")
  end
end

bot.run
```

## Installation

```bash
gem install discord_rda
```

Or add to your Gemfile:

```ruby
gem 'discord_rda'
```
