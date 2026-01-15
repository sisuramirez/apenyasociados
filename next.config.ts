import type { NextConfig } from "next";
import path from "path";

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
  // Fix workspace root detection to use this project's directory
  outputFileTracingRoot: path.join(__dirname, "./"),
};

export default nextConfig;
