import { client } from './client'
import { projectId, dataset } from './env'
import { token } from './token'

// Simple test query
const TEST_QUERY = `*[_type == "page" && metadata.slug.current == "home"][0] {
  _id,
  title
}`

// Simple in-memory cache for testing
const cache = new Map<string, { data: any; timestamp: number }>()

async function fetchWithCache(url: string, options: RequestInit & { cacheTime?: number }) {
  const cacheKey = url + JSON.stringify(options.headers)
  const cacheTime = options.cacheTime || 0
  const now = Date.now()
  
  // Check cache
  const cached = cache.get(cacheKey)
  if (cached && now - cached.timestamp < cacheTime) {
    console.log('Cache hit:', url)
    return {
      ok: true,
      status: 200,
      headers: new Headers({
        'x-cache': 'HIT',
        'x-cache-age': String(Math.floor((now - cached.timestamp) / 1000)),
        'cache-control': `max-age=${Math.floor(cacheTime / 1000)}`
      }),
      json: async () => ({ result: cached.data })
    } as Response
  }
  
  // Fetch fresh data
  const response = await fetch(url, options)
  const data = await response.json()
  
  // Update cache if successful
  if (response.ok && cacheTime > 0) {
    cache.set(cacheKey, {
      data: data.result,
      timestamp: now
    })
  }
  
  return response
}

type TestConfig = {
  name: string;
  url: string;
  headers: Record<string, string>;
  cacheConfig: {
    next?: { revalidate: number };
    cache?: RequestCache;
    cacheTime?: number;
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
      name: 'App Cache (24h)',
      url: cdnUrl,
      headers: { ...headers },
      cacheConfig: { cacheTime: 86400000 } // 24 hours in ms
    },
    {
      name: 'App Cache (1h)',
      url: cdnUrl,
      headers: { ...headers },
      cacheConfig: { cacheTime: 3600000 } // 1 hour in ms
    },
    {
      name: 'CDN Only',
      url: cdnUrl,
      headers: { ...headers },
      cacheConfig: { cache: 'force-cache' }
    },
    {
      name: 'No Cache',
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
      const response = await (test.cacheConfig.cacheTime 
        ? fetchWithCache(test.url, { 
            headers: test.headers,
            cacheTime: test.cacheConfig.cacheTime 
          })
        : fetch(test.url, {
            headers: test.headers,
            ...test.cacheConfig
          }))
      const responseHeaders = Object.fromEntries(response.headers.entries())
      const data = await response.json()
      
      // Add a delay between requests to better simulate real-world conditions
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Second request (to test caching)
      const cacheTime = Date.now()
      const response2 = await (test.cacheConfig.cacheTime
        ? fetchWithCache(test.url, {
            headers: test.headers,
            cacheTime: test.cacheConfig.cacheTime
          })
        : fetch(test.url, {
            headers: test.headers,
            ...test.cacheConfig
          }))
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