import {
  querySubscriptions,
  type ApiSubscription
} from "$features/subscriptions"
import { errors } from "$lib"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch, params }) => {
  const shopId = params.shopId

  const subscriptions = await querySubscriptions(fetch, "load", shopId, null)
  if (subscriptions == null) throw errors.serverError()

  return {
    subscriptions
  }
}
