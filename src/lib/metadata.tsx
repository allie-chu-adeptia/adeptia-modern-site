import { Metadata } from 'next'
import { Metadata as MetadataType } from '@/sanity/types/sanity.types'

import { getPath } from '@/lib/routing'

export const buildMetadata = async (metadata?: MetadataType): Promise<Metadata> => {
    if (!metadata) {
        return {}
    }

    const path = await getPath(metadata.slug?.current || '')

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