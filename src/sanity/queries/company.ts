import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../client'  

const MANAGEMENT_TEAM_QUERY = defineQuery(/* groq */ `
  *[_type == "teamMember" && displayInManagement == true] {
    _id,
    name,
    title,
    "profilePic": profilePic.asset->url,
    linkedIn,
    slug
  } | order(name asc)
`)

const MANAGEMENT_MEMBER_QUERY = defineQuery(/* groq */ `
  *[_type == "teamMember" && displayInManagement == true && slug.current == $slug][0] {
    _id,
    name,
    title,
    body,
    "profilePic": profilePic.asset->url,
    linkedIn,
    slug
  }
`)

export async function getManagementTeam() {
    return await sanityFetch({
      query: MANAGEMENT_TEAM_QUERY,
    })
}

export async function getManagementMember(slug: string) {
    return await sanityFetch({
      query: MANAGEMENT_MEMBER_QUERY,
      params: { slug },
    })
}