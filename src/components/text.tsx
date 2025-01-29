/* eslint prefer-const: 0 */

import { clsx } from 'clsx'

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
        'text-pretty font-medium tracking-tighter data-[dark=true]:text-white',
        Element === 'h2' && 'text-gray-950',
        Element !== 'h2' && 'text-gray-900',
        Element === 'h3' && 'text-3xl sm:text-4xl',
        Element === 'h4' && 'text-2xl sm:text-3xl',
        Element !== 'h3' && Element !== 'h4' && 'text-4xl sm:text-5xl'
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
        'font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark=true]:text-gray-400',
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
        'text-sm font-semibold uppercase tracking-wide text-gray-600 data-[dark=true]:text-gray-400'
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
