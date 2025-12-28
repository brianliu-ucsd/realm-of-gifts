import { Analytics } from '@vercel/analytics/next'

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
      <body style={{
        margin: 0,
        padding: 0
      }}>
        <style>{`
          .navbar-link:hover {
            color: #333333 !important;
          }
        `}</style>
        {/* Navbar */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 2rem',
          backgroundColor: '#f8f4e8', // Light beige background
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)', // Subtle drop shadow
          borderBottom: '1px solid #e5dfd3'
        }}>
          {/* Logo and Site Name */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <img
              src="/images/logo.png"
              fetchPriority="high"
              alt="Realm of Gifts Logo"
              style={{
                height: '50px',
                width: 'auto'
              }}
            />
          </div>

          {/* About Us Link */}
          <a
            href="#about"
            style={{
              color: '#000000', // Black color
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              padding: '0.5rem 0',
              transition: 'color 0.3s ease'
            }}
            className="navbar-link"
          >
            About Us
          </a>
        </nav>

        {children}
      </body>
    </html>
  )
}
