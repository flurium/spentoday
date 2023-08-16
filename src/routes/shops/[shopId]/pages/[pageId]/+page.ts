import type { PageLoad } from "./$types"
import { error } from "@sveltejs/kit"
import { call, callJson } from "$lib/fetch"

export type UpdatePage = {
  slug: string
  title: string
  content: string
  description: string
}
export const load = (async ({ fetch, params }) => {
  const response = await call(fetch, "load", {
    route: `/v1/site/dashboard/${params.shopId}/page/${params.pageId}`,
    method: "GET"
  })

  if (!response) throw error(500)
  const page = await callJson<UpdatePage>(response)
  if (page == null) throw error(500)
  return {
    shopId: params.shopId,
    slug: page.slug,
    content: page.content,
    description: page.description,
    title: page.title
  }
}) satisfies PageLoad
