import { clsx } from 'clsx'
import { image } from '@/sanity/lib/image'
import { LogoSection } from '@/sanity/types/sanity.types'
import cleanString from '@/lib/cleanString'

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
  const numLogos = logoSection.logo?.length || 5;
  return (
    <div
      className={clsx(
        className,
        "mx-auto max-w-7xl px-6 lg:px-8"
      )}
    >
      <div
        className='mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5'
      >
        {logoSection.logo?.map((logo, index) => (
          <img
            key={`logo-${index}`}
            alt={cleanString(logo.altText || `Partner logo ${index + 1}`)}
            src={image(logo).url()}
            className={clsx(
              "col-span-2 max-h-12 w-full object-contain lg:col-span-1",
              index === numLogos - 2 && "sm:col-start-2",
              index === numLogos - 1 && "col-start-2 sm:col-start-auto"
            )}
          />
        ))}
      </div>
    </div>
  )
}
