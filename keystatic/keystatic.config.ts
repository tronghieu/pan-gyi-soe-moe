import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    // Collection for managing articles about cultural heritage
    articles: collection({
      label: 'Articles',
      slugField: 'title',
      path: 'content/articles/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({
          label: 'Date',
          description: 'The date of publication',
          validation: { isRequired: true },
        }),
        author: fields.text({
          label: 'Author',
          description: 'The author of the article',
          validation: { isRequired: true },
        }),
        tags: fields.array(
          fields.text({
            label: 'Tag',
            description: 'Tag for the article',
          }),
          {
            label: 'Tags',
            description: 'Tags for the article',
            validation: { length: { min: 1 } },
          }
        ),
        content: fields.markdoc({
          label: 'Content',
          description: 'The content of the article',
        }),
      },
    }),
    // Collection for events related to cultural heritage
    events: collection({
      label: 'Events',
      slugField: 'title',
      path: 'content/events/*',
      format: { contentField: 'description' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({
          label: 'Date',
          description: 'The date of the event',
          validation: { isRequired: true },
        }),
        location: fields.text({
          label: 'Location',
          description: 'The location of the event',
          validation: { isRequired: true },
        }),
        description: fields.markdoc({
          label: 'Description',
          description: 'The description of the event',
        }),
        featured: fields.checkbox({
          label: 'Featured',
          description: 'Whether this event should be featured',
        }),
      },
    }),
    // Collection for artwork items
    artwork: collection({
      label: 'Artwork',
      slugField: 'title',
      path: 'content/artwork/*',
      format: { contentField: 'description' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({
          label: 'Date',
          description: 'The date of creation',
          validation: { isRequired: true },
        }),
        medium: fields.text({
          label: 'Medium',
          description: 'The medium of the artwork',
          validation: { isRequired: true },
        }),
        description: fields.markdoc({
          label: 'Description',
          description: 'The description of the artwork',
        }),
        featured: fields.checkbox({
          label: 'Featured',
          description: 'Whether this artwork should be featured',
        }),
      },
    }),
  },
  singletons: {
    // Singleton for the about page
    about: {
      label: 'About Page',
      path: 'content/about',
      schema: {
        title: fields.text({ label: 'Title', validation: { isRequired: true } }),
        content: fields.markdoc({ label: 'Content' }),
        authorName: fields.text({ label: 'Author Name', validation: { isRequired: true } }),
        authorBio: fields.markdoc({ label: 'Author Bio' }),
      },
    },
  },
});