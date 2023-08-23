import { errors } from "$lib"
import { call, callJson } from "$lib/fetch"
import type { PageLoad } from "./$types"

type PageResponse = {
  slug: string
  title: string
  updatedAt: string
}

type Page = {
  slug: string
  title: string
  updatedAt: Date
}

export const load = (async ({ fetch, params }) => {
  const response = await call(fetch, "load", {
    route: `/v1/site/dashboard/${params.shopId}/pages`,
    method: "GET"
  })
  if (!response) throw errors.serverError()

  const json = await callJson<PageResponse[]>(response)
  if (!json) throw errors.jsonError()

  const pages: Page[] = json.map((x) => ({
    slug: x.slug,
    title: x.title,
    updatedAt: new Date(x.updatedAt)
  }))

  return {
    pages,
    shopId: params.shopId
  }
}) satisfies PageLoad
