import { getServerSideSitemap } from 'next-sitemap'
import { getAllTeamMembers } from '@/sanity/queries/sitemap'
import { TeamMember } from '@/sanity/types/sanity.types'

export async function GET() {
  const baseUrl = 'https://www.adeptia.com'
  const teamMembers = await getAllTeamMembers()
  
  const teamMemberEntries = teamMembers.map((teamMember: TeamMember) => ({
    loc: `${baseUrl}/team/${teamMember.slug}`,
    lastmod: teamMember._updatedAt || new Date().toISOString(),
    changefreq: 'monthly',
    priority: 0.9,
  }))
  
  return getServerSideSitemap(teamMemberEntries)
}