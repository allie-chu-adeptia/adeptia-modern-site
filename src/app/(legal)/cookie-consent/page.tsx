import { Container } from "@/components/container"
import { HeaderStyle, HeaderStyleProps } from "@/lib/headerStyle"
import { PortableTextBlock } from "@portabletext/react"
import StylePortableText from "@/components/stylePortableText"
import { getCompanyCookieConsent } from "@/sanity/queries/company"
import type { Metadata } from 'next'
import { Heading } from "@/components/text"

const header: HeaderStyleProps = {
    header: {
        header: "Cookie Consent",
        layout: 'centered'
    }
}

export async function generateMetadata(): Promise<Metadata> {

    return {
        title: "Adeptia | Cookie Consent",
        description: "Cookie Consent for Adeptia",
        alternates: {
            canonical: "https://www.adeptia.com/cookie-consent",
        },
        robots: {
            index: true,
            follow: true,
        },
        openGraph: {
            title: "Cookie Consent",
            description: "Cookie Consent for Adeptia",
        }
    }
}

export default async function CookieConsent() {
    const cookieConsent = await getCompanyCookieConsent()
    return (
        <Container>
            <div className="bg-white py-16 md:py-24 lg:py-32">
                <HeaderStyle header={header.header} />
                <div className="mx-auto mt-10 max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
                        <StylePortableText value={cookieConsent.cookieConsent as PortableTextBlock[]} />
                        <div className="mt-10">
                            <Heading as="h3">Cookie Settings</Heading>
                            <a className="cky-banner-element">Cookie Settings</a>
                            <Heading as="h3">Types of Cookies We Use</Heading>
                            <div className="cky-audit-table-element"></div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>  
    )
}