import type { PageLoad } from "./$types"
import { redirect } from "@sveltejs/kit"
import { call } from "$lib/fetch"

export const load = (async ({ fetch, url }) => {
  const token = url.searchParams.get("token")
  if (token == null) {
    return {
      message: "Токен відсутній, перевірте правильність посилання."
    }
  }

  const user = url.searchParams.get("user")
  if (user == null) {
    return {
      message: "Електронна адреса відсутня, перевірте правильність посилання."
    }
  }

  const response = await call(fetch, "load", {
    route: `/v1/auth/confirm?token=${encodeURIComponent(token)}&user=${user}`,
    method: "GET"
  })
  if (!response) {
    return {
      message: "Сервер не працює."
    }
  }
  // const status = await Api.confirm(fetch, PUBLIC_API_URL, token, user)
  if (response.ok) throw redirect(302, "/confirm-success")

  return {
    message: "Не можемо підтвердити пошту."
  }
}) satisfies PageLoad
