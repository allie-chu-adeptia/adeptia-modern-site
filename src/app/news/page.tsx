import { notFound } from 'next/navigation'
import { Container } from '@/components/container'
import { Heading, Lead, Subheading } from '@/components/text'
import { Aggregator } from '@/aggregators/resourceAggregator'
import {
  getNews,
  getNewsCount,
} from '@/sanity/queries/news'

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
    <main className="overflow-hidden">
      <Container>
        <Subheading className="mt-16">News</Subheading>
        <Heading as="h1" className="mt-2">
          What&apos;s happening at Adeptia.
        </Heading>
        <Lead className="mt-6 max-w-3xl">
          Stay informed with product updates, company news, and insights on how
          to sell smarter at your company.
        </Lead>
      </Container>
      <Container className="mt-16 pb-24">
        <Aggregator 
          getItems={getNews}
          getItemsCount={getNewsCount}
          itemsPerPage={20}
          currPage={page}
          aggregatorType="news"
        />
      </Container>
    </main>
  )
}