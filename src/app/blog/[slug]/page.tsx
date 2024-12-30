import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Link } from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Heading, Eyebrow } from '@/components/heading'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import dayjs from 'dayjs'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import DOMPurify from 'isomorphic-dompurify';


export async function getPostData(slug: string) {
  const client = new ApolloClient({
    uri: 'https://www.staging14.adeptia.com/graphql',
    cache: new InMemoryCache(),
  });

  const query = gql`
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
  `;

  try {
    const response = await client.query({
      query,
      variables: { slug },
    });

    return response.data.post;
  } catch (error) {
    console.error('Error fetching post data:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostData(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt.replace(/<[^>]*>/g, ''),
    openGraph: {
      images: [{ url: post.featuredImage?.node?.sourceUrl }],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = await params;
  const post = await getPostData(slug) || notFound()
  
  console.log('Post content:', post.tags.nodes);
  
  const cleanHTML = post.content
    .replace(/<div class="wp-block-[^"]*">/g, '')
    .replace(/<div class="content-container">/g, '')
    .replace(/<\/div>/g, '');
  const sanitizedHTML = DOMPurify.sanitize(cleanHTML);

  return (
    <main className="overflow-hidden">
      <Container>
        <Navbar />
        <Eyebrow className="mt-16">
          {dayjs(post.date).format('dddd, MMMM D, YYYY')}
        </Eyebrow>
        <Heading className="mt-2">
          {post.title}
        </Heading>
        <div className="mt-16 grid grid-cols-1 gap-8 pb-24 lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_15rem]">
          <div className="flex flex-wrap items-center gap-8 max-lg:justify-between lg:flex-col lg:items-start">
            {post.author?.node && (
              <div className="flex items-center gap-3">
                {post.author.node.avatar?.url && (
                  <Image
                    alt=""
                    src={post.author.node.avatar?.url}
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
          </div>
          <div className="text-gray-700">
            <div className="max-w-2xl xl:mx-auto">
              {post.featuredImage?.node?.sourceUrl && (
                <Image
                  alt={post.featuredImage?.node?.altText || ''}
                  src={post.featuredImage?.node?.sourceUrl}
                  width={post.featuredImage?.node?.mediaDetails?.width}
                  height={post.featuredImage?.node?.mediaDetails?.height}
                  className="mb-10 aspect-[3/2] w-full rounded-2xl object-cover shadow-xl"
                />
              )}
              {post.content && (
                <article className="prose lg:prose-xl" 
                  dangerouslySetInnerHTML={{ __html: sanitizedHTML }} 
                />
              )}
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
