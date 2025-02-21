import { Button } from '@/components/button'
import { Link } from '@/components/link'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/16/solid'
import { clsx } from 'clsx'

// Renders pagination controls with page numbers and prev/next buttons
export async function Pagination({
    currPage,
    category,
    type,
    itemsPerPage,
    getItemsCount,
    pathName
}: {
    currPage: number
    category?: string
    type?: string
    itemsPerPage: number,
    getItemsCount: (category?: string, type?: string) => Promise<number>
    pathName: string
}) {
  function url(page: number) {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (type) params.set('type', type)
    if (page > 1) params.set('page', page.toString())
    return `/${pathName}${params.toString() ? `?${params.toString()}` : ''}`
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
    <div className="mt-16 flex items-center justify-between gap-2">
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
