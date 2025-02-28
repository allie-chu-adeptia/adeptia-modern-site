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
};

export default nextConfig;
