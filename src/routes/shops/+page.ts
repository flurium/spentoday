import type { PageLoad } from "./$types"
import { error, redirect } from "@sveltejs/kit"
import { call, callJson } from "$lib/fetch"
import { routes } from "$lib"

export type DashboardShop = {
  name: string
  id: string
}

export const load = (async ({ fetch, url }) => {
  const response = await call(fetch, "load", {
    route: "/v1/site/dashboard/shops",
    method: "GET"
  })

  if (!response) throw error(500)

  if (response.status == 403 || response.status == 401) throw redirect(302, routes.login)

  if (!response.ok) throw redirect(302, "/")

  const shops = await callJson<DashboardShop[]>(response)
  return { shops }
}) satisfies PageLoad
