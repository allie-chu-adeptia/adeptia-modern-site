import { image } from '@/sanity/lib/image'
import { getPostsForFeed } from '@/sanity/queries/blog'
import { Feed } from 'feed'
import assert from 'node:assert'
import { cache } from 'react'

import { ExpandedPost } from '@/sanity/types/local.types'

// Cache the posts fetching
const getCachedPosts = cache(async () => {
  return await getPostsForFeed()
})

export async function GET(req: Request) {
  const siteUrl = new URL(req.url).origin

  const feed = new Feed({
    title: 'The Adeptia Blog',
    description:
      'Stay informed with product updates, company news, and insights on how to sell smarter at your company.',
    author: {
      name: 'Adeptia',
      email: 'marketing@adeptia.com',
    },
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
    },
  })

  // Use cached posts
  const posts = await getCachedPosts()

  posts.forEach((post: ExpandedPost) => {
    try {
      assert(typeof post.title === 'string')
      assert(typeof post.slug === 'string')
      assert(typeof post.excerpt === 'string')
      assert(typeof post.publishDate === 'string')
    } catch {
      console.log('Post is missing required fields for RSS feed:', post)
      return
    }

    feed.addItem({
      title: post.title,
      id: post.slug,
      link: `${siteUrl}/blog/${post.slug}`,
      content: post.excerpt,
      image: post.featuredImage
        ? image(post.featuredImage)
            .size(1200, 800)
            .format('jpg')
            .url()
            .replaceAll('&', '&amp;')
        : undefined,
      author: post.author?.name ? [{ name: post.author.name }] : [],
      contributor: post.author?.name ? [{ name: post.author.name }] : [],
      date: new Date(post.publishDate),
    })
  })

  return new Response(feed.rss2(), {
    status: 200,
    headers: {
      'content-type': 'application/xml',
      'cache-control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
