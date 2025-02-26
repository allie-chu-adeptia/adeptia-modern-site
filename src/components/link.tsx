// /* eslint prefer-const: 0 */

// import * as Headless from '@headlessui/react'
// import NextLink, { type LinkProps } from 'next/link'
// import { forwardRef } from 'react'

// interface CustomLinkProps extends Omit<LinkProps, 'href'> {
//   slug?: string
//   href?: string
//   children: React.ReactNode
//   target?: string
//   className?: string
// }

// export const Link = forwardRef(async function Link(
//   props: CustomLinkProps & React.ComponentPropsWithoutRef<'a'>,
//   ref: React.ForwardedRef<HTMLAnchorElement>,
// ) {
//   let finalHref = props.href

//   if (props.slug) {
//     const pathSegments = await getPath(props.slug)
//     finalHref = `/${pathSegments.join('/')}`
//   }

//   return (
//     <Headless.DataInteractive>
//       <NextLink ref={ref} href={finalHref || '/'} target={props.target} className={props.className} {...props}>
//         {props.children}
//       </NextLink>
//     </Headless.DataInteractive>
//   )
// })

import * as Headless from '@headlessui/react'
import NextLink, { type LinkProps } from 'next/link'
import { forwardRef } from 'react'
import { getPath } from '@/lib/routing'

interface CustomLinkProps extends LinkProps{
  slug?: string
}

export const Link = forwardRef(async function Link(
  props: CustomLinkProps & React.ComponentPropsWithoutRef<'a'>,
  ref: React.ForwardedRef<HTMLAnchorElement>,
) {

  let finalHref = props.href

  if (props.slug) {
    const pathSegments = await getPath(props.slug)
    finalHref = `/${pathSegments.join('/')}`
  }

  return (
    <Headless.DataInteractive>
      <NextLink ref={ref} {...props} href={finalHref || '/'} />
    </Headless.DataInteractive>
  )
})
