import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Link } from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import { image } from '@/sanity/image'
import {
  getCategories,
  getFeaturedResources,
  getResources,
  getResourcesCount,
} from '@/sanity/queries/resources'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/16/solid'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Category } from '@/sanity/types/sanity.types'
import { ExpandedPost } from '@/sanity/types/local.types'

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Stay informed with product updates, company news, and insights on how to sell smarter at your company.',
}

const resourcesPerPage = 20

// Cleans and trims the excerpt to 200 characters
function excerptToHTML(excerpt: string) {
  if (!excerpt) {
    return ''
  }
  // Remove any HTML tags from the excerpt
  const plainText = typeof excerpt === 'string' ? excerpt.replace(/(<([^>]+)>)/gi, '') : ''
  // Trim to 200 chars and add ellipsis
  return plainText.substring(0, 200) + '...'
}

function getTypeSlug(type: string) {
  const slugs: { [key: string]: string } = {
    'Datasheet': 'datasheets',
    'White Paper': 'white-papers',
    'Video': 'videos',
    'eBook': 'ebooks',
    'Infographic': 'infographics',
  }
  return slugs[type]
}

// Renders featured resource posts section with the 3 most recent featured posts
async function FeaturedResources() {
  const featuredResources = await getFeaturedResources(3)

  if (featuredResources.length === 0) {
    return
  }

  return (
    <div className="mt-16 bg-gradient-to-t from-gray-100 pb-14">
      <Container>
        <h2 className="text-2xl font-medium tracking-tight">Featured</h2>
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {featuredResources.map((resource: ExpandedPost) => (
            <div
              key={resource._id}
              className="relative flex flex-col rounded-3xl bg-white p-2 shadow-md shadow-black/5 ring-1 ring-black/5"
            >
              {resource.featuredImage && (
                <img
                  alt={resource.featuredImage.altText || ''}
                  src={image(resource.featuredImage).size(1170, 780).url()}
                  className="aspect-[3/2] w-full rounded-2xl object-cover"
                />
              )}
              <div className="flex flex-1 flex-col p-8">
                <div className="text-sm/5 text-gray-700">
                  {dayjs(resource.publishDate).format('dddd, MMMM D, YYYY')}
                </div>
                <div className="mt-2 text-base/7 font-medium">
                  <Link href={`/resources/${getTypeSlug(resource.type as string)}/${resource.slug}`}>
                    <span className="absolute inset-0" />
                    {resource.title}
                  </Link>
                </div>
                <p className="mt-3 text-sm/6 text-gray-500">
                  {excerptToHTML(resource.excerpt as string)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

// Renders category dropdown menu with all available blog categories
async function CategoriesFilter({ selected, type }: { selected?: string; type?: string }) {
  const categories = await getCategories()

  function getCategoryUrl(category?: string) {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (type) params.set('type', type)
    return `/resources${params.toString() ? `?${params.toString()}` : ''}`
  }

  if (categories.length === 0) {
    return
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <Menu>
        <MenuButton className="flex items-center justify-between gap-2 font-medium">
          {categories.find(({ slug }: { slug: string }) => slug === selected)?.name ||
            'All categories'}
          <ChevronUpDownIcon className="size-4 fill-slate-900" />
        </MenuButton>
        <MenuItems
          anchor="bottom start"
          className="min-w-40 rounded-lg bg-white p-1 shadow-lg ring-1 ring-gray-200 [--anchor-gap:6px] [--anchor-offset:-4px] [--anchor-padding:10px]"
        >
          <MenuItem key="all-categories">
            <Link
              href={getCategoryUrl()}
              data-selected={selected === undefined ? true : undefined}
              className="group grid grid-cols-[1rem,1fr] items-center gap-2 rounded-md px-2 py-1 data-[focus]:bg-gray-950/5"
            >
              <CheckIcon className="hidden size-4 group-data-[selected]:block" />
              <p className="col-start-2 text-sm/6">All categories</p>
            </Link>
          </MenuItem>
          {categories.map((category: Category) => (
            <MenuItem key={category._id}>
              <Link
                href={(() => {
                  return getCategoryUrl(category.slug?.toString());
                })()}
                data-selected={category.slug === selected ? true : undefined}
                className="group grid grid-cols-[16px,1fr] items-center gap-2 rounded-md px-2 py-1 data-[focus]:bg-gray-950/5"
              >
                <CheckIcon className="hidden size-4 group-data-[selected]:block" />
                <p className="col-start-2 text-sm/6">{category.name}</p>
              </Link>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  )
}

// Renders type dropdown menu with all available blog types
async function TypesFilter({ selected, category }: { selected?: string; category?: string }) {
  const types = ['Datasheet', 'White Paper', 'Video', 'eBook', 'Infographic']

  function getTypeUrl(type?: string) {
    const params = new URLSearchParams()
    if (type) params.set('type', type)
    if (category) params.set('category', category)
    return `/resources${params.toString() ? `?${params.toString()}` : ''}`
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <Menu>
        <MenuButton className="flex items-center justify-between gap-2 font-medium">
          {types.find((type: string) => type === selected) || 'All types'}
          <ChevronUpDownIcon className="size-4 fill-slate-900" />
        </MenuButton>
        <MenuItems
          anchor="bottom start"
          className="min-w-40 rounded-lg bg-white p-1 shadow-lg ring-1 ring-gray-200 [--anchor-gap:6px] [--anchor-offset:-4px] [--anchor-padding:10px]"
        >
          <MenuItem key="all-types">
            <Link
              href={getTypeUrl()}
              data-selected={selected === undefined ? true : undefined}
              className="group grid grid-cols-[1rem,1fr] items-center gap-2 rounded-md px-2 py-1 data-[focus]:bg-gray-950/5"
            >
              <CheckIcon className="hidden size-4 group-data-[selected]:block" />
              <p className="col-start-2 text-sm/6">All Types</p>
            </Link>
          </MenuItem>
          {types.map((type: string) => (
            <MenuItem key={type}>
              <Link
                href={getTypeUrl(type)}
                data-selected={type === selected ? true : undefined}
                className="group grid grid-cols-[16px,1fr] items-center gap-2 rounded-md px-2 py-1 data-[focus]:bg-gray-950/5"
              >
                <CheckIcon className="hidden size-4 group-data-[selected]:block" />
                <p className="col-start-2 text-sm/6">{type}</p>
              </Link>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  )
}

// Renders paginated list of resource posts, filtered by category if specified
async function Resources({ page, category, type }: { page: number; category?: string; type?: string }) {
  const resources = await getResources(
    (page - 1) * resourcesPerPage,
    page * resourcesPerPage,
    category,
    type,
  )

  if (resources.length === 0) {
    return <p className="mt-6 text-gray-500">No resources found.</p>
  }

  return (
    <div className="mt-6">
      {resources.map((resource: ExpandedPost) => (
        <div
          key={resource._id}
          className="relative grid grid-cols-1 border-b border-b-gray-100 py-10 first:border-t first:border-t-gray-200 max-sm:gap-3 sm:grid-cols-3"
        >
          <div>
            <div className="text-sm/5 max-sm:text-gray-700 sm:font-medium">
              {dayjs(resource.publishDate).format('dddd, MMMM D, YYYY')}
            </div>
          </div>
          <div className="sm:col-span-2 sm:max-w-2xl">
            <div className="text-xs font-bold text-blue-600 tracking-wider uppercase">{resource.type}</div>
            <h2 className="text-md/6 font-medium">{resource.title}</h2>
            <p className="mt-3 text-sm/6 text-gray-500">
              {excerptToHTML(resource.excerpt as string)}
            </p>
            <div className="mt-4">
              <Link
                href={`/resources/${getTypeSlug(resource.type as string)}/${resource.slug}`}
                className="flex items-center gap-1 text-sm/5 font-medium"
              >
                <span className="absolute inset-0" />
                Read more
                <ChevronRightIcon className="size-4 fill-gray-400" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Renders pagination controls with page numbers and prev/next buttons
async function Pagination({
  page,
  category,
  type,
}: {
  page: number
  category?: string
  type?: string
}) {
  function url(page: number) {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (type) params.set('type', type)
    if (page > 1) params.set('page', page.toString())
    return `/resources${params.toString() ? `?${params.toString()}` : ''}`
  }

  const totalResources = await getResourcesCount(category, type)
  const hasPreviousPage = page - 1
  const previousPageUrl = hasPreviousPage ? url(page - 1) : undefined
  const hasNextPage = page * resourcesPerPage < totalResources
  const nextPageUrl = hasNextPage ? url(page + 1) : undefined
  const pageCount = Math.ceil(totalResources / resourcesPerPage)

  if (pageCount < 2) {
    return
  }

  function getVisiblePages() {
    const pages = []
    
    // Always show first page
    pages.push(1)

    if (page <= 3) {
      // Show 1 2 3 ... lastPage
      for (let i = 2; i <= Math.min(4, pageCount - 1); i++) {
        pages.push(i)
      }
      if (pageCount > 4) pages.push(-1) // Ellipsis
    } else if (page >= pageCount - 2) {
      // Show 1 ... thirdLast secondLast lastPage
      pages.push(-1) // Ellipsis
      for (let i = pageCount - 3; i < pageCount; i++) {
        pages.push(i)
      }
    } else {
      // Show 1 ... page-1 page page+1 ... lastPage
      pages.push(-1) // First ellipsis
      pages.push(page - 1)
      pages.push(page)
      pages.push(page + 1)
      pages.push(-1) // Second ellipsis
    }

    // Always show last page
    pages.push(pageCount)

    return pages
  }

  return (
    <div className="mt-6 flex items-center justify-between gap-2">
      <Button
        variant="outline"
        href={previousPageUrl}
        disabled={!previousPageUrl}
      >
        <ChevronLeftIcon className="size-4" />
        Previous
      </Button>
      <div className="flex gap-2 max-sm:hidden">
        {getVisiblePages().map((pageNum, i) => 
          pageNum === -1 ? (
            <span key={`ellipsis-${i}`} className="text-sm/7">...</span>
          ) : (
            <Link
              key={pageNum}
              href={url(pageNum)}
              data-active={pageNum === page ? true : undefined}
              className={clsx(
                'size-7 rounded-lg text-center text-sm/7 font-medium',
                'data-[hover]:bg-gray-100',
                'data-[active]:shadow data-[active]:ring-1 data-[active]:ring-black/10',
                'data-[active]:data-[hover]:bg-gray-50',
              )}
            >
              {pageNum}
            </Link>
          )
        )}
      </div>
      <Button variant="outline" href={nextPageUrl} disabled={!nextPageUrl}>
        Next
        <ChevronRightIcon className="size-4" />
      </Button>
    </div>
  )
}

// Main resource page component that combines all the above components
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
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
        <Subheading className="mt-16">Resources</Subheading>
        <Heading as="h1" className="mt-2">
          What&apos;s happening at Adeptia.
        </Heading>
        <Lead className="mt-6 max-w-3xl">
          Stay informed with product updates, company news, and insights on how
          to sell smarter at your company.
        </Lead>
      </Container>
      {/* {page === 1 && !category && <FeaturedResources />} */}
      <Container className="mt-16 pb-24">
        <div className="flex gap-4">
          <CategoriesFilter selected={category} type={type} />
          <TypesFilter selected={type} category={category} />
        </div>
        <Resources page={page} category={category} type={type} />
        <Pagination page={page} category={category} type={type} />
      </Container>
      <Footer />
    </main>
  )
}
