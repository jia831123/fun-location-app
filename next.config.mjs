import nextPWA, * as NextPWA from 'next-pwa'
const nextConfig = {
  reactStrictMode: false,
}
const withPWA = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

export default withPWA(nextConfig)
