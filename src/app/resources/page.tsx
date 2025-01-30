import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container } from '@/components/container'
import { Heading, Lead, Subheading } from '@/components/text'
import { Aggregator } from '@/aggregators/resourceAggregator'
import {
  getCategories,
  getResources,
  getResourcesCount,
} from '@/sanity/queries/resources'

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Stay informed with product updates, company news, and insights on how to sell smarter at your company.',
}

// Main resource page component that combines all the above components
export default async function Resource(
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

  const category =
    typeof searchParams.category === 'string'
      ? searchParams.category
      : undefined

  const type =
    typeof searchParams.type === 'string'
      ? searchParams.type
      : undefined

  return (
    <main className="overflow-hidden">
      <Container>
        <Subheading className="mt-16">Resources</Subheading>
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
          getItems={getResources}
          getItemsCount={getResourcesCount}
          getCategories={getCategories}
          itemsPerPage={20}
          currPage={page}
          filterCategory={category}
          filterType={type}
          aggregatorType="resources"
        />
      </Container>
    </main>
  )
}