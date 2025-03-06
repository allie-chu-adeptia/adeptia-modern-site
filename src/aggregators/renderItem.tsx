import { ExpandedAggregatorItem } from './aggregator'
import dayjs from 'dayjs'
import { CoverImageWText } from './displayTypes/cardDisplay'
import cleanString from '@/lib/cleanString'
import { Button } from '@/components/button'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import { image } from '@/sanity/lib/image'
import { Eyebrow, Heading } from '@/components/text'

// Cleans and trims the excerpt to 200 characters
export function excerptToHTML(excerpt: string) {

  excerpt = cleanString(excerpt)
  if (!excerpt) {
    return ''
  }
  // Remove any HTML tags from the excerpt
  const plainText = typeof excerpt === 'string' ? excerpt.replace(/(<([^>]+)>)/gi, '') : ''
  // Trim to 200 chars and add ellipsis
  return plainText.substring(0, 200) + '...'
}

export function getTypeSlug(type: string) {
  const slugs: { [key: string]: string } = {
    'Datasheet': 'datasheets',
    'White Paper': 'white-papers',
    'Video': 'videos',
    'eBook': 'ebooks',
    'Infographic': 'infographics',
  }
  return slugs[type]
}

// Renders paginated list of resource posts, filtered by category if specified
export async function RenderItem({
  items
}: {
  items: ExpandedAggregatorItem[]
}) {

  return (
    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-start justify-between"
        >
          {item._type === 'page' ? (
            <CoverImageWText
              title={item.title}
              slug={item.slug}
              pathName={item.pathName}
            />
          ) : item._type === 'resource' ? (
            item.type === 'Blog' || item.type === 'News' ? (
              <CoverImageWText
                date={dayjs(item.publishDate).format('dddd, MMMM D, YYYY')}
                categories={item.category}
                type={item.type}
                title={item.title}
                excerpt={excerptToHTML(item.excerpt as string)}
                author={item.author}
                coverImage={item.featuredImage}
                slug={item.slug}
                pathName={item.pathName}
                gradient={true}
              />
            ) : (
              <CoverImageWText
                date={dayjs(item.publishDate).format('dddd, MMMM D, YYYY')}
                categories={item.category}
                type={item.type}
                title={item.title}
                excerpt={excerptToHTML(item.excerpt as string)}
                author={item.author}
                coverImage={item.featuredImage}
                slug={item.slug}
                pathName={item.pathName}
                gradient={false}
              />
            )
          ) : item._type === 'customer' ? (
            <CoverImageWText
              title={item.title}
              slug={item.slug}
              pathName={item.pathName}
              coverImage={item.featuredImage}
              excerpt={excerptToHTML(item.description as string)}
              logo={item.logo}
              gradient={true}
            />
          ) : (null)}
        </div>
      ))}
    </div>
  )
}

export async function RenderFeaturedItem({
  items
}: {
  items: ExpandedAggregatorItem[]
}) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="relative flex flex-col rounded-3xl bg-white p-2 shadow-lg shadow-black/5 ring-1 ring-black/5"
        >
          {item._type === 'resource' && item.featuredImage && (
            <img
              alt={item.featuredImage.altText || ''}
              src={image(item.featuredImage).size(1170, 780).url()}
              className="aspect-[3/2] w-full rounded-2xl object-cover"
            />
          )}
          <div>
            <div className="flex flex-1 flex-col p-8">
              <Eyebrow>Featured</Eyebrow>
              <Heading as="h4" className="mt-1">{item.title}</Heading>
              <div className="mt-4">
                <Button
                  href={`/${item.pathName}/${item.slug}`}
                  variant={"tertiary"}
                  dark={false}
                >
                  Read more
                  <ChevronRightIcon className="size-4 transform translate-x-1 transition-all duration-200 ease-in-out group-hover:opacity-100 group-hover:translate-x-0"/>
                </Button>
                {/* <ClientLink
                  href={`/${item.pathName}/${item.slug}`}
                  className="flex items-center gap-1 text-sm/5 font-medium"
                >
                  <span className="absolute inset-0" />
                  Read more
                  <ChevronRightIcon className="size-4 transform translate-x-1 transition-all duration-200 ease-in-out group-hover:opacity-100 group-hover:translate-x-0"/>
                </ClientLink> */}
              </div>
            </div>
          </div>
        </div>
      ))
      }
    </div >
  )
}