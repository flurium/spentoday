import { errors } from "$lib"
import { call, callJson } from "$lib/fetch"

import type { LayoutLoad } from "./$types"

export const load = (async ({ params, fetch }) => {
  const res = await call(fetch, "load", {
    route: "/v1/site/dashboard/layout",
    method: "GET"
  })
  if (res == null) throw errors.serverError()

  const data = await callJson<{ accountImage: null | string }>(res)
  if (data == null) throw errors.jsonError()

  return {
    shopId: params.shopId,
    accountImage: data.accountImage
  }
}) satisfies LayoutLoad
