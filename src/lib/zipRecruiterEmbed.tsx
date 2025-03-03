'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function ZipRecruiterEmbed() {
    useEffect(() => {
        // Create initial div and loading state
        if (typeof document !== 'undefined') {
            const jobsWidget = document.getElementById('jobs-widget');
            if (jobsWidget) {
                jobsWidget.innerHTML =
                    '<div style="border:1px solid #e3e3e3; padding: 30px; border-radius:10px; text-align: center; margin-bottom: 7px;">' +
                    '<img style="margin-left:auto; margin-right: auto;" src="https://www.ziprecruiter.com/assets/static/img/ajax-loader-sm.gif" />' +
                    '<br />Loading jobs...</div>';
            }
        }
    }, []);

    return (
        <div className="mt-16 pb-24">
            <div id="jobs-widget" style={{ width: '100%', height: '100%' }}></div>
            <Script
                src="https://www.ziprecruiter.com/jobs-widget/v1/f3fe935e/all?show_posted_days=0"
                strategy="afterInteractive"
            />
        </div>
    )
}