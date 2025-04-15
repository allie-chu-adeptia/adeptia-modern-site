import { Eyebrow, Heading } from '@/components/text'
import { BackgroundColor } from '@/lib/backgroundColorWrapper'
import type { BackgroundStyle } from '@/sanity/types/sanity.types'
import { Container } from '@/components/container'
import { HubSpotForm } from "@/lib/hubspotContactForm";
import type { Metadata } from 'next'

const darkBackground: BackgroundStyle = {
    _type: 'backgroundStyle',
    style: 'dark'
}

export async function generateMetadata(): Promise<Metadata> {

    return {
        title: "Adeptia | Adeptia Connect Demo",
        description: "Adeptia Connect Demo",
        alternates: {
            canonical: "https://www.adeptia.com/adeptia-connect-demo",
        },
    }
}

export default function AdeptiaConnectDemo() {
    return (
        <>
            <BackgroundColor color={darkBackground}>
                <Container>
                    <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
                        <div className="relative px-6 pt-12 pb-12 sm:pt-12 lg:static lg:px-8 lg:py-48">
                            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                                <Eyebrow dark={true}>Adeptia Connect Demo</Eyebrow>
                                <Heading as="h1" className="mt-2" dark={true}>See Adeptia&apos;s AI Powered Platform</Heading>
                                <Heading as="h3" className="mt-6" dark={true}>Learn how you can automate tedious data mapping with AI, streamline customer and supplier integrations, and enable your business users to automate processes.</Heading>
                            </div>
                        </div>
                        <div className="relative px-6 pt-12 pb-12 sm:pt-12 lg:static lg:px-8 lg:py-12">
                            <HubSpotForm
                                portalId="456732"
                                formId="d095d92f-f507-40c1-ac6a-6b59347da8d8"
                                region="na1"
                                sfdcCampaignId="70132000000l3tAAAQ"
                                dark={true}
                                eventName="adeptia_connect_demo_submission"
                                thankYouMessage="Thank you for your submission! We'll be in touch shortly."
                            />
                        </div>
                    </div>

                </Container>
            </BackgroundColor >
        </>
    )
}
