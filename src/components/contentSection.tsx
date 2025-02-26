import { ContentSection, SanityImageCrop, SanityImageHotspot, IconPicker } from "../sanity/types/sanity.types";
import { HeaderStyle } from "../lib/headerStyle";
import IconRender from "@/lib/iconRender";
import { Link } from "@/components/link";
import cleanString from "@/lib/cleanString";
import clsx from "clsx";
import { image } from '@/sanity/lib/image'

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

export type ExpandedContentSection = Omit<ContentSection, 'image' | 'subPoints' | 'button'> & {
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
        url?: string
        link?: string
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
                            {subpoint.icon && <IconRender name={subpoint.icon.name} className="absolute left-1 top-1 size-5 text-[var(--primary-blue)]" />}
                            {subpoint.header}
                        </dt>{' '}
                        <dd className={clsx("inline", dark ? "text-gray-300" : "text-gray-700")}>{subpoint.subheader}</dd>
                        {subpoint.button && <p className="mt-6">
                            {subpoint.button?.url ? (
                                <a href={subpoint.button.url} target="_blank" rel="noopener noreferrer" className={clsx("text-sm/6 font-semibold", dark ? "text-[var(--primary-blue-lighter)]" : "text-[var(--primary-blue)]")}>
                                    {subpoint.button.title} <span aria-hidden="true">→</span>
                                </a>
                            ) : (
                                <Link
                                    slug={subpoint.button?.link ? `${subpoint.button.link}` : undefined}
                                    href={subpoint.button?.url ? `${subpoint.button.url}` : ''}
                                    className={clsx("text-sm/6 font-semibold", dark ? "text-[var(--primary-blue-lighter)]" : "text-[var(--primary-blue)]")}
                                >
                                    {subpoint.button.title} <span aria-hidden="true">→</span>
                                </Link>
                            )}
                        </p>}
                    </div>
                ) : (
                    <div key={index} className="flex flex-col">
                        <dt className={clsx("flex flex-col items-left text-base/7 font-semibold", dark ? "text-white" : "text-gray-800")}>
                            {subpoint.icon &&
                                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-[var(--primary-blue)]">
                                    <IconRender
                                        name={subpoint.icon.name}
                                        aria-hidden="true"
                                        className={clsx("size-5 flex-none text-white")}
                                    />
                                </div>}
                            {subpoint.header}
                        </dt>
                        <dd className={clsx("mt-4 flex flex-auto flex-col text-base/7", dark ? "text-white" : "text-gray-700")}>
                            <p className="flex-auto">{subpoint.subheader}</p>
                            {subpoint.button && <p className="mt-6">
                                {subpoint.button?.url ? (
                                    <a href={subpoint.button.url} target="_blank" rel="noopener noreferrer" className={clsx("text-sm/6 font-semibold", dark ? "text-[var(--primary-blue-lighter)]" : "text-[var(--primary-blue)]")}>
                                        {subpoint.button.title} <span aria-hidden="true">→</span>
                                    </a>
                                ) : (
                                    <Link
                                        slug={subpoint.button?.link ? `${subpoint.button.link}` : undefined}
                                        href={subpoint.button?.url ? `${subpoint.button.url}` : ''}
                                        className={clsx("text-sm/6 font-semibold", dark ? "text-[var(--primary-blue-lighter)]" : "text-[var(--primary-blue)]")}
                                    >
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
    const alignment = cleanString(contentSection.styleAndLayout?.layout || 'left')
    const link_alignment = contentSection.header?.layout === 'centered' ? 'justify-center' : 'justify-start'

    return (
        <>
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                <div className={clsx("flex flex-col justify-center lg:pr-8 lg:pt-4", alignment === 'right' ? 'lg:pl-16 lg:order-2' : '')}>
                    <div className="lg:max-w-lg">
                        <HeaderStyle header={contentSection.header} style={contentSection.styleAndLayout?.background} level={3} />
                        {contentSection.subPoints && <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                            <BuildSubpoints subPoints={contentSection.subPoints} spacing={spacing} dark={dark} />
                        </dl>}
                        {contentSection.button && (
                            <div className={`mt-10 w-full flex ${link_alignment}`}>
                                <Link
                                    slug={contentSection.button?.link ? `${contentSection.button.link}` : undefined}
                                    href={contentSection.button?.url ? `${contentSection.button.url}` : ''}
                                    className="inline-flex rounded-md bg-[var(--primary-blue)] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--primary-blue-lighter)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-blue)]"
                                >
                                    {contentSection.button?.title}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                {contentSection.image && (
                    <div className={clsx("flex items-center justify-end rounded-xl", alignment === 'right' ? 'lg:order-1' : 'lg:order-2')}>
                        <img
                            alt={contentSection.image?.altText || ''}
                            src={image(contentSection.image).size(2400, 1800).url()}
                            className="w-[48rem] rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                        />
                    </div>
                )}
            </div>
        </>
    )
}

function CenteredImage(
    { contentSection, spacing, dark }:
        { contentSection: ExpandedContentSection, spacing: spacing, dark: boolean }
) {
    const alignment = contentSection.header?.layout === 'centered' ? 'justify-center' : 'justify-start'
    const numSubpoints = contentSection.subPoints?.length === 2 || contentSection.subPoints?.length === 4 ? '2' : '3'
    console.log(contentSection.button?.link)

    return (
        <div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <HeaderStyle header={contentSection.header} style={contentSection.styleAndLayout?.background} level={3} />
                {contentSection.button && (
                    <div className={`mt-10 w-full flex ${alignment}`}>
                        <Link
                            slug={contentSection.button?.link ? `${contentSection.button.link}` : undefined}
                            href={contentSection.button?.url ? `${contentSection.button.url}` : ''}
                            className="inline-flex rounded-md bg-[var(--primary-blue)] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--primary-blue-lighter)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-blue)]"
                        >
                            {contentSection.button?.title}
                        </Link>
                    </div>
                )}
            </div>
            <div className="relative pt-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    {contentSection.image && (
                        <img
                            alt={contentSection.image?.altText || ''}
                            src={image(contentSection.image).size(2400, 1800).url()}
                            className={clsx("rounded-xl shadow-2xl ring-1 ring-white/10")}
                        />
                    )}
                </div>
            </div>
            {contentSection.subPoints && (
                <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
                    <dl className={`mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-${numSubpoints} lg:gap-x-8 lg:gap-y-16`}>
                        {contentSection.subPoints && <BuildSubpoints subPoints={contentSection.subPoints} spacing={spacing} dark={dark} />}
                    </dl>
                </div>
            )}
        </div>
    )
}

function NoImage(
    { contentSection, spacing, dark }:
        { contentSection: ExpandedContentSection, spacing: spacing, dark: boolean }
) {
    const alignment = contentSection.header?.layout === 'centered' ? 'justify-center' : 'justify-start'
    const contentAlignment = cleanString(contentSection.styleAndLayout?.layout || 'left')
    const numSubpoints = contentSection.subPoints?.length === 2 || contentSection.subPoints?.length === 4 ? '2' : '3'
    console.log(numSubpoints)

    return (
        contentSection.styleAndLayout?.layout === 'center' ? (
            <div className="noImage contentSection flex flex-col items-center gap-y-12">
                <HeaderStyle header={contentSection.header} style={contentSection.styleAndLayout?.background} level={3} />
                {contentSection.button && (
                    <div className={`mt-10 w-full flex ${alignment}`}>
                        <Link
                            slug={contentSection.button?.link ? `${contentSection.button.link}` : undefined}
                            href={contentSection.button?.url ? `${contentSection.button.url}` : ''}
                            className="inline-flex rounded-md bg-[var(--primary-blue)] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--primary-blue-lighter)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-blue)]"
                        >
                            {contentSection.button?.title}
                        </Link>
                    </div>
                )}
                <div className="mx-auto mt-16 lg:mt-0 lg:col-span-3">
                    <dl className={`grid max-w-xl grid-cols-1 gap-x-20 gap-y-16 lg:max-w-none lg:grid-cols-${numSubpoints}`}>
                        {contentSection.subPoints && <BuildSubpoints subPoints={contentSection.subPoints} spacing={spacing} dark={dark} />}
                    </dl>
                </div>
            </div>
        ) : (
            <div className="noImage contentSection grid grid-cols-1 lg:grid-cols-5 items-center gap-x-12">
                <div className={`lg:col-span-2 flex flex-col ${contentAlignment === 'right' ? 'lg:order-2' : 'lg:order-1'}`}>
                    <HeaderStyle header={contentSection.header} style={contentSection.styleAndLayout?.background} level={3} />
                    {contentSection.button && (
                        <div className={`mt-10 w-full flex ${alignment}`}>
                            <Link
                                slug={contentSection.button?.link ? `${contentSection.button.link}` : undefined}
                                href={contentSection.button?.url ? `${contentSection.button.url}` : ''}
                                className="inline-flex rounded-md bg-[var(--primary-blue)] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--primary-blue-lighter)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-blue)]"
                            >
                                {contentSection.button?.title}
                            </Link>
                        </div>
                    )}
                </div>
                <div className={`mx-auto mt-20 lg:mt-0 lg:col-span-3 ${contentAlignment === 'right' ? 'lg:order-1' : 'lg:order-2'}`}>
                    <dl className="grid max-w-xl grid-cols-1 gap-x-16 gap-y-16 lg:max-w-none lg:grid-cols-2">
                        {contentSection.subPoints && <BuildSubpoints subPoints={contentSection.subPoints} spacing={spacing} dark={dark} />}
                    </dl>
                </div>
            </div >
        )
    )
}

export function ContentSectionComponent({ contentSection }: { contentSection: ExpandedContentSection }) {
    const spacing: spacing = contentSection.subPoints && contentSection.subPoints.length <= 4 ? 'loose' : 'tight'
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