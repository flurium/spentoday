import type { LayoutLoad } from "./$types"

export const load = (async ({ params }) => {
  return {
    shopId: params.shopId
  }
}) satisfies LayoutLoad
