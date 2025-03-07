import { image } from '@/sanity/lib/image'
import { TeamMember, TeamMemberSection as TeamMemberSectionType } from '@/sanity/types/sanity.types'
import { Link } from '@/components/link'
import { HeaderStyle } from '@/lib/headerStyle'

export interface ExpandedTeamMember extends Omit<TeamMemberSectionType, 'teamMembers'> {
    teamMembers: Array<TeamMember>
}

export function TeamMemberSection({
    team
}: {
    team: ExpandedTeamMember
}) {

    return (
        <>
            {team.header && <HeaderStyle header={team.header} />}

            <div className="bg-white mt-6 ">
                <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
                    <ul
                        role="list"
                        className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
                    >
                        {team.teamMembers.map((person: TeamMember) => (
                            <Link key={person.name} href={`/about/team/${person.slug?.current}`}>
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
