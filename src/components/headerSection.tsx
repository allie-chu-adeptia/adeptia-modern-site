import cleanString from "@/lib/cleanString";
import { DarkModeWrapper } from "@/lib/darkModeWrapper";
import { HeaderStyle } from "@/lib/headerStyle";
import { HeaderSection, HeaderStyle as HeaderStyleType } from "@/sanity/types/sanity.types";
import React from "react";
import { Heading } from "./text";
import clsx from "clsx";
import { ExpandedCta } from "@/sanity/types/local.types";
import { BackgroundStyle } from "@/sanity/types/sanity.types";
import { BackgroundColor } from "@/lib/backgroundColorWrapper";
import { BackgroundMotion } from "@/lib/backgroundMotion";
import { Container } from "@/components/container";
import { Button } from "@/components/button"
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export interface ExpandedHeaderSection extends Omit<HeaderSection, 'cta'> {
    cta?: ExpandedCta[]
}

export function DefaultHeaderSection({
    header,
}: {
    header: HeaderStyleType
}) {
    const background: BackgroundStyle = {
        _type: "backgroundStyle",
        style: "light-accent"
    }
    const headerSection: ExpandedHeaderSection = {
        _type: "headerSection",
        header: header
    }

    return (
        <BackgroundColor color={background} className="relative overflow-hidden">
            <div className="relative z-10">
                <Container paddingLvl="header">
                    <HeaderSectionComponent headerSection={headerSection} />
                    {headerSection.cta && (
                        <div className="mt-10 flex items-center justify-center gap-x-3">
                            {headerSection.cta?.map((cta, index) => (
                                <Button
                                    key={cta._id}
                                slug={cta.link}
                                href={""}
                                variant={index === 0 ? "primary" : "tertiary"}
                                dark={false}
                            >
                                {cta.buttonText}
                                {index != 0 && <ChevronRightIcon className="size-4 transform translate-x-1 transition-all duration-200 ease-in-out group-hover:opacity-100 group-hover:translate-x-0" />}
                            </Button>
                            ))}
                        </div>
                    )}
                </Container>
            </div>
            <BackgroundMotion color={background} />
        </BackgroundColor>
    )
}

export const HeaderSectionComponent = React.memo(function HeaderSectionComponent({
    headerSection,
    home
}: {
    headerSection: ExpandedHeaderSection
    home?: boolean
}) {
    const cleanStyle = cleanString(headerSection.background?.style || '')
    const dark = cleanStyle === 'dark' || cleanStyle === 'dark-accent' ? true : false

    const alignment = headerSection.header?.layout === 'centered' ? 'justify-center' : 'justify-start'

    return (
        <div className={`flex flex-col items-center justify-center min-h-64 lg:min-h-96`}>
            {home ? (
                <HeaderStyle header={headerSection.header} style={headerSection.background} level={1} home={home} />
            ) : (
                <HeaderStyle header={headerSection.header} style={headerSection.background} level={1} />
            )}
            <div className={`mt-10 w-full flex ${alignment} gap-x-3`}>
                {headerSection.cta?.map((cta, index) => (
                    <Button
                        key={cta._id}
                        slug={cta.link}
                        href={""}
                        variant={index === 0 ? "primary" : "tertiary"}
                        dark={dark}
                    >
                        {cta.buttonText}
                        {index != 0 && <ChevronRightIcon className="size-4 transform translate-x-1 transition-all duration-200 ease-in-out group-hover:opacity-100 group-hover:translate-x-0" />}
                    </Button>
                ))}
            </div>
            {headerSection.content && (
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
                    {headerSection.content?.map((card, index) => (
                        <DarkModeWrapper key={index} style={headerSection.background} className="flex gap-x-4 rounded-xl p-6 ring-1 ring-inset data-[dark=true]:bg-white/5 data-[dark=true]:ring-white/10 backdrop-blur-sm bg-white/50 ring-gray-200">
                            <div className="flex gap-x-4">
                                {(
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="8"
                                        height="10"
                                        viewBox="0 0 8 10"
                                        aria-hidden="true"
                                        className="h-6 w-4 flex-none"
                                        fill="none"
                                    >
                                        <path d="M0.75 1.10289L7.5 5L0.75 8.89712L0.75 1.10289Z" stroke={dark ? "white" : "black"} strokeOpacity="0.3" strokeWidth="0.5" />
                                    </svg>
                                )}
                                <div className="text-base/7">
                                    <Heading as="h5" dark={dark}>{card.title}</Heading>
                                    <p className={clsx("mt-2", dark ? "text-gray-200" : "text-gray-600")}>{card.subhead}</p>
                                </div>
                            </div>
                        </DarkModeWrapper>
                    ))}
                </div>
            )}
        </div>
    )
})