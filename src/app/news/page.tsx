import { notFound } from 'next/navigation'
import { Container } from '@/components/container'
import { Aggregator } from '@/aggregators/aggregator'
import {
  getNews,
  getNewsCount,
} from '@/sanity/queries/news'
import type { Metadata } from 'next'
import { HeaderStyle as HeaderStyleType } from '@/sanity/types/sanity.types'
import { DefaultHeaderSection } from '@/components/headerSection'

export const metadata: Metadata = {
  title: 'News and Press at Adeptia',
  description:
    'Get updated with latest Adeptia and Adeptia Connect news.',
  alternates: {
    canonical: 'https://www.adeptia.com/news',
  },
}

const NewsPageHeader: HeaderStyleType = {
  _type: "headerStyle",
  header: "News",
  subheader: "Get updated with latest Adeptia and Adeptia Connect news.",
  layout: "left-aligned",
}

// Main resource page component that combines all the above components
export default async function NewsPage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
  const searchParams = await props.searchParams;

  const page =
    'page' in searchParams
      ? typeof searchParams.page === 'string' && parseInt(searchParams.page) > 1
        ? parseInt(searchParams.page)
        : notFound()
      : 1

  return (
    <>
      <DefaultHeaderSection header={NewsPageHeader} />
      <Container paddingLvl="md">
        <Aggregator 
          getItems={getNews}
          getItemsCount={getNewsCount}
          itemsPerPage={21}
          currPage={page}
          pathName="news"
        />
      </Container>
    </>
  )
}