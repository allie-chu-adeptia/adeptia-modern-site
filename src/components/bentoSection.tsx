'use client'

import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { Subheading } from './text'
import { BackgroundStyle, SanityImageCrop, SanityImageHotspot } from '@/sanity/types/sanity.types'
import { image } from '@/sanity/image'
import Link from 'next/link'
import { BentoSection } from '@/sanity/types/sanity.types'
import { HeaderStyle } from '../lib/headerStyle'
import { DarkModeWrapper } from '../lib/darkModeWrapper'
import cleanString from '@/lib/cleanString'

export interface ExpandedBentoSection extends Omit<BentoSection, 'content'> {
  content?: Array<{
    image?: {
      asset?: {
        _ref: string
        _type: 'reference'
        _weak?: boolean
      }
      hotspot?: SanityImageHotspot
      crop?: SanityImageCrop
      _type: 'image'
    }
    eyebrow?: string
    header?: string 
    text?: string
    link?: string
    _key: string
  }>
}

function BentoCard({
  background,
  eyebrow,
  title,
  description,
  graphic,
  link,
  graphicClassName = '',
  layoutClassName = '',
  // fade = [],
  // dark = false,
}: {
  background: BackgroundStyle
  eyebrow: string
  title: string
  description: string
  graphic: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
    }
    altText?: string
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  link: string
  // fade?: ('top' | 'bottom')[]
  // dark?: boolean
  graphicClassName?: string
  layoutClassName?: string
}) {
  // Clean the string by trimming and removing any invisible characters
  const cleanStyle = cleanString(background.style || '')
  const dark = cleanStyle === 'dark' ? true : false

  return (
    
      <DarkModeWrapper
        style={background}
        className={clsx(
          layoutClassName,
          'group relative flex flex-col overflow-hidden rounded-xl',
          'bg-white shadow-sm ring-1 ring-black/5',
          'data-[dark=true]:bg-gray-800 data-[dark=true]:ring-white/15',
        )}
      >
        <motion.div
          initial="idle"
          whileHover="active"   
          variants={{
            idle: { scale: 1 },
            active: { scale: 1.01 }
          }}
        >
          <Link href={`/${link}`}>
              {graphic && (
                <img
                  alt={graphic.altText || ''}
                  src={image(graphic).size(2016, 1344).url()}
                  className={clsx("aspect-[3/2] w-full rounded-2xl object-cover", graphicClassName)}
                />
              )}
              {/* {fade.includes('top') && (
                <div className="absolute inset-0 bg-gradient-to-b from-white to-50% group-data-[dark]:from-gray-800 group-data-[dark]:from-[-25%]" />
              )}
              {fade.includes('bottom') && (
                <div className="absolute inset-0 bg-gradient-to-t from-white to-50% group-data-[dark]:from-gray-800 group-data-[dark]:from-[-25%]" />
              )} */}
              <div className="relative p-10">
                <Subheading as="h3" dark={dark}>
                  {eyebrow}
                </Subheading>
                <p className="mt-1 text-2xl/8 font-medium tracking-tight text-gray-950 group-data-[dark=true]:text-white">
                  {title}
                </p>
                <p className="mt-2 max-w-[600px] text-sm/6 text-gray-600 group-data-[dark=true]:text-gray-400">
                  {description}
                </p>
            </div>
          </Link>
        </motion.div>
      </DarkModeWrapper>
  )
}


export function BentoSectionComponent({
  bentoSection
}: {
  bentoSection: ExpandedBentoSection
}) {
  const layouts: {
    [key: string]: {
      container: string
      layout: string[]
      graphic: string[]
    }
  } = {
    'Large Horizontal': {
      container: 'mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2',
      layout: [
        'flex p-px lg:col-span-4',
        'flex p-px lg:col-span-2', 
        'flex p-px lg:col-span-2',
        'flex p-px lg:col-span-4',
      ],
      graphic: [
        'h-80 object-cover object-left',
        'h-80 object-cover',
        'h-80 object-cover', 
        'h-80 object-cover object-left',
      ]
    },
    'Large Vertical': {
      container: 'mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2',
      layout: [
        'relative lg:row-span-2',
        'relative max-lg:row-start-1',
        'relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2',
        'relative lg:row-span-2',
      ],
      graphic: [
        'size-full object-cover object-top',
        'w-full max-lg:max-w-xs',
        'h-[min(152px,40cqw)] object-cover',
        'size-full object-cover object-top',
      ]
    },
    'Evenly Spaced': {
      container: 'mt-10 grid gap-4 sm:mt-16 lg:grid-cols-4 lg:grid-rows-2',
      layout: [
        'flex p-px lg:col-span-2',
        'flex p-px lg:col-span-2',
        'flex p-px lg:col-span-2',
        'flex p-px lg:col-span-2',
      ], 
      graphic: [
        'h-80 object-cover object-left',
        'h-80 object-cover',
        'h-80 object-cover',
        'h-80 object-cover object-left',
      ]
    }
  }

  const activeLayout = layouts[bentoSection.styleAndLayout?.layout ?? 'Large Horizontal']

  return (
    <div>
      <HeaderStyle
        header={bentoSection.header}
        style={bentoSection.styleAndLayout?.background}
      />

      <div className={activeLayout.container}>
        {bentoSection.content?.map((item, index) => (
          <BentoCard
            key={`bento-card-${index}`}
            background={bentoSection.styleAndLayout?.background ?? { _type: 'backgroundStyle', style: 'light' }}
            eyebrow={item.eyebrow ?? ''}
            title={item.header ?? ''}
            description={item.text ?? ''}
            graphic={item.image ?? { _type: 'image'}}
            link= {item.link ?? ''}
            layoutClassName={activeLayout.layout[index] ?? ''}
            graphicClassName={activeLayout.graphic[index] ?? ''}
          />
        ))}
      </div>
    </div>
  )
}