import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/'], // Add any paths you want to block
    },
    sitemap: 'https://www.adeptia.com/sitemap.xml', // Update with your domain
  }
}