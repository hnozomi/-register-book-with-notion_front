const withPWA = require('next-pwa')({
  dest: "public",
  register: true,
  skipWaiting: true,
})

const nextConfig = withPWA({
  reactStrinctMode: true
});

module.exports = nextConfig