import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../lib/client'

const TOTAL_CONNECTORS_QUERY = defineQuery(/* groq */ `count(*[
  _type == "connector"
  && defined(metadata.slug.current)
  && (featured != true || defined($category))
  && select(defined($category) => $category in category[]->slug.current, true)
])`)

export async function getConnectorsCount(category?: string) {
  return await sanityFetch({ 
    query: TOTAL_CONNECTORS_QUERY, 
    params: { category: category ?? null } 
  })
}

const CONNECTORS_QUERY = defineQuery(/* groq */ `*[
  _type == "connector"
  && defined(metadata.slug.current)
  && select(defined($category) => $category in categories[]->slug.current, true)
]|order(name asc) {
  _id,
  name,
  subpage,
  "slug": metadata.slug.current,
  logo {
    asset->,
  },
}`)

export async function getConnectors(category?: string) {
  return await sanityFetch({ 
    query: CONNECTORS_QUERY, 
    params: { category: category ?? null } 
  })
}

const FEATURED_CONNECTORS_QUERY = defineQuery(/* groq */ `*[
  _type == "connector"
  && defined(metadata.slug.current)
  && featured == true
]|order(name asc)[0...$quantity] {
  _id,
  name,
  "slug": metadata.slug.current,
  logo {
    asset->
  },
}`)

export async function getFeaturedConnectors(quantity: number = 3) {
  return await sanityFetch({ 
    query: FEATURED_CONNECTORS_QUERY, 
    params: { quantity } 
  })
}

const CONNECTOR_QUERY = defineQuery(/* groq */ `*[
  _type == "connector"
  && metadata.slug.current == $slug
][0]{
  _id,
  name,
  "slug": metadata.slug.current,
  logo {
    asset->,
  },
  "categories": categories[]->{
    name,
    "slug": slug.current,
  },
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
}`)

export async function getConnector(slug: string) {
  const connector = await sanityFetch({ 
    query: CONNECTOR_QUERY, 
    params: { slug } 
  })

  if (!connector) {
    console.error(`Connector not found for slug: ${slug}`)
  }

  return connector
}

const CATEGORIES_QUERY = defineQuery(/* groq */ `*[
  _type == "category"
  && count(*[_type == "connector" 
  && defined(metadata.slug.current) 
  && ^._id in categories[]._ref]) > 0
]|order(name asc){
  name,
  "slug": slug.current,
}`)

export async function getCategories() {
  return await sanityFetch({ query: CATEGORIES_QUERY })
}

const COMPONENT_CONNECTOR_QUERY = defineQuery(/* groq */ `*[
  _type == "connector"
  && metadata.slug.current == $slug
][0]{
  _id,
  logo {
    asset->,
  },
}`)

export async function getComponentConnectors(slug: string) {
  return await sanityFetch({ 
    query: COMPONENT_CONNECTOR_QUERY, 
    params: { slug } 
  })
}