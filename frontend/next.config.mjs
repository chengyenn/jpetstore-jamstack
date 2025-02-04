/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/jpetstore-jamstack", // 設定 Base Path，確保靜態資源路徑正確

  images: {
    loader: "custom",
    path: "https://140.119.163.226/cdn/", // 讓 Next.js 透過 Local CDN 加載圖片
    unoptimized: true, // 禁用自動圖片最佳化，因為我們使用 custom loader
  },

  output: "standalone", // 讓 Next.js 可獨立運行（適用於 VM 部署）

  trailingSlash: true, // 確保所有靜態頁面 URL 以 `/` 結尾，避免路徑問題
};

export default nextConfig;
