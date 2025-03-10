import { Eyebrow } from "../components/text"
import { Heading } from "../components/text"
import { BackgroundStyle } from "@/sanity/types/sanity.types"
import cleanString from "./cleanString"
import clsx from "clsx"
import React from "react"

type LayoutOption = 'centered' | 'left-aligned' | 'right-aligned';

export interface HeaderStyleProps {
  header?: {
    eyebrow?: string
    header?: string
    subheader?: string
    layout?: LayoutOption
    anchorID?: string
  }
  style?: BackgroundStyle
  level?: number,
  className?: string,
  home?: boolean
}

const lightBackground: BackgroundStyle = {
  _type: 'backgroundStyle',
  style: 'light'
}

export function HeaderStyle({
  header,
  style = lightBackground,
  level = 2,
  className,
  home
}: HeaderStyleProps) {
  // Memoize these objects to prevent recreating them on every render
  const textAlignment = React.useMemo(() => ({
    'centered': 'text-center',
    'left-aligned': 'text-left',
    'right-aligned': 'text-right',
  }), []);

  const textContainerAlignment = React.useMemo(() => ({
    'centered': 'flex flex-col items-center',
    'left-aligned': 'flex flex-col items-start',
    'right-aligned': 'flex flex-col items-end',
  }), []);

  // Compute these values once
  const cleanStyle = React.useMemo(() => cleanString(style.style || ''), [style.style]);
  const dark = cleanStyle === 'dark' || cleanStyle === 'dark-accent';
  const anchorId = React.useMemo(() => 
    header?.anchorID ? `id-${cleanString(header.anchorID).toLowerCase().replace(/\s+/g, '-')}` : '',
    [header?.anchorID]
  );

  // Pre-compute common class combinations
  const headerClasses = clsx(
    'text-pretty max-w-3xl',
    `text-5xl lg:text-7xl data-[dark=true]:text-white`,
    dark ? 'text-white' : 'text-gray-950'
  );

  const subheaderClasses = clsx(
    'text-pretty max-w-3xl',
    `text-2xl lg:text-3xl data-[dark=true]:text-white mt-4`,
    dark ? 'text-[#E1ECFF]' : 'text-gray-950'
  );

  return (
    <div 
      className={clsx(
        'w-full px-1 scroll-mt-32 lg:scroll-mt-[40vh]',
        textContainerAlignment[header?.layout || 'centered'],
        className
      )} 
      id={anchorId}
    >
      <div className={`${textAlignment[header?.layout || 'centered']}`}>

        {header?.eyebrow && <Eyebrow dark={dark}>
          {header?.eyebrow}
        </Eyebrow>}

        {home ? (
          <>
            <h1 className={headerClasses}>
              {header?.header}<span className="text-4xl lg:text-6xl"><sup>™</sup></span>
            </h1>
            <h2 className={subheaderClasses}>
              {header?.subheader?.split(/(first-mile data™|intelligent business operations)/).map((text, index) => (
                text.match(/(first-mile data™|intelligent business operations)/) ?
                  <span
                    key={index}
                    className="text-[#F5FFBD] bg-white/10 px-2 py-0 rounded-md"
                  >
                    {text}
                  </span> :
                  text
              ))}
            </h2>
          </>
        ) : (
          <>
            <Heading
              as={level == 1 ? "h1" : "h2"}
              dark={dark}
              className={`mt-2 max-w-3xl ${header?.layout === 'centered' ? 'mx-auto' : ''}`}
            >
              {header?.header}
            </Heading>
            {header?.subheader && <Heading
              as="h3"
              dark={dark}
              className={`mt-2 max-w-3xl ${header?.layout === 'centered' ? 'mx-auto' : ''}`}
            >
              {header?.subheader}
            </Heading>}
          </>
        )}
      </div>
    </div >
  )
}