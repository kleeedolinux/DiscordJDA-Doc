import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://kleeeedolinux.github.io',
  base: 'discordRDA',
  integrations: [
    starlight({
      title: 'DiscordRDA',
      tagline: 'Modern Ruby library for Discord bot development',
      favicon: '/favicon.svg',
      logo: {
        src: './src/assets/logo.svg',
      },
      social: {
        github: 'https://github.com/kleeedolinux/discordRDA',
      },
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', slug: 'getting-started/introduction' },
            { label: 'Installation', slug: 'getting-started/installation' },
            { label: 'Quick Start', slug: 'getting-started/quick-start' },
            { label: 'Configuration', slug: 'getting-started/configuration' },
          ],
        },
        {
          label: 'Core Concepts',
          items: [
            { label: 'Architecture', slug: 'core/architecture' },
            { label: 'Bot Setup', slug: 'core/bot-setup' },
            { label: 'Event Handling', slug: 'core/events' },
            { label: 'Entities', slug: 'core/entities' },
          ],
        },
        {
          label: 'Slash Commands',
          items: [
            { label: 'Overview', slug: 'slash-commands/overview' },
            { label: 'Creating Commands', slug: 'slash-commands/creating' },
            { label: 'Options & Arguments', slug: 'slash-commands/options' },
            { label: 'Context Menus', slug: 'slash-commands/context-menus' },
            { label: 'Autocomplete', slug: 'slash-commands/autocomplete' },
          ],
        },
        {
          label: 'Interactions',
          items: [
            { label: 'Buttons', slug: 'interactions/buttons' },
            { label: 'Select Menus', slug: 'interactions/select-menus' },
            { label: 'Modals', slug: 'interactions/modals' },
            { label: 'Deferred Responses', slug: 'interactions/deferred' },
          ],
        },
        {
          label: 'Advanced',
          items: [
            { label: 'Sharding', slug: 'advanced/sharding' },
            { label: 'Caching', slug: 'advanced/caching' },
            { label: 'Rate Limiting', slug: 'advanced/rate-limiting' },
            { label: 'Plugin System', slug: 'advanced/plugins' },
            { label: 'Hot Reload', slug: 'advanced/hot-reload' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'API Reference', slug: 'reference/api' },
            { label: 'Configuration Options', slug: 'reference/config' },
            { label: 'Intents', slug: 'reference/intents' },
          ],
        },
      ],
      locales: {
        root: {
          label: 'English',
          lang: 'en',
        },
      },
      lastUpdated: true,
      pagination: true,
    }),
  ],
  output: 'static',
});
