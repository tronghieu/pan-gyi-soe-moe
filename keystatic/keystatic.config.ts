import { createConfig } from '@keystatic/core';

export default createConfig({
  storage: {
    kind: 'local',
  },
  collections: {
    // Collection for managing articles about cultural heritage
    articles: {
      label: 'Articles',
      path: 'content/articles',
      format: { contentField: 'content' },
      columns: ['title', 'date', 'author'],
      entry: {
        label: 'entry.title',
      },
      fields: {
        title: {
          label: 'Title',
          description: 'The title of the article',
          type: 'text',
          validation: { isRequired: true },
        },
        date: {
          label: 'Date',
          description: 'The date of publication',
          type: 'date',
          validation: { isRequired: true },
        },
        author: {
          label: 'Author',
          description: 'The author of the article',
          type: 'text',
          validation: { isRequired: true },
        },
        tags: {
          label: 'Tags',
          description: 'Tags for the article',
          type: 'array',
          element: {
            type: 'text',
          },
          validation: { length: { min: 1 } },
        },
        content: {
          label: 'Content',
          description: 'The content of the article',
          type: 'markdown',
        },
      },
    },
    // Collection for events related to cultural heritage
    events: {
      label: 'Events',
      path: 'content/events',
      format: { contentField: 'description' },
      columns: ['title', 'date', 'location'],
      entry: {
        label: 'entry.title',
      },
      fields: {
        title: {
          label: 'Title',
          description: 'The title of the event',
          type: 'text',
          validation: { isRequired: true },
        },
        date: {
          label: 'Date',
          description: 'The date of the event',
          type: 'date',
          validation: { isRequired: true },
        },
        location: {
          label: 'Location',
          description: 'The location of the event',
          type: 'text',
          validation: { isRequired: true },
        },
        description: {
          label: 'Description',
          description: 'The description of the event',
          type: 'markdown',
        },
        featured: {
          label: 'Featured',
          description: 'Whether this event should be featured',
          type: 'checkbox',
        },
      },
    },
    // Collection for artwork items
    artwork: {
      label: 'Artwork',
      path: 'content/artwork',
      format: { contentField: 'description' },
      columns: ['title', 'date', 'medium'],
      entry: {
        label: 'entry.title',
      },
      fields: {
        title: {
          label: 'Title',
          description: 'The title of the artwork',
          type: 'text',
          validation: { isRequired: true },
        },
        date: {
          label: 'Date',
          description: 'The date of creation',
          type: 'date',
          validation: { isRequired: true },
        },
        medium: {
          label: 'Medium',
          description: 'The medium of the artwork',
          type: 'text',
          validation: { isRequired: true },
        },
        description: {
          label: 'Description',
          description: 'The description of the artwork',
          type: 'markdown',
        },
        featured: {
          label: 'Featured',
          description: 'Whether this artwork should be featured',
          type: 'checkbox',
        },
      },
    },
  },
  singletons: {
    // Singleton for the about page
    about: {
      label: 'About Page',
      path: 'content/about',
      fields: {
        title: { label: 'Title', type: 'text', validation: { isRequired: true } },
        content: { label: 'Content', type: 'markdown' },
        authorName: { label: 'Author Name', type: 'text', validation: { isRequired: true } },
        authorBio: { label: 'Author Bio', type: 'markdown' },
      },
    },
  },
});