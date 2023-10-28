import type { CategoryOutput } from "$features/dashboard/categories"

export type Property = {
  id: string
  key: string
  value: string
}

export type OneProductOutput = {
  product: ProductOutput
  categories: CategoryOutput[]
  maxLevel: number
  categoryId?: string
  properties: Property[]
}

export type ImageOutput = {
  id: string
  key: string
  bucket: string
  provider: string
}

type ProductOutput = {
  id: string
  name: string
  price: number
  discountPrice: number
  isDiscount: boolean
  amount: number
  isDraft: boolean
  seoTitle: string
  seoDescription: string
  seoSlug: string
  description: string
  images: ImageOutput[]
}
