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
  getFeaturedPosts,
  getPosts,
  getPostsCount,
} from '@/sanity/queries/blog'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  RssIcon,
} from '@heroicons/react/16/solid'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Category } from '@/sanity/types/sanity.types'
import { ExpandedPost } from '@/sanity/types/local.types'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Stay informed with product updates, company news, and insights on how to sell smarter at your company.',
}

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

const postsPerPage = 20

// Renders featured blog posts section with the 3 most recent featured posts
async function FeaturedPosts() {
  const featuredPosts = await getFeaturedPosts(3)

  if (featuredPosts.length === 0) {
    return
  }

  return (
    <div className="mt-16 bg-gradient-to-t from-gray-100 pb-14">
      <Container>
        <h2 className="text-2xl font-medium tracking-tight">Featured</h2>
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {featuredPosts.map((post: ExpandedPost) => (
            <div
              key={post._id}
              className="relative flex flex-col rounded-3xl bg-white p-2 shadow-md shadow-black/5 ring-1 ring-black/5"
            >
              {post.featuredImage && (
                <img
                  alt={post.featuredImage.altText || ''}
                  src={image(post.featuredImage).size(1170, 780).url()}
                  className="aspect-[3/2] w-full rounded-2xl object-cover"
                />
              )}
              <div className="flex flex-1 flex-col p-8">
                <div className="text-sm/5 text-gray-700">
                  {dayjs(post.publishDate).format('dddd, MMMM D, YYYY')}
                </div>
                <div className="mt-2 text-base/7 font-medium">
                  <Link href={`/blog/${post.slug}`}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </div>
                <p className="mt-3 text-sm/6 text-gray-500">
                  {excerptToHTML(post.excerpt as string)}
                </p>
                {post.author && (
                  <div className="mt-6 flex items-center gap-3">
                    {post.author.profilePic && (
                      <img
                        alt={`Picture of ${post.author.name}`}
                        src={image(post.author.profilePic).width(64).height(64).url()}
                        className="aspect-square size-6 rounded-full object-cover"
                      />
                    )}
                    <div className="text-sm/5 text-gray-700">
                      {post.author.name}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

// Renders category dropdown menu with all available blog categories
async function Categories({ selected }: { selected?: string }) {
  const categories = await getCategories()

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
          <MenuItem>
            <Link
              href="/blog"
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
                href={`/blog?category=${category.slug}`}
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
      <Button variant="outline" href="/blog/feed.xml" className="gap-1">
        <RssIcon className="size-4" />
        RSS Feed
      </Button>
    </div>
  )
}

// Renders paginated list of blog posts, filtered by category if specified
async function Posts({ page, category }: { page: number; category?: string }) {
  const posts = await getPosts(
    (page - 1) * postsPerPage,
    page * postsPerPage,
    category,
  )

  // if (posts.length === 0 && (page > 1 || category)) {
  //   notFound()
  // }

  if (posts.length === 0) {
    return <p className="mt-6 text-gray-500">No posts found.</p>
  }

  return (
    <div className="mt-6">
      {posts.map((post: ExpandedPost) => (
        <div
          key={post._id}
          className="relative grid grid-cols-1 border-b border-b-gray-100 py-10 first:border-t first:border-t-gray-200 max-sm:gap-3 sm:grid-cols-3"
        >
          <div>
            <div className="text-sm/5 max-sm:text-gray-700 sm:font-medium">
              {dayjs(post.publishDate).format('dddd, MMMM D, YYYY')}
            </div>
            {post.author && (
              <div className="mt-2.5 flex items-center gap-3">
                {post.author.profilePic && (
                  <img
                    alt={`Picture of ${post.author.name}`}
                    src={image(post.author.profilePic).width(64).height(64).url()}
                    className="aspect-square size-6 rounded-full object-cover"
                  />
                )}
                <div className="text-sm/5 text-gray-700">
                  {post.author.name}
                </div>
              </div>
            )}
          </div>
          <div className="sm:col-span-2 sm:max-w-2xl">
            <h2 className="text-md/6 font-medium">{post.title}</h2>
            <p className="mt-3 text-sm/6 text-gray-500">
              {excerptToHTML(post.excerpt as string)}
            </p>
            <div className="mt-4">
              <Link
                href={`/blog/${post.slug}`}
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
}: {
  page: number
  category?: string
}) {
  function url(page: number) {
    const params = new URLSearchParams()

    if (category) params.set('category', category)
    if (page > 1) params.set('page', page.toString())

    return params.size !== 0 ? `/blog?${params.toString()}` : '/blog'
  }

  const totalPosts = await getPostsCount(category)
  const hasPreviousPage = page - 1
  const previousPageUrl = hasPreviousPage ? url(page - 1) : undefined
  const hasNextPage = page * postsPerPage < totalPosts
  const nextPageUrl = hasNextPage ? url(page + 1) : undefined
  const pageCount = Math.ceil(totalPosts / postsPerPage)

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

// Main blog page component that combines all the above components
export default async function Blog(
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

  return (
    <main className="overflow-hidden">
      <Container>
        <Subheading className="mt-16">Blog</Subheading>
        <Heading as="h1" className="mt-2">
          What&apos;s happening at Adeptia.
        </Heading>
        <Lead className="mt-6 max-w-3xl">
          Stay informed with product updates, company news, and insights on how
          to sell smarter at your company.
        </Lead>
      </Container>
      {page === 1 && !category && <FeaturedPosts />}
      <Container className="mt-16 pb-24">
        <Categories selected={category} />
        <Posts page={page} category={category} />
        <Pagination page={page} category={category} />
      </Container>
    </main>
  )
}
