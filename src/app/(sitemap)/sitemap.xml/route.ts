import { getServerSideSitemap } from 'next-sitemap'

export async function GET() {
  const baseUrl = 'https://www.adeptia.com'
  const currentDate = new Date().toISOString()

  // Define your sitemap index
  return getServerSideSitemap([
    {
      loc: `${baseUrl}/sitemap-static.xml`,
      lastmod: currentDate,
    },
    {
      loc: `${baseUrl}/sitemap-pages.xml`,
      lastmod: currentDate,
    },
    {
      loc: `${baseUrl}/sitemap-blog.xml`,
      lastmod: currentDate,
    },
    {
      loc: `${baseUrl}/sitemap-news.xml`,
      lastmod: currentDate,
    },
    {
      loc: `${baseUrl}/sitemap-resources.xml`,
      lastmod: currentDate,
    },
    {
      loc: `${baseUrl}/sitemap-connectors.xml`,
      lastmod: currentDate,
    },
    {
      loc: `${baseUrl}/sitemap-customers.xml`,
      lastmod: currentDate,
    },
    {
      loc: `${baseUrl}/sitemap-team.xml`,
      lastmod: currentDate,
    },
  ])
}