import type { PageLoad } from "./$types"
import { error } from "@sveltejs/kit"

export const load = (async ({ url }) => {
  const token = url.searchParams.get("token")
  if (token == null) {
    throw error(404, { message: "Токен відсутній, перевірте правильність посилання." })
  }

  const user = url.searchParams.get("user")
  if (user == null) {
    throw error(400, {
      message: "Електронна адреса відсутня, перевірте правильність посилання."
    })
  }

  return {
    token,
    user
  }
}) satisfies PageLoad
