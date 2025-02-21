/* eslint prefer-const: 0 */

import * as Headless from '@headlessui/react'
import { clsx } from 'clsx'
import { Link } from './link'
import { ClientLink } from '@/components/clientLink'

const variants = {
  primary: clsx(
    'inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)]',
    'rounded-full border border-transparent bg-[var(--primary-blue)] hover:bg-[var(--primary-blue-darker)] shadow-md',
    'whitespace-nowrap text-base font-medium text-white',
    'data-[dark=true]:bg-[var(--primary-blue)] data-[hover]:bg-[var(--primary-blue-darker)] data-[dark=true]:text-white',
    'disabled:opacity-50 disabled:hover:bg-gray-950',
  ),
  secondary: clsx(
    'relative inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)]',
    'rounded-full border border-transparent bg-white/15 shadow-md ring-1 ring-[#D15052]/15',
    'after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_2px_1px_#ffffff4d]',
    'whitespace-nowrap text-base font-medium text-gray-950',
    'data-[dark=true]:bg-white/15 data-[hover]:bg-white/20 data-[dark=true]:text-white',
    'disabled:opacity-50 disabled:hover:bg-white/15',
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
  disabled?: boolean
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (Headless.ButtonProps & { href?: undefined })
)

export function Button({
  variant = 'primary',
  className,
  dark = false,
  disabled = false,
  ...props
}: ButtonProps & { dark?: boolean }) {
  className = clsx(className, variants[variant])

  if (typeof props.href === 'undefined') {
    return <Headless.Button />
  }

  if (props.href) {
    return <ClientLink className={className} href={props.href} data-dark={dark}>{props.children}</ClientLink>
  }

  if (disabled) {
    return <button disabled className={className} data-dark={dark}>{props.children}</button>
  }

  return <Link {...props} className={className} data-dark={dark} />
}
