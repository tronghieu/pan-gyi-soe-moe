# Content Management Guide

## Overview

This guide explains how to manage content for the pan-gyi-soe-moe website using Keystatic, our headless CMS. Keystatic allows content editors to easily update website content through an intuitive admin panel without needing to touch code.

## Accessing the CMS

The Keystatic admin panel is accessible at `/keystatic` on your website. During development, you can access it at `http://localhost:3000/keystatic` when running the development server.

## Content Types

The website has several content types that can be managed through Keystatic:

### 1. Articles
Use this content type to create blog posts, news articles, and other written content.

**Fields:**
- Title: The main heading of the article
- Date: Publication date (required)
- Author: Author's name (required)
- Tags: Categorization tags (at least one required)
- Content: The main body of the article using MarkDoc format

### 2. Events
Use this content type to create event listings for exhibitions, workshops, talks, and other activities.

**Fields:**
- Title: The name of the event (required)
- Date: When the event takes place (required)
- Location: Where the event happens (required)
- Description: Details about the event using MarkDoc format
- Featured: Whether to highlight this event (checkbox)

### 3. Artwork
Use this content type to add portfolio pieces to your gallery.

**Fields:**
- Title: The name of the artwork (required)
- Date: When the artwork was created (required)
- Medium: The medium used (e.g., Oil on Canvas) (required)
- Description: Details about the artwork using MarkDoc format
- Featured: Whether to highlight this artwork (checkbox)

### 4. Artist Information
This singleton contains all artist-related information that's used across multiple pages.

**Fields:**
- Name: The artist's name (required)
- Title/Specialization: Professional title (required, e.g., Visual Artist & Sculptor)
- Biography: Professional bio in MarkDoc format
- Artist Statement: Artist's creative philosophy in MarkDoc format
- Profile Image: Upload artist's profile picture
- Email: Contact email (required)
- Social Media Links: URLs for Instagram, Twitter, and Dribbble
- Career Highlights: A list of notable milestones and achievements
- Copyright Text: Footer copyright information (required)

## Content Creation Workflow

1. **Access the Admin Panel**: Navigate to `/keystatic` on your site
2. **Select Content Type**: Choose the appropriate content type from the sidebar
3. **Create New Item**: Click "Create" to add new content
4. **Fill in Details**: Complete all required fields and any optional fields
5. **Preview**: Use the preview functionality to see how content will appear
6. **Save**: Click save to store your changes

## Best Practices

### Writing Content
- Use clear, concise language
- Format content properly using the MarkDoc editor
- Add relevant tags to articles for better organization
- Use high-quality images for artwork and profile pictures

### Managing Events
- Add events well in advance of the event date
- Include all relevant information like address, time, and ticket information
- Mark important events as "Featured" to highlight them

### Managing Artwork
- Include detailed descriptions of your creative process
- Use high-resolution images of your work
- Mark standout pieces as "Featured" to highlight them

## Publishing Workflow

All content created in Keystatic is stored in the `content/` directory of the project:
- Articles: `content/articles/`
- Events: `content/events/`
- Artwork: `content/artwork/`
- Artist Info: `content/artist/`

When your site is deployed, content changes are automatically reflected. For static site generation, the site will need to be rebuilt for content changes to appear.

## Troubleshooting

### Content Not Appearing on Site
- Ensure the content is saved in Keystatic
- Check if the deployment pipeline has processed the content changes
- Verify that the content's date fields are correct for time-sensitive content

### Image Upload Issues
- Ensure images are in common formats (JPEG, PNG, WebP)
- Check if images meet the required resolution and size specifications

### Permission Issues
- Verify you have the correct access credentials
- Contact the site administrator if you're unable to access the admin panel

## Support

For additional help with content management:
1. Check the [Keystatic Documentation](https://keystatic.notion.site/Keystatic-Documentation-5b13a2e6069e4f888e6f4955aeac29f4)
2. Contact the development team for technical issues
3. Review the project's README for setup instructions