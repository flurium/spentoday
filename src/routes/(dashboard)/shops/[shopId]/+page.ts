import { redirect } from "@sveltejs/kit"
import type { PageLoad } from "./$types"
import { routes } from "$lib"

export const load: PageLoad = ({ params }) => {
  throw redirect(302, routes.products(params.shopId))
}
