export type Guide = {
  slug: string
  title: string
  description: string
  keywords: string[]
}

export const guides: Guide[] = [
  {
    slug: 'gifts-under-25',
    title: 'Best Gifts Under $25',
    description:
      'Thoughtful and affordable gift ideas that won\'t break the bank. Perfect for Secret Santa, stocking stuffers, and everyday surprises.',
    keywords: ['gifts under 25', 'cheap gifts', 'affordable gifts', 'budget gifts', 'stocking stuffers'],
  },
  {
    slug: 'gifts-for-him',
    title: 'Unique Gifts for Him',
    description:
      'Handpicked gift ideas for the men in your life — whether it\'s your husband, boyfriend, dad, or brother.',
    keywords: ['gifts for him', 'gifts for boyfriend', 'gifts for husband', 'gifts for dad', 'mens gifts'],
  },
  {
    slug: 'gifts-for-new-homeowners',
    title: 'Gifts for New Homeowners',
    description:
      'Practical and thoughtful housewarming gift ideas for anyone settling into a new home.',
    keywords: ['housewarming gifts', 'gifts for new homeowners', 'new house gifts', 'first home gifts'],
  },
  {
    slug: 'gifts-for-tech-lovers',
    title: 'Gifts for Tech Lovers',
    description:
      'The latest gadgets and smart devices that any tech enthusiast would love to unwrap.',
    keywords: ['tech gifts', 'gadget gifts', 'gifts for tech lovers', 'electronic gifts', 'smart home gifts'],
  },
]
