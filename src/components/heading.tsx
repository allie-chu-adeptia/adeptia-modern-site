import clsx from 'clsx'

/* eslint prefer-const: "off" -- Tailwind UI component, disregarding eslint rules. */

type HeadingProps = { level?: 1 | 2 | 3 | 4 | 5 | 6 } & React.ComponentPropsWithoutRef<
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
>

export function Heading({ className, level = 1, ...props }: HeadingProps) {
  let Element: `h${typeof level}` = `h${level}`

  return (
    <Element
      {...props}
      className={clsx(className, 'text-2xl/8 font-semibold text-zinc-950')}
    />
  )
}

export function Subheading({ className, level = 2, ...props }: HeadingProps) {
  let Element: `h${typeof level}` = `h${level}`

  return (
    <Element
      {...props}
      className={clsx(className, 'text-base/7 font-semibold text-zinc-950')}
    />
  )
}

export function Eyebrow({ className, level = 3, ...props }: HeadingProps){
  let Element: `h${typeof level}` = `h${level}`
  return (
    <Element
      {...props}
      className={clsx(
        className,
        'font-inter text-xs/5 font-[800] uppercase tracking-widest text-gray-500',
      )}
    />
  )
}
