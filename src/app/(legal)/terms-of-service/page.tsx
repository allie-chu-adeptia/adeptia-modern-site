import { Container } from "@/components/container"
import { HeaderStyle, HeaderStyleProps } from "@/lib/headerStyle"
import { PortableTextBlock } from "@portabletext/react"
import StylePortableText from "@/components/stylePortableText"
import { getCompanyTermsOfService } from "@/sanity/queries/company"
import type { Metadata } from 'next'
const header: HeaderStyleProps = {
    header: {
        header: "Terms of Service",
        layout: 'centered'
    }
}

// Generated metadata for the blog post
export async function generateMetadata(): Promise<Metadata> {

    return {
        title: "Adeptia | Terms of Service",
        description: "Terms of Service for Adeptia",
        alternates: {
            canonical: "https://www.adeptia.com/terms-of-service",
        },
        robots: {
            index: true,
            follow: true,
        },
        openGraph: {
            title: "Terms of Service",
            description: "Terms of Service for Adeptia",
            images: [
                {
                    url: "https://cdn.sanity.io/images/5ujtwa6a/production/d1c087b2825443cc71e0a490e13613a419e31990-8000x5463.png",
                    width: 800,
                    height: 545,
                    alt: "Adeptia Image Banner",
                },
            ],
        }
    }
}

export default async function TermsOfService() {
    const termsOfService = await getCompanyTermsOfService()

    return (
        <Container>
            <div className="bg-white py-16 md:py-24 lg:py-32">
                <HeaderStyle header={header.header} />
                <div className="mx-auto mt-10 max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl">
                        <StylePortableText value={termsOfService.termsOfService as PortableTextBlock[]} />
                    </div>
                </div>
            </div>
        </Container>  
    )
}