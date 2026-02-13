import { guides } from "../../data/guides"
import styles from "../../styles/Guides.module.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gift Guides",
  description:
    "Browse our curated gift guides for every occasion, budget, and recipient. Find the perfect gift with Realm of Gifts.",
  alternates: {
    canonical: "/guides",
  },
}

export default function GuidesIndex() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Gift Guides</h1>
      <p className={styles.subtitle}>
        Curated gift ideas for every occasion, budget, and recipient.
      </p>
      <div className={styles.grid}>
        {guides.map((guide) => (
          <a key={guide.slug} href={`/guides/${guide.slug}`} className={styles.card}>
            <h2 className={styles.cardTitle}>{guide.title}</h2>
            <p className={styles.cardDescription}>{guide.description}</p>
            <span className={styles.cardArrow}>View guide &rarr;</span>
          </a>
        ))}
      </div>
    </div>
  )
}
