import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Link } from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Heading, Subheading } from '@/components/text'
import { image } from '@/sanity/image'
import { getPost } from '@/sanity/queries/blog'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import dayjs from 'dayjs'
import type { Metadata } from 'next'
import { PortableTextBlock } from 'next-sanity'
import { notFound } from 'next/navigation'
import { ExpandedCategory, ExpandedPost } from '@/sanity/types/local.types'
import StylePortableText from '@/lib/stylePortableText'

type sParams = Promise<{ slug: string }>;

// Generated metadata for the blog post
export async function generateMetadata(props: { params: Promise<sParams> }): Promise<Metadata> {

  const { slug } = await props.params
  const post = await getPost(slug)

  return post ? { title: post.title, description: post.excerpt } : {}
}

// Styles and returns the blog post page
export default async function BlogPost(props: { params: Promise<sParams> }) {

  const { slug } = await props.params
  const post = (await getPost(slug) as ExpandedPost) || notFound()

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
        <Subheading className="mt-16">
          {dayjs(post.date).format('dddd, MMMM D, YYYY')}
        </Subheading>
        <Heading as="h1" className="mt-2">
          {post.title}
        </Heading>
        <div className="mt-16 grid grid-cols-1 gap-8 pb-24 lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_15rem]">
          <div className="flex flex-wrap items-center gap-8 max-lg:justify-between lg:flex-col lg:items-start">
            {post.author && (
              <div className="flex items-center gap-3">
                {post.author.avatarUrl && (
                  <img
                    alt=""
                    src={image(post.author.avatarUrl).width(64).height(64).url()}
                    className="aspect-square size-6 rounded-full object-cover"
                  />
                )}
                <div className="text-sm/5 text-gray-700">
                  {post.author.name}
                </div>
              </div>
            )}
            {Array.isArray(post.categories) && (
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category: ExpandedCategory) => (
                  <Link
                    key={category._id}
                    href={`/blog?category=${category.slug}`}
                    className="rounded-full border border-dotted border-gray-300 bg-gray-50 px-2 text-sm/6 font-medium text-gray-500"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="text-gray-700">
            <div className="max-w-2xl xl:mx-auto">
              {post.featuredMedia && (
                <img
                  alt={post.featuredMediaAlt || ''}
                  src={image(post.featuredMedia).size(2016, 1344).url()}
                  className="mb-10 aspect-[3/2] w-full rounded-2xl object-cover shadow-xl"
                />
              )}
              {post.content && (
                <StylePortableText 
                  value={post.content as PortableTextBlock[]} 
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
      <Footer />
    </main>
  )
}
