/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   experimental: { 
//     images: {
//       allowFutureImage: true,
//     } 
//   },
// }

module.exports = {
  async rewrites() {
    return [
      {
        source: "/discover/investors",
        destination: "/discover/investors/1"
      },
      {
        source: "/discover/blockchains",
        destination: "/discover/blockchains/1"
      },
      {
        source: "/discover/wallets",
        destination: "/discover/wallets/1"
      },
      {
        source: "/discover/defi-projects",
        destination: "/discover/defi-projects/1"
      },
      {
        source: "/discover/communities",
        destination: "/discover/communities/1"
      },
      {
        source: "/discover/nft-collections",
        destination: "/discover/nft-collections/1"
      },
      {
        source: "/discover/gamefi-projects",
        destination: "/discover/gamefi-projects/1"
      },
      {
        source: "/discover/metaverse-projects",
        destination: "/discover/metaverse-projects/1"
      },
      {
        source: "/discover/portfolio-management-tools",
        destination: "/discover/portfolio-management-tools/1"
      },
      {
        source: "/discover/daos",
        destination: "/discover/daos/1"
      },
      {
        source: "/discover/nftfi-projects",
        destination: "/discover/nftfi-projects/1"
      },
      {
        source: "/discover/infrastructure-projects",
        destination: "/discover/infrastructure-projects/1"
      },
      {
        source: "/services/security",
        destination: "/services/security/1"
      },
      {
        source: "/services/analytics",
        destination: "/services/analytics/1"
      },
      {
        source: "/services/software-development",
        destination: "/services/software-development/1"
      },
      {
        source: "/services/custody",
        destination: "/services/custody/1"
      },
      {
        source: "/services/marketing",
        destination: "/services/marketing/1"
      },
      {
        source: "/dev-guides",
        destination: "/dev-guides/page/1"
      },
      {
        source: "/reading",
        destination: "/reading/page/1"
      },
      {
        source: "/build-web3",
        destination: "/build-web3/1"
      }
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['imagedelivery.net', 'res.cloudinary.com', '127.0.0.1'],
  },
  i18n
}