import { getServerSideSitemap } from 'next-sitemap'

export async function GET() {
    const baseUrl = 'https://www.adeptia.com'

    const staticPages = [
        {
            loc: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 1.0,
        },
        {
            loc: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
        {
            loc: `${baseUrl}/resources`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
        {
            loc: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
        {
            loc: `${baseUrl}/about/management-team`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
        {
            loc: `${baseUrl}/connectors`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
        {
            loc: `${baseUrl}/customers`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
        {
            loc: `${baseUrl}/news`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
        {
            loc: `${baseUrl}/pricing`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
        {
            loc: `${baseUrl}/solutions`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
        {
            loc: `${baseUrl}/solutions/industry`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
        {
            loc: `${baseUrl}/solutions/use-case`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
        {
            loc: `${baseUrl}/products`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
    ]

    return getServerSideSitemap(staticPages)
}