import { ContentSection, SanityImageCrop, SanityImageHotspot, IconPicker } from "../sanity/types/sanity.types";
import { HeaderStyle } from "../lib/headerStyle";
import IconRender from "@/lib/iconRender";
import Link from "next/link";
import cleanString from "@/lib/cleanString";
import clsx from "clsx";
import { image } from '@/sanity/image'

type spacing = 'tight' | 'loose'

type Subpoint = {
    icon?: IconPicker
    header?: string 
    subheader?: string
    button?: {
        _id: string
        title: string
        url: string
        link: string
    }
    _key: string
}

export type ExpandedContentSection = Omit<ContentSection, 'image' | 'subPoints' | 'button' > & {
    image?: {
        asset?: {
            _ref: string
            _type: 'reference'
            _weak?: boolean
        }
        hotspot?: SanityImageHotspot
        crop?: SanityImageCrop
        _type: 'image'
        altText?: string
    }
    subPoints?: Array<Subpoint>
    button?: {
        _id: string
        title: string
        url: string
        link: string
    }
}

// Build an array of subpoints and return as rendered content blocks
function BuildSubpoints({ subPoints, spacing, dark }: { subPoints: Array<Subpoint>, spacing: spacing, dark: boolean }) {
    return (
        <>
            {subPoints?.map((subpoint, index) => (
                spacing === 'tight' ? (
                    <div key={index} className="relative pl-9">
                        <dt className={clsx("inline font-semibold", dark ? "text-white" : "text-black")}>
                            {subpoint.icon && <IconRender name={subpoint.icon.name} className="absolute left-1 top-1 size-5 text-indigo-500" />}
                            {subpoint.header}
                        </dt>{' '}
                        <dd className={clsx("inline", dark ? "text-gray-300" : "text-black")}>{subpoint.subheader}</dd>
                        {subpoint.button && <p className="mt-6">
                            {subpoint.button?.url ? (
                                <a href={subpoint.button.url} target="_blank" rel="noopener noreferrer" className={clsx("text-sm/6 font-semibold", dark ? "text-indigo-400" : "text-indigo-600")}>
                                {subpoint.button.title} <span aria-hidden="true">→</span>
                                </a>
                            ) : (
                                <Link href={`/${subpoint.button?.link}`} className={clsx("text-sm/6 font-semibold", dark ? "text-indigo-400" : "text-indigo-600")}>
                                {subpoint.button.title} <span aria-hidden="true">→</span>
                                </Link>
                            )}
                        </p>}
                    </div>
                ) : (
                    <div key={index} className="flex flex-col">
                        <dt className={clsx("flex items-center gap-x-3 text-base/7 font-semibold", dark ? "text-white" : "text-black")}>
                            {subpoint.icon && <IconRender name={subpoint.icon.name} aria-hidden="true" className={clsx("size-5 flex-none", dark ? "text-indigo-400" : "text-indigo-600")} />}
                            {subpoint.header}
                        </dt>
                        <dd className={clsx("mt-4 flex flex-auto flex-col text-base/7", dark ? "text-white" : "text-black")}>
                            <p className="flex-auto">{subpoint.subheader}</p>
                            {subpoint.button && <p className="mt-6">
                                {subpoint.button?.url ? (
                                    <a href={subpoint.button.url} target="_blank" rel="noopener noreferrer" className={clsx("text-sm/6 font-semibold", dark ? "text-indigo-400" : "text-indigo-600")}>
                                    {subpoint.button.title} <span aria-hidden="true">→</span>
                                    </a>
                                ) : (
                                    <Link href={`/${subpoint.button?.link}`} className={clsx("text-sm/6 font-semibold", dark ? "text-indigo-400" : "text-indigo-600")}>
                                    {subpoint.button.title} <span aria-hidden="true">→</span>
                                    </Link>
                                )}
                            </p>}
                        </dd>
                    </div>
                )
            ))}
        </>
    )
}

function OffCenterImage(
    { contentSection, spacing, dark }: 
    { contentSection: ExpandedContentSection, spacing: spacing, dark: boolean }
) {
    console.log("off center image")
    return (
        <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pr-8 lg:pt-4">
                        <div className="lg:max-w-lg">
                            <HeaderStyle header={contentSection.header} style={contentSection.styleAndLayout?.background} />
                            <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                                {contentSection.subPoints && <BuildSubpoints subPoints={contentSection.subPoints} spacing={spacing} dark={dark} />}
                            </dl>
                            {contentSection.button && (
                                <div className="mt-8">
                                    <a
                                        href={contentSection.button?.url || `/${contentSection.button?.link}`}
                                        className="inline-flex rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        {contentSection.button?.title}
                                    </a>
                                </div>
                            )}l
                        </div>
                    </div>
                    {contentSection.image && (
                        <img
                            alt={contentSection.image?.altText || ''}
                            src={image(contentSection.image).size(2432, 1442).url()}
                            className="w-[48rem] max-w-none rounded-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

function CenteredImage(
    { contentSection, spacing, dark }: 
    { contentSection: ExpandedContentSection, spacing: spacing, dark: boolean }
) {
    return (
        <div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <HeaderStyle header={contentSection.header} style={contentSection.styleAndLayout?.background} />
            </div>
            <div className="relative pt-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    {contentSection.image && (
                        <img
                            alt={contentSection.image?.altText || ''}
                            src={image(contentSection.image).size(2432, 1442).url()}
                            className={clsx("rounded-xl shadow-2xl ring-1 ring-white/10")}
                        />
                    )}
                </div>
            </div>
            <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
                <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
                    {contentSection.subPoints && <BuildSubpoints subPoints={contentSection.subPoints} spacing={spacing} dark={dark} />}
                </dl>
            </div>
        </div>
    )
}

function NoImage(
    { contentSection, spacing, dark }: 
    { contentSection: ExpandedContentSection, spacing: spacing, dark: boolean }
) {
    console.log("no image")

    return (
        <div className="noImage contentSection">
            <HeaderStyle header={contentSection.header} style={contentSection.styleAndLayout?.background} />
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                    {contentSection.subPoints && <BuildSubpoints subPoints={contentSection.subPoints} spacing={spacing} dark={dark} />}
                </dl>
            </div>
        </div>
    )
}

export function ContentSectionComponent({ contentSection }: { contentSection: ExpandedContentSection }) {
    const spacing: spacing = contentSection.subPoints && contentSection.subPoints.length <= 3 ? 'loose' : 'tight'
    const cleanDark = cleanString(contentSection.styleAndLayout?.background?.style || '')
    const dark = cleanDark === 'dark' || cleanDark === 'accent' ? true : false

    return (
        <div className="contentSection">
            {!contentSection.image && <NoImage contentSection={contentSection} spacing={spacing} dark={dark} />}
            {contentSection.image && contentSection.styleAndLayout?.layout !== 'center' && <OffCenterImage contentSection={contentSection} spacing={spacing} dark={dark} />}
            {contentSection.image && contentSection.styleAndLayout?.layout === 'center' && <CenteredImage contentSection={contentSection} spacing={spacing} dark={dark} />}
        </div>
    )
}