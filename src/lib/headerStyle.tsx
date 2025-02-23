import { Eyebrow } from "../components/text"
import { Heading } from "../components/text"
import { BackgroundStyle } from "@/sanity/types/sanity.types"
import cleanString from "./cleanString"
import clsx from "clsx"
import { ExpandedCta } from "@/sanity/types/local.types"
import { Button } from "@/components/button"

export interface HeaderStyleProps {
  header?: {
    eyebrow?: string
    header?: string
    subheader?: string
    layout?: string
    anchorID?: string
  }
  style?: BackgroundStyle
  cta?: ExpandedCta[]
  level?: number,
  className?: string
}

const lightBackground: BackgroundStyle = {
  _type: 'backgroundStyle',
  style: 'light'
}

export function HeaderStyle({
  header,
  style = lightBackground,
  cta,
  level = 2,
  className
}: HeaderStyleProps) {
  const textAlignment: { [key: string]: string } = {
    'centered': 'text-center',
    'left-aligned': 'text-left',
    'right-aligned': 'text-right',
  }

  const textContainerAlignment: { [key: string]: string } = {
    'centered': 'flex flex-col items-center',
    'left-aligned': 'flex flex-col items-start',
    'right-aligned': 'flex flex-col items-end',
  }

  const cleanStyle = cleanString(style.style || '')
  const dark = cleanStyle === 'dark' || cleanStyle === 'dark-accent' ? true : false

  return (
    <div className={clsx(
      'w-full px-1',
      textContainerAlignment[header?.layout || 'centered'],
      className
    )} id={header?.anchorID ? `id-${cleanString(header?.anchorID).toLowerCase().replace(/\s+/g, '-')}` : ''}>
      <div className={`${textAlignment[header?.layout || 'centered']}`}>
        <Eyebrow dark={dark}>
          {header?.eyebrow}
        </Eyebrow>
        <Heading
          as={level == 1 ? "h1" : "h2"}
          dark={dark}
          className={`mt-2 max-w-3xl ${header?.layout === 'centered' ? 'mx-auto' : ''}`}
        >
          {header?.header}
        </Heading>
        <Heading
          as="h3"
          dark={dark}
          className={`mt-2 max-w-3xl ${header?.layout === 'centered' ? 'mx-auto' : ''}`}
        >
          {header?.subheader}
        </Heading>
      </div>
      {cta && (
        <div className="mt-8">
          {cta.map((cta, index) => (
            <Button key={index} slug={cta.link} variant={cleanString(cta.displayStyle || 'primary') as 'primary' | 'secondary' | 'outline'} dark={dark}> {cta.buttonText} </Button>
          ))}
        </div>
      )}
    </div>
  )
}