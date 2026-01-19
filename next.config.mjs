/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firayalalpublicschool.edu.in',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
