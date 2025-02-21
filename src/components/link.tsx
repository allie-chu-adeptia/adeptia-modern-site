/* eslint prefer-const: 0 */

import * as Headless from '@headlessui/react'
import NextLink, { type LinkProps } from 'next/link'
import { forwardRef } from 'react'
import { getPath } from '@/lib/routing'

interface CustomLinkProps extends Omit<LinkProps, 'href'> {
  slug?: string
  href?: string
  children: React.ReactNode
  target?: string
  className?: string
}

export const Link = forwardRef(async function Link(
  { slug, href, children, target, className, ...props }: CustomLinkProps,
  ref: React.ForwardedRef<HTMLAnchorElement>,
) {
  let finalHref = href
  console.log(finalHref)

  if (slug) {
    console.log('Attempting to use slug')
    // If a slug is provided, construct the full path
    const pathSegments = await getPath(slug)
    finalHref = `/${pathSegments.join('/')}`
  }

  return (
    <Headless.DataInteractive>
      <NextLink ref={ref} href={finalHref || '/'} target={target} className={className} {...props}>
        {children}
      </NextLink>
    </Headless.DataInteractive>
  )
})
