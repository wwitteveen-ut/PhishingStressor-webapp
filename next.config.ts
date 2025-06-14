import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  serverActions: {
    bodySizeLimit: "10mb",
  },
};

export default nextConfig;
