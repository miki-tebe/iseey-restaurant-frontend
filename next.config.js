/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

function getBasePath() {
  // if (isProd) {
  //   return "/restaurant";
  // }
  return "/restaurant";
}

const nextConfig = {
  basePath: getBasePath(),
  output: "standalone",
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  server: {
    port: 9003,
    host: "0.0.0.0",
  },
  publicRuntimeConfig: {
    basePath: getBasePath(),
    apiBaseUrl: isProd ? "https://iseey.app" : "http://localhost:5002",
  },
  redirects: async () => {
    return [
      {
        source: "/login",
        destination: "/restaurant",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iseey.eu-central-1.linodeobjects.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  compress: true,
};

module.exports = nextConfig;
