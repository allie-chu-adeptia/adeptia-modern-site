import { Button } from '@/components/button'
import { Link } from '@/components/link'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/16/solid'
import { clsx } from 'clsx'
import { AggregatorType, ExpandedPost } from '@/sanity/types/local.types'
import { Category } from '@/sanity/types/sanity.types'
import dayjs from 'dayjs'

interface AggregatorProps {
    getItems: (startIndex: number, endIndex: number, category?: string, type?: string) => Promise<ExpandedPost[]>
    getItemsCount: (category?: string, type?: string) => Promise<number>
    getCategories?: (selected?: string, category?: string) => Promise<any[]>
    getFeaturedItems?: (quantity: number) => Promise<any>
    itemsPerPage: number
    currPage: number
    filterCategory?: string
    filterType?: string
    aggregatorType: AggregatorType
}

export async function Aggregator({ 
    getItems,
    getItemsCount, 
    getCategories, 
    getFeaturedItems, 
    itemsPerPage,
    currPage, 
    filterCategory, 
    filterType,
    aggregatorType 
}: AggregatorProps) {
    return (
        <div className="mt-16 pb-24">
            <div className="flex gap-4 pb-4">
                {getCategories && (
                    <CategoriesFilter 
                        selected={filterCategory} 
                        type={filterType || ''}
                        getCategories={getCategories}
                        basePath={aggregatorType}
                    />
                )}
                {aggregatorType === 'resources' && (
                    <TypesFilter 
                        selected={filterType} 
                        category={filterCategory}
                        basePath={aggregatorType}
                    />
                )}
            </div>
            {getItems(
                (currPage - 1) * itemsPerPage,
                currPage * itemsPerPage,
                filterCategory,
                filterType
            ).then(items => {
                return RenderResources({ items })
            })}
            {getFeaturedItems && currPage === 1 && !filterCategory && !filterType && (
                getFeaturedItems(3).then(items => {
                    return RenderResources({ items })
                })
            )}
            <Pagination 
                currPage={currPage} 
                category={filterCategory} 
                type={filterType} 
                itemsPerPage={itemsPerPage}
                getItemsCount={getItemsCount}
                basePath={aggregatorType}
            />
        </div>
    )
}

// Cleans and trims the excerpt to 200 characters
export function excerptToHTML(excerpt: string) {
  if (!excerpt) {
    return ''
  }
  // Remove any HTML tags from the excerpt
  const plainText = typeof excerpt === 'string' ? excerpt.replace(/(<([^>]+)>)/gi, '') : ''
  // Trim to 200 chars and add ellipsis
  return plainText.substring(0, 200) + '...'
}

// Renders category dropdown menu with all available blog categories
export async function CategoriesFilter({ 
    selected, 
    type, 
    getCategories, 
    basePath 
}: { 
    selected?: string; 
    type?: string; 
    getCategories: () => Promise<any>; 
    basePath: AggregatorType 
}) {
  const categories = await getCategories()

  function getCategoryUrl(category?: string) {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (type) params.set('type', type)
    return `/${basePath}${params.toString() ? `?${params.toString()}` : ''}`
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
          key="categories-menu"
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
export async function TypesFilter({ 
    selected, 
    category, 
    basePath 
}: { 
    selected?: string; 
    category?: string; 
    basePath: AggregatorType 
}) {
  const types = ['Datasheet', 'White Paper', 'Video', 'eBook', 'Infographic']

  function getTypeUrl(type?: string) {
    const params = new URLSearchParams()
    if (type) params.set('type', type)
    if (category) params.set('category', category)
    return `/${basePath}${params.toString() ? `?${params.toString()}` : ''}`
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

// Renders pagination controls with page numbers and prev/next buttons
export async function Pagination({
    currPage,
    category,
    type,
    itemsPerPage,
    getItemsCount,
    basePath
}: {
    currPage: number
    category?: string
    type?: string
    itemsPerPage: number,
    getItemsCount: (category?: string, type?: string) => Promise<any>
    basePath: AggregatorType
}) {
  function url(page: number) {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (type) params.set('type', type)
    if (page > 1) params.set('page', page.toString())
    return `/${basePath}${params.toString() ? `?${params.toString()}` : ''}`
  }

  const totalResources = await getItemsCount(category, type)
  const hasPreviousPage = currPage - 1
  const previousPageUrl = hasPreviousPage ? url(currPage - 1) : undefined
  const hasNextPage = currPage * itemsPerPage < totalResources
  const nextPageUrl = hasNextPage ? url(currPage + 1) : undefined
  const pageCount = Math.ceil(totalResources / itemsPerPage)

  if (pageCount < 2) {
    return
  }

  function getVisiblePages() {
    const pages = []
    
    // Always show first page
    pages.push(1)

    if (currPage <= 3) {
      // Show 1 2 3 ... lastPage
      for (let i = 2; i <= Math.min(4, pageCount - 1); i++) {
        pages.push(i)
      }
      if (pageCount > 4) pages.push(-1) // Ellipsis
    } else if (currPage >= pageCount - 2) {
      // Show 1 ... thirdLast secondLast lastPage
      pages.push(-1) // Ellipsis
      for (let i = pageCount - 3; i < pageCount; i++) {
        pages.push(i)
      }
    } else {
      // Show 1 ... page-1 page page+1 ... lastPage
      pages.push(-1) // First ellipsis
      pages.push(currPage - 1)
      pages.push(currPage)
      pages.push(currPage + 1)
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
        disabled={currPage === 1}
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
              data-active={pageNum === currPage ? true : undefined}
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

      <Button variant="outline" href={nextPageUrl} disabled={currPage === pageCount}>
        Next
        <ChevronRightIcon className="size-4" />
      </Button>
    </div>
  )
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

// Renders paginated list of resource posts, filtered by category if specified
export async function RenderResources({ 
  items
}: { 
  items: ExpandedPost[]
}) {
  return (
    <div>
      {items.map((item, index) => (
        <div
          key={index}
          className="relative grid grid-cols-1 border-b border-b-gray-100 py-10 first:border-t first:border-t-gray-200 max-sm:gap-3 sm:grid-cols-3"
      >
        <div>
          <div className="text-sm/5 max-sm:text-gray-700 sm:font-medium">
            {dayjs(item.publishDate).format('dddd, MMMM D, YYYY')}
          </div>
        </div>
        <div className="sm:col-span-2 sm:max-w-2xl">
          <div className="text-xs font-bold text-blue-600 tracking-wider uppercase">{item.type}</div>
          <h2 className="text-md/6 font-medium">{item.title}</h2>
          <p className="mt-3 text-sm/6 text-gray-500">
            {excerptToHTML(item.excerpt as string)}
          </p>
          <div className="mt-4">
            <Link
              href={`/resources/${getTypeSlug(item.type as string)}/${item.slug}`}
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

export async function RenderFeaturedResources({ 
  items
}: { 
  items: ExpandedPost[]
}) {
  return (
    <div>
      {items.map((item, index) => (
        <div
          key={index}
          className="relative grid grid-cols-1 border-b border-b-gray-100 py-10 first:border-t first:border-t-gray-200 max-sm:gap-3 sm:grid-cols-3"
        >
          <div>
            <div className="text-sm/5 max-sm:text-gray-700 sm:font-medium">
              {dayjs(item.publishDate).format('dddd, MMMM D, YYYY')}
            </div>
          </div>
          <div className="sm:col-span-2 sm:max-w-2xl">
            <div className="text-xs font-bold text-blue-600 tracking-wider uppercase">{item.type}</div>
            <h2 className="text-md/6 font-medium">{item.title}</h2>
            <p className="mt-3 text-sm/6 text-gray-500">
              {excerptToHTML(item.excerpt as string)}
            </p>
            <div className="mt-4">
              <Link
                href={`/resources/${getTypeSlug(item.type as string)}/${item.slug}`}
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