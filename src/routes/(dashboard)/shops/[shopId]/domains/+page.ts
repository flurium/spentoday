import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"
import { call, callJson } from "$lib/fetch"
import type { ShopDomain } from "$lib/api"

export const load = (async ({ fetch, params }) => {
  const shopId = params.shopId

  const response = await call(fetch, "load", {
    route: `/v1/site/domains/${shopId}`,
    method: "GET"
  })
  if (response == null) throw error(500, "Не можемо підгрузити ващі домени.")

  const data = await callJson<ShopDomain[]>(response)
  if (data == null) throw error(500, "Не можемо підгрузити ващі домени.")

  return {
    shopId: shopId,
    domains: data
  }
}) satisfies PageLoad
