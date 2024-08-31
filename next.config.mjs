/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["bcrypt"],
    instrumentationHook: true,
    serverActions: {
      allowedOrigins: ["localhost", "localhost:4000", "localhost:3000"],
      allowedForwardedHosts: ["localhost", "localhost:3000"],
    },
  },
  webpack: (config) => {
    config.externals = [...config.externals, "bcrypt"];
    return config;
  },
};

export default nextConfig;
