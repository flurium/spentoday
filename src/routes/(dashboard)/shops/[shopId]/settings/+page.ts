import type { PageLoad } from "./$types"
import { PUBLIC_API_URL } from "$env/static/public"
import { error, redirect } from "@sveltejs/kit"
import { call, callJson } from "$lib/fetch"

export type Banner = {
  id: string
  url: string
}

export type Link = {
  id: string
  link: string
  name: string
}
export type Shopsettings = {
  banners: Banner[]
  links: Link[]
  name: string
  logo: string
}

export const load = (async ({ fetch, params }) => {
  const shopId = params.shopId

  const response = await call(fetch, "load", {
    route: `/v1/site/shopsettings/${shopId}/getshop`,
    method: "GET"
  })

  if (!response) throw error(500)
  if (!response.ok) throw redirect(302, "/")

  const shop = await callJson<Shopsettings>(response)
  if (shop == null) throw error(500)

  return {
    shopId,
    logo: shop.logo,
    name: shop.name,
    banners: shop.banners,
    links: shop.links
  }
}) satisfies PageLoad
