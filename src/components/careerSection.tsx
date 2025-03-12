import ZipRecruiterEmbed from '@/lib/zipRecruiterEmbed'
import { CareerSection } from '@/sanity/types/sanity.types'
import { HeaderStyle } from '@/lib/headerStyle'
import { Button } from './button'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

export default function CareerSectionComponent({ careerSection }: { careerSection: CareerSection }) {
    return (
        <>
            <HeaderStyle header={careerSection.header} />
            {careerSection.button && (
                <div className={`mt-2 w-full flex justify-center`}>
                    <Button
                        slug={careerSection.button?.link ? `${careerSection.button.link}` : undefined}
                        href={careerSection.button?.url ? `${careerSection.button.url}` : ''}
                        dark={false}
                        variant={"tertiary"}
                    >

                        {careerSection.button?.title}
                        <ChevronRightIcon className="size-4 transform translate-x-1 transition-all duration-200 ease-in-out group-hover:opacity-100 group-hover:translate-x-0" />
                    </Button>
                </div>
            )}
            <ZipRecruiterEmbed />
        </>
    )
}