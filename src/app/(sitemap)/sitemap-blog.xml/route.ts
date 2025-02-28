import { getAllBlogs } from '@/sanity/queries/sitemap'
import { getServerSideSitemap } from 'next-sitemap'
import { ExpandedPost } from '@/sanity/types/local.types'

export async function GET() {
    const baseUrl = 'https://www.adeptia.com'
    const blogs = await getAllBlogs()

    const blogEntries = blogs.map((resource: ExpandedPost) => ({
        url: `${baseUrl}/blog/${resource.slug}`,
        lastModified: resource._updatedAt || new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }))

    return getServerSideSitemap(blogEntries)
}