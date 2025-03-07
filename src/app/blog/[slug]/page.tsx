import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Subheading, Heading } from '@/components/text'
import { image } from '@/sanity/lib/image'
import { getPost } from '@/sanity/queries/blog'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import dayjs from 'dayjs'
import type { Metadata } from 'next'
import { PortableTextBlock } from 'next-sanity'
import { notFound } from 'next/navigation'
import { ExpandedPost } from '@/sanity/types/local.types'
import StylePortableText from '@/components/stylePortableText'
import { CategoryChip } from '@/lib/categoryChip'
import { buildMetadata } from '@/lib/metadata'
import cleanString from '@/lib/cleanString'
type sParams = Promise<{ slug: string }>;

// Generated metadata for the blog post
export async function generateMetadata(props: { params: Promise<sParams> }): Promise<Metadata> {
  const params = await props.params;
  const post : ExpandedPost | undefined = await getPost(params.slug)
  return buildMetadata(post?.metadata)
}

// Styles and returns the blog post page
export default async function BlogPost(props: { params: Promise<sParams> }) {

  const { slug } = await props.params
  const post = (await getPost(slug) as ExpandedPost) || notFound()

  return (
    <main className="overflow-hidden">
      <Container>
        <Heading as="h2" className="mt-16">
          {post.title}
        </Heading>
        <div className="mt-16 grid grid-cols-1 gap-8 pb-24 lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_15rem]">
          <div className="flex flex-wrap items-center gap-8 max-lg:justify-between lg:flex-col lg:items-start">
            <Subheading className="text-gray-500">
              {dayjs(post.publishDate).format('dddd, MMMM D, YYYY')}
            </Subheading>
            {post.author && (
              <div className="flex items-center gap-3">
                {post.author.profilePic && (
                  <img
                    alt={cleanString(`Picture of ${post.author.name}`)}
                    src={image(post.author.profilePic).width(64).height(64).url()}
                    className="aspect-square size-6 rounded-full object-cover"
                  />
                )}
                <div className="text-sm/5 text-gray-700">
                  {post.author.name}
                </div>
              </div>
            )}
            <CategoryChip categories={post.categories} />
          </div>
          <div className="text-gray-700">
            <div className="max-w-3xl xl:mx-auto">
              {post.featuredImage && (
                <img
                  alt={cleanString(post.featuredImage.altText || '')}
                  src={image(post.featuredImage).size(2016, 1344).url()}
                  className="mb-10 aspect-[3/2] w-full rounded-2xl object-cover shadow-xl"
                />
              )}
              {post.body && (
                <StylePortableText
                  value={post.body as PortableTextBlock[]}
                  className="blog-post-content"
                />
              )}
              <div className="mt-10">
                <Button variant="outline" href="/blog">
                  <ChevronLeftIcon className="size-4" />
                  Back to blog
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
