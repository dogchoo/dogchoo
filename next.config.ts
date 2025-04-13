import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: "imgix",
    path: "https://dogchoo-rainchoo.web.app/",
  },
};

export default nextConfig;
