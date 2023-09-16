import type { PageLoad } from "./$types"
import type { Product } from "$lib/api"

export const load: PageLoad = async () => {
  // const products = await shopProducts(fetch, "load", {
  //   shopId: params.shopId,
  //   start: 0,
  //   count: 10
  // })
  // if (!products) throw serverError()

  return {
    products: [] as Product[] //products
  }
}
