import { HeaderStyle } from "@/lib/headerStyle"
import { CalloutSection } from "@/sanity/types/sanity.types"
import cleanString from "@/lib/cleanString"
import { nokora } from "./text"

export const CalloutSectionComponent = ({
    calloutSection
}: {
    calloutSection: CalloutSection
}) => {
    const cleanStyle = cleanString(calloutSection.background?.style || '')
    const dark = cleanStyle === 'dark' ? true : false
    const numCalloutPoints = calloutSection.calloutPoint?.length || 0

    return (
        <div>
            <HeaderStyle
                header={calloutSection.header}
                style={calloutSection.background}
            />
            <dl className={`mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-white sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-${numCalloutPoints}`}>
                {calloutSection.calloutPoint && calloutSection.calloutPoint.map((point, index) => (
                    <div key={index} className={`flex flex-col gap-y-3 border-l ${dark ? 'border-white/10' : 'border-gray-900/10'} pl-6`}>
                        <dd className={`order-first text-xl tracking-tight ${dark ? 'text-white' : 'text-gray-800'} ${nokora.className}`}>{point.calloutHeader}</dd>
                        <dt className={`text-sm/6 ${dark ? 'text-white' : 'text-gray-600'}`}>{point.calloutBody}</dt>
                    </div>
                ))}
            </dl>
        </div>
    )
}