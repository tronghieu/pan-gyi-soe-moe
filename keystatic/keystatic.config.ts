import { config, collection, singleton, fields } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    // Collection for managing articles about cultural heritage
    articles: collection({
      label: "Articles",
      slugField: "title",
      path: "content/articles/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        date: fields.date({
          label: "Date",
          description: "The date of publication",
          validation: { isRequired: true },
        }),
        author: fields.text({
          label: "Author",
          description: "The author of the article",
          validation: { isRequired: true },
        }),
        tags: fields.array(
          fields.text({
            label: "Tag",
            description: "Tag for the article",
          }),
          {
            label: "Tags",
            description: "Tags for the article",
            validation: { length: { min: 1 } },
          },
        ),
        content: fields.markdoc({
          label: "Content",
          description: "The content of the article",
        }),
      },
    }),
    // Collection for events related to cultural heritage
    events: collection({
      label: "Events",
      slugField: "title",
      path: "content/events/*",
      format: { contentField: "description" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        date: fields.date({
          label: "Date",
          description: "The date of the event",
          validation: { isRequired: true },
        }),
        location: fields.text({
          label: "Location",
          description: "The location of the event",
          validation: { isRequired: true },
        }),
        image: fields.image({
          label: "Cover Image",
          description: "Cover image for the event",
        }),
        description: fields.markdoc({
          label: "Description",
          description: "The description of the event",
        }),
        featured: fields.checkbox({
          label: "Featured",
          description: "Whether this event should be featured",
        }),
      },
    }),
    // Collection for artwork items
    artwork: collection({
      label: "Artwork",
      slugField: "title",
      path: "content/artwork/*",
      format: { contentField: "description" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        date: fields.date({
          label: "Date",
          description: "The date of creation",
          validation: { isRequired: true },
        }),
        medium: fields.text({
          label: "Medium",
          description: "The medium of the artwork",
          validation: { isRequired: true },
        }),
        image: fields.image({
          label: "Artwork Image",
          description: "Image of the artwork",
        }),
        description: fields.markdoc({
          label: "Description",
          description: "The description of the artwork",
        }),
        featured: fields.checkbox({
          label: "Featured",
          description: "Whether this artwork should be featured",
        }),
      },
    }),
  },
  singletons: {
    // Singleton for the artist information
    artist: singleton({
      label: "Artist Information",
      path: "content/artist",
      schema: {
        name: fields.text({
          label: "Artist Name",
          validation: { isRequired: true },
        }),
        title: fields.text({
          label: "Title/Specialization",
          description: "e.g., Visual Artist & Sculptor",
          validation: { isRequired: true },
        }),
        bio: fields.markdoc({
          label: "Biography",
          description: "Professional biography for the artist",
        }),
        artistStatement: fields.markdoc({
          label: "Artist Statement",
          description: "Artist's statement or philosophy",
        }),
        profileImage: fields.image({
          label: "Profile Image",
          description: "Artist's profile picture",
        }),
        email: fields.text({
          label: "Email",
          validation: { isRequired: true },
        }),
        instagram: fields.text({
          label: "Instagram URL",
          description: "Full URL to Instagram profile",
        }),
        twitter: fields.text({
          label: "Twitter URL",
          description: "Full URL to Twitter profile",
        }),
        dribbble: fields.text({
          label: "Dribbble URL",
          description: "Full URL to Dribbble profile",
        }),
        careerHighlights: fields.array(
          fields.text({
            label: "Career Highlight",
            description: "Notable career milestone or achievement",
          }),
          {
            label: "Career Highlights",
            description: "Key career milestones and achievements",
            itemLabel: (props) => props.value || "Career Highlight",
          },
        ),
        copyrightText: fields.text({
          label: "Copyright Text",
          description: "Text for the copyright footer",
          validation: { isRequired: true },
        }),
      },
    }),
  },
});
