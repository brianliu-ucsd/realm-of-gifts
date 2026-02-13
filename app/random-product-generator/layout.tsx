import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Random Gift Generator',
  description:
    'Not sure what to buy for your loved one or friend? Spin the wheel and let our Random Gift Generator surprise you with a random Amazon product!',
  alternates: {
    canonical: '/random-product-generator',
  },
  openGraph: {
    title: 'Random Gift Generator | Realm of Gifts',
    description:
      'Not sure what to buy for your loved one or friend? Spin the wheel and let our Random Gift Generator surprise you with a random Amazon product!',
    url: '/random-product-generator',
  },
}

export default function GeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
