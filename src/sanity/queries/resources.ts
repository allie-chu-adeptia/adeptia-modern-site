import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../lib/client'

const TOTAL_RESOURCES_QUERY = defineQuery(/* groq */ `count(*[
  _type == "resource"
  && (type == "Datasheet" || type == "White Paper" || type == "Video" || type == "eBook" || type == "Infographic")
  && defined(metadata.slug.current)
  && (featured != true || defined($category))
  && select(defined($category) => $category in category[]->slug.current, true)
  && select(defined($type) => type == $type, true)
])`)

export async function getResourcesCount(category?: string, type?: string) {
  return await sanityFetch({ 
    query: TOTAL_RESOURCES_QUERY,
    params: {
      category: category ?? null,
      type: type ?? null,
    },
  })
}

const RESOURCES_QUERY = defineQuery(/* groq */ `*[
  _type == "resource"
  && (type == "Datasheet" || type == "White Paper" || type == "Video" || type == "eBook" || type == "Infographic")
  && defined(metadata.slug.current)
  && select(defined($category) => $category in category[]->slug.current, true)
  && select(defined($type) => type == $type, true)
]|order(publishDate desc)[$startIndex...$endIndex]{
  _type,
  _id,
  type,
  title,
  "slug": metadata.slug.current,
  publishDate,
  excerpt,
  category[]->{
    _id,
    name,
    "slug": slug.current
  },
  "featuredImage": featuredImage{
    ...,
    "altText": asset->altText,
  },
}`)

export async function getResources(
    startIndex: number,
    endIndex: number,
    category?: string,
    type?: string,
) {
    return await sanityFetch({
        query: RESOURCES_QUERY,
        params: {
            startIndex,
            endIndex,
            category: category ?? null,
            type: type ?? null,
        },
    })
}

const FEATURED_RESOURCES_QUERY = defineQuery(/* groq */ `*[
  _type == "resource"
  && (type == "Datasheet" || type == "White Paper" || type == "Video" || type == "eBook" || type == "Infographic")
  && defined(metadata.slug.current)
  && featured == true
]|order(publishDate desc)[0...$quantity]{
  _type,
  _id,
  title,
  "slug": metadata.slug.current,
  publishDate,
  excerpt,
  "featuredImage": featuredImage{
    ...,
    "altText": asset->altText,
  },
}`)

export async function getFeaturedResources(quantity: number) {
  return await sanityFetch({ 
    query: FEATURED_RESOURCES_QUERY,
    params: { quantity },
  })
}

const RESOURCE_QUERY = defineQuery(/* groq */ `*[
  _type == "resource"
  && (type == "Datasheet" || type == "White Paper" || type == "Video" || type == "eBook" || type == "Infographic")
  && metadata.slug.current == $slug
][0]{
  _type,
  publishDate,
  title,
  "featuredImage": featuredImage{
    ...,
    "altText": asset->altText,
  },
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
  "categories": category[]->{
    name,
    "slug": slug.current,
  },
  type == "Video" => {
    video
  },
  type in ["White Paper", "eBook", "Datasheet", "Infographic"] => {
    "fileURL": downloadFile.asset->url,
    "HSForm": HSForm->{
      formID,
      thankYouMessage
    }
  }
}`)

export async function getResource(slug: string) {
    const resource = await sanityFetch({ 
        query: RESOURCE_QUERY, 
        params: { slug } 
    })
    if (!resource) {
        console.error(`Resource not found for slug: ${slug}`)
    }
    return resource
}

const CATEGORIES_QUERY = defineQuery(/* groq */ `*[
    _type == "category"
    && count(*[_type == "resource" 
    && (type == "Datasheet" || type == "White Paper" || type == "Video" || type == "eBook" || type == "Infographic") 
    && defined(metadata.slug.current) 
    && ^._id in category[]._ref]) > 0
  ]|order(name asc){
    name,
    "slug": slug.current,
  }`)
  
  export async function getCategories() {
    return await sanityFetch({
      query: CATEGORIES_QUERY,
    })
  }

const DOWNLOAD_FILE_QUERY = defineQuery(/* groq */ `*[
  _type == "resource"
  && metadata.slug.current == $slug
][0]{
  "fileURL": downloadFile.asset->url
}`)

export async function getDownloadFile(slug: string) {
  return await sanityFetch({
    query: DOWNLOAD_FILE_QUERY,
    params: { slug }
  })
}