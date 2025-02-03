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

export async function getManagementTeam() {
    return await sanityFetch({
      query: MANAGEMENT_TEAM_QUERY,
    })
}

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

export async function getManagementMember(slug: string) {
    return await sanityFetch({
      query: MANAGEMENT_MEMBER_QUERY,
      params: { slug },
    })
}

const COMPANY_TERMS_OF_SERVICE_QUERY = defineQuery(/* groq */ `
  *[_type == "company" && companyName == "Adeptia"][0] {
    termsOfService
  }
`)

export async function getCompanyTermsOfService() {
    return await sanityFetch({
      query: COMPANY_TERMS_OF_SERVICE_QUERY,
    })
}

const COMPANY_PRIVACY_POLICY_QUERY = defineQuery(/* groq */ `
  *[_type == "company" && companyName == "Adeptia"][0] {
    privacyPolicy
  }
`)

export async function getCompanyPrivacyPolicy() {
    return await sanityFetch({
      query: COMPANY_PRIVACY_POLICY_QUERY,
    })
}