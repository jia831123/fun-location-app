import withPWA from 'next-pwa'
const config = {
  dest: 'public',
  register: true,
  skipWaiting: true,
}
export default withPWA(config)
