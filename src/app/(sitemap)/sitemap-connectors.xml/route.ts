import { getAllConnectors } from '@/sanity/queries/sitemap'
import { getServerSideSitemap } from 'next-sitemap'
import { ExpandedConnector } from '@/sanity/types/local.types'

export async function GET(request: Request) {
    const baseUrl = 'https://www.adeptia.com'
    const connectors = await getAllConnectors()

    const connectorEntries = connectors.map((connector: ExpandedConnector) => ({
        url: `${baseUrl}/connectors/${connector.slug}`,
        lastModified: connector._updatedAt || new Date(),
        changeFrequency: 'monthly' as const,
        priority: 1.0,
    }))

    return getServerSideSitemap(connectorEntries)
}