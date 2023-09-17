import { call, callJson } from "$lib/fetch"
import type { Fetch, FetchSide } from "$lib/fetch"

export type Order = {
  id: string
  total: number
  amount: number
  status: string
  date: string
}

export async function queryOrders(
  fetch: Fetch,
  side: FetchSide,
  query: { shopId: string; start: number }
) {
  const response = await call(fetch, side, {
    route: `/v1/site/order/${query.shopId}/orders?start=${query.start}`,
    method: "GET"
  })
  if (response == null) return null
  return await callJson<Order[]>(response)
}
