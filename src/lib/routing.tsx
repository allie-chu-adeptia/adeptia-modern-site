import { fetchAllRoutesAtOnce, RouteInfo } from "@/sanity/queries/routing"
import { join } from "path"
import { cache } from "react"

// Create a bulk query to fetch all routes at once
export const getAllRoutes = cache(async () => {
  // This would be a new query in your sanity folder that gets all pages and their relationships
  // in a single query instead of multiple queries
  const allRoutes = await fetchAllRoutesAtOnce()
  
  // Build a map for faster lookups
  const routeMap = new Map<string, RouteInfo>()
  allRoutes.forEach((route: RouteInfo) => {
    routeMap.set(route._id, route)
  })
  
  return routeMap
})

// // Cached version of getPath
// export const getPathCached = cache(async (slug: string): Promise<string[]> => {
//   return await getPath(slug)
// })

// // Recursively builds an array of slugs representing the path from root to current page
// export async function getPath(slug: string): Promise<string[]> {
//     const routeInfo = await getRouteInfo(slug)

//     if (!routeInfo || !routeInfo.metadata) {
//         console.error("Failed to fetch page info for slug:", slug)
//         return []
//     }

//     switch (routeInfo._type) {
//         case "page":
//             return await handlePagePath(routeInfo)
//         case "resource":
//             return await handleResourcePath(routeInfo)
//         case "connector":
//             return await handleConnectorPath(routeInfo)
//         case "customer":
//             return await handleCustomerPath(routeInfo)
//         case "teamMember":
//             return await handleTeamMemberPath(routeInfo)
//         default:
//             console.error("Unknown route type:", routeInfo._type)
//             return []
//     }
// }

// Store resolved paths to avoid recalculating
const pathCache = new Map<string, string[]>()

// Add a new function to get path using the cached route map
export const getPathFromRouteMap = cache(async (slug: string): Promise<string[]> => {
  const routeMap = await getAllRoutes()
  
  // First, find the route by slug
  let routeInfo: RouteInfo | undefined
  for (const route of routeMap.values()) {
    if (route.metadata?.slug?.current === slug) {
      routeInfo = route
      break
    }
  }
  
  if (!routeInfo) {
    console.error("Failed to find route for slug:", slug)
    return []
  }
  
  // Now use the route map to build the path without additional API calls
  switch (routeInfo._type) {
    case "page":
      return await handlePagePathFromMap(routeInfo, routeMap)
    case "resource":
      return handleResourcePathDirect(routeInfo)
    case "connector":
      return handleConnectorPathDirect(routeInfo)
    case "customer":
      return handleCustomerPathDirect(routeInfo)
    case "teamMember":
      return handleTeamMemberPathDirect(routeInfo)
    default:
      console.error("Unknown route type:", routeInfo._type)
      return []
  }
})

// Non-recursive path handlers that use the route map
async function handlePagePathFromMap(routeInfo: RouteInfo, routeMap: Map<string, RouteInfo>): Promise<string[]> {
  // Check cache first
  const cacheKey = `page-${routeInfo._id}`
  if (pathCache.has(cacheKey)) {
    return pathCache.get(cacheKey)!
  }
  
  let result: string[]
  if (routeInfo.parent?._id) {
    const parentRoute = routeMap.get(routeInfo.parent._id)
    const parentPath = parentRoute ? await handlePagePathFromMap(parentRoute, routeMap) : []
    result = [...parentPath, routeInfo.metadata?.slug?.current || '']
  } else {
    result = [routeInfo.metadata?.slug?.current || '']
  }
  
  // Cache the result
  pathCache.set(cacheKey, result)
  return result
}

// Simplified direct path handlers (no async needed)
function handleResourcePathDirect(routeInfo: RouteInfo): string[] {
  // Same as your existing function but no async
  let basePath = ''
  const slug = routeInfo.metadata?.slug?.current || ''
  
  switch (routeInfo.type) {
    case "Blog": basePath = 'blog'; break;
    case "News": basePath = 'news'; break;
    case "Video": basePath = 'resources/video'; break;
    case "Tutorial": basePath = 'resources/tutorial'; break;
    case "Datasheet": basePath = 'resources/datasheet'; break;
    case "White Paper": basePath = 'resources/white-paper'; break;
    case "eBook": basePath = 'resources/ebook'; break;
    case "Infographic": basePath = 'resources/infographic'; break;
    default:
      console.error("Unknown resource type:", routeInfo.type)
      return []
  }
  
  const path = join(basePath, slug)
  return [path]
}

// Similar simplified versions for other entity types
function handleConnectorPathDirect(routeInfo: RouteInfo): string[] {
  const basePath = 'connectors'
  const path = join(basePath, routeInfo.metadata?.slug?.current || '')
  return [path]
}

function handleCustomerPathDirect(routeInfo: RouteInfo): string[] {
  const basePath = 'customers'
  const path = join(basePath, routeInfo.metadata?.slug?.current || '')
  return [path]
}

function handleTeamMemberPathDirect(routeInfo: RouteInfo): string[] {
  const basePath = 'about/management-team'
  const path = join(basePath, routeInfo.metadata?.slug?.current || '')
  return [path]
}

// async function handlePagePath(routeInfo: RouteInfo): Promise<string[]> {
//     // Check cache first
//     const cacheKey = `page-${routeInfo._id}`
//     if (pathCache.has(cacheKey)) {
//         return pathCache.get(cacheKey)!
//     }
    
//     let result: string[]
//     if (routeInfo.parent?._id) {
//         const parentRoute = await getRouteInfo(routeInfo.parent.link)
//         const parentPath = parentRoute ? await handlePagePath(parentRoute) : []
//         result = [...parentPath, routeInfo.metadata?.slug?.current || '']
//     } else {
//         result = [routeInfo.metadata?.slug?.current || '']
//     }
    
//     // Cache the result
//     pathCache.set(cacheKey, result)
//     return result
// }

// async function handleResourcePath(routeInfo: RouteInfo): Promise<string[]> {
//     let basePath = ''
//     const slug = routeInfo.metadata?.slug?.current || ''

//     switch (routeInfo.type) {
//         case "Blog":
//             basePath = 'blog'
//             break
//         case "News":
//             basePath = 'news'
//             break
//         case "Video":
//             basePath = 'resources/video'
//             break
//         case "Tutorial":
//             basePath = 'resources/tutorial'
//             break
//         case "Datasheet":
//             basePath = 'resources/datasheet'
//             break
//         case "White Paper":
//             basePath = 'resources/white-paper'
//             break
//         case "eBook":
//             basePath = 'resources/ebook'
//             break
//         case "Infographic":
//             basePath = 'resources/infographic'
//             break
//         default:
//             console.error("Unknown resource type:", routeInfo.type)
//             return []
//     }

//     const path = join(basePath, slug)
//     return [path]

// }

// async function handleConnectorPath(routeInfo: RouteInfo): Promise<string[]> {
//     const basePath = 'connectors'
//     const path = join(basePath, routeInfo.metadata?.slug?.current || '')
//     return [path]
// }

// async function handleCustomerPath(routeInfo: RouteInfo): Promise<string[]> {
//     const basePath = 'customers'
//     const path = join(basePath, routeInfo.metadata?.slug?.current || '')
//     return [path]
// }

// async function handleTeamMemberPath(routeInfo: RouteInfo): Promise<string[]> {
//     const basePath = 'about/management-team'
//     const path = join(basePath, routeInfo.metadata?.slug?.current || '')
//     return [path]
// }