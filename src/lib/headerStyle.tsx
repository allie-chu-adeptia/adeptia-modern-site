import { Eyebrow } from "../components/text"
import { Heading } from "../components/text"
import { BackgroundStyle } from "@/sanity/types/sanity.types"
import cleanString from "./cleanString"
import clsx from "clsx"
interface HeaderStyleProps {
  header?: {
    eyebrow?: string
    header?: string
    subheader?: string
    layout?: string
  }
  style?: BackgroundStyle
  className?: string
}

const lightBackground: BackgroundStyle = {
  _type: 'backgroundStyle',
  style: 'light'
}

export function HeaderStyle({
  header,
  style = lightBackground,
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
  const dark = cleanStyle === 'dark' || cleanStyle === 'accent' ? true : false

  return (
    <div className={clsx(
      'w-full px-1',
      textContainerAlignment[header?.layout || 'centered']
    )}>
      <div className={`${textAlignment[header?.layout || 'centered']}`}>
        <Eyebrow dark={dark}>
          {header?.eyebrow}
      </Eyebrow>
      <Heading
        as="h2"
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
    </div>
  )
}