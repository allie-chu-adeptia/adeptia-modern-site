import { client } from '@/sanity/lib/client'
import { defineQuery } from 'next-sanity'
import { Container } from '@/components/container'
import { getPathFromRouteMap } from '@/lib/routing'
import { Aggregator } from '@/aggregators/aggregator'
import { HeaderStyle as HeaderStyleType } from '@/sanity/types/sanity.types'
import { DefaultHeaderSection } from '@/components/headerSection'
import { ExpandedPage } from '@/sanity/types/local.types'
import { Metadata } from 'next'

const UseCaseHeader: HeaderStyleType = {
    _type: "headerStyle",
    eyebrow: "Solutions",
    header: "Use Case",
    subheader: "Our solutions are designed to help you connect with your business partners in minutes",
    layout: "left-aligned"
}

export const metadata: Metadata = {
    title: 'Adeptia | Use Case Solutions',
    description:
        'Our use case solutions are designed to help you connect with your business partners in minutes',
    alternates: {
        canonical: 'https://www.adeptia.com/solutions/use-case',
    },
}

const USE_CASE_QUERY = defineQuery(/* groq */ `*[
  _type == "page" && 
  defined(parent) && 
  parent._ref in *[_type == "page" && metadata.slug.current == "use-case"]._id
] {
  _id,
  _type,
  title,
  metadata,
  excerpt,
  parent->{
    _id,
    "link": metadata.slug.current
  }
}`)

async function getUseCaseItemsCount() {
    const pages = await client.fetch(USE_CASE_QUERY)
    return pages.length
}

async function getUseCaseItems(startIndex: number, endIndex: number) {
    const pages = await client.fetch(USE_CASE_QUERY)

    // Get full paths for each page
    const pagesWithPaths = await Promise.all(pages.map(async (page: ExpandedPage) => {
        const path = await getPathFromRouteMap(page.metadata?.slug?.current || '')
        return {
            ...page,
            pathName: path.slice(0, -1).join('/'),
            slug: page.metadata?.slug?.current
        }
    }))

    return pagesWithPaths.slice(startIndex, endIndex)
}

export default async function UseCasePage(
    props: {
        searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    }
) {
    const searchParams = await props.searchParams;
    const page = Number(searchParams.page) || 1
    const itemsPerPage = 20

    return (
        <>
            <DefaultHeaderSection header={UseCaseHeader} />
            <Container>
                <div className="py-12">
                    <Aggregator
                        getItems={getUseCaseItems}
                        getItemsCount={getUseCaseItemsCount}
                        itemsPerPage={itemsPerPage}
                        currPage={page}
                        pathName={"solutions/use-case"}
                    />
                </div>
            </Container>
        </>
    )
}