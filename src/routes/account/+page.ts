import type { PageLoad } from "./$types"
import { call, callJson } from "$lib/fetch"
import { errors } from "$lib"

export type UserOutput = {
  name: string
  imageUrl: string
  email: string
}

export const load: PageLoad = async ({ fetch }) => {
  const response = await call(fetch, "load", {
    route: "/v1/site/account/user",
    method: "GET"
  })
  if (!response || !response.ok) throw errors.serverError()

  const user = await callJson<UserOutput>(response)
  if (user == null) throw errors.jsonError()

  return {
    name: user.name,
    imageUrl: user.imageUrl,
    email: user.email
  }
}
