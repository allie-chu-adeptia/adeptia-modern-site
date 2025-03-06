import ZipRecruiterEmbed from '@/lib/zipRecruiterEmbed'
import { CareerSection } from '@/sanity/types/sanity.types'
import { HeaderStyle } from '@/lib/headerStyle'

export default function CareerSectionComponent({careerSection}: {careerSection: CareerSection}) {
    return (
        <>
            <HeaderStyle header={careerSection.header} />
            <ZipRecruiterEmbed />
        </>
    )
}