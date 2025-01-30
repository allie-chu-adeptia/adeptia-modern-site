import { getManagementMember } from '@/sanity/queries/company'
import { Container } from '@/components/container'
import { Heading, Subheading } from '@/components/text'
import { TeamMember } from '@/sanity/types/sanity.types'
import { PortableText } from '@portabletext/react'

export default async function ManagementTeamMember({ params }: { params: { slug: string } }) {
    const member : TeamMember = await getManagementMember(params.slug)


    return (
        <div className="bg-white py-24 md:py-32 lg:py-40">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-20 px-6 lg:px-8 xl:grid-cols-3">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <Heading as='h2' className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">{member.name}</Heading>
              <Subheading>{member.title}</Subheading>
            </div>
            <div className="mx-auto max-w-2xl">
                <PortableText value={member.body || []} />
            </div>
          </div>
        </div>
      )
}