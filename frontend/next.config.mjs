/** @type {import('next').NextConfig} */
const nextConfig = {
  // async headers() {
  //   return [
  //     {
  //       source: "/_next/static/:path*",
  //       headers: [
  //         {
  //           key: "Cache-Control",
  //           value: "public, max-age=31536000, immutable",
  //         },
  //       ],
  //     },
  //     {
  //       source: "/catalog/products/:path*",
  //       headers: [
  //         {
  //           key: "Cache-Control",
  //           value: "public, max-age=86400, stale-while-revalidate=31536000",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
