import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../lib/client'

// Fetches all Datasheets for sitemap generation
const ALL_DATASHEETS_QUERY = defineQuery(/* groq */ `*[_type == "resource" && type == "Datasheet" && !(_id in path("drafts.**"))] {
    _id,
    _updatedAt,
    "slug": metadata.slug.current
}`)

// Fetches all White Papers for sitemap generation
const ALL_WHITE_PAPERS_QUERY = defineQuery(/* groq */ `*[_type == "resource" && type == "White Paper" && !(_id in path("drafts.**"))] {
    _id,
    _updatedAt,
    "slug": metadata.slug.current
}`)

// Fetches all eBooks for sitemap generation
const ALL_EBOOKS_QUERY = defineQuery(/* groq */ `*[_type == "resource" && type == "eBook" && !(_id in path("drafts.**"))] {
    _id,
    _updatedAt,
    "slug": metadata.slug.current
}`)

// Fetches all Infographics for sitemap generation
const ALL_INFOGRAPHICS_QUERY = defineQuery(/* groq */ `*[_type == "resource" && type == "Infographic" && !(_id in path("drafts.**"))] {
    _id,
    _updatedAt,
    "slug": metadata.slug.current
}`)

// Fetches all News for sitemap generation
const ALL_NEWS_QUERY = defineQuery(/* groq */ `*[_type == "resource" && type == "News" && !(_id in path("drafts.**"))] {
    _id,
    _updatedAt,
    "slug": metadata.slug.current
}`)

// Fetches all Blog posts for sitemap generation
const ALL_BLOGS_QUERY = defineQuery(/* groq */ `*[_type == "resource" && type == "Blog" && !(_id in path("drafts.**"))] {
    _id,
    _updatedAt,
    "slug": metadata.slug.current
}`)

// Fetches all Videos for sitemap generation
const ALL_VIDEOS_QUERY = defineQuery(/* groq */ `*[_type == "resource" && type == "Video" && !(_id in path("drafts.**"))] {
    _id,
    _updatedAt,
    "slug": metadata.slug.current
}`)

// Fetches all Tutorials for sitemap generation
const ALL_TUTORIALS_QUERY = defineQuery(/* groq */ `*[_type == "resource" && type == "Tutorial" && !(_id in path("drafts.**"))] {
    _id,
    _updatedAt,
    "slug": metadata.slug.current
}`)

export async function getAllDatasheets() {
    return await sanityFetch({
        query: ALL_DATASHEETS_QUERY
    })
}

export async function getAllWhitePapers() {
    return await sanityFetch({
        query: ALL_WHITE_PAPERS_QUERY
    })
}

export async function getAllEbooks() {
    return await sanityFetch({
        query: ALL_EBOOKS_QUERY
    })
}

export async function getAllInfographics() {
    return await sanityFetch({
        query: ALL_INFOGRAPHICS_QUERY
    })
}

export async function getAllNews() {
    return await sanityFetch({
        query: ALL_NEWS_QUERY
    })
}

export async function getAllBlogs() {
    return await sanityFetch({
        query: ALL_BLOGS_QUERY
    })
}

export async function getAllVideos() {
    return await sanityFetch({
        query: ALL_VIDEOS_QUERY
    })
}

export async function getAllTutorials() {
    return await sanityFetch({
        query: ALL_TUTORIALS_QUERY
    })
}

// Fetches all pages for sitemap generation
const ALL_PAGES_QUERY = defineQuery(/* groq */ `*[_type == "page"] {
    _id,
    _updatedAt,
    "slug": metadata.slug.current
  }`)

export async function getAllPages() {
    return await sanityFetch({
        query: ALL_PAGES_QUERY
    })
}

const ALL_CUSTOMERS_QUERY = defineQuery(/* groq */ `*[_type == "customer" && hasCaseStudy == true] {
    _id,
    _updatedAt,
    "slug": metadata.slug.current
  }`)

export async function getAllCustomers() {
    return await sanityFetch({
        query: ALL_CUSTOMERS_QUERY
    })
}

const ALL_CONNECTORS_QUERY = defineQuery(/* groq */ `*[_type == "connector"] {
    _id,
    _updatedAt,
    "slug": metadata.slug.current
  }`)

export async function getAllConnectors() {
    return await sanityFetch({
        query: ALL_CONNECTORS_QUERY
    })
}

const ALL_TEAM_MEMBERS_QUERY = defineQuery(/* groq */ `*[_type == "teamMember" && displayInManagement == true] {
    _id,
    _updatedAt,
    "slug": slug.current
  }`)

export async function getAllTeamMembers() {
    return await sanityFetch({
        query: ALL_TEAM_MEMBERS_QUERY
    })
}