import { Metadata } from 'next'
import { Metadata as MetadataType } from '@/sanity/types/sanity.types'

import { getPathFromRouteMap } from '@/lib/routing'
import { ExpandedImage } from '@/sanity/types/local.types'

export const buildMetadata = async (
    metadata?: MetadataType,
    image?: ExpandedImage
): Promise<Metadata> => {
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
            images: image ? [
                {
                    url: image?.url,
                    alt: image?.altText || '',
                    width: 800,
                    height: 545
                }
            ] : [
                {
                    url: 'https://cdn.sanity.io/images/5ujtwa6a/production/d1c087b2825443cc71e0a490e13613a419e31990-8000x5463.png',
                    width: 800,
                    height: 545,
                    alt: 'Adeptia Image Banner'
                }
            ]
        }
    }
}