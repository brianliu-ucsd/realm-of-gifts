import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import '../styles/globals.css'
import styles from '../styles/Layout.module.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="canonical" href="https://realmofgifts.com/" />
        <link rel="icon" href="/images/logo_only.png" />
        <title>Realm of Gifts | Random Gift Generator</title>
        <meta name="description" content="Not sure what to buy for your loved one or friend? Looking for a random product to buy? This Random Gift Generator will generate a random Amazon product to help inspire your purchase!"></meta>
      </head>
      <body>
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
            <a href="#about" className={styles.navLink}>
              About Us
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
