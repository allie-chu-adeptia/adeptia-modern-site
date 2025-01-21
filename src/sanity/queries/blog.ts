import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../client'

const TOTAL_POSTS_QUERY = defineQuery(/* groq */ `count(*[
  _type == "post"
  && defined(slug.current)
  && (isFeatured != true || defined($category))
  && select(defined($category) => $category in categories[]->slug.current, true)
])`)

export async function getPostsCount(category?: string) {
  return await sanityFetch({
    query: TOTAL_POSTS_QUERY,
    params: { category: category ?? null },
  })
}

const POSTS_QUERY = defineQuery(/* groq */ `*[
  _type == "post" 
  && defined(slug.current)
  && select(defined($category) => $category in categories[]->slug.current, true)
]|order(date desc)[$startIndex...$endIndex]{
  _id,
  title,
  "slug": slug.current,
  date,
  excerpt,
  featuredMedia,
  "featuredMediaAlt": featuredMedia.alt,
  "author": author->{
    _id,
    name,
    link,
    "avatarUrl": avatar.asset->url
  },
  categories[]->{
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
  _type == "post"
  && featured == true
  && defined(slug.current)
]|order(featured, date desc){
  title,
  "slug": slug.current,
  date,
  featuredMedia,
  "featuredMediaAlt": featuredMedia.alt,
  excerpt,
  "author": author->{
    _id,
    name,
    link,
    "avatarUrl": avatar.asset->url
  },
}`)

export async function getFeaturedPosts(quantity: number) {
  return await sanityFetch({
    query: FEATURED_POSTS_QUERY,
    params: { quantity },
  })
}

const FEED_POSTS_QUERY = defineQuery(/* groq */ `*[
  _type == "post"
  && defined(slug.current)
]|order(isFeatured, date desc){
  title,
  "slug": slug.current,
  date,
  featuredMedia,
  "featuredMediaAlt": featuredMedia.alt,
  excerpt,
  "author": author->{
    _id,
    name,
    link,
    "avatarUrl": avatar.asset->url
  },
}`)

export async function getPostsForFeed() {
  return await sanityFetch({
    query: FEED_POSTS_QUERY,
  })
}

const POST_QUERY = defineQuery(/* groq */ `*[
  _type == "post"
  && slug.current == $slug
][0]{
  date,
  title,
  featuredMedia,
  "featuredMediaAlt": featuredMedia.alt,
  excerpt,
  content,
  "author": author->{
    _id,
    name,
    link,
    "avatarUrl": avatar.asset->url
  },
  "categories": categories[]->{
    name,
    "slug": slug.current,
  }
}
`)

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
  && count(*[_type == "post" && defined(slug.current) && ^._id in categories[]._ref]) > 0
]|order(name asc){
  name,
  "slug": slug.current,
}`)

export async function getCategories() {
  return await sanityFetch({
    query: CATEGORIES_QUERY,
  })
}
