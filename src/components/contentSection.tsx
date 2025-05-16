// Sanity types
import { ContentSection, SanityImageCrop, SanityImageHotspot, IconPicker, HeaderStyle as HeaderStyleType, BackgroundStyle } from "../sanity/types/sanity.types";
import { PortableTextBlock } from "@portabletext/react";

// Components
import { HeaderStyle } from "../lib/headerStyle";
import { Button } from "@/components/button";
import StylePortableText from "./stylePortableText";
import IconRender from "@/lib/iconRender";

// Utilities
import cleanString from "@/lib/cleanString";
import clsx from "clsx";
import { image } from '@/sanity/lib/image'
import AnimationRenderer from "@/lib/renderAnimations";

// Icons
import { ChevronRightIcon } from "@heroicons/react/24/outline";

type spacing = 'tight' | 'loose'

type Subpoint = {
    icon?: IconPicker
    customIcon?: ImageType
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

type ButtonType = {
    _id: string
    title: string
    url: string
    link: string
}

type ImageType = {
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

export type ExpandedContentSection = Omit<ContentSection, 'image' | 'subPoints' | 'button' | 'content'> & {
    image?: ImageType
    subPoints?: Array<Subpoint>
    button?: ButtonType
    content?: PortableTextBlock[]
}

function renderIcon({
    icon,
    customIcon,
    dark
}: {
    icon?: IconPicker,
    customIcon?: ImageType,
    dark: boolean
}) {

    if (customIcon) {
        const imageUrl = image(customIcon).width(200).height(200).url();

        if (dark) {
            return (
                <div className="mb-6 flex size-14 items-center justify-center rounded-lg bg-[var(--brand-background-medium)]">
                    <img
                        src={imageUrl}
                        alt=""
                        className="size-8"
                    />
                </div>
            )
        } else {
            return (
                <div className="mb-6 flex size-14 items-center justify-center rounded-lg bg-[var(--brand-background-medium)]">
                    <img
                        src={imageUrl}
                        alt=""
                        className="size-8"
                    />
                </div>
            )
        }
    } else if (icon) {
        console.log("icon")
        return (
            <div className="mb-6 flex size-10 items-center justify-center rounded-lg bg-[var(--primary-blue)]">
                <IconRender
                    name={icon.name}
                    aria-hidden="true"
                    className={clsx("size-5 flex-none text-white")}
                />
            </div>
        )
    } else {
        return null
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
                            {subpoint.icon || subpoint.customIcon ? renderIcon({ icon: subpoint.icon, customIcon: subpoint.customIcon, dark: dark }) : null}
                            {subpoint.header}
                        </dt>{' '}
                        <dd className={clsx("inline", dark ? "text-gray-300" : "text-gray-700")}>{subpoint.subheader}</dd>
                        {subpoint.button && <p className="mt-4 lg:mt-6">
                            <Button
                                slug={subpoint.button?.link ? `${subpoint.button.link}` : undefined}
                                href={subpoint.button?.url ? `${subpoint.button.url}` : ''}
                                dark={dark}
                                variant={"tertiary"}
                            >

                                {subpoint.button.title}
                                <ChevronRightIcon className="size-4 transform translate-x-1 transition-all duration-200 ease-in-out group-hover:opacity-100 group-hover:translate-x-0" />
                            </Button>
                        </p>}
                    </div>
                ) : (
                    <div key={index} className="flex flex-col">
                        <dt className={clsx("flex flex-col items-left text-base/7 font-semibold", dark ? "text-white" : "text-gray-800")}>
                            {subpoint.icon || subpoint.customIcon ? renderIcon({ icon: subpoint.icon, customIcon: subpoint.customIcon, dark: dark }) : null}
                            {subpoint.header}
                        </dt>
                        <dd className={clsx("mt-1 flex flex-auto flex-col text-base/7", dark ? "text-white" : "text-gray-700")}>
                            <p className="flex-auto">{subpoint.subheader}</p>
                            {subpoint.button && <p className="mt-4 lg:mt-6">
                                <Button
                                    slug={subpoint.button?.link ? `${subpoint.button.link}` : undefined}
                                    href={subpoint.button?.url ? `${subpoint.button.url}` : ''}
                                    dark={dark}
                                    variant={"tertiary"}
                                >

                                    {subpoint.button.title}
                                    <ChevronRightIcon className="size-4 transform translate-x-1 transition-all duration-200 ease-in-out group-hover:opacity-100 group-hover:translate-x-0" />
                                </Button>
                            </p>}
                        </dd>
                    </div>
                )
            ))}
        </>
    )
}

function buildHeaderandContent({
    header,
    content,
    button,
    background,
    dark,
    alignment
}: {
    header?: HeaderStyleType,
    content?: PortableTextBlock[],
    button?: ButtonType,
    background?: BackgroundStyle,
    dark: boolean,
    alignment?: "justify-center" | "justify-start"
}) {
    const textAlignmentMap = {
        'justify-center': 'text-center',
        'justify-start': 'text-left',
    } as const

    return (
        <>
            <HeaderStyle header={header} style={background} level={3} />
            {content && <StylePortableText value={content} styleOverride={clsx(dark ? 'text-white' : ' ', textAlignmentMap[alignment || 'justify-start'])} />}
            {button &&
                <div className={`mt-6 lg:mt-10 w-full flex ${alignment}`}>
                    <Button
                        slug={button?.link ? `${button.link}` : undefined}
                        href={button?.url ? `${button.url}` : ''}
                        dark={dark}
                        variant={"blue"}
                    >
                        {button?.title}
                    </Button>
                </div >}
        </>
    )
}

function buildImageorAnimation({
    animation,
    dark,
    imageData,
    videoURL,
    animationClassName,
    imageClassName
}: {
    animation?: string,
    dark?: boolean,
    imageData?: ImageType,
    videoURL?: string,
    animationClassName?: string
    imageClassName?: string
}) {
    return (
        animation ? (
            <AnimationRenderer
                animation={animation}
                dark={dark}
                videoURL={videoURL}
                animationClassName={animationClassName}
            />
        ) : (
            imageData && (
                <div className="relative pt-8">
                    <img
                        alt={cleanString(imageData?.altText || '')}
                        src={image(imageData).size(1800, 1200).url()}
                        className={clsx(imageClassName)}
                    />
                </div>
            )
        )
    )
}

function OffCenterImage({
    contentSection,
    spacing,
    dark,
    animation
}: {
    contentSection: ExpandedContentSection,
    spacing: spacing,
    dark: boolean,
    animation?: string
}) {
    const col_alignment = cleanString(contentSection.styleAndLayout?.layout || 'left')
    const alignment = contentSection.header?.layout === 'centered' ? 'justify-center' : 'justify-start'
    console.log(contentSection)

    return (
        <>
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-2 lg:mx-0 lg:gap-y-16 lg:max-w-none lg:grid-cols-2">
                <div className={clsx("flex flex-col justify-center lg:pr-8 lg:pt-4", col_alignment === 'right' ? 'lg:pl-16 lg:order-2' : '')}>
                    <div className="lg:max-w-lg">
                        {buildHeaderandContent({
                            header: contentSection.header,
                            content: contentSection.content as PortableTextBlock[],
                            button: contentSection.button,
                            background: contentSection.styleAndLayout?.background || { _type: 'backgroundStyle', style: 'light' },
                            alignment: alignment,
                            dark: dark
                        })}
                        {contentSection.subPoints && <dl className="mt-6 lg:mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                            <BuildSubpoints subPoints={contentSection.subPoints} spacing={spacing} dark={dark} />
                        </dl>}
                    </div>
                </div>
                <div className={clsx("flex items-center justify-end rounded-xl", col_alignment === 'right' ? 'lg:order-1' : 'lg:order-2')}>
                    {buildImageorAnimation({
                        animation,
                        dark,
                        imageData: contentSection.image,
                        videoURL: contentSection.videoURL,
                        animationClassName: "relative mt-8 w-full rounded-xl shadow-2xl ring-1 ring-white/10 aspect-[3/2]",
                        imageClassName: "relative rounded-xl shadow-2xl ring-1 ring-white/10"
                    })}
                    {/* {animation ? (
                        <div className="relative h-80 shrink-0">
                            {cleanString(animation) === 'firstMileDataTypes' && (
                                <FirstMileData dark={dark} />
                            )}
                        </div>
                    ) : (
                        contentSection.image && (
                            <div className="relative pt-8">
                                <img
                                    alt={cleanString(contentSection.image?.altText || '')}
                                    src={image(contentSection.image).size(1800, 1200).url()}
                                    className={clsx("rounded-xl shadow-2xl ring-1 ring-white/10 aspect-[3/2]")}
                                />
                            </div>
                        )
                    )} */}
                </div>
            </div>
        </>
    )
}

function CenteredImage({
    contentSection,
    spacing,
    dark,
    animation
}: {
    contentSection: ExpandedContentSection,
    spacing: spacing,
    dark: boolean,
    animation?: string
}) {
    const alignment = contentSection.header?.layout === 'centered' ? 'justify-center' : 'justify-start'
    const numSubpoints = contentSection.subPoints?.length === 2 || contentSection.subPoints?.length === 4 ? '2' : '3'

    return (
        <>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {buildHeaderandContent({
                    header: contentSection.header,
                    content: contentSection.content as PortableTextBlock[],
                    button: contentSection.button,
                    background: contentSection.styleAndLayout?.background || { _type: 'backgroundStyle', style: 'light' },
                    dark: dark,
                    alignment: alignment
                })}
            </div>
            {contentSection.subPoints && (
                <div className="mx-auto my-8 max-w-7xl px-6 sm:my-10 md:my-12 lg:px-8">
                    <dl className={`mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-${numSubpoints} lg:gap-x-16 lg:gap-y-16`}>
                        <BuildSubpoints subPoints={contentSection.subPoints} spacing={spacing} dark={dark} />
                    </dl>
                </div>
            )}
            <div className={`mx-auto ${cleanString(contentSection.imageSize || 'standard') === 'standard' ? 'max-w-5xl px-6 lg:px-8' : 'max-w-7xl'}`}>
                {buildImageorAnimation({
                    animation,
                    dark,
                    imageData: contentSection.image,
                    videoURL: contentSection.videoURL,
                    animationClassName: "relative mt-8 w-full rounded-xl shadow-2xl ring-1 ring-white/10 aspect-[3/2]",
                    imageClassName: "rounded-xl shadow-2xl ring-1 ring-white/10 aspect-[3/2]"
                })}
                {/* {animation ? (
                    // <div className="relative h-80 shrink-0 my-12 shadow-2xl ring-1 ring-white/10">
                    <>
                        {cleanString(animation) === 'firstMileDataTypes' && (
                            <FirstMileData dark={dark} />
                        )}
                    </>
                    // </div>
                ) : (
                    contentSection.image && <div className="relative pt-8">

                        <img
                            alt={cleanString(contentSection.image?.altText || '')}
                            src={image(contentSection.image).size(1800, 1200).url()}
                            className={clsx("rounded-xl shadow-2xl ring-1 ring-white/10 aspect-[3/2]")}
                        />
                    </div>
                )} */}
            </div>
        </>
    )
}

function NoImage(
    { contentSection, spacing, dark }:
        { contentSection: ExpandedContentSection, spacing: spacing, dark: boolean }
) {
    const alignment = contentSection.header?.layout === 'centered' ? 'justify-center' : 'justify-start'
    const contentAlignment = cleanString(contentSection.styleAndLayout?.layout || 'left')
    const numSubpoints = contentSection.subPoints?.length === 2 || contentSection.subPoints?.length === 4 ? '2' : '3'

    return (
        contentSection.styleAndLayout?.layout === 'center' ? (
            <div className="noImage contentSection flex flex-col items-center">
                {buildHeaderandContent({
                    header: contentSection.header,
                    content: contentSection.content as PortableTextBlock[],
                    button: contentSection.button,
                    background: contentSection.styleAndLayout?.background || { _type: 'backgroundStyle', style: 'light' },
                    dark: dark,
                    alignment: alignment
                })}
                {contentSection.subPoints && (
                    <div className="mx-auto lg:col-span-3 mt-8">
                        <dl className={`grid max-w-xl grid-cols-1 gap-x-20 gap-y-16 lg:max-w-none lg:grid-cols-${numSubpoints}`}>
                            {contentSection.subPoints && <BuildSubpoints subPoints={contentSection.subPoints} spacing={spacing} dark={dark} />}
                        </dl>
                    </div>
                )}
            </div>
        ) : (
            <div className="noImage contentSection grid grid-cols-1 lg:grid-cols-5 items-center gap-x-12">
                <div className={`lg:col-span-2 flex flex-col ${contentAlignment === 'right' ? 'lg:order-2' : 'lg:order-1'}`}>
                    {buildHeaderandContent({
                        header: contentSection.header,
                        button: contentSection.button,
                        background: contentSection.styleAndLayout?.background || { _type: 'backgroundStyle', style: 'light' },
                        dark: dark,
                        alignment: alignment
                    })}
                </div>
                <div className={`mx-auto mt-16 lg:mt-0 lg:col-span-3 ${contentAlignment === 'right' ? 'lg:order-1' : 'lg:order-2'}`}>
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
            {contentSection.animation ? (
                contentSection.styleAndLayout?.layout === 'center' ? (
                    <CenteredImage
                        contentSection={contentSection}
                        spacing={spacing}
                        dark={dark}
                        animation={contentSection.animation}
                    />
                ) : (
                    <OffCenterImage
                        contentSection={contentSection}
                        spacing={spacing}
                        dark={dark}
                        animation={contentSection.animation}
                    />
                )
            ) : (
                <>
                    {!contentSection.image && (
                        <NoImage
                            contentSection={contentSection}
                            spacing={spacing}
                            dark={dark}
                        />
                    )}
                    {contentSection.image && contentSection.styleAndLayout?.layout !== 'center' && (
                        <OffCenterImage
                            contentSection={contentSection}
                            spacing={spacing}
                            dark={dark}
                        />
                    )}
                    {contentSection.image && contentSection.styleAndLayout?.layout === 'center' && (
                        <CenteredImage
                            contentSection={contentSection}
                            spacing={spacing}
                            dark={dark}
                        />
                    )}
                </>
            )}
        </div>
    )
}