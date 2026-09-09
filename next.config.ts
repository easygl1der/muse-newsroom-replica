import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "about.fb.com",
      },
    ],
  },
};

export default nextConfig;
