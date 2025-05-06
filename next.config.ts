import type { NextConfig } from "next";
import { createClient } from "@sanity/client";
const { NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, NEXT_PUBLIC_SANITY_API_VERSION } = process.env

const client = createClient({
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: NEXT_PUBLIC_SANITY_API_VERSION
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
