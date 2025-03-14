import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Link } from '@/components/link'
import { Heading, Eyebrow } from '@/components/text'
import { image } from '@/sanity/lib/image'
import { getResource } from '@/sanity/queries/resources'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import dayjs from 'dayjs'
import type { Metadata } from 'next'
import { PortableTextBlock } from 'next-sanity'
import { notFound } from 'next/navigation'
import { ExpandedCategory, ExpandedPost } from '@/sanity/types/local.types'
import StylePortableText from '@/components/stylePortableText'
import HubSpotForm from '@/lib/hubspotContactForm'
import { NoGateFileDownload } from '@/lib/displayDownload'
import cleanString from '@/lib/cleanString'
import { getPath } from '@/lib/routing'

type sParams = Promise<{ slug: string }>;

// Generated metadata for the resource page
export async function generateMetadata(props: { params: Promise<sParams> }): Promise<Metadata> {

  const { slug } = await props.params
  const resource = await getResource(slug)
  const path = await getPath(resource?.metadata?.slug?.current || '')

  return resource ? { 
    title: "Adeptia | " + cleanString(resource.title || ''), 
    description: cleanString(resource.excerpt || ''),
    alternates: {
      canonical: 'https://www.adeptia.com/' + path.join('/')
    }
  } : {}
}

// Styles and returns the resource page
export default async function ResourcePage(props: { params: Promise<sParams> }) {

  const { slug } = await props.params
  const resource = (await getResource(slug) as ExpandedPost) || notFound()

  return (
    <main className="overflow-hidden">
      <Container>
        <Eyebrow className="mt-16">
          {dayjs(resource.publishDate).format('dddd, MMMM D, YYYY')}
        </Eyebrow>
        <Heading as="h1" className="mt-2">
          {resource.title}
        </Heading>
        <div className="mt-16 grid grid-cols-1 gap-8 pb-24 lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_15rem]">
          <div className="flex flex-wrap items-center gap-8 max-lg:justify-between lg:flex-col lg:items-start">
            {Array.isArray(resource.categories) && (
              <div className="flex flex-wrap gap-2">
                {resource.categories.map((category: ExpandedCategory, index: number) => (
                  <Link
                    key={index}
                    href={`/resources?category=${category.slug}`}
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
              {resource.video ? (
                <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                  <iframe 
                    src={`https://player.vimeo.com/video/${resource.video.vimeoId}`}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                    allowFullScreen
                    title={resource.title}
                  />
                </div>
              ) : (
                resource.featuredImage && (
                  <img
                    alt={resource.featuredImage.altText || ''}
                    src={image(resource.featuredImage).size(2016, 1344).url()}
                    className="mb-10 aspect-[3/2] w-full rounded-2xl object-cover shadow-xl"
                  />
                )
              )}
              {resource.body && (
                <StylePortableText
                  value={resource.body as PortableTextBlock[]}
                  className="resource-post-content"
                />
              )}
              {resource.fileURL && (
                resource.HSForm ? (
                  <HubSpotForm
                    portalId="456732"
                    formId={resource.HSForm.formID}
                    region="na1"
                    slug={slug}
                    thankYouMessage={resource.HSForm.thankYouMessage}
                  />
                ) : (
                  <NoGateFileDownload slug={slug} />
                )
              )}
              <div className="mt-10">
                <Button variant="outline" href="/resources">
                  <ChevronLeftIcon className="size-4" />
                  Back to all resources
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
