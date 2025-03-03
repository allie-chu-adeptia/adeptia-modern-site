import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Eyebrow, Heading } from '@/components/text'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import dayjs from 'dayjs'
import { PortableTextBlock } from 'next-sanity'
import { notFound } from 'next/navigation'
import { ExpandedPost } from '@/sanity/types/local.types'
import StylePortableText from '@/components/stylePortableText'
import { getNewsArticle } from '@/sanity/queries/news'
import { buildMetadata } from '@/lib/metadata'

type sParams = Promise<{ slug: string }>;

export async function generateMetadata(props: { params: Promise<sParams> }) {
  const { slug } = await props.params
  const post = (await getNewsArticle(slug) as ExpandedPost) || notFound()
  return buildMetadata(post?.metadata)
}

// Styles and returns the news article page
export default async function NewsArticle(props: { params: Promise<sParams> }) {

  const { slug } = await props.params
  const post = (await getNewsArticle(slug) as ExpandedPost) || notFound()

  console.log(post)

  return (
    <main className="overflow-hidden">
      <Container>
        <Eyebrow className="mt-16">
          {dayjs(post.publishDate).format('dddd, MMMM D, YYYY')}
        </Eyebrow>
        <Heading as="h2" className="mt-2">
          {post.title}
        </Heading>
        <div className="mt-16 grid grid-cols-1 gap-8 pb-24 lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_15rem]">
          <div></div>
          <div className="text-gray-700">
            <div className="max-w-3xl xl:mx-auto">
              {post.body && (
                <StylePortableText
                  value={post.body as PortableTextBlock[]}
                  className="blog-post-content"
                />
              )}
              <div className="mt-10">
                <Button variant="outline" href="/blog">
                  <ChevronLeftIcon className="size-4" />
                  Back to news
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
