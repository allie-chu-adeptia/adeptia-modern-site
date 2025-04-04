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
        title: "Adeptia | Free Trial",
        description: "Free Trial for Adeptia",
        alternates: {
            canonical: "https://www.adeptia.com/free-trial",
        },
        openGraph: {
            images: [
                {
                    url: "https://cdn.sanity.io/images/5ujtwa6a/production/d1c087b2825443cc71e0a490e13613a419e31990-8000x5463.png",
                    width: 800,
                    height: 545,
                    alt: "Adeptia Connect Demo",
                },
            ],
        }
    }
}

export default function FreeTrial() {
    return (
        <>
            <BackgroundColor color={darkBackground}>
                <Container>
                    <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
                        <div className="relative px-6 pt-12 pb-12 sm:pt-12 lg:static lg:px-8 lg:py-48">
                            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                                <Eyebrow dark={true}>Two week free trial</Eyebrow>
                                <Heading as="h1" className="mt-2" dark={true}>Try Adeptia for Free</Heading>
                                <Heading as="h3" className="mt-6" dark={true}>Ask about Adeptia Connect, pricing, implementation, or anything else. Our experts are ready to partner with you.
                                </Heading>
                                <div className="mt-10 flex flex-col gap-8">
                                    <div>
                                        <Eyebrow dark={true}>Unlimited Access for Two Weeks</Eyebrow>
                                        <p className="mt-2 text-white">Get immediate access to the Adeptia platform when you sign up, no payment method required. Integrate with applications, partners, files and more.</p>
                                    </div>
                                    <div>
                                        <Eyebrow dark={true}>Get Started in Minutes</Eyebrow>
                                        <p className="mt-2 text-white">We provide a library of free demo videos upon signing up for the trial, so you can quickly learn the ropes and start building integrations.</p>
                                    </div>
                                    <div>
                                        <Eyebrow dark={true}>Built for All Technical Abilities</Eyebrow>
                                        <p className="mt-2 text-white">Whether you&apos;ve been a developer for 15 years or have never written a line of code, Adeptia&apos;s intuitive, no-code platform can simplify your most complex integrations. Try it out today!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative px-6 pt-12 pb-12 sm:pt-12 lg:static lg:px-8 lg:py-12">
                            <HubSpotForm
                                portalId="456732"
                                formId="93e21d94-8532-4e9c-a9ae-3b9ca884348c"
                                region="na1"
                                sfdcCampaignId="701VI00000LaeR3YAJ"
                                eventName="free_trial_submission"
                                thankYouMessage="Thank you for your submission! We'll be in touch shortly."
                                dark={true}
                            />
                        </div>
                    </div>

                </Container>
            </BackgroundColor >
        </>
    )
}
