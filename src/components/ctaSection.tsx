import { HeaderStyle } from "@/lib/headerStyle";
import { Button } from "@/components/button";
import { BackgroundStyle, CtaSection, HeaderStyle as HeaderStyleType } from "@/sanity/types/sanity.types";
import clsx from 'clsx';
import { image } from "@/sanity/image";
import { Heading } from "./text";
import cleanString from "@/lib/cleanString";

export interface ExpandedCtaSection extends Omit<CtaSection, 'cta' | 'image'> {
    cta?: Array<{
        _type: 'cta'
        _id: string
        header?: HeaderStyleType
        campaignTitle: string
        buttonText: string
        link: string
        displayStyle: string
    }>
    image?: {
        asset?: {
          _ref: string
          _type: 'reference'
          _weak?: boolean
        }
        altText?: string
        _type: 'image'
      }
}

const textAlignment: { [key: string]: string } = {
    'centered': 'flex flex-col items-center',
    'left-aligned': 'flex flex-col items-start',
    'right-aligned': 'flex flex-col items-end',
}

const lightBackground: BackgroundStyle = {
    _type: 'backgroundStyle',
    style: 'light'
}

const darkBackground: BackgroundStyle = {
    _type: 'backgroundStyle',
    style: 'dark'
}

function LeftAlignedCtaSection({ ctaSection }: { ctaSection: ExpandedCtaSection }) {
    console.log("displaying left aligned cta section")
    return (
        <div className="bg-white">
          <div className="mx-auto max-w-7xl sm:px-6 sm:py-32 lg:px-8">
            <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
              <svg
                viewBox="0 0 1024 1024"
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 -z-10 size-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
              >
                <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                <defs>
                  <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                    <stop stopColor="#7775D6" />
                    <stop offset={1} stopColor="#E935C1" />
                  </radialGradient>
                </defs>
              </svg>
              <div className={clsx(
                "mx-auto max-w-md lg:mx-0 lg:flex-auto lg:py-32",
                textAlignment[ctaSection.cta?.[0]?.header?.layout || 'centered']
              )}>
                <HeaderStyle header={ctaSection.cta?.[0]?.header} style={lightBackground} />
                <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                  {ctaSection.cta?.map((cta, index) => (
                    <Button
                      key={cta._id}
                      href={cta.link}
                      variant={index === 0 ? "primary" : "secondary"}
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
          </div>
        </div>
    )
}

function CenteredCtaSection({ ctaSection }: { ctaSection: ExpandedCtaSection }) {
    console.log("displaying centered cta section")
    return (
        <div className="rounded-4xl bg-[linear-gradient(276deg,var(--tw-gradient-stops))] from-[#3C7BEF] from-[-17.59%] via-[#0A4ECD] via-[29.8%] to-[#3B25E0] to-[90.12%]">
          <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <HeaderStyle header={ctaSection.cta?.[0]?.header} style={darkBackground} />
              <div className="mt-10 flex items-center justify-center gap-x-6">
                {ctaSection.cta?.map((cta, index) => (
                  <Button
                    key={cta._id}
                    href={cta.link}
                    variant={index === 0 ? "primary" : "secondary"}
                  >
                    {cta.buttonText}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
    )
}

function SplitCtaSection({ ctaSection }: { ctaSection: ExpandedCtaSection }) {
    console.log("displaying split cta section")
    return (
        <div className="bg-indigo-100">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
            <div className="flex flex-col gap-4">
              <Heading as="h2">
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
                  variant={index === 0 ? "primary" : "secondary"}
                >
                  {cta.buttonText}
                </Button>
              ))}
            </div>
          </div>
        </div>
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