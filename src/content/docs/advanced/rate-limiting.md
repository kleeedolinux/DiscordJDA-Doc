---
title: Rate Limiting
description: Handle Discord API rate limits
---

## Automatic Rate Limiting

DiscordRDA handles rate limits automatically with queue management.

## Basic Usage

```ruby
bot = DiscordRDA::Bot.new(token: ENV['DISCORD_TOKEN'])
# Rate limiting is enabled by default
```

## Scalable REST

For production deployments:

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  enable_scalable_rest: true,
  rest_workers: 5  # Number of REST worker threads
)
```

## Rate Limit Status

```ruby
# Check invalid request bucket status
status = bot.invalid_bucket_status
puts "Remaining: #{status.remaining}"
puts "Reset at: #{status.reset_at}"

# Global rate limit
if bot.global_rate_limited?
  puts "Global limit reset in: #{bot.global_rate_limit_reset} seconds"
end
```

## REST Proxy

Scale horizontally with REST proxies:

```ruby
bot = DiscordRDA::Bot.new(
  token: ENV['DISCORD_TOKEN'],
  rest_proxy_urls: [
    'http://rest-proxy-1:8080',
    'http://rest-proxy-2:8080'
  ]
)
```

## Manual Rate Limit Handling

```ruby
# Check bucket before making request
bucket = bot.rate_limit_bucket('/channels/{id}/messages')
if bucket.limited?
  sleep(bucket.reset_after)
end

# Make request
channel.send_message(content: 'Hello')
```

## Exponential Backoff

```ruby
def send_with_retry(channel, message, max_retries: 3)
  retries = 0
  
  begin
    channel.send_message(content: message)
  rescue DiscordRDA::RateLimitError => e
    retries += 1
    if retries <= max_retries
      sleep(e.retry_after * 2 ** retries)
      retry
    else
      raise
    end
  end
end
```
