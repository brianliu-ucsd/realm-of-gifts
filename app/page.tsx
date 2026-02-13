import { products } from "../data/products"
import ProductCard from "../components/ProductCard"
import TypewriterHeadline from "../components/TypewriterHeadline"
import styles from "../styles/Home.module.css"

export const dynamic = "force-dynamic"

export default function HomePage() {
  // Pick a random product on each request
  const randomIndex = Math.floor(Math.random() * products.length)
  const featuredProduct = products[randomIndex]

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <img
          src="/images/logo.png"
          alt="Realm of Gifts"
          className={styles.heroLogo}
        />
        <h1 className={styles.heroTagline}>
          The gift destination for <span>everyone</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Discover the perfect gift with our interactive tools — spin, browse, and find something they'll love.
        </p>
      </section>

      {/* Featured Gift + Gift Guides side by side */}
      <section className={styles.columns}>
        <div className={styles.featured}>
          <span className={styles.sectionLabel}>Featured Gift</span>
          <div className={styles.featuredCard}>
            <ProductCard product={featuredProduct} />
          </div>
          <a href="/random-product-generator" className={styles.ctaLink}>
            Spin for more gifts &rarr;
          </a>
        </div>

        <div className={styles.guidesTeaser}>
          <span className={styles.sectionLabel}>Gift Guides</span>
          <p className={styles.typewriterLine}>
            <TypewriterHeadline />
          </p>
          <p className={styles.guidesSubtext}>
            We have guides for everyone.
          </p>
          <a href="/guides" className={styles.guidesLink}>
            Browse all guides &rarr;
          </a>
        </div>
      </section>
    </div>
  )
}
