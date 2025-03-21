/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
{
  protocol: "https",
  hostname: "assets.aceternity.com",
},
],
},
eslint: {
  ignoreDuringBuilds: true, // Prevents ESLint errors from breaking the build
},
};

module.exports = nextConfig;