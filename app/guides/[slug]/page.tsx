import { notFound } from "next/navigation"
import { guides } from "../../../data/guides"
import styles from "../../../styles/Guides.module.css"
import type { Metadata } from "next"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = guides.find((g) => g.slug === slug)
  if (!guide) return {}

  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: `/guides/${guide.slug}`,
    },
    openGraph: {
      title: `${guide.title} | Realm of Gifts`,
      description: guide.description,
      url: `/guides/${guide.slug}`,
    },
  }
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params
  const guide = guides.find((g) => g.slug === slug)

  if (!guide) {
    notFound()
  }

  return (
    <div className={styles.detailPage}>
      <a href="/guides" className={styles.backLink}>
        &larr; All guides
      </a>
      <h1 className={styles.detailTitle}>{guide.title}</h1>
      <div className={styles.comingSoon}>
        <p>
          We're putting together a curated selection of products for this guide.
          Check back soon — or{" "}
          <a href="/random-product-generator" style={{ color: "var(--color-accent)" }}>
            spin the wheel
          </a>{" "}
          in the meantime!
        </p>
      </div>
    </div>
  )
}
