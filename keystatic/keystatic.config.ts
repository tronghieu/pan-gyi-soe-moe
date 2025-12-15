import { config, collection, singleton, fields } from "@keystatic/core";

export default config({
  storage:
    process.env.NODE_ENV === "development"
      ? {
          kind: "local",
        }
      : {
          kind: "github",
          repo: "tronghieu/pan-gyi-soe-meo",
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
    // Singleton for website-wide configuration
    siteConfig: singleton({
      label: "Website Configuration",
      path: "content/site-config",
      schema: {
        siteName: fields.text({
          label: "Website Name",
          description: "The name of your website",
          validation: { isRequired: true },
        }),
        siteDescription: fields.text({
          label: "Website Description",
          description: "A short description of your website",
          validation: { isRequired: true },
          multiline: true,
        }),
        siteUrl: fields.text({
          label: "Website URL",
          description:
            "The full URL of your website (e.g., https://example.com)",
          validation: { isRequired: true },
        }),
        // SEO
        seoTitle: fields.text({
          label: "SEO Title",
          description: "Default title for search engines (50-60 characters)",
        }),
        seoDescription: fields.text({
          label: "SEO Description",
          description:
            "Default meta description for search engines (150-160 characters)",
          multiline: true,
        }),
        ogImage: fields.image({
          label: "Default OG Image",
          description:
            "Default Open Graph image for social sharing (1200x630px)",
        }),
        // Social
        twitterHandle: fields.text({
          label: "Twitter Handle",
          description: "Twitter handle without @ (e.g., username)",
        }),
        // Additional
        favicon: fields.image({
          label: "Favicon",
          description: "Website favicon",
        }),
        copyrightText: fields.text({
          label: "Copyright Text",
          description: "Copyright text for the website footer",
          validation: { isRequired: true },
        }),
      },
    }),
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
      },
    }),
  },
});
