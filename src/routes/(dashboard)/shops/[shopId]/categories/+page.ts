import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"
import { call, callJson } from "$lib/fetch"

export type ShopCategory = {
  id: string
  name: string
  parentId: string | null
}

export const load = (async ({ fetch, params }) => {
  const shopId = params.shopId

  const response = await call(fetch, "load", {
    route: `/v1/site/categories/${shopId}`,
    method: "GET"
  })
  if (!response) throw error(500, { message: "Сталася помилка, вибачайте!" })

  if (!response.ok) throw error(500, { message: "Щось пішло не так, вибачайте!" })

  const data = await callJson<ShopCategory[]>(response)
  if (!data) throw error(500, { message: "Хмм, проблема!" })

  return {
    categories: data,
    shopId: shopId
  }
}) satisfies PageLoad
