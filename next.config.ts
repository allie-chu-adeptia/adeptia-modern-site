import type { NextConfig } from "next";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "5ujtwa6a",
  dataset: "production",
  useCdn: false,
  apiVersion: "2025-02-26"
});

const nextConfig: NextConfig = {
  async redirects() {
    const redirects = await client.fetch(
      `*[_type == "redirect"]{
        "source":source, 
        "destination":destination, 
        permanent
      }`,
    );
    return redirects;
  },
  async headers() {
    return [
      // Content Security Policy
      // {
      //   source: "/(.*)", // Apply to all routes
      //   headers: [
      //     {
      //       key: "Content-Security-Policy",
      //       value:
      //         "default-src 'self'; " +
      //         "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://va.vercel-scripts.com/; " +
      //         "connect-src 'self' 'unsafe-inline' https://5ujtwa6a.api.sanity.io/;" +
      //         "style-src 'self' 'unsafe-inline'; " +
      //         "font-src 'self' data:; " +
      //         "img-src 'self' data: https://5ujtwa6a.api.sanity.io/ https://cdn.sanity.io/images/5ujtwa6a/production/;"
      //     },
      //   ],
      // },
      // X-Content-Type-Options 
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
      // X-Frame-Options
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      // Referrer Policy
      {
        source: "/(.*)",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
