import { testRevalidation } from '@/sanity/lib/test-revalidation'

export const dynamic = 'force-dynamic' // Ensure the page isn't cached by Next.js

export default async function TestRevalidationPage() {
  const results = await testRevalidation()
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Revalidation Test Results</h1>
      
      <div className="space-y-4">
        <div className="bg-blue-100 p-4 rounded">
          <h2 className="font-semibold">Environment Configuration</h2>
          <p>Environment: {results.environment}</p>
          <p>CDN Enabled: {results.cdnEnabled ? 'Yes' : 'No'}</p>
        </div>
        
        {results.tests.map((test, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-bold mb-4">{test.name}</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">First Request</h3>
                <p>Time: {test.firstRequest.time}ms</p>
                <div className="mt-2">
                  <h4 className="font-semibold">Headers:</h4>
                  <pre className="mt-1 bg-white p-2 rounded text-sm">
                    {JSON.stringify(test.firstRequest.headers, null, 2)}
                  </pre>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold">Second Request</h3>
                <p>Time: {test.secondRequest.time}ms</p>
                <div className="mt-2">
                  <h4 className="font-semibold">Headers:</h4>
                  <pre className="mt-1 bg-white p-2 rounded text-sm">
                    {JSON.stringify(test.secondRequest.headers, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
            
            <div className="mt-4 bg-green-50 p-3 rounded">
              <h3 className="font-semibold">Cache Analysis</h3>
              <p>Speed improvement: {test.improvement.toFixed(2)}%</p>
              <p className="mt-2">
                <strong>Cache-Control (1st):</strong> {test.firstRequest.headers['cache-control'] || 'Not set'}
              </p>
              <p>
                <strong>Cache-Control (2nd):</strong> {test.secondRequest.headers['cache-control'] || 'Not set'}
              </p>
              <p className="mt-2">
                <strong>x-cache (1st):</strong> {test.firstRequest.headers['x-cache'] || 'Not set'}
              </p>
              <p>
                <strong>x-cache (2nd):</strong> {test.secondRequest.headers['x-cache'] || 'Not set'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 