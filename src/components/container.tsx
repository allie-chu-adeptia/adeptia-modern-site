/* eslint prefer-const: 0 */

import { clsx } from 'clsx'

type PaddingLvl = 'none' | 'sm' | 'md' | 'lg'

export function Container({
  paddingLvl,
  className,
  children,
}: {
  paddingLvl?: PaddingLvl
  className?: string
  children: React.ReactNode
}) {
  let padding = ''
  if (paddingLvl == 'none') {
    padding = ''
  } else if (paddingLvl == 'sm') {
    padding = 'py-4 sm:py-8'
  } else if (paddingLvl == 'md') {
    padding = 'py-8 sm:py-16'
  } else if (paddingLvl == 'lg') {
    padding = 'py-12 sm:py-24'
  }
  return (
    <div className={clsx(className, padding)}>
      <div className="mx-auto max-w-2xl lg:max-w-7xl">{children}</div>
    </div>
  )
}
