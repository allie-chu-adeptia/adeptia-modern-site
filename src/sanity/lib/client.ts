import { createClient, type QueryParams } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/lib/env'

const isDevelopment = process.env.NODE_ENV === 'development'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: isDevelopment ? false : true,
  perspective: 'published',
  stega: {
    enabled: isDevelopment,
    studioUrl: 'http://localhost:3333/studio',
  },
})

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = 86400,
  tags = [],
}: {
  query: QueryString
  params?: QueryParams
  revalidate?: number | false
  tags?: string[]
}) {
  return client.fetch(query, params, {
    next: {
      revalidate: isDevelopment || tags.length ? false : revalidate,
      tags,
    },
  })
}
