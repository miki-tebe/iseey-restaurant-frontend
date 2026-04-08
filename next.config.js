/** @type {import('next').NextConfig} */
// const isProd = process.env.NODE_ENV === "production";

// function getBasePath() {
//   if (isProd) {
//     return "/restaurant";
//   }
//   return "";
// }

// const nextConfig = {
//   basePath: getBasePath(),
//   output: "standalone",
//   experimental: {
//     workerThreads: false,
//     cpus: 1,
//   },
//   server: {
//     port: 9003,
//     host: "0.0.0.0",
//   },
//   publicRuntimeConfig: {
//     basePath: getBasePath(),
//     apiBaseUrl: isProd ? "https://iseey.app" : "http://localhost:5002",
//   },
//   redirects: async () => {
//     return [
//       {
//         source: "/login",
//         destination: "/restaurant",
//         permanent: true,
//       },
//     ];
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "iseey.eu-central-1.linodeobjects.com",
//         port: "",
//         pathname: "/**",
//       },
//     ],
//   },
// eslint: {
//   ignoreDuringBuilds: true,
// },
//   compress: true,
// };

// module.exports = nextConfig;

const nextConfig = {
  // Recommended: this will reduce output
  // Docker image size by 80%+
  output: "standalone",
  // Optional: bring your own cache handler
  // cacheHandler: path.resolve('./cache-handler.mjs'),
  // cacheMaxMemorySize: 0, // Disable default in-memory caching
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iseey.eu-central-1.linodeobjects.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "iseey.app",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
  // Nginx will do gzip compression. We disable
  // compression here so we can prevent buffering
  // streaming responses
  compress: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Optional: override the default (1 year) `stale-while-revalidate`
  // header time for static pages
  // swrDelta: 3600 // seconds
};

module.exports = nextConfig;
