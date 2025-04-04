import { getConnector } from "@/sanity/queries/connectors"
import { ExpandedConnector } from "@/sanity/types/local.types"
import { notFound } from "next/navigation"
import { Container } from "@/components/container"
import { HeaderStyle as HeaderStyleType } from "@/sanity/types/sanity.types"
import { DefaultHeaderSection } from "@/components/headerSection"
import StylePortableText from '@/components/stylePortableText'
import { PortableTextBlock } from "next-sanity"
import { CategoryChip } from "@/lib/categoryChip"
import type { Metadata } from 'next'


type sParams = Promise<{ slug: string }>;

// Generated metadata for the blog post
export async function generateMetadata(props: { params: Promise<sParams> }): Promise<Metadata> {
    const params = await props.params;
    const connector: ExpandedConnector | undefined = await getConnector(params.slug)
    return {
        title: "Adeptia Connectors - " + connector?.name,
        description: "Learn more about the " + connector?.name + " connector",
        alternates: {
            canonical: "https://www.adeptia.com/connectors/" + connector?.slug,
        },
        robots: {
            index: true,
            follow: true,
        },
        openGraph: {
            title: connector?.name,
            description: "Learn more about the " + connector?.name + " connector",
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
                                <CategoryChip categories={connector.categories} nolink={true} />
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