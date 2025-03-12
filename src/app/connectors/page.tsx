import { getCategories, getConnectors, getFeaturedConnectors } from "@/sanity/queries/connectors"
import { Container } from '@/components/container'
import { HeaderStyle as HeaderStyleType } from "@/sanity/types/sanity.types"
import { DefaultHeaderSection } from "@/components/headerSection"
import { image } from '@/sanity/lib/image'
import { LinkedSubpageConnectorLogo } from '@/components/linkedConnectorLogo'
import { CategoriesFilter } from "@/aggregators/renderCategories"
import { ExpandedConnector } from '@/sanity/types/local.types'
import type { Metadata } from 'next'
import { Heading } from '@/components/text'


export const metadata: Metadata = {
    title: 'API Integration Solutions | Application Connectors',
    description:
        'Adeptia application connectors let you develop your own connections to enable API Integration and Management for your line of business needs.',
    alternates: {
        canonical: 'https://www.adeptia.com/connectors',
    },
    robots: {
        index: true,
        follow: true,
    },
}

const ConnectorsPageHeader: HeaderStyleType = {
    _type: "headerStyle",
    header: "Application Connectors",
    subheader: "Our pre-built connectors help you integrate applications and connect to your ecosystem of partners and customers in minutes.",
    layout: "left-aligned",
}

const numFeaturedConnectors = 5

export default async function ConnectorsPage(
    props: {
        searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    }
) {
    const searchParams = await props.searchParams;

    const category =
        typeof searchParams.category === 'string'
            ? searchParams.category
            : undefined

    const connectors = await getConnectors(category)
    const featuredConnectors = await getFeaturedConnectors(numFeaturedConnectors)

    return (
        <>
            <DefaultHeaderSection header={ConnectorsPageHeader} />
            {!category && (
                <div className="pb-16 pt-16 bg-[#F8F7F7] hidden lg:block">
                    <Container>
                        <Heading as="h2" className="mb-6">Featured Connectors</Heading>
                        <div className={`grid grid-cols-8 gap-8`}>
                            {featuredConnectors.map((connector: ExpandedConnector) => (
                                <div key={connector.slug} className="flex flex-col items-center w-1/8">
                                    <div className="w-32 flex justify-start flex-col">
                                        <div className="grid grid-cols-1 rounded-[2rem] ring-1 shadow-[inset_0_0_2px_1px_#ffffff4d] ring-black/5 w-32 h-32">
                                            <div className="grid grid-cols-1 rounded-[2rem] p-2 shadow-md shadow-black/5">
                                                <div className="rounded-3xl bg-white p-4 pb-3 ring-1 shadow-2xl ring-black/5 flex items-center justify-center">
                                                    {connector.subpage ? (
                                                        <LinkedSubpageConnectorLogo connector={connector} size={100} />
                                                    ) : (
                                                        <img
                                                            src={image(connector.logo).size(1000, 1000).url()}
                                                            alt={connector.name}
                                                            className="max-w-full max-h-full object-contain"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mt-3 text-sm text-gray-600 text-center">{connector.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>
            )}
            <div className="mt-16 pb-24">
                <Container>
                    {getCategories && (
                        <div className="pb-4 border-b border-gray-200">
                            <CategoriesFilter
                                selected={category}
                                getCategories={() => getCategories()}
                                pathName="connectors"
                            />
                        </div>
                    )}
                    <div className="flex flex-wrap justify-left gap-8 pt-4">
                        {connectors.map((connector: ExpandedConnector) => (
                            <div key={connector.slug} className="flex flex-col items-center w-1/8">
                                <div className="w-32 flex justify-start flex-col">
                                    <div className="w-32 h-32 flex items-center justify-center border border-gray-200 rounded-lg bg-white p-4">
                                        {connector.subpage ? (
                                            <LinkedSubpageConnectorLogo connector={connector} size={100} />
                                        ) : (
                                            <img
                                                src={image(connector.logo).size(1000, 1000).url()}
                                                alt={connector.name}
                                                className="max-w-full max-h-full object-contain"
                                            />
                                        )}
                                    </div>
                                    <p className="mt-2 text-sm text-gray-600 text-center">{connector.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        </>
    )
}