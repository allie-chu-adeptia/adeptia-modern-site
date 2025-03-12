import { Container } from "@/components/container"
import { HeaderStyle, HeaderStyleProps } from "@/lib/headerStyle"
import { PortableTextBlock } from "@portabletext/react"
import StylePortableText from "@/components/stylePortableText"
import { getCompanyPrivacyPolicy } from "@/sanity/queries/company"

const header: HeaderStyleProps = {
    header: {
        header: "Privacy Policy",
        layout: 'centered'
    }
}

export default async function PrivacyPolicy() {
    const privacyPolicy = await getCompanyPrivacyPolicy()

    return (
        <Container>
            <div className="bg-white py-16 md:py-24 lg:py-32">
                <HeaderStyle header={header.header} />
                <div className="mx-auto mt-10 max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl">
                        <StylePortableText value={privacyPolicy.privacyPolicy as PortableTextBlock[]} />
                    </div>
                </div>
            </div>
        </Container>  
    )
}