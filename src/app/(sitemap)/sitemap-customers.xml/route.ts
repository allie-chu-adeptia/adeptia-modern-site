import { getAllCustomers } from '@/sanity/queries/sitemap'
import { getServerSideSitemap } from 'next-sitemap'
import { ExpandedCustomer } from '@/sanity/types/local.types'

export async function GET(request: Request) {
    const baseUrl = 'https://www.adeptia.com'
    const customers = await getAllCustomers()

    const customerEntries = customers.map((customer: ExpandedCustomer) => ({
        url: `${baseUrl}/customers/${customer.slug}`,
        lastModified: customer._updatedAt || new Date(),
        changeFrequency: 'monthly' as const,
        priority: 1.0,
    }))

    return getServerSideSitemap(customerEntries)
}