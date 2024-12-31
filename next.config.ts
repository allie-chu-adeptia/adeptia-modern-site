import { generateStaticParams } from "@/app/blog/[slug]/page";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['www.staging14.adeptia.com']
  }
};

export default nextConfig;
