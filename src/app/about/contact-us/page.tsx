import { BuildingOffice2Icon, PhoneIcon } from '@heroicons/react/24/outline'
import { Eyebrow, Heading } from '@/components/text'
import { BackgroundColor } from '@/lib/backgroundColorWrapper'
import type { BackgroundStyle } from '@/sanity/types/sanity.types'
import { Container } from '@/components/container'
import HubSpotForm from '@/lib/hubspotContactForm'
import type { Metadata } from 'next'

const darkBackground: BackgroundStyle = {
  _type: 'backgroundStyle',
  style: 'dark'
}

export async function generateMetadata(): Promise<Metadata> {

  return {
      title: "Adeptia | Contact Us",
      description: "Contact Us",
      alternates: {
          canonical: "https://www.adeptia.com/about/contact-us",
      },
  }
}

export default function ContactUs() {
  return (
    <>
      <BackgroundColor color={darkBackground}>
        <Container>          
            <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
              <div className="relative px-6 pt-12 pb-12 sm:pt-12 lg:static lg:px-8 lg:py-48">
                <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                  <Heading as="h1" dark={true}>How can we help?</Heading>
                  <Heading as="h3" className="mt-6" dark={true}>Ask about Adeptia Connect, pricing, implementation, or anything else. Our experts are ready to partner with you.
                  </Heading>
                  <div className="mt-10">
                    <Eyebrow dark={true}>US Headquarters</Eyebrow>
                    <dl className="mt-4 space-y-4 text-base/7 text-gray-200">
                      <div className="flex gap-x-4">
                        <dt className="flex-none">
                          <span className="sr-only">Address</span>
                          <BuildingOffice2Icon aria-hidden="true" className="h-7 w-6 text-gray-200" />
                        </dt>
                        <dd>
                          332 S Michigan Ave
                          <br />
                          Unit LL-A105
                          <br />
                          Chicago, IL 60604, USA
                        </dd>
                      </div>
                      <div className="flex gap-x-4">
                        <dt className="flex-none">
                          <span className="sr-only">Telephone</span>
                          <PhoneIcon aria-hidden="true" className="h-7 w-6 text-gray-200" />
                        </dt>
                        <dd>
                          <a href="tel:+1 (312) 299-1727" className="hover:text-gray-300">
                            +1 (312) 299-1727
                          </a>
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div className="mt-10">
                    <Eyebrow dark={true}>Adeptia India</Eyebrow>
                    <dl className="mt-4 space-y-4 text-base/7 text-gray-200">
                      <div className="flex gap-x-4">
                        <dt className="flex-none">
                          <span className="sr-only">Address</span>
                          <BuildingOffice2Icon aria-hidden="true" className="h-7 w-6 text-gray-200" />
                        </dt>
                        <dd>
                          India Research & Development Center
                          <br />
                          Office 56, Sixth floor
                          <br />
                          Tower-B, The Corenthum, Sector-62
                          <br />
                          Noida, UP 201301, India
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="relative px-6 pt-12 pb-12 sm:pt-12 lg:static lg:px-8 lg:py-12">
                <HubSpotForm
                  portalId="456732"
                  formId="6fc152cd-0cd2-4c8b-8a63-12b529c840d9"
                  region="na1"
                  sfdcCampaignId="701Hs000002MKRpIAO"
                  thankYouMessage="Thank you for contacting us!"
                />
              </div>
            </div>

        </Container>
      </BackgroundColor >
    </>
  )
}
