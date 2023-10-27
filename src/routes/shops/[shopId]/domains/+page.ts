import type { PageLoad } from "./$types"
import { call, callJson } from "$lib/fetch"
import type { ShopDomain } from "$lib/api"
import { errors } from "$lib"

export const load = (async ({ fetch, params }) => {
  const shopId = params.shopId

  const response = await call(fetch, "load", {
    route: `/v1/site/domains/${shopId}`,
    method: "GET"
  })
  if (response == null) throw errors.serverError()

  const data = await callJson<ShopDomain[]>(response)
  if (data == null) throw errors.jsonError()

  return {
    shopId: shopId,
    domains: data
  }
}) satisfies PageLoad
