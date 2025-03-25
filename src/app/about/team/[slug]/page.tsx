import { getManagementMember } from '@/sanity/queries/company'
import { Heading, Subheading } from '@/components/text'
import { TeamMember } from '@/sanity/types/sanity.types'
import { PortableTextBlock } from '@portabletext/react'
import { image } from '@/sanity/lib/image'
import StylePortableText from '@/components/stylePortableText'
import cleanString from '@/lib/cleanString'
import type { Metadata } from 'next'

type sParams = Promise<{ slug: string }>;

export const revalidate = 86400

export async function generateStaticParams() {
  return [
    { slug: 'charles-nardi' }
  ]
}
// Generated metadata for the blog post
export async function generateMetadata(props: { params: Promise<sParams> }): Promise<Metadata> {
    const params = await props.params;
    const member: TeamMember | undefined = await getManagementMember(params.slug)
    return {
        title: "Adeptia Team | " + cleanString(member?.name || ''),
        description: "Learn more about " + cleanString(member?.name || ''),
        alternates: {
            canonical: "https://www.adeptia.com/about/team/" + member?.slug?.current,
        },
        robots: {
            index: true,
            follow: true,
        },
        openGraph: {
            title: cleanString(member?.name || ''),
            description: "Learn more about " + cleanString(member?.name || ''),
        }
    }
}

export default async function ManagementTeamMember(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const member : TeamMember = await getManagementMember(params.slug)


  return (
    <div className="bg-white py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2x">
                <li className="flex flex-col items-center gap-4 mb-10">
                    {member.profilePic && (
                        <img
                        alt={cleanString(member.name || '')}
                        src={image(member.profilePic).size(600, 600).url()}
                        className={"mx-auto size-48 rounded-full md:size-56"}
                        />
                    )}
                    <Heading as='h2' className="text-center">{member.name}</Heading>
                    <Subheading className="text-center">{member.title}</Subheading>
                    {member.linkedIn && (
                        <a href={member.linkedIn} target="_blank" rel="noopener" className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">LinkedIn</span>
                            <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="size-5">
                                <path
                                d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                clipRule="evenodd"
                                fillRule="evenodd"
                                />
                            </svg>
                        </a>
                    )}
                </li>
                <div className="mx-auto max-w-2xl">
                    <StylePortableText value={member.body as PortableTextBlock[]} />
                </div>
            </div>
        </div>
    </div>
    )
}