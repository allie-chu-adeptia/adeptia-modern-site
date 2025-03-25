import { sanityFetch } from './client'
import { client } from './client'
import { projectId, dataset } from './env'

// Simple test query
const TEST_QUERY = `*[_type == "page" && metadata.slug.current == "home"][0] {
  _id,
  title
}`

export async function testRevalidation() {
  console.log('Testing revalidation settings...')
  console.log('Environment:', process.env.NODE_ENV)
  console.log('CDN Usage:', client.config().useCdn ? 'Enabled' : 'Disabled')
  
  // Test both CDN and API endpoints
  const cdnUrl = `https://${projectId}.apicdn.sanity.io/v2025-02-26/data/query/${dataset}?query=${encodeURIComponent(TEST_QUERY)}`
  const apiUrl = `https://${projectId}.api.sanity.io/v2025-02-26/data/query/${dataset}?query=${encodeURIComponent(TEST_QUERY)}`
  
  const headers = {
    'Authorization': `Bearer ${client.config().token}`,
  }

  // Test with different cache settings
  const tests = [
    {
      name: 'Default CDN',
      url: cdnUrl,
      headers: { ...headers },
    },
    {
      name: 'CDN with Cache-Control',
      url: cdnUrl,
      headers: { 
        ...headers,
        'Cache-Control': 'public, max-age=86400'
      },
    },
    {
      name: 'CDN with Sanity Cache Tag',
      url: cdnUrl,
      headers: {
        ...headers,
        'Sanity-Cache-Time': '86400'
      },
    },
    {
      name: 'Direct API',
      url: apiUrl,
      headers: { ...headers },
    }
  ]

  const results = []
  
  for (const test of tests) {
    // First request
    const startTime = Date.now()
    const response = await fetch(test.url, {
      headers: test.headers,
      next: { revalidate: 86400 }
    })
    const responseHeaders = Object.fromEntries(response.headers.entries())
    const data = await response.json()
    
    // Second request (to test caching)
    const cacheTime = Date.now()
    const response2 = await fetch(test.url, {
      headers: test.headers,
      next: { revalidate: 86400 }
    })
    const responseHeaders2 = Object.fromEntries(response2.headers.entries())
    const data2 = await response2.json()
    
    results.push({
      name: test.name,
      firstRequest: {
        time: Date.now() - startTime,
        headers: responseHeaders,
        data: data.result
      },
      secondRequest: {
        time: Date.now() - cacheTime,
        headers: responseHeaders2,
        data: data2.result
      },
      improvement: ((Date.now() - startTime) - (Date.now() - cacheTime)) / (Date.now() - startTime) * 100
    })
  }
  
  return {
    environment: process.env.NODE_ENV,
    cdnEnabled: client.config().useCdn,
    tests: results
  }
} 