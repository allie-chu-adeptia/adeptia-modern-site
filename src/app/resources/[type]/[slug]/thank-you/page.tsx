'use client'

import { FileDownload } from '@/lib/displayDownload';
import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from "react";
// import React, { useState } from 'react';
// import { useSearchParams } from "next/navigation";

// function ThankYouHandshake() {
//   const searchParams = useSearchParams();
//   const [authorized, setAuthorized] = useState(false);

//   useEffect(() => {
//     const storedToken = sessionStorage.getItem("downloadToken");
//     const urlToken = searchParams.get("token");

//     if (storedToken && urlToken === storedToken) {
//       setAuthorized(true);
//       sessionStorage.removeItem("downloadToken"); // Remove token after use
//     }
//   }, [searchParams]);

//   return authorized;
// }

// Server component that receives the dynamic route params
export default function ThankYouPage() {
    const [slug, setSlug] = useState<string>('');

    useEffect(() => {
        const storedSlug = sessionStorage.getItem("slug");
        setSlug(storedSlug || '');
    }, []);

    // const router = useRouter();
    // const isAuthorized = ThankYouHandshake();
    // const [slug, setSlug] = useState<string | null>(null);

    // useEffect(() => {
    //     // Move sessionStorage access into useEffect
    //     const storedSlug = sessionStorage.getItem("slug");
    //     setSlug(storedSlug);

    //     if (!isAuthorized) {
    //         router.push('/');
    //     }
    // }, [isAuthorized, router]);

    // // Don't render until we have both authorization and slug
    // if (!isAuthorized || !slug) {
    //     return null;
    // }

    return (
        <div className="flex justify-center flex-col items-center">
            <FileDownload slug={slug} message="Thank you for your download!" />
        </div>
    );
}