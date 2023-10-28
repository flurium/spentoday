import { querySubscriptions } from "$features/subscriptions"
import { errors } from "$lib"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch, params }) => {
  const subscriptions = await querySubscriptions(fetch, "load", {
    shopId: params.shopId,
    search: null,
    start: 0
  })
  if (subscriptions == null) throw errors.serverError()

  return {
    subscriptions
  }
}
