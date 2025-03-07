import { getRouteInfo, RouteInfo } from "@/sanity/queries/routing"
import { join } from "path"


// Recursively builds an array of slugs representing the path from root to current page
export async function getPath(slug: string): Promise<string[]> {
    const routeInfo = await getRouteInfo(slug)

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