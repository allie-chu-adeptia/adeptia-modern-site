import { ExpandedPage } from "@/sanity/types/local.types"
import { getPage } from "@/sanity/queries/page"

// Recursively builds an array of slugs representing the path from root to current page
export async function getPagePath(page: ExpandedPage): Promise<string[]> {
    console.log('Starting getPagePath for page:', page._id)

    // If page has no parent, it's a root level page
    if (!page.parent?._id) {
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

    console.log('Fetching parent page with ID:', page.parent._id)
    // Fetch the parent page document using its reference ID
    const parent = await getPage(page.parent.link)
    
    // If parent fetch fails, treat current page as root
    if (!parent) {
        console.log('Parent fetch failed for ID:', page.parent._id)
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