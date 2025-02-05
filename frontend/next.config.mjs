/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   loader: "custom",
  //   path: "https://140.119.163.226/cdn/", // 讓 Next.js 透過 Local CDN 加載圖片
  //   unoptimized: true, // 禁用自動圖片最佳化，因為我們使用 custom loader
  // },
  // output: "standalone", // 讓 Next.js 可獨立運行（適用於 VM 部署）
  // basePath: "/jpetstore-jamstack", // 確保 basePath 是正確的
  // trailingSlash: false, // 禁止自動補全 `/`
};

export default nextConfig;
