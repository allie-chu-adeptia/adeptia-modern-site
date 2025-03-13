'use client'

import { useState, useEffect } from 'react'
import { ClientLink } from './clientLink'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[]
  }
}

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  const loadGTM = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'gtm.start': new Date().getTime(), event:'gtm.js'});
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=GTM-TGBWNG`;
    document.head.appendChild(script);
  }

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    loadGTM(); // Immediately load GTM when user accepts
    setShowBanner(false)
  }

  const acceptEssential = () => {
    // Disable GTM and other tracking
    localStorage.setItem('cookie-consent', 'essential-only')
    setShowBanner(false)
  }

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    } else if (consent === 'accepted') {
      loadGTM(); // Load GTM if user has previously accepted
    }
  }, [])

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[var(--brand-background-medium)] p-4 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm">
          We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
          <ClientLink href="/privacy-policy" className="underline ml-1">Learn more</ClientLink>
        </div>
        <div className="flex gap-4">
          <button
            onClick={acceptEssential}
            className="px-4 py-2 text-sm border border-gray-300 bg-white rounded-md hover:bg-gray-50"
          >
            Essential Only
          </button>
          <button
            onClick={acceptAll}
            className="px-4 py-2 text-sm bg-[var(--primary-blue)] text-white rounded-md hover:bg-blue-700"
          >
            Accept All
          </button>
        </div>
        
      </div>
    </div>
  )
}