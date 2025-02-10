import { client } from '@/sanity/client'
import { defineQuery } from 'next-sanity'
import { Container } from '@/components/container'
import { getPagePath } from '@/lib/buildPagePath'
import { Aggregator } from '@/aggregators/aggregator'
import { HeaderSection, HeaderStyle as HeaderStyleType } from '@/sanity/types/sanity.types'
import { HeaderSectionComponent } from '@/components/headerSection'
import { ExpandedPage } from '@/sanity/types/local.types'

const IndustryHeader: HeaderStyleType = {
    _type: "headerStyle",
    eyebrow: "Solutions",
    header: "Industry",
    subheader: "Our solutions are designed to help you connect with your business partners in minutes",
    layout: "left-aligned"
  }
  
  const IndustryHeaderSection: HeaderSection = {
    _type: "headerSection",
    header: IndustryHeader
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
        const path = await getPagePath(page)
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
        <Container>
            <div className="py-24">
                <HeaderSectionComponent headerSection={IndustryHeaderSection} />
                <Aggregator
                    getItems={getIndustryItems}
                    getItemsCount={getIndustryItemsCount}
                    itemsPerPage={itemsPerPage}
                    currPage={page}
                    pathName={"solutions/industry"}
                />
            </div>
        </Container>
    )
}