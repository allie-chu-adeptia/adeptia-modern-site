import { getAllNews } from '@/sanity/queries/sitemap'
import { getServerSideSitemap } from 'next-sitemap'
import { ExpandedPost } from '@/sanity/types/local.types'

export async function GET(request: Request) {
    const baseUrl = 'https://www.adeptia.com'
    const news = await getAllNews()

    const newsEntries = news.map((resource: ExpandedPost) => ({
        url: `${baseUrl}/news/${resource.slug}`,
        lastModified: resource._updatedAt || new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }))

    return getServerSideSitemap(newsEntries)
}