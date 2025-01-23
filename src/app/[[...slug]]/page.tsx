import { notFound } from 'next/navigation'
import { getPage, getPath } from '@/sanity/queries/page'
import type { Page } from '@/sanity/types/sanity.types'

// Recursively builds an array of slugs representing the path from root to current page
async function getPagePath(page: Page): Promise<string[]> {
    console.log('Starting getPagePath for page:', page._id)

    // If page has no parent, it's a root level page
    if (!page.parent) {
        console.log('No parent found for page:', page._id)
        // If page has a slug, return it as single item array
        if (page.metadata?.slug?.current) {
            console.log('Returning root level slug:', page.metadata.slug.current)
            return [page.metadata.slug.current]
        } else {
            // Log error if page is missing required slug
            console.error('Page has no slug:', page._id)
            return []
        }
    }

    console.log('Fetching parent page with ID:', page.parent._ref)
    // Fetch the parent page document using its reference ID
    const parent = await getPage(page.parent._ref)
    
    // If parent fetch fails, treat current page as root
    if (!parent) {
        console.log('Parent fetch failed for ID:', page.parent._ref)
        // Return current page slug if it exists
        if (page.metadata?.slug?.current) {
            console.log('Returning current page slug as root:', page.metadata.slug.current)
            return [page.metadata.slug.current]
        } else {
            // Log error if parent page is missing slug
            console.error('Parent page has no slug:', page._id)
            return []
        }
    }

    console.log('Recursively getting path for parent:', parent._id)
    // Recursively get path array from parent
    const parentPath = await getPagePath(parent)
    
    if (!page.metadata?.slug?.current) {
        console.error('Page has no slug:', page._id)
        console.log('Returning parent path:', parentPath)
        return parentPath
    }

    const fullPath = [...parentPath, page.metadata.slug.current]
    console.log('Returning full path:', fullPath)
    return fullPath
}

function PageContent({ page }: { page: Page }) {
    return <div>
        <h1>{page.title}</h1>
    </div>
}

export default async function Page({ params }: { params: { slug?: string[] } }) {
    console.log('Page component called with params:', params)

    if (!params.slug) {
        console.log('No slug provided, fetching home page')
        const homePage = await getPage('home')
        if (!homePage) {
            console.log('Home page not found')
            return notFound()
        }
        console.log('Rendering home page')
        return <PageContent page={homePage} />
    }

    const lastSlug = params.slug[params.slug.length - 1]
    console.log('Getting page with last slug:', lastSlug)
    const page = await getPage(lastSlug)

    if (!page) {
        console.log('Page not found for slug:', lastSlug)
        return notFound()
    }

    console.log('Getting actual path for page:', page._id)
    const actualPath = await getPagePath(page)
    const requestedPath = params.slug.join('/')
    console.log('Comparing paths:', { actualPath: actualPath.join('/'), requestedPath })
    
    if (actualPath.join('/') !== requestedPath) {
        console.log('Path mismatch - actual:', actualPath.join('/'), 'requested:', requestedPath)
        return notFound()
    }

    console.log('Rendering page:', page._id)
    return <PageContent page={page} />
}