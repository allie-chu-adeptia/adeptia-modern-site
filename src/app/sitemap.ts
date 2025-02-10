import { MetadataRoute } from 'next'
import { getAllResources } from '@/sanity/queries/resources'
import { getAllPages } from '@/sanity/queries/page'
import { Resource } from '@/sanity/types/sanity.types'
import { getTypeSlug } from '@/aggregators/renderItem'
import { ExpandedPage } from '@/sanity/types/local.types'

export async function generateSitemaps() {
  // Get all your dynamic routes
  const pages = await getAllPages()
  const resources = await getAllResources()

  // Calculate how many sitemap files you'll need
  const totalEntries = pages.length + resources.length
  const entriesPerSitemap = 50000 // Maximum URLs per sitemap as per standard
  const sitemapCount = Math.ceil(totalEntries / entriesPerSitemap)

  // Return array of sitemap indices
  return Array.from({ length: sitemapCount }, (_, index) => ({
    id: index,
  }))
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  // Fetch your data
  const pages = await getAllPages()
  const resources = await getAllResources()

  // Base URL
  const baseUrl = 'https://www.adeptia.com'

  // Create sitemap entries for blog posts
  const blogEntries = resources.map((resource: Resource) => ({
    url: !resource.type ? '/404' :
      resource.type === 'Blog' ? 
        `${baseUrl}/blog/${resource.metadata?.slug?.current}` :
        resource.type === 'News' ?
          `${baseUrl}/news/${resource.metadata?.slug?.current}` :
          `${baseUrl}/resources/${getTypeSlug(resource.type)}/${resource.metadata?.slug?.current}`,
    lastModified: resource._updatedAt || new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  // Create sitemap entries for pages
  const pageEntries = pages.map((page: ExpandedPage) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: page._updatedAt || new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1.0,
  }))

//   // Create sitemap entries for resources
//   const resourceEntries = resources.map((resource) => ({
//     url: `${baseUrl}/resources/${resource.type.toLowerCase()}/${resource.slug}`,
//     lastModified: resource._updatedAt || new Date(),
//     changeFrequency: 'monthly' as const,
//     priority: 0.9,
//   }))

  // Add static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    // Add other static pages as needed
  ]

  // Combine all entries
  const allEntries = [
    ...staticPages,
    ...blogEntries,
    ...pageEntries,
    // ...resourceEntries,
  ]

  // Split entries based on the id parameter
  const entriesPerSitemap = 50000
  const start = id * entriesPerSitemap
  const end = start + entriesPerSitemap

  return allEntries.slice(start, end)
}