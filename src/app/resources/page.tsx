import { notFound } from 'next/navigation'
import { Container } from '@/components/container'
import { Aggregator } from '@/aggregators/aggregator'
import {
  getCategories,
  getResources,
  getResourcesCount,
} from '@/sanity/queries/resources'
import { Metadata } from 'next'
import { HeaderStyle as HeaderStyleType } from '@/sanity/types/sanity.types'
import { DefaultHeaderSection } from '@/components/headerSection'

export const metadata: Metadata = {
  title: 'Resources',
  description:
      'Explore a variety of resources to help you learn more about Adeptia.',
  alternates: {
      canonical: 'https://www.adeptia.com/resources',
  },
}


const ResourcesHeader: HeaderStyleType = {
  _type: "headerStyle",
  header: "Resources",
  subheader: "Explore a variety of resources to help you learn more about Adeptia.",
  layout: "left-aligned"
}


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
    <>
      <DefaultHeaderSection header={ResourcesHeader} />
      <Container className="mt-16 pb-24">
        <Aggregator 
          getItems={getResources}
          getItemsCount={getResourcesCount}
          getCategories={getCategories}
          itemsPerPage={20}
          currPage={page}
          filterCategory={category}
          filterType={type}
          pathName={'resources'}
        />
      </Container>
    </>
  )
}