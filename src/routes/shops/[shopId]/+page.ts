import type { PageLoad } from "./$types"
import { jsonError, serverError } from "$lib/errors"
import { call, callJson } from '$lib/fetch'

type Analytics = {
  totalOrders: number
  ordersLastMonth: number
  popularProducts: {
    id: string
    name: string
    price: number
    count: number
  }[]
  totalMoney: number
  lastMonthMoney: number
}

export const load: PageLoad = async ({ fetch, params }) => {
  const shopId = params.shopId

  const response = await call(fetch, "load", {
    route: `/v1/site/analytics/${shopId}`,
    method: "GET"
  })
  if (!response || !response.ok) throw serverError()

  const data = await callJson<Analytics>(response)
  if (data == null) throw jsonError()

  return {
    totalOrders: data.totalOrders,
    ordersLastMonth: data.ordersLastMonth,
    popularProducts: data.popularProducts,
    totalMoney: data.totalMoney,
    lastMonthMoney: data.lastMonthMoney
  }
}
