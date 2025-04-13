import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    loader: "imgix",
    path: "https://dogchoo-rainchoo.web.app/",
  },
};

export default nextConfig;
