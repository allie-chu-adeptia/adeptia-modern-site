import cleanString from "@/lib/cleanString";
import { DarkModeWrapper } from "@/lib/darkModeWrapper";
import { HeaderStyle } from "@/lib/headerStyle";
import { HeaderSection } from "@/sanity/types/sanity.types";
import React from "react";
import { Heading } from "./text";
import clsx from "clsx";

export function HeaderSectionComponent({ headerSection }: { headerSection: HeaderSection }) {
    const cleanStyle = cleanString(headerSection.background?.style || '')
    const dark = cleanStyle === 'dark' || cleanStyle === 'accent' ? true : false

    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <HeaderStyle header={headerSection.header} style={headerSection.background} />
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">

            {headerSection.content?.map((card, index) => (
                <DarkModeWrapper key={index} style={headerSection.background} className="flex gap-x-4 rounded-xl p-6 ring-1 ring-inset data-[dark=true]:bg-white/5 data-[dark=true]:ring-white/10 bg-white/50 ring-gray-200">
                    <div className="flex gap-x-4">
                        {(
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="8"
                            height="10" 
                            viewBox="0 0 8 10"
                            aria-hidden="true"
                            className="h-7 w-5 flex-none"
                            fill="none"
                          >
                            <path d="M0.75 1.10289L7.5 5L0.75 8.89712L0.75 1.10289Z" stroke="white" strokeOpacity="0.5" strokeWidth="0.5"/>
                          </svg>
                        )}
                        <div className="text-base/7">
                            <Heading as="h4" dark={dark}>{card.title}</Heading>
                            <p className={clsx("mt-2", dark ? "text-gray-300" : "text-gray-600")}>{card.subhead}</p>
                        </div>
                    </div>
                </DarkModeWrapper>
                ))}
                
            </div>
        </div>
    )
}