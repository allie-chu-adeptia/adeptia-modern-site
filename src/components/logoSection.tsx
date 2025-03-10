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
        `mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-${numLogos} ${numLogos % 2 === 1 ? '[&>*:last-child]:col-span-4 [&>*:last-child]:place-self-center sm:[&>*:last-child]:col-span-6 lg:[&>*:last-child]:col-span-1' : ''}`,
      )}
    >
      {logoSection.logo?.map((logo, index) => (
        <img
          key={`logo-${index}`}
          alt={cleanString(logo.altText || `Partner logo ${index + 1}`)}
          src={image(logo).url()}
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
        />
      ))}
    </div>
  )
}
