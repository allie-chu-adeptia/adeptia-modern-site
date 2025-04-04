import { Container } from '@/components/container'
import {
  getCategories,
  getPosts,
  getPostsCount
} from '@/sanity/queries/blog'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Aggregator } from '@/aggregators/aggregator'
import { HeaderStyle as HeaderStyleType } from '@/sanity/types/sanity.types'
import { DefaultHeaderSection } from '@/components/headerSection'

export const metadata: Metadata = {
  title: 'Blog - B2B Data Connectivity - Integration | Adeptia',
  description:
    'Take your integration knowledge to the next level with the Adeptia blog! Click here to explore all our blogs.',
  alternates: {
    canonical: 'https://www.adeptia.com/blog',
  },
  openGraph: {
    images: [
      {
        url: "https://cdn.sanity.io/images/5ujtwa6a/production/d1c087b2825443cc71e0a490e13613a419e31990-8000x5463.png",
        width: 800,
        height: 545,
        alt: "Adeptia Image Banner",
      },
    ],
  }
}

export const revalidate = 3600

// Generate static params for the first page of blogs
export async function generateStaticParams() {
  // This will pre-render the first page
  return [
    { searchParams: {} } // First page with no parameters
  ]
}
  

const BlogPageHeader: HeaderStyleType = {
  _type: "headerStyle",
  header: "Adeptia Blog",
  subheader: "Learn more about Adeptia's latest news, product updates, and more.",
  layout: "left-aligned",
}

// Main blog page component that combines all the above components
export default async function Blog(
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

  return (
    <>
      <DefaultHeaderSection header={BlogPageHeader} />
      <Container paddingLvl="md">
        <Aggregator 
          getItems={getPosts}
          getItemsCount={getPostsCount}
          getCategories={getCategories}
          itemsPerPage={21}
          currPage={page}
          filterCategory={category}
          pathName="blog"
        />
      </Container>
    </>
  )
}