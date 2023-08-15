/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "ng.jumia.is",
    ],
  },
};

module.exports = nextConfig;
