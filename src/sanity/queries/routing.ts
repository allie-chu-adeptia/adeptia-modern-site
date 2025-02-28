import { client } from '../lib/client'

export interface RouteInfo {
    _id: string
    _type: string
    metadata?: {
        slug: {
            current: string
        }
    }
    type?: string
    parent?: {
        _id: string
        link: string
    }
    category?: Array<{
        metadata?: {
            slug: {
                current: string
            }
        }
    }>
}

export async function getRouteInfo(slug: string): Promise<RouteInfo | null> {
    return await client.fetch(
        `*[_type in ["page", "resource", "connector", "customer", "teamMember"] && metadata.slug.current == $slug][0]{
      _id,
      _type,
      metadata {
        slug
      },
      type,
      parent->{
        _id,
        "link": metadata.slug.current
      },
      category[]->{
        metadata {
          slug
        }
      }
    }`,
        { slug }
    )
}