'use client'

import { useState } from 'react'
import type { ContentSectionCarousel } from '@/sanity/types/sanity.types'
import { ContentSectionComponent, ExpandedContentSection } from '@/components/contentSection'
import { HeaderStyle } from '@/lib/headerStyle'
import { TriangleIcon } from '@/components/triangle-icon'
import { motion } from 'framer-motion'
import { AngledLine } from '@/lib/backgroundMotion'

export function ContentSectionCarouselComponent({ contentSectionCarousel }: { contentSectionCarousel: ContentSectionCarousel }) {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div className="contentSectionCarousel relative isolate">
            <div className="pointer-events-none absolute top-0 left-[-300px]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="3020"
                    height="621"
                    viewBox="0 0 3020 621"
                    fill="none"
                >
                    <AngledLine
                        x1={0}
                        y1={165}
                        length={3000}
                        angle={0}
                        color={"var(--primary-blue)"}
                        opacity={0.1}
                        dashArray="4.62 4.62"
                    />
                </svg>
                <div className="absolute top-0 left-[0px]">
                    <motion.div
                        initial={{ x: '-100px', y: '158px' }}
                        animate={{ x: '110vw', y: '158px' }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                            delay: 0
                        }}
                    >
                        <TriangleIcon rotation={0} dark={false} />
                    </motion.div>
                </div>
            </div>
            {contentSectionCarousel.header && <HeaderStyle header={contentSectionCarousel.header} className="mb-10" />}
            <div className="flex flex-col gap-20">
                {/* Navigation Buttons */}
                <div className="relative flex justify-center gap-10 max-w-5xl mx-auto">
                    {contentSectionCarousel.carouselItems && contentSectionCarousel.carouselItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`relative inline-flex items-center justify-center border border-gray-200 lg:px-3.5 lg:py-2.5 py-0 px-3 text-sm w-auto h-10 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300 ${index === activeIndex
                                ? 'bg-[#FAFFDE]'
                                : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                            aria-label={`Show content section ${index + 1}`}
                        >
                            <span className="hidden lg:inline">{item.header?.header}</span>
                        </button>
                    ))}
                </div>
                {/* Content Section Display */}
                <div className="content-section-display">
                    {contentSectionCarousel.carouselItems && contentSectionCarousel.carouselItems.length > 0 && (
                        <ContentSectionComponent
                            contentSection={contentSectionCarousel.carouselItems[activeIndex] as ExpandedContentSection}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}