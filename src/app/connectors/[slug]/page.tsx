import { getConnector } from "@/sanity/queries/connectors"
import { ExpandedConnector } from "@/sanity/types/local.types"
import { notFound } from "next/navigation"
import { Container } from "@/components/container"
import { HeaderStyle as HeaderStyleType } from "@/sanity/types/sanity.types"
import { DefaultHeaderSection } from "@/components/headerSection"
import StylePortableText from '@/components/stylePortableText'
import { PortableTextBlock } from "next-sanity"
import { CategoryChip } from "@/lib/categoryChip"


type sParams = Promise<{ slug: string }>;

export default async function ConnectorPage(props: { params: Promise<sParams> }) {
    const { slug } = await props.params
    const connector = (await getConnector(slug) as ExpandedConnector)

    if (!connector) {
        notFound()
    }

    const ConnectorHeader: HeaderStyleType = {
        _type: "headerStyle",
        eyebrow: "Connectors",
        header: connector.name,
        layout: "left-aligned"
    }

    return (
        <>
            <DefaultHeaderSection header={ConnectorHeader} />
            <div className="mt-16">
                <Container>
                    {connector.categories ? (
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[15rem_1fr]">
                            <div>
                                <CategoryChip categories={connector.categories} />
                            </div>
                            <div>
                                <StylePortableText value={connector.body as PortableTextBlock[]} />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <StylePortableText value={connector.body as PortableTextBlock[]} />
                        </div>
                    )}
                </Container>
            </div>
        </>
    )
} 