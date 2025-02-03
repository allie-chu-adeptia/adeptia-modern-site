import { Container } from "@/components/container"
import { HeaderStyle, HeaderStyleProps } from "@/lib/headerStyle"
import { PortableTextBlock } from "@portabletext/react"
import StylePortableText from "@/components/stylePortableText"
import { getCompanyTermsOfService } from "@/sanity/queries/company"

const header: HeaderStyleProps = {
    header: {
        header: "Terms of Service",
        layout: 'centered'
    }
}

export default async function TermsOfService() {
    const termsOfService = await getCompanyTermsOfService()

    return (
        <Container>
            <div className="bg-white py-16 md:py-24 lg:py-32">
                <HeaderStyle header={header.header} />
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl">
                        <StylePortableText value={termsOfService.termsOfService as PortableTextBlock[]} />
                    </div>
                </div>
            </div>
        </Container>  
    )
}