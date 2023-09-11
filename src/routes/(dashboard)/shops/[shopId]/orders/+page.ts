import { errors } from "$lib"
import { call, callJson } from "$lib/fetch"
import type { PageLoad } from "./$types"

export type Order = {
id: string
total: number
amount: number
status: string
date: Date
}
export const load = (async ({ fetch, params }) => {
  const response = await call(fetch, "load", {
    route: `/v1/site/order/${params.shopId}/orders`,
    method: "GET"
  })

  if (!response) throw errors.serverError()

  const json = await callJson<Order[]>(response)

  if (!json) throw errors.jsonError()

  return {
    orders: json,
    shopId: params.shopId
  }
}) satisfies PageLoad
