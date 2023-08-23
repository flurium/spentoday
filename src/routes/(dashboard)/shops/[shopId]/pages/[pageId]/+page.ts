import type { PageLoad } from "./$types"
import { call, callJson } from "$lib/fetch"
import { errors } from "$lib"

export type UpdatePage = {
  slug: string
  title: string
  content: string
  description: string
}
export const load: PageLoad = async ({ fetch, params }) => {
  const response = await call(fetch, "load", {
    route: `/v1/site/dashboard/${params.shopId}/page/${params.pageId}`,
    method: "GET"
  })
  if (!response) throw errors.serverError()

  const page = await callJson<UpdatePage>(response)
  if (page == null) throw errors.jsonError()

  return {
    shopId: params.shopId,
    slug: page.slug,
    content: page.content,
    description: page.description,
    title: page.title
  }
}
