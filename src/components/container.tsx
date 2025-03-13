/* eslint prefer-const: 0 */

import { clsx } from 'clsx'
import cleanString from '@/lib/cleanString'

type PaddingLvl = 'none' | 'sm' | 'md' | 'lg' | 'header' | 'tight-top' | 'tight-bottom' | 'tight-top-bottom'

export function Container({
  paddingLvl,
  className,
  children,
}: {
  paddingLvl?: PaddingLvl
  className?: string
  children: React.ReactNode
}) {
  const paddingLevel = cleanString(paddingLvl ?? '')

  let padding = ''
  if (paddingLevel == 'none') {
    padding = ''
  } else if (paddingLevel == 'sm') {
    padding = 'py-4 lg:py-8'
  } else if (paddingLevel == 'md') {
    padding = 'py-16 lg:py-24'
  } else if (paddingLevel == 'lg') {
    padding = 'py-24 lg:py-32'
  } else if (paddingLevel == 'header') {
    padding = 'py-8'
  } else if (paddingLevel == 'tight-top') {
    padding = 'pb-16 lg:pb-24 pt-8'
  } else if (paddingLevel == 'tight-bottom') {
    padding = 'pt-16 lg:pt-24 pb-8'
  } else if (paddingLevel == 'tight-top-bottom') {
    padding = 'pt-8 pb-8'
  }
  return (
    <div className={clsx(className, padding)}>
      <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl">{children}</div>
    </div>
  )
}
