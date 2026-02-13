import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import '../styles/globals.css'
import styles from '../styles/Layout.module.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const siteDescription =
  'Discover the perfect gift with Realm of Gifts — spin our random gift generator, browse curated gift guides, and find something they\'ll love.'

export const metadata: Metadata = {
  title: {
    default: 'Realm of Gifts | The Gift Destination for Everyone',
    template: '%s | Realm of Gifts',
  },
  description: siteDescription,
  metadataBase: new URL('https://realmofgifts.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/images/logo_only.png',
    apple: '/images/logo_only.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Realm of Gifts',
    title: 'Realm of Gifts | The Gift Destination for Everyone',
    description: siteDescription,
    url: '/',
    images: [{ url: '/images/logo-dark.png', alt: 'Realm of Gifts Logo' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Realm of Gifts | The Gift Destination for Everyone',
    description: siteDescription,
    images: ['/images/logo-dark.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://realmofgifts.com/#organization',
      name: 'Realm of Gifts',
      url: 'https://realmofgifts.com',
      logo: 'https://realmofgifts.com/images/logo.png',
      description: siteDescription,
    },
    {
      '@type': 'WebSite',
      '@id': 'https://realmofgifts.com/#website',
      url: 'https://realmofgifts.com',
      name: 'Realm of Gifts',
      publisher: { '@id': 'https://realmofgifts.com/#organization' },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Navbar */}
        <nav className={styles.navbar}>
          <div className={styles.navLeft}>
            <a href="/" className={styles.logoLink}>
              <img
                src="/images/logo.png"
                fetchPriority="high"
                alt="Realm of Gifts Logo"
                className={styles.logoImg}
              />
            </a>
          </div>
          <div className={styles.navRight}>
            <a href="/random-product-generator" className={styles.navLink}>
              Gift Generator
            </a>
            <a href="/guides" className={styles.navLink}>
              Gift Guides
            </a>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className={styles.main}>
          {children}
        </main>

        {/* Footer */}
        <footer className={styles.footer}>
          <p className={styles.footerText}>
            Disclaimer: These are Amazon affiliate links. As an Amazon Associate, we may earn from qualifying purchases.
          </p>
        </footer>

        <Analytics />
      </body>
    </html>
  )
}
