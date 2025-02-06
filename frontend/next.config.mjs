/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/jpetstore-jamstack",
  assetPrefix: "/jpetstore-jamstack",
  output: "standalone",
  experimental: {
    outputFileTracingRoot: undefined,
  },
  images: {
    loader: "custom",
    path: "https://140.119.163.226/jpetstore-jamstack/_next/static",
    unoptimized: true,
  },
};

export default nextConfig;
