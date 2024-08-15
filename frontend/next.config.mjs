/** @type {import('next').NextConfig} */
const nextConfig = {
  // スラッシュの設定
  // trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
    ],
  },
};

export default nextConfig;
