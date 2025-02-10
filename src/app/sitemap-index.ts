import { getAllPages } from '@/sanity/queries/page'
import { getAllResources } from '@/sanity/queries/resources'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.adeptia.com'
  
  // Get the number of sitemaps you have
  const pages = await getAllPages()
  const resources = await getAllResources()
  const totalEntries = pages.length + resources.length
  const entriesPerSitemap = 50000
  const sitemapCount = Math.ceil(totalEntries / entriesPerSitemap)

  return Array.from({ length: sitemapCount }, (_, index) => ({
    url: `${baseUrl}/sitemap-${index}.xml`,
    lastModified: new Date(),
  }))
}