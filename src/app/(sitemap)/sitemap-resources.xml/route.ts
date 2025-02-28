import { getAllDatasheets, getAllWhitePapers, getAllEbooks, getAllInfographics, getAllTutorials } from '@/sanity/queries/sitemap'
import { getServerSideSitemap } from 'next-sitemap'
import { ExpandedPost } from '@/sanity/types/local.types'

export async function GET() {
    const baseUrl = 'https://www.adeptia.com'
    const datasheets = await getAllDatasheets()
    const whitePapers = await getAllWhitePapers()
    const ebooks = await getAllEbooks()
    const infographics = await getAllInfographics()
    const tutorials = await getAllTutorials()

    const datasheetEntries = datasheets.map((resource: ExpandedPost) => ({
        url: `${baseUrl}/resources/datasheets/${resource.slug}`,
        lastModified: resource._updatedAt || new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }))

    const whitePaperEntries = whitePapers.map((resource: ExpandedPost) => ({
        url: `${baseUrl}/resources/white-papers/${resource.slug}`,
        lastModified: resource._updatedAt || new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }))

    const ebookEntries = ebooks.map((resource: ExpandedPost) => ({
        url: `${baseUrl}/resources/ebooks/${resource.slug}`,
        lastModified: resource._updatedAt || new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }))

    const infographicEntries = infographics.map((resource: ExpandedPost) => ({
        url: `${baseUrl}/resources/infographics/${resource.slug}`,
        lastModified: resource._updatedAt || new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }))

    const tutorialEntries = tutorials.map((resource: ExpandedPost) => ({
        url: `${baseUrl}/resources/tutorials/${resource.slug}`,
        lastModified: resource._updatedAt || new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }))

    return getServerSideSitemap([...datasheetEntries, ...whitePaperEntries, ...ebookEntries, ...infographicEntries, ...tutorialEntries])
}