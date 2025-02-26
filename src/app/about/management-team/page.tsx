import { image } from '@/sanity/lib/image'
import { getManagementTeam } from '@/sanity/queries/company'
import { TeamMember } from '@/sanity/types/sanity.types'
import { Link } from '@/components/link'
import { HeaderStyle as HeaderStyleType } from '@/sanity/types/sanity.types'
import { DefaultHeaderSection } from '@/components/headerSection'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Take a Look at the Adeptia Management Team',
  description:
    'Learn more about Adeptia&apos;s leadership and management team, leading the integration revolution!',
  alternates: {
    canonical: 'https://www.adeptia.com/about/management-team',
  },
}

const ManagementTeamHeader: HeaderStyleType = {
  _type: "headerStyle",
  eyebrow: "About",
  header: "Meet the Team",
  subheader: "Adeptia software simplifies and speeds the complex steps of implementing multi-enterprise business data ecosystems. Meet the team that's making it happen.",
  layout: "left-aligned",
}

export default async function ManagementTeam() {
  const team = await getManagementTeam()
  return (
    <>
      <DefaultHeaderSection header={ManagementTeamHeader} />
      <div className="bg-white py-4 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
          >
            {team.map((person: TeamMember) => (
              <Link key={person.name} href={`/about/management-team/${person.slug?.current}`}>
                <li className="rounded-2xl bg-gray-100 hover:bg-gray-200 px-8 py-10">
                  {person.profilePic && (
                    <img
                      alt={person.name || ''}
                      src={image(person.profilePic).size(600, 600).url()}
                      className={"mx-auto size-48 rounded-full md:size-56"}
                    />
                  )}
                  <h3 className="mt-6 text-base/7 font-semibold tracking-tight text-gray-950">{person.name}</h3>
                  <p className="text-sm/6 text-gray-400">{person.title}</p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
