import { call, callJson } from "$lib/fetch"
import type { Fetch, FetchSide } from "$lib/fetch"

//
// GET ONE PRODUCT TO EDIT

export type OneProductOutput = {
  product: ProductOutput
  categories: CategoryOutput[]
  categoryId?: string
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
  amount: number
  isDraft: boolean
  seoTitle: string
  seoDescription: string
  seoSlug: string
  description: string
  images: ImageOutput[]
}

type CategoryOutput = {
  id: string
  name: string
}

export async function oneProduct(fetch: Fetch, side: FetchSide, productId: string) {
  const response = await call(fetch, side, {
    route: `/v1/site/products/${productId}`,
    method: "GET"
  })
  if (!response) return null

  const json = await callJson<OneProductOutput>(response)
  return json
}

//

export type Product = {
  id: string
  name: string
  price: number
  isDraft: boolean
}

export async function shopProducts(
  fetch: Fetch,
  side: FetchSide,
  query: {
    shopId: string
    start: number
    count: number
  }
) {
  const response = await call(fetch, side, {
    route: `/v1/site/products/shop/${query.shopId}?start=${query.start}&count=${query.count}`,
    method: "GET"
  })
  if (!response || !response.ok) return null

  const json = await callJson<Product[]>(response)
  return json
}

//
// UPDATE PRODUCT

export type UpdateProductInput = {
  id: string
  name?: string
  price?: number
  amount?: number
  description?: string
  isDraft?: boolean
  seoTitle?: string
  seoDescription?: string
  seoSlug?: string
}

export async function updateProduct(fetch: Fetch, side: FetchSide, input: UpdateProductInput) {
  const response = await call(fetch, side, {
    route: `/v1/site/products`,
    method: "PATCH",
    body: input
  })
  return response != null && response.ok
}

//
// PUBLISH PRODUCT

export async function publishProduct(
  fetch: Fetch,
  side: FetchSide,
  productId: string
): Promise<"ok" | "fail" | "not-found"> {
  const response = await call(fetch, side, {
    route: `/v1/site/products/${productId}/publish`,
    method: "POST"
  })
  if (!response) return "fail"
  if (response.ok) return "ok"
  if (response.status == 404) return "not-found"
  return "fail"
}

//
// UPLOAD PRODUCT IMAGE
export async function uploadProductImage(
  fetch: Fetch,
  side: FetchSide,
  input: {
    productId: string
    file: File
  }
): Promise<
  | {
      data: ImageOutput
      status?: undefined
    }
  | {
      status: "not-image" | "not-found" | "count-limit-reached" | "problem"
    }
> {
  const formData = new FormData()
  formData.append("file", input.file)

  const response = await call(fetch, side, {
    route: `/v1/site/products/${input.productId}/image`,
    method: "POST",
    body: formData
  })
  if (!response) return { status: "problem" }
  if (response.ok) {
    const json = await callJson<ImageOutput>(response)
    if (!json) return { status: "problem" }
    return { data: json }
  }
  if (response.status == 409) return { status: "count-limit-reached" }
  if (response.status == 400) return { status: "not-image" }
  if (response.status == 404) return { status: "not-found" }
  return { status: "problem" }
}

//
// DELETE PRODUCT IMAGE

export async function deleteProductImage(fetch: Fetch, side: FetchSide, imageId: string) {
  const response = await call(fetch, side, {
    route: `/v1/site/products/image/${imageId}`,
    method: "DELETE"
  })
  return response != null && response.ok
}

//
// CHANGE PRODUCT CATEGORY

export async function changeProductCategory(
  fetch: Fetch,
  side: FetchSide,
  input: {
    categoryId: string | null
    productId: string
  }
) {
  const response = await call(fetch, side, {
    route: "/v1/site/products/categories",
    method: "PATCH",
    body: {
      productId: input.productId,
      categoryId: input.categoryId
    }
  })
  if (!response) return false
  return response.ok
}
