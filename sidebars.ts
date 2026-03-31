import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/introduction',
        'getting-started/installation',
        'getting-started/quick-start',
        'getting-started/configuration',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      collapsed: false,
      items: [
        'core-concepts/bot',
        'core-concepts/events',
        'core-concepts/entities',
        'core-concepts/caching',
        'core-concepts/sharding',
      ],
    },
    {
      type: 'category',
      label: 'Interactions & Commands',
      collapsed: false,
      items: [
        'interactions/slash-commands',
        'interactions/context-menus',
        'interactions/buttons-components',
        'interactions/modals',
        'interactions/autocomplete',
      ],
    },
    {
      type: 'category',
      label: 'Advanced Topics',
      collapsed: true,
      items: [
        'advanced/rate-limiting',
        'advanced/plugins',
        'advanced/hot-reload',
        'advanced/scaling',
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      collapsed: true,
      items: [
        'examples/basic-bot',
        'examples/command-bot',
      ],
    },
  ],

  apiSidebar: [
    {
      type: 'category',
      label: 'API Reference',
      collapsed: false,
      items: [
        'api/bot',
        'api/interaction',
      ],
    },
  ],
};

export default sidebars;
