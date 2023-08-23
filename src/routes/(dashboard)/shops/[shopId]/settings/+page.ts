import type { PageLoad } from "./$types"
import { redirect } from "@sveltejs/kit"
import { call, callJson } from "$lib/fetch"
import { errors, routes } from "$lib"

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

export const load: PageLoad = async ({ fetch, params }) => {
  const shopId = params.shopId

  const response = await call(fetch, "load", {
    route: `/v1/site/shopsettings/shop/${shopId}`,
    method: "GET"
  })
  if (!response) throw errors.serverError()
  if (!response.ok) throw redirect(302, routes.shop(shopId))

  const shop = await callJson<Shopsettings>(response)
  if (shop == null) throw errors.jsonError()

  return {
    shopId,
    logo: shop.logo,
    name: shop.name,
    banners: shop.banners,
    links: shop.links
  }
}
