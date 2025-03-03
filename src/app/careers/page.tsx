import { Container } from '@/components/container'
import { HeaderStyle as HeaderStyleType } from "@/sanity/types/sanity.types"
import { DefaultHeaderSection } from "@/components/headerSection"
import ZipRecruiterEmbed from '@/lib/zipRecruiterEmbed'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Adeptia Careers',
    description:
        'Adeptia Careers',
    alternates: {
        canonical: 'https://www.adeptia.com/careers',
    },
}

const CareersPageHeader: HeaderStyleType = {
    _type: "headerStyle",
    header: "Careers",
    subheader: "Join the Adeptia team",
    layout: "left-aligned",
}

export default function CareersPage() {

    return (
        <>
            <DefaultHeaderSection header={CareersPageHeader} />
            <Container>
                <ZipRecruiterEmbed />
            </Container>
        </>
    )
}

