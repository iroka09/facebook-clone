import type { NextConfig } from "next";


const staticExport = false
const isStrict = false;

const nextConfig: NextConfig = {
  ...staticExport ? { output: "export", } : {},
  images: {
    unoptimized: staticExport, // Needed if using Next.js Image component 
    remotePatterns: [new URL('https://picsum.photos/**')]
  },
  eslint: {
    ignoreDuringBuilds: !isStrict
  },
  typescript: {
    ignoreBuildErrors: !isStrict,
  },

};
export default nextConfig