import { getRouteInfo, RouteInfo } from "@/sanity/queries/routing"
import { join } from "path"


// Recursively builds an array of slugs representing the path from root to current page
export async function getPath(slug: string): Promise<string[]> {
    console.log('slug', slug)
    const routeInfo = await getRouteInfo(slug)
    console.log('routeInfo', routeInfo)

    if (!routeInfo || !routeInfo.metadata) {
        console.error("Failed to fetch page info for slug:", slug)
        return []
    }

    switch (routeInfo._type) {
        case "page":
            return await handlePagePath(routeInfo)
        case "resource":
            return await handleResourcePath(routeInfo)
        case "connector":
            return await handleConnectorPath(routeInfo)
        case "customer":
            return await handleCustomerPath(routeInfo)
        case "teamMember":
            return await handleTeamMemberPath(routeInfo)
        default:
            console.error("Unknown route type:", routeInfo._type)
            return []
    }
}

async function handlePagePath(routeInfo: RouteInfo): Promise<string[]> {
    if (routeInfo.parent?._id) {
        const parentRoute = await getRouteInfo(routeInfo.parent.link)
        const parentPath = parentRoute ? await handlePagePath(parentRoute) : []
        return [...parentPath, routeInfo.metadata?.slug?.current || '']
    }

    return [routeInfo.metadata?.slug?.current || '']
}

async function handleResourcePath(routeInfo: RouteInfo): Promise<string[]> {
    let basePath = ''
    const slug = routeInfo.metadata?.slug?.current || ''

    switch (routeInfo.type) {
        case "Blog":
            basePath = 'blog'
            break
        case "News":
            basePath = 'news'
            break
        case "Video":
            basePath = 'resources/video'
            break
        case "Tutorial":
            basePath = 'resources/tutorial'
            break
        case "Datasheet":
            basePath = 'resources/datasheet'
            break
        case "White Paper":
            basePath = 'resources/white-paper'
            break
        case "eBook":
            basePath = 'resources/ebook'
            break
        case "Infographic":
            basePath = 'resources/infographic'
            break
        default:
            console.error("Unknown resource type:", routeInfo.type)
            return []
    }

    const path = join(basePath, slug)
    return [path]

}

async function handleConnectorPath(routeInfo: RouteInfo): Promise<string[]> {
    const basePath = 'connectors'
    const path = join(basePath, routeInfo.metadata?.slug?.current || '')
    return [path]
}

async function handleCustomerPath(routeInfo: RouteInfo): Promise<string[]> {
    const basePath = 'customers'
    const path = join(basePath, routeInfo.metadata?.slug?.current || '')
    return [path]
}

async function handleTeamMemberPath(routeInfo: RouteInfo): Promise<string[]> {
    const basePath = 'about/management-team'
    const path = join(basePath, routeInfo.metadata?.slug?.current || '')
    return [path]
}

    // console.log('Starting getPagePath for page:', page._id)

    // // If page has no parent, it's a root level page
    // if (!page.parent?._id) {
    //     console.log('No parent found for page:', page._id)
    //     // If page has a slug, return it as single item array
    //     if (page.metadata?.slug?.current) {
    //         console.log('Returning root level slug:', page.metadata.slug.current)
    //         return [page.metadata.slug.current]
    //     } else {
    //         // Log error if page is missing required slug
    //         console.error('Page has no slug:', page._id)
    //         return []
    //     }
    // }

    // console.log('Fetching parent page with ID:', page.parent._id)
    // // Fetch the parent page document using its reference ID
    // const parent = await getPage(page.parent.link)
    
    // // If parent fetch fails, treat current page as root
    // if (!parent) {
    //     console.log('Parent fetch failed for ID:', page.parent._id)
    //     // Return current page slug if it exists
    //     if (page.metadata?.slug?.current) {
    //         console.log('Returning current page slug as root:', page.metadata.slug.current)
    //         return [page.metadata.slug.current]
    //     } else {
    //         // Log error if parent page is missing slug
    //         console.error('Parent page has no slug:', page._id)
    //         return []
    //     }
    // }

    // console.log('Recursively getting path for parent:', parent._id)
    // // Recursively get path array from parent
    // const parentPath = await getPagePath(parent)
    
    // if (!page.metadata?.slug?.current) {
    //     console.error('Page has no slug:', page._id)
    //     console.log('Returning parent path:', parentPath)
    //     return parentPath
    // }

    // const fullPath = [...parentPath, page.metadata.slug.current]
    // console.log('Returning full path:', fullPath)
    // return fullPat