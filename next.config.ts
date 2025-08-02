import type { NextConfig } from "next";


const staticExport = false
const isStrict = false;

const nextConfig: NextConfig = {
  ...staticExport ? { output: "export", } : {},
  images: {
    unoptimized: staticExport, //defaults to false, set to trur if using Next.js Image component with static export
    remotePatterns: [
      new URL('https://picsum.photos/**'),
      new URL('https://api.github.com/**'),
      new URL('https://randomuser.me/**'),
      new URL('https://dummyjson.com/**')
    ]
  },
  eslint: {
    ignoreDuringBuilds: !isStrict
  },
  typescript: {
    ignoreBuildErrors: !isStrict,
  },

};
export default nextConfig