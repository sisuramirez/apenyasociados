import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NOTE: 'output: export' is commented out because it's incompatible with Sanity Studio.
  // The studio uses a catch-all route [[...index]] which requires server-side rendering.
  // For production static export, uncomment this and use the hosted Sanity Studio instead.
  // output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  compiler: {
    // Required for Sanity Studio UI components
    styledComponents: true,
  },
};

export default nextConfig;
