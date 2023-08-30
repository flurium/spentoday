import type { PageLoad } from "./$types"
import { call, callJson } from "$lib/fetch"
import { errors } from "$lib"

export type ShopCategory = {
  id: string
  name: string
  parentId: string | null
}

export const load = (async ({ fetch, params }) => {
  const shopId = params.shopId

  const response = await call(fetch, "load", {
    route: `/v1/site/categories/${shopId}`,
    method: "GET"
  })
  if (!response || !response.ok) throw errors.serverError()

  const data = await callJson<ShopCategory[]>(response)
  if (!data) throw errors.jsonError()

  return {
    categories: data,
    shopId: shopId
  }
}) satisfies PageLoad
