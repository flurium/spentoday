import type { PageLoad } from "./$types"
import { call, callJson } from "$lib/fetch"
import { errors } from "$lib"
import type { CategoryOutput } from "$features/dashboard/products/types"

export const load = (async ({ fetch, params }) => {
  const shopId = params.shopId

  const response = await call(fetch, "load", {
    route: `/v1/site/categories/${shopId}`,
    method: "GET"
  })
  if (!response || !response.ok) throw errors.serverError()

  const data = await callJson<CategoryOutput[]>(response)
  if (!data) throw errors.jsonError()

  return {
    categories: data,
    shopId: shopId
  }
}) satisfies PageLoad
