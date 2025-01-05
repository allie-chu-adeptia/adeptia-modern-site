/* eslint prefer-const: 0 */

'use client'

import { clsx } from 'clsx'

export function PlusGrid({
  className = '',
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={className}>{children}</div>
}

export function PlusGridRow({
  className = '',
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={clsx(
        className,
        'group/row relative isolate pt-[calc(theme(spacing.2)+1px)] last:pb-[calc(theme(spacing.2)+1px)]',
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2"
      >
        <div className="absolute inset-x-0 top-0 border-t border-black/5 rounded-lg"></div>
        <div className="absolute inset-x-0 top-2 border-t border-black/5 rounded-lg"></div>
        <div className="absolute inset-x-0 bottom-0 hidden border-b border-black/5 rounded-lg group-last/row:block"></div>
        <div className="absolute inset-x-0 bottom-2 hidden border-b border-black/5 rounded-lg group-last/row:block"></div>
      </div>
      {children}
    </div>
  )
}

export function PlusGridItem({
  className = '',
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={clsx(className, 'group/item relative')}>
      <PlusGridIcon
        placement="top left"
        className="hidden group-first/item:block"
      />
      <PlusGridIcon placement="top right" />
      <PlusGridIcon
        placement="bottom left"
        className="hidden group-last/row:group-first/item:block"
      />
      <PlusGridIcon
        placement="bottom right"
        className="hidden group-last/row:block"
      />
      {children}
    </div>
  )
}

export function PlusGridIcon({
  className = '',
  placement,
}: {
  className?: string
  placement: `${'top' | 'bottom'} ${'right' | 'left'}`
}) {
  if (placement === 'bottom left' || placement === 'top right') {
    return null;
  }

  let [yAxis, xAxis] = placement.split(' ')

  let yClass = yAxis === 'top' ? '-top-2' : '-bottom-2'
  let xClass = xAxis === 'left' ? '-left-2' : '-right-2'

  let rotation = {
    'top left': 'rotate-0',
    'top right': 'rotate-[180deg]',
    'bottom left': 'rotate-[0deg]',
    'bottom right': 'rotate-[180deg]',
  }[placement]

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="10" 
      viewBox="0 0 8 10"
      aria-hidden="true"
      className={clsx(
        className,
        'absolute size-[15px]',
        yClass,
        xClass,
        rotation,
        'transform'
      )}
      fill="none"
    >
      <path d="M0.75 1.10289L7.5 5L0.75 8.89712L0.75 1.10289Z" stroke="black" strokeOpacity="0.1" strokeWidth="0.5"/>
    </svg>
  )
}
