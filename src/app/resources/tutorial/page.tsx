import { notFound } from 'next/navigation'
import { Container } from '@/components/container'
import { Aggregator } from '@/aggregators/aggregator'
import {
  getTutorials,
  getTutorialsCount,
} from '@/sanity/queries/resources'
import { Metadata } from 'next'
import { HeaderStyle as HeaderStyleType } from '@/sanity/types/sanity.types'
import { DefaultHeaderSection } from '@/components/headerSection'

export const metadata: Metadata = {
  title: 'Adeptia | Tutorials',
  description:
      'Explore a variety of tutorials to help you learn more about Adeptia.',
  alternates: {
      canonical: 'https://www.adeptia.com/tutorials',
  },
  robots: {
    index: false,
    follow: false,
  },
}


const TutorialsHeader: HeaderStyleType = {
  _type: "headerStyle",
  header: "Tutorials",
  subheader: "Explore a variety of tutorials to help you learn more about Adeptia.",
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

  return (
    <>
      <DefaultHeaderSection header={TutorialsHeader} />
      <Container className="mt-16 pb-24">
        <Aggregator 
          getItems={getTutorials}
          getItemsCount={getTutorialsCount}
          itemsPerPage={100}
          currPage={page}
          pathName={'resources/tutorial'}
        />
      </Container>
    </>
  )
}