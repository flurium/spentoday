import type { PageLoad } from "./$types"
import { error } from "@sveltejs/kit"
import { call, callJson } from "$lib/fetch"

export type UserOutput = {
  name: string
  imageUrl: string
}

export const load = (async ({ fetch }) => {
  var response = await call(fetch, "load", {
    route: "/v1/site/account/user",
    method: "GET"
  })
  if (!response || !response.ok) {
    throw error(500, { message: "Сервер не працює" })
  }

  var user = await callJson<UserOutput>(response)
  if (user == null) throw error(500, { message: "Щось не так" })

  return {
    name: user.name,
    imageUrl: user.imageUrl
  }
}) satisfies PageLoad
