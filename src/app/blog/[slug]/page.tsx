// Import required Next.js and React components
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'

// Import third-party libraries
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import DOMPurify from 'isomorphic-dompurify'
import dayjs from 'dayjs'

// Import custom components
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Link } from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Heading, Eyebrow } from '@/components/heading'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'

// GraphQL query to fetch blog post data
const POST_QUERY = gql`
  query GetPost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      title
      excerpt
      content
      date
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            height
            width
          }
        }
      }
      tags {
        nodes {
          name
          slug
        }
      }
    }
  }
`

// Initialize Apollo Client for GraphQL queries
const client = new ApolloClient({
  uri: 'https://www.staging14.adeptia.com/graphql',
  cache: new InMemoryCache(),
})

// Fetch post data using the slug as identifier
async function getPostData(slug: string) {
  try {
    const response = await client.query({
      query: POST_QUERY,
      variables: { slug },
    })

    return response.data.post
  } catch (error) {
    console.error('Error fetching post data:', error)
    return null
  }
}

// Generate metadata for the blog post page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostData(slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.excerpt.replace(/<[^>]*>/g, ''), // Strip HTML tags from excerpt
    openGraph: {
      images: [{ url: post.featuredImage?.node?.sourceUrl }],
    },
  }
}

// Clean WordPress content by removing unnecessary div wrappers
const cleanWordPressContent = (content: string): string => {
  return content
    .replace(/<div class="wp-block-[^"]*">/g, '')
    .replace(/<div class="content-container">/g, '')
    .replace(/<\/div>/g, '')
}

// Main blog post component
export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = await params
  const post = await getPostData(slug) || notFound()
  
  // Sanitize and clean WordPress content for safe rendering
  const sanitizedHTML = DOMPurify.sanitize(cleanWordPressContent(post.content))

  return (
    <main className="overflow-hidden">
      <Container>
        <Navbar />
        
        {/* Post header with date and title */}
        <Eyebrow className="mt-16">
          {dayjs(post.date).format('dddd, MMMM D, YYYY')}
        </Eyebrow>
        <Heading className="mt-2">
          {post.title}
        </Heading>

        {/* Three-column layout: sidebar, content, empty space */}
        <div className="mt-16 grid grid-cols-1 gap-8 pb-24 lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_15rem]">
          {/* Sidebar with author info and tags */}
          <aside className="flex flex-wrap items-center gap-8 max-lg:justify-between lg:flex-col lg:items-start">
            {/* Author information */}
            {post.author?.node && (
              <div className="flex items-center gap-3">
                {post.author.node.avatar?.url && (
                  <Image
                    alt={`Avatar of ${post.author.node.name}`}
                    src={post.author.node.avatar.url}
                    width={40}
                    height={40}
                    className="h-6 w-6 rounded object-cover"
                  />
                )}
                <div className="text-sm/5 text-gray-700">
                  {post.author.node.name}
                </div>
              </div>
            )}

            {/* Tags section */}
            {post.tags?.nodes?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.nodes.map((tag: { name: string; slug: string }) => (
                  <Link
                    key={tag.slug}
                    href={`/blog?tag=${tag.slug}`}
                    className="rounded-full border border-dotted border-gray-300 bg-gray-50 px-2 text-sm/6 font-medium text-gray-500"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            )}
          </aside>

          {/* Main content area */}
          <div className="text-gray-700">
            <div className="max-w-2xl xl:mx-auto">
              {/* Featured image */}
              {post.featuredImage?.node?.sourceUrl && (
                <Image
                  alt={post.featuredImage.node.altText || post.title}
                  src={post.featuredImage.node.sourceUrl}
                  width={post.featuredImage.node.mediaDetails?.width}
                  height={post.featuredImage.node.mediaDetails?.height}
                  className="mb-10 aspect-[3/2] w-full rounded-2xl object-cover shadow-xl"
                  priority={true}
                />
              )}

              {/* Post content */}
              {post.content && (
                <article 
                  className="prose prose-gray lg:prose-xl" 
                  dangerouslySetInnerHTML={{ __html: sanitizedHTML }} 
                />
              )}

              {/* Back to blog button */}
              <div className="mt-10">
                <Button outline href="/blog">
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
