import { Metadata } from 'next'
import { Metadata as MetadataType } from '@/sanity/types/sanity.types'

import { getPathFromRouteMap } from '@/lib/routing'

export const buildMetadata = async (metadata?: MetadataType): Promise<Metadata> => {
    if (!metadata) {
        return {}
    }

    let path = await getPathFromRouteMap(metadata.slug?.current || '')
    
    if (path[0] === 'home') {
        path = ['']
    }

    return {
        title: metadata.seoTitle || undefined,
        description: metadata.description || undefined,
        keywords: metadata.focusKeyprase || undefined,
        robots: {
            index: metadata.advanced?.allowSearchResults ?? true,
            follow: metadata.advanced?.followLinks ?? true,
        },
        alternates: {
            canonical: 'https://www.adeptia.com/' + path.join('/')
        },
        openGraph: {
            title: metadata.seoTitle || undefined,
            description: metadata.description || undefined,
        }
    }
}