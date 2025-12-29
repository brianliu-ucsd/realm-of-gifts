import { Analytics } from '@vercel/analytics/next'
import styles from '../styles/Layout.module.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ margin: 0, padding: 0 }}>
      <head>
        <link rel="icon" href="/images/logo_only.png" />
        <title>Realm of Gifts | Random Gift Generator</title>
        <meta name="description" content="Not sure what to buy for your loved one or friend? Looking for a random product to buy? This Random Gift Generator will generate a random Amazon product to help inspire your purchase!"></meta>
      </head>
      {/* Body does not support CSS components */}
      <body style={{
        margin: 0,
        padding: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Navbar */}
        <nav className={styles.navbar}>
          {/* Logo and Site Name */}
          <div className={styles.navbarLogo}>
            <img
              src="/images/logo.png"
              fetchPriority="high"
              alt="Realm of Gifts Logo"
            />
          </div>

          {/* About Us Link */}
          <a
            href="#about"
            className={styles.navbarLink}
          >
            About Us
          </a>
        </nav>

        {/* Main Content Area */}
        <main className={styles.main}>
          {children}
        </main>

        {/* Footer */}
        <footer className={styles.footer}>
          ⚠️ Disclaimer: These are Amazon affiliate links. As an Amazon Associate, we may earn from qualifying purchases.
        </footer>

        <Analytics />
      </body>
    </html>
  )
}
