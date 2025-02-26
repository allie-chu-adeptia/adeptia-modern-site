import { client } from '@/sanity/lib/client'
import { defineQuery } from 'next-sanity'
import { Container } from '@/components/container'
import { getPath } from '@/lib/routing'
import { Aggregator } from '@/aggregators/aggregator'
import { HeaderStyle as HeaderStyleType } from '@/sanity/types/sanity.types'
import { DefaultHeaderSection } from '@/components/headerSection'
import { ExpandedPage } from '@/sanity/types/local.types'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Solutions',
    description:
        'Our solutions are designed to help you connect with your business partners in minutes',
    alternates: {
        canonical: 'https://www.adeptia.com/solutions',
    },
  }
  

const SolutionsHeader: HeaderStyleType = {
    _type: "headerStyle",
    header: "Solutions",
    subheader: "Our solutions are designed to help you connect with your business partners in minutes",
    layout: "left-aligned"
}



const SOLUTION_QUERY = defineQuery(/* groq */ `*[
  _type == "page" && 
  defined(parent) && 
  parent._ref in *[_type == "page" && metadata.slug.current == "solutions"]._id
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

async function getItems(startIndex: number, endIndex: number) {
    const pages = await client.fetch(SOLUTION_QUERY)

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

async function getItemsCount() {
    const pages = await client.fetch(SOLUTION_QUERY)
    return pages.length
}

export default async function SolutionPage(
    props: {
        searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    }
) {
    const searchParams = await props.searchParams;
    const page = Number(searchParams.page) || 1
    const itemsPerPage = 9

    return (
        <>
            <DefaultHeaderSection header={SolutionsHeader} />
            <Container>
                <div className="pt-12">
                    <Aggregator
                        getItems={getItems}
                        getItemsCount={getItemsCount}
                        itemsPerPage={itemsPerPage}
                        currPage={page}
                        pathName="solutions"
                    />
                </div>
            </Container>
        </>
    )
}