import { Inter } from 'next/font/google'
import './globals.css'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })
import type { Metadata, Viewport } from 'next'

const APP_NAME = 'PWA App'
const APP_DEFAULT_TITLE = 'My Awesome PWA App'
const APP_TITLE_TEMPLATE = '%s - PWA App'
const APP_DESCRIPTION = 'Best PWA app in the world!'

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-tw">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/png" href="/images/favicon.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=0, viewport-fit=cover"
        />
        <meta
          name="theme-color"
          content="#18181b"
          media="(prefers-color-scheme: dark)"
        />
        <meta name="theme-color" content="#f4f4f5" />
        <link rel="apple-touch-icon" href="/images/icon-maskable-512.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
