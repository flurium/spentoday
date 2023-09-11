import type { PageLoad } from "./$types"
import { errors } from "$lib"
import { call, callJson } from "$lib/fetch"

export type OrderProductDetail = {
  price: number
  amount: number
  name: string
}

export type OrderDetail = {
  id: string
  status: string
  email: string
  adress: string
  fullName: string
  comment: string
  postIndex: string
  date: string
  details: OrderProductDetail[]
  phone: string
}

export const load = (async ({ fetch, params }) => {
  const response = await call(fetch, "load", {
    route: `/v1/site/order/${params.orderId}`,
    method: "GET"
  })
  if (!response) throw errors.serverError()

  const json = await callJson<OrderDetail>(response)
  if (!json) throw errors.jsonError()

  return {
    order: json,
    shopId: params.shopId
  }
}) satisfies PageLoad
