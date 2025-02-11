import { getCategories, getConnectors } from "@/sanity/queries/connectors"
import { Container } from '@/components/container'
import { HeaderStyle as HeaderStyleType, HeaderSection } from "@/sanity/types/sanity.types"
import { HeaderSectionComponent } from "@/components/headerSection"
import { image } from '@/sanity/image'
import { LinkedSubpageConnectorLogo } from '@/components/linkedConnectorLogo'
import { CategoriesFilter } from "@/aggregators/renderCategories"
import { ExpandedConnector } from '@/sanity/types/local.types'

const ConnectorsHeader: HeaderStyleType = {
  _type: "headerStyle",
  header: "Application Connectors",
  subheader: "Connect with your business partners in minutes",
  layout: "left-aligned"
}

const ConnectorsHeaderSection: HeaderSection = {
  _type: "headerSection",
  header: ConnectorsHeader
}

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
    console.log(category)
    const connectors = await getConnectors(category)

    return (
        <div className="mt-16 pb-24">
            <Container>
                <HeaderSectionComponent headerSection={ConnectorsHeaderSection} />
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
    )
}