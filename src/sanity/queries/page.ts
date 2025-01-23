import { defineQuery } from "next-sanity";
import { sanityFetch } from '../client'
import { Page } from "../types/sanity.types";

// Fetches a single page by its slug, including:
// - Basic page info (id, title, metadata)
// - Media (icon)
// - Classifications (tags, categories) 
// - Parent page reference with its parent
// - All blocks with resolved references
const PAGE_QUERY = defineQuery(/* groq */ `*[
  _type == "page"
  && metadata.slug.current == $slug
][0]{
    _id,
    title,
    metadata,
    icon,
    tag,
    category,
    "parent": parent->{
        _id,
        metadata,
        parent->
    },
    blocks[] {
        _type == 'reference' => @->,
        ...
    }
}`)

// Fetches a single page by its slug, including:
export async function getPage(slug: string): Promise<Page | null> {
  return await sanityFetch({
    query: PAGE_QUERY,
    params: { slug }
  })
}

// Fetches a leaf page (one with no children) by its slug
// Returns basic page info and parent hierarchy
// Used for generating paths/breadcrumbs
const PATH_QUERY = defineQuery(/* groq */ `*[
  _type == "page"
  && metadata.slug.current == $lastSlug
  && count(
    *[_type == "page" && parent._ref == ^._id]
  ) == 0
][0]{
  _id,
  title,
  metadata,
  parent->{
    _id,
    metadata,
    parent->
  },
}`)

export async function getPath(lastSlug: string) {
  return await sanityFetch({
    query: PATH_QUERY,
    params: { lastSlug }
  })
}