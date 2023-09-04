import type { ApiSubscription } from "$features/subscriptions"
import { errors } from "$lib"
import { call, callJson } from "$lib/fetch"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch, params }) => {
  const shopId = params.shopId

  const response = await call(fetch, "load", {
    route: `/v1/site/subscriptions/${shopId}`,
    method: "GET"
  })
  if (response == null) throw errors.serverError()

  const subscriptions = await callJson<ApiSubscription[]>(response)
  if (subscriptions == null) throw errors.jsonError()

  return {
    subscriptions
  }
}
