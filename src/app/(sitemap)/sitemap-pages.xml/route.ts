import { getAllPages } from '@/sanity/queries/sitemap'
import { getServerSideSitemap } from 'next-sitemap'
import { ExpandedPage } from '@/sanity/types/local.types'
import { getPath } from '@/lib/routing'

export async function GET() {
    const baseUrl = 'https://www.adeptia.com'
    const pages = await getAllPages()

    // Create sitemap entries for pages and await all promises
    const pageEntries = await Promise.all(pages.map(async (page: ExpandedPage) => {
        const path : string[] = await getPath(page.slug)
        const pathString : string = path.join('/')
        return {
            url: `${baseUrl}/${pathString}`,
            lastModified: page._updatedAt || new Date(),
            changeFrequency: 'monthly',
            priority: 1.0,
        }
    }))

    return getServerSideSitemap(pageEntries)
}   