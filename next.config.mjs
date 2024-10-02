/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/login",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
