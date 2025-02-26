import { client } from '@/sanity/lib/client'
import { defineQuery } from 'next-sanity'
import { Container } from '@/components/container'
import { Aggregator } from '@/aggregators/aggregator'
import { HeaderStyle as HeaderStyleType } from '@/sanity/types/sanity.types'
import { DefaultHeaderSection } from '@/components/headerSection'
import { ExpandedPage } from '@/sanity/types/local.types'
import { getPath } from '@/lib/routing'

const IndustryHeader: HeaderStyleType = {
    _type: "headerStyle",
    eyebrow: "Solutions",
    header: "Industry",
    subheader: "Our solutions are designed to help you connect with your business partners in minutes",
    layout: "left-aligned"
}


const INDUSTRY_QUERY = defineQuery(/* groq */ `*[
  _type == "page" && 
  defined(parent) && 
  parent._ref in *[_type == "page" && metadata.slug.current == "industry"]._id
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

async function getIndustryItems(startIndex: number, endIndex: number) {
    const pages = await client.fetch(INDUSTRY_QUERY)

    // Get full paths for each page
    const pagesWithPaths = await Promise.all(pages.map(async (page: ExpandedPage) => {
        const path = await getPath(page.metadata?.slug?.current || '')
        return {
            ...page,
            pathName: path.slice(0, -1).join('/'),
            slug: page.metadata?.slug?.current
        }
    }))

    return pagesWithPaths.slice(startIndex, endIndex)
}

async function getIndustryItemsCount() {
    const pages = await client.fetch(INDUSTRY_QUERY)
    return pages.length
}

export default async function IndustryPage(
    props: {
        searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    }
) {
    const searchParams = await props.searchParams;
    const page = Number(searchParams.page) || 1
    const itemsPerPage = 20

    return (
        <>
            <DefaultHeaderSection header={IndustryHeader} />
            <Container>
                <div className="py-12">
                    <Aggregator
                        getItems={getIndustryItems}
                        getItemsCount={getIndustryItemsCount}
                        itemsPerPage={itemsPerPage}
                        currPage={page}
                        pathName={"solutions/industry"}
                    />
                </div>
            </Container>
        </>
    )
}