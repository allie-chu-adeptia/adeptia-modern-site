import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../lib/client'

const TOTAL_CUSTOMERS_QUERY = defineQuery(/* groq */ `count(*[
  _type == "customer"
  && hasCaseStudy == true
])`)

export async function getCustomersCount() {
  return await sanityFetch({ query: TOTAL_CUSTOMERS_QUERY })
}

const CUSTOMERS_QUERY = defineQuery(/* groq */ `*[
    _type == "customer"
    && defined(metadata.slug.current)
    && hasCaseStudy == true
]|order(defined(logo) desc)[$startIndex...$endIndex]{
    _type,
    _id,
    title,
    "featuredImage": featuredImage{
        ...,
        "altText": asset->title,
    },
    companyName,
    hideIdentifiableInfo,
    size,
    industry,
    description,
    "slug": metadata.slug.current,
    "logo": logo{
        ...,
        "altText": asset->altText,
    },
}`)

export async function getCustomers(startIndex: number, endIndex: number) {
    return await sanityFetch({ query: CUSTOMERS_QUERY, params: { startIndex, endIndex } })
}

const CUSTOMER_QUERY = defineQuery(/* groq */ `*[
    _type == "customer"
    && metadata.slug.current == $slug
][0]{
    title,
    metadata,
    companyName,
    logo,
    size,
    industry,
    description,
    "connector": connector[]->{
        "slug": metadata.slug.current,
        name,
        logo{
        ...
        }
    },
    "category": category[]->slug.current,
    challenge,
    solution,
    body,
}`)

export async function getCustomer(slug: string) {
    return await sanityFetch({ query: CUSTOMER_QUERY, params: { slug } })
}

const ALL_CUSTOMERS_QUERY = defineQuery(/* groq */ `*[_type == "customer"] {
    _id,
    metadata {
        slug {
            current
        }
    },
    _updatedAt,
    "slug": metadata.slug.current
}`)

export async function getAllCustomers() {
    return await sanityFetch({ query: ALL_CUSTOMERS_QUERY })
}