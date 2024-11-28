/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  server: {
    port: 9003,
    host: "0.0.0.0",
  },
  images: {
    // Optional: use a different optimization service
    // loader: 'custom',
    // loaderFile: './image-loader.ts',
    //
    // We're defaulting to optimizing images with
    // Sharp, which is built-into `next start`
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  basePath: "/restaurants",
  assetPrefix: "/restaurants",
  eslint: {
    ignoreDuringBuilds: true,
  },
  compress: false,
};

module.exports = nextConfig;
