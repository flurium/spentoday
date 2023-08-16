import { call, callJson } from "$lib/fetch"
import type { Fetch, FetchSide } from "$lib/fetch"

export type Order = {
  id: string
  productId: string
  productSlug: string
  email: string
  amount: string
  price: string
}

export async function shopOrders(
  fetch: Fetch,
  side: FetchSide,
  info: {
    shop: string
    customerEmail: string
    productName: string
  }
): Promise<Order[] | null> {
  const response = await call(fetch, side, {
    route: `/v1/site/orders/${info.shop}?email=${info.customerEmail}&product=${info.productName}`,
    method: "GET"
  })
  if (!response) return null

  return await callJson<Order[]>(response)
}
