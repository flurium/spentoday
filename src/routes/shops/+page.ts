import type { PageLoad } from "./$types"
import { call, callJson } from "$lib/fetch"
import { jsonError, serverError } from "$lib/errors"

export type DashboardShop = {
  id: string
  name: string
  topBanner: string
  slug?: string
}

export const load: PageLoad = async ({ fetch }) => {
  const response = await call(fetch, "load", {
    route: "/v1/site/dashboard/shops",
    method: "GET"
  })
  if (!response || !response.ok) throw serverError()

  const data = await callJson<{
    shops: DashboardShop[]
    accountImage: string | null
  }>(response)
  if (data == null) throw jsonError()

  return { shops: data.shops, account: { img: data.accountImage } }
}
