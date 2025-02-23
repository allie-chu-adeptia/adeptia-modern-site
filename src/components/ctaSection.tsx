import { HeaderStyle } from "@/lib/headerStyle";
import { Button } from "@/components/button";
import { BackgroundStyle, CtaSection } from "@/sanity/types/sanity.types";
import clsx from 'clsx';
import { image } from "@/sanity/image";
import { Heading } from "./text";
import cleanString from "@/lib/cleanString";
import { ExpandedImage } from "@/sanity/types/local.types";
import { BackgroundMotion } from "@/lib/backgroundMotion";
import { BackgroundColor } from "@/lib/backgroundColorWrapper";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ExpandedCta } from "@/sanity/types/local.types";

export interface ExpandedCtaSection extends Omit<CtaSection, 'cta' | 'image'> {
  cta?: ExpandedCta[]
  image?: ExpandedImage
}

const textAlignment: { [key: string]: string } = {
  'centered': 'flex flex-col items-center',
  'left-aligned': 'flex flex-col items-start',
  'right-aligned': 'flex flex-col items-end',
}

const lightBackground: BackgroundStyle = {
  _type: 'backgroundStyle',
  style: 'medium'
}

const darkAccentBackground: BackgroundStyle = {
  _type: 'backgroundStyle',
  style: 'dark-accent'
}

const darkBackground: BackgroundStyle = {
  _type: 'backgroundStyle',
  style: 'dark'
}

function LeftAlignedCtaSection({ ctaSection }: { ctaSection: ExpandedCtaSection }) {
  console.log("displaying left aligned cta section")
  return (
    <BackgroundColor color={darkBackground} className="relative isolate overflow-hidden px-6 shadow-2xl sm:rounded-3xl sm:px-16">
      <div className="px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
        <div className={clsx(
          "mx-auto max-w-md lg:mx-0 lg:flex-auto lg:py-32",
          textAlignment[ctaSection.cta?.[0]?.header?.layout || 'centered']
        )}>
          <HeaderStyle header={ctaSection.cta?.[0]?.header} style={darkBackground} />
          <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
            {ctaSection.cta?.map((cta, index) => (
              <Button
                key={cta._id}
                slug={cta.link}
                variant={index === 0 ? "primary" : "tertiary"}
                dark={true}
              >
                {cta.buttonText}
              </Button>
            ))}
          </div>
        </div>
        <div className="relative mt-16 h-80 lg:mt-8">
          {ctaSection.image && (
            <img
              alt={ctaSection.image?.altText}
              src={image(ctaSection.image).size(1824, 1080).url()}
              className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10 outline outline-1 outline-white/20"
            />
          )}
        </div>
      </div>
    </BackgroundColor>
  )
}

function CenteredCtaSection({ ctaSection }: { ctaSection: ExpandedCtaSection }) {
  console.log("displaying centered cta section")
  return (
    <BackgroundColor color={darkAccentBackground} className="relative isolate overflow-hidden px-6 shadow-2xl sm:rounded-3xl sm:px-16">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <HeaderStyle header={ctaSection.cta?.[0]?.header} style={darkAccentBackground} />
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {ctaSection.cta?.map((cta, index) => (
              <Button
                key={cta._id}
                href={cta.link}
                variant={index === 0 ? "primary" : "tertiary"}
                dark={true}
              >
                {cta.buttonText}
                {index != 0 && <ChevronRightIcon className="size-4 transform translate-x-1 transition-all duration-200 ease-in-out group-hover:opacity-100 group-hover:translate-x-0" />}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <BackgroundMotion color={darkAccentBackground} />
    </BackgroundColor>
  )
}

function SplitCtaSection({ ctaSection }: { ctaSection: ExpandedCtaSection }) {
  console.log("displaying split cta section")
  return (
    <BackgroundColor color={lightBackground} className="relative isolate overflow-hidden px-6 shadow-2xl sm:rounded-3xl sm:px-16">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
        <div className="flex flex-col gap-4">
          <Heading as="h1">
            {ctaSection.cta?.[0]?.header?.header}
          </Heading>
          <Heading as="h3">
            {ctaSection.cta?.[0]?.header?.subheader}
          </Heading>
        </div>
        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:shrink-0">
          {ctaSection.cta?.map((cta, index) => (
            <Button
              key={cta._id}
              href={cta.link}
              variant={index === 0 ? "primary" : "tertiary"}
              dark={false}
              className="text-black"
            >
              {cta.buttonText}
              {index != 0 && <ChevronRightIcon className="size-4 transform translate-x-1 transition-all duration-200 ease-in-out group-hover:opacity-100 group-hover:translate-x-0" />}
            </Button>
          ))}
        </div>
      </div>
    </BackgroundColor>
  )
}

export function CtaSectionComponent(
  { ctaSection }: { ctaSection: ExpandedCtaSection }
) {
  const displayStyle = cleanString(ctaSection.cta?.[0]?.displayStyle || '')

  const displayStyleMap: { [key: string]: React.ComponentType<{ ctaSection: ExpandedCtaSection }> } = {
    "primary": CenteredCtaSection,
    "secondary": LeftAlignedCtaSection,
    "tertiary": SplitCtaSection
  }

  const Component = displayStyle ? displayStyleMap[displayStyle] : null

  return Component ? <Component ctaSection={ctaSection} /> : null
}