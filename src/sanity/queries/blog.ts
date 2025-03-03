import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../lib/client'

const TOTAL_POSTS_QUERY = defineQuery(/* groq */ `count(*[
  _type == "resource"
  && type == "Blog"
  && defined(metadata.slug.current)
  && (featured != true || defined($category))
  && select(defined($category) => $category in category[]->slug.current, true)
])`)

export async function getPostsCount(category?: string) {
  return await sanityFetch({
    query: TOTAL_POSTS_QUERY,
    params: { category: category ?? null },
  })
}

const POSTS_QUERY = defineQuery(/* groq */ `*[
  _type == "resource"
  && type == "Blog"
  && defined(metadata.slug.current)
  && select(defined($category) => $category in category[]->slug.current, true)
]|order(publishDate desc)[$startIndex...$endIndex]{
  _type,
  type,
  _id,
  title,
  "slug": metadata.slug.current,
  publishDate,
  excerpt,
  "featuredImage": featuredImage{
    ...,
    "altText": asset->altText,
  },
  "author": author->{
    _id,
    name,
    profilePic
  },
  category[]->{
    _id,
    name,
    "slug": slug.current
  }
}`)

export async function getPosts(
  startIndex: number,
  endIndex: number,
  category?: string,
) {
  return await sanityFetch({
    query: POSTS_QUERY,
    params: {
      startIndex,
      endIndex,
      category: category ?? null,
    },
  })
}
const FEATURED_POSTS_QUERY = defineQuery(/* groq */ `*[
  _type == "resource"
  && type == "Blog" 
  && featured == true
  && defined(metadata.slug.current)
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
  featured,
  "author": author->{
    _id,
    name,
    profilePic
  }
}`)

export async function getFeaturedPosts(quantity: number) {
  return await sanityFetch({
    query: FEATURED_POSTS_QUERY,
    params: { quantity },
  })
}

const FEED_POSTS_QUERY = defineQuery(/* groq */ `*[
  _type == "resource"
  && type == "Blog"
  && defined(metadata.slug.current)
]|order(featured, publishDate desc){
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
  "author": author->{
    _id,
    name,
    profilePic
  },
}`)

export async function getPostsForFeed() {
  return await sanityFetch({
    query: FEED_POSTS_QUERY,
  })
}

const POST_QUERY = defineQuery(/* groq */ `*[
  _type == "resource"
  && type == "Blog"
  && metadata.slug.current == $slug
][0]{
  publishDate,
  metadata,
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
  "author": author->{
    _id,
    name,
    profilePic
  },
  "categories": category[]->{
    name,
    "slug": slug.current,
  }
}`)

export async function getPost(slug: string) {
  const post = await sanityFetch({
    query: POST_QUERY,
    params: { slug },
  })
  
  if (!post) {
    console.error(`Post not found for slug: ${slug}`)
  }

  return post
}

const CATEGORIES_QUERY = defineQuery(/* groq */ `*[
  _type == "category"
  && count(*[_type == "resource" && type == "Blog" && defined(metadata.slug.current) && ^._id in category[]._ref]) > 0
]|order(name asc){
  name,
  "slug": slug.current,
}`)

export async function getCategories() {
  return await sanityFetch({
    query: CATEGORIES_QUERY,
  })
}
