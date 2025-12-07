import { createConfig } from '@keystatic/core';

export default createConfig({
  storage: {
    kind: 'local',
  },
  collections: {
    // Add collections for the cultural heritage content
    articles: {
      label: 'Articles',
      path: 'content/articles',
      format: { contentField: 'content' },
      fields: {
        title: { label: 'Title', description: 'The title of the article', type: 'text', validation: { isRequired: true } },
        date: { label: 'Date', description: 'The date of publication', type: 'date', validation: { isRequired: true } },
        content: { label: 'Content', description: 'The content of the article', type: 'markdown' },
        author: { label: 'Author', description: 'The author of the article', type: 'text' },
      }
    },
    events: {
      label: 'Events',
      path: 'content/events',
      format: { contentField: 'description' },
      fields: {
        title: { label: 'Title', description: 'The title of the event', type: 'text', validation: { isRequired: true } },
        date: { label: 'Date', description: 'The date of the event', type: 'date', validation: { isRequired: true } },
        location: { label: 'Location', description: 'The location of the event', type: 'text' },
        description: { label: 'Description', description: 'The description of the event', type: 'markdown' },
        featured: { label: 'Featured', description: 'Whether this event should be featured', type: 'checkbox' },
      }
    },
    artwork: {
      label: 'Artwork',
      path: 'content/artwork',
      format: { contentField: 'description' },
      fields: {
        title: { label: 'Title', description: 'The title of the artwork', type: 'text', validation: { isRequired: true } },
        date: { label: 'Date', description: 'The date of creation', type: 'date', validation: { isRequired: true } },
        medium: { label: 'Medium', description: 'The medium of the artwork', type: 'text' },
        description: { label: 'Description', description: 'The description of the artwork', type: 'markdown' },
        featured: { label: 'Featured', description: 'Whether this artwork should be featured', type: 'checkbox' },
      }
    }
  },
  singleton: {
    // Add singletons for static pages
    about: {
      label: 'About Page',
      path: 'content/about',
      fields: {
        title: { label: 'Title', type: 'text', validation: { isRequired: true } },
        content: { label: 'Content', type: 'markdown' },
        authorName: { label: 'Author Name', type: 'text', validation: { isRequired: true } },
        authorBio: { label: 'Author Bio', type: 'markdown' },
      }
    }
  }
});