/* eslint prefer-const: 0 */

import * as Headless from '@headlessui/react'
import { clsx } from 'clsx'
import { Link } from './link'
import { ClientLink } from '@/components/clientLink'

const variants = {
  primary: clsx(
    'inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)]',
    'rounded-full border border-transparent bg-[#F5FFBD] hover:bg-[#E6EFAE] shadow-md',
    'whitespace-nowrap text-base font-medium text-[var(--brand-background-dark)]',
    // 'data-[dark=true]:bg-[var(--primary-blue)] data-[hover]:bg-[var(--primary-blue-darker)] data-[dark=true]:text-white',
    'disabled:opacity-50 disabled:hover:bg-gray-950',
  ),
  secondary: clsx(
    'relative inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)]',
    'rounded-full border border-transparent bg-white/40 shadow-md ring-1 ring-[#D15052]/15',
    'after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_2px_1px_#ffffff4d]',
    'whitespace-nowrap text-base font-medium text-gray-950',
    'data-[dark=true]:bg-black/15 data-[hover]:bg-black/15 data-[dark=true]:text-white',
    'disabled:opacity-50 disabled:hover:bg-white/15',
  ),
  tertiary: clsx(
    'inline-flex items-center gap-x-1 py-[calc(theme(spacing.2)-1px)]',
    'whitespace-nowrap text-base font-regular text-[var(--primary-blue-darker)] hover:text-[var(--primary-blue)] group',
    'data-[dark=true]:text-white',
    'disabled:opacity-50 disabled:hover:bg-gray-950'
  ),
  blue: clsx(
    'inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)]',
    'rounded-full border border-transparent bg-[var(--primary-blue)] hover:bg-[var(--primary-blue-darker)] shadow-md',
    'whitespace-nowrap text-base font-medium text-white',
    'data-[dark=true]:bg-[var(--primary-blue)] data-[hover]:bg-[var(--primary-blue-darker)]',
    'disabled:opacity-50 disabled:hover:bg-gray-950',
  ),
  outline: clsx(
    'inline-flex items-center justify-center px-2 py-[calc(theme(spacing.[1.5])-1px)]',
    'rounded-lg border border-transparent shadow ring-1 ring-black/10',
    'whitespace-nowrap text-sm font-medium text-gray-950',
    'data-[dark=true]:bg-transparent data-[hover]:bg-transparent data-[dark=true]:text-white',
    'disabled:opacity-50',
  ),
}

type ButtonProps = {
  variant?: keyof typeof variants
  dark?: boolean
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (Headless.ButtonProps & { href?: undefined })
)

export function Button({
  variant = 'primary',
  className,
  dark = false,
  ...props
}: ButtonProps) {
  className = clsx(className, variants[variant])

  if (typeof props.href === 'undefined') {
    return <Headless.Button {...props} className={className} data-dark={dark} />
  }

  if (props.slug) {
    return <Link {...props} className={className} data-dark={dark} />
  }

  return <ClientLink {...props} className={className} data-dark={dark} />
}