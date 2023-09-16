import { errors } from "$lib"
import { call, callJson } from "$lib/fetch"
import type { PageLoad } from "./$types"

export type InfoPage = {
  slug: string
  title: string
  updatedAt: string
}

export const load = (async ({ fetch, params }) => {
  const response = await call(fetch, "load", {
    route: `/v1/site/dashboard/${params.shopId}/pages`,
    method: "GET"
  })

  if (!response) throw errors.serverError()

  const json = await callJson<InfoPage[]>(response)

  if (!json) throw errors.jsonError()

  return {
    pages: [], //json,
    shopId: params.shopId
  }
}) satisfies PageLoad
