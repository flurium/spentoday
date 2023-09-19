import type { PageLoad } from "./$types"
import { redirect } from "@sveltejs/kit"
import { call, callJson } from "$lib/fetch"
import { errors, routes } from "$lib"
import type { ShopSettings } from "$features/dashboard/settings/types"

export const load: PageLoad = async ({ fetch, params }) => {
  const shopId = params.shopId

  const response = await call(fetch, "load", {
    route: `/v1/site/shopsettings/shop/${shopId}`,
    method: "GET"
  })
  if (!response) throw errors.serverError()
  if (!response.ok) throw redirect(302, routes.shop(shopId))

  const shop = await callJson<ShopSettings>(response)
  if (shop == null) throw errors.jsonError()

  return {
    shopId,
    logo: shop.logo,
    top: shop.topBanner,
    name: shop.name,
    banners: shop.banners,
    links: shop.links
  }
}
