/* eslint prefer-const: 0 */

import { clsx } from 'clsx'
import { Nokora } from 'next/font/google'

// Initialize the Nokora font
export const nokora = Nokora({
  subsets: ['khmer'],  // Required subset
  weight: ['400', '700'],  // Available weights you want to use
  display: 'swap',
})

type HeadingProps = {
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  dark?: boolean
} & React.ComponentPropsWithoutRef<
  'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
>

export function Heading({
  className,
  as: Element = 'h2',
  dark = false,
  ...props
}: HeadingProps) {
  return (
    <Element
      {...props}
      data-dark={dark ? 'true' : undefined}
      className={clsx(
        className,
        'text-pretty font-medium data-[dark=true]:text-white',
        Element === 'h1' && `text-5xl lg:text-6xl ${nokora.className}`,
        Element === 'h2' && `text-gray-950 text-3xl lg:text-4xl ${nokora.className}`,
        Element !== 'h2' && 'text-gray-700',
        Element === 'h3' && 'text-xl sm:text-2xl',
        Element === 'h4' && 'text-lg sm:text-xl',
        Element === 'h5' && `text-md sm:text-lg ${nokora.className}`,
      )}
    />
  )
}

export function Subheading({
  className,
  as: Element = 'h2',
  dark = false,
  ...props
}: HeadingProps) {
  return (
    <Element
      {...props}
      data-dark={dark ? 'true' : undefined}
      className={clsx(
        className,
        '${nokora.className} text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark=true]:text-gray-400',
      )}
    />
  )
}

export function Eyebrow({
  className,
  dark = false,
  ...props
}: React.ComponentPropsWithoutRef<'p'> & { dark?: boolean }) {
  return (
    <p
      data-dark={dark ? 'true' : undefined}
      className={clsx(
        className,
        'text-sm font-semibold uppercase tracking-wide text-[var(--primary-blue)] data-[dark=true]:text-[#f5ffbd]'
      )}
      {...props}
    />
  )
}


export function Lead({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p
      className={clsx(className, 'text-2xl font-medium text-gray-500')}
      {...props}
    />
  )
}
