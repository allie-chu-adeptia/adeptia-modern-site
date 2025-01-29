import { clsx } from 'clsx'
import { image } from '@/sanity/image'
import { LogoSection } from '@/sanity/types/sanity.types'

export interface ExpandedLogoSection extends Omit<LogoSection, 'logo'> {
  logo?: Array<{
    asset?: {
      _ref: string
      _type: 'reference'
    }
    altText?: string
    _type: 'image'
  }>
}

export function LogoSectionComponent({
  logoSection,
  className,
}: {
  logoSection: ExpandedLogoSection
  className?: string
}) {
  return (
    <div
      className={clsx(
        className,
        'flex justify-between max-sm:mx-auto max-sm:max-w-md max-sm:flex-wrap max-sm:justify-evenly max-sm:gap-x-4 max-sm:gap-y-4',
      )}
    >
      {logoSection.logo?.map((logo, index) => (
        <img
          key={`logo-${index}`}
          alt={logo.altText || `Partner logo ${index + 1}`}
          src={image(logo).url()}
          className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
        />
      ))}
    </div>
  )
}
