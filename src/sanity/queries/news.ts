import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../lib/client'

const TOTAL_NEWS_QUERY = defineQuery(/* groq */ `count(*[
  _type == "resource"
  && (type == "News")
  && defined(metadata.slug.current)
  && (featured != true)
])`)

export async function getNewsCount() {
  return await sanityFetch({ 
    query: TOTAL_NEWS_QUERY,
  })
}

const NEWS_QUERY = defineQuery(/* groq */ `*[
  _type == "resource"
  && (type == "News")
  && defined(metadata.slug.current)
]|order(publishDate desc)[$startIndex...$endIndex]{
  _type,
  _id,
  type,
  title,
  "slug": metadata.slug.current,
  publishDate,
  excerpt
}`)

export async function getNews(
    startIndex: number,
    endIndex: number
) {
    return await sanityFetch({
        query: NEWS_QUERY,
        params: {
            startIndex,
            endIndex,
        },
    })
}

const FEATURED_NEWS_QUERY = defineQuery(/* groq */ `*[
  _type == "resource"
  && (type == "News")
  && defined(metadata.slug.current)
  && featured == true
]|order(publishDate desc)[0...$quantity]{
  _id,
  title,
  "slug": metadata.slug.current,
  publishDate,
  excerpt
}`)

export async function getFeaturedResources(quantity: number) {
  return await sanityFetch({ 
    query: FEATURED_NEWS_QUERY,
    params: { quantity },
  })
}

const NEWS_ARTICLE_QUERY = defineQuery(/* groq */ `*[
  _type == "resource"
  && (type == "News")
  && metadata.slug.current == $slug
][0]{
  publishDate,
  title,
  excerpt,
  body[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        ...,
        "reference": reference->
      }
    }
  },
  featured,
}`)

export async function getNewsArticle(slug: string) {
    const resource = await sanityFetch({ 
        query: NEWS_ARTICLE_QUERY, 
        params: { slug } 
    })
    if (!resource) {
        console.error(`News article not found for slug: ${slug}`)
    }
    return resource
}