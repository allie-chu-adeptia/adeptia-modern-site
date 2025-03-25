import { client } from './client'
import { projectId, dataset } from './env'
import { token } from './token'

// Simple test query
const TEST_QUERY = `*[_type == "page" && metadata.slug.current == "home"][0] {
  _id,
  title
}`

type TestConfig = {
  name: string;
  url: string;
  headers: Record<string, string>;
  cacheConfig: {
    next?: { revalidate: number };
    cache?: RequestCache;
  };
}

export async function testRevalidation() {
  const isDev = process.env.NODE_ENV === 'development'
  console.log('Testing revalidation settings...')
  console.log('Environment:', process.env.NODE_ENV)
  console.log('CDN Usage:', client.config().useCdn ? 'Enabled' : 'Disabled')
  
  if (!token) {
    throw new Error('Sanity token is not configured. Please check your environment variables.')
  }
  
  if (isDev) {
    console.warn('⚠️ Running in development mode - cache testing will not be accurate!')
    console.warn('Please deploy to production/staging environment for accurate results.')
  }
  
  // Test both CDN and API endpoints with different caching strategies
  const cdnUrl = `https://${projectId}.apicdn.sanity.io/v2025-02-26/data/query/${dataset}?query=${encodeURIComponent(TEST_QUERY)}`
  const apiUrl = `https://${projectId}.api.sanity.io/v2025-02-26/data/query/${dataset}?query=${encodeURIComponent(TEST_QUERY)}`
  
  const headers = {
    'Authorization': `Bearer ${token}`,
  }

  // Test with different cache settings
  const tests: TestConfig[] = [
    {
      name: 'Next.js Cache (24h)',
      url: cdnUrl,
      headers: { ...headers },
      cacheConfig: { next: { revalidate: 86400 } }
    },
    {
      name: 'Next.js Cache (1h) + SWR',
      url: cdnUrl,
      headers: { ...headers },
      cacheConfig: { next: { revalidate: 3600 } }
    },
    {
      name: 'Sanity CDN Default',
      url: cdnUrl,
      headers: { ...headers },
      cacheConfig: { cache: 'force-cache' }
    },
    {
      name: 'Direct API (no cache)',
      url: apiUrl,
      headers: { ...headers },
      cacheConfig: { cache: 'no-store' }
    }
  ]

  const results = []
  
  for (const test of tests) {
    try {
      // First request
      const startTime = Date.now()
      const response = await fetch(test.url, {
        headers: test.headers,
        ...test.cacheConfig
      })
      const responseHeaders = Object.fromEntries(response.headers.entries())
      const data = await response.json()
      
      // Add a delay between requests to better simulate real-world conditions
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Second request (to test caching)
      const cacheTime = Date.now()
      const response2 = await fetch(test.url, {
        headers: test.headers,
        ...test.cacheConfig
      })
      const responseHeaders2 = Object.fromEntries(response2.headers.entries())
      const data2 = await response2.json()
      
      results.push({
        name: test.name,
        firstRequest: {
          time: Date.now() - startTime,
          headers: responseHeaders,
          data: data.result,
          status: response.status,
          ok: response.ok,
          error: !response.ok ? data : null
        },
        secondRequest: {
          time: Date.now() - cacheTime,
          headers: responseHeaders2,
          data: data2.result,
          status: response2.status,
          ok: response2.ok,
          error: !response2.ok ? data2 : null
        },
        improvement: ((Date.now() - startTime) - (Date.now() - cacheTime)) / (Date.now() - startTime) * 100
      })
    } catch (error) {
      results.push({
        name: test.name,
        error: error instanceof Error ? error.message : String(error),
        firstRequest: { error: error instanceof Error ? error.message : String(error) },
        secondRequest: { error: error instanceof Error ? error.message : String(error) }
      })
    }
  }
  
  return {
    environment: process.env.NODE_ENV,
    cdnEnabled: client.config().useCdn,
    tests: results,
    isDevelopment: isDev,
    hasToken: !!token
  }
} 