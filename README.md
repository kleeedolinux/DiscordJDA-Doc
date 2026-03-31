# DiscordRDA Documentation

Modern documentation for DiscordRDA - a Ruby library for Discord bot development.

Built with [Astro Starlight](https://starlight.astro.build/).

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build
npm run build
```

## Deployment

Documentation is automatically deployed to GitHub Pages on push to main branch.

## Structure

```
src/content/docs/
├── getting-started/    # Installation, quick start, basics
├── core/              # Architecture, bot setup, events, entities
├── slash-commands/    # Commands, options, autocomplete
├── interactions/      # Buttons, select menus, modals
├── advanced/         # Sharding, caching, rate limiting
├── reference/         # API reference, config, intents
└── legacy/           # Version 0.x docs
```

## Version System

- **Current** (`/`) - Latest stable documentation
- **Legacy** (`/legacy/v0`) - Previous version docs for migration

## Contributing

Edit Markdown/MDX files in `src/content/docs/`. The site auto-reloads on changes.
