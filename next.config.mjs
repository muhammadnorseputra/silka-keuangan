/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "silka.balangankab.go.id",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
