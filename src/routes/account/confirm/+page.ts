import type { PageLoad } from "./$types"
import { call } from "$lib/fetch"

export const load: PageLoad = async ({ fetch, url }) => {
  const token = url.searchParams.get("token")
  if (token == null) {
    return { message: "Токен відсутній, перевірте правильність посилання." }
  }

  const user = url.searchParams.get("user")
  if (user == null) {
    return {
      message: "Електронна адреса відсутня, перевірте правильність посилання."
    }
  }

  const response = await call(fetch, "load", {
    route: `/v1/auth/confirm?token=${encodeURIComponent(token)}&user=${user}`,
    method: "POST"
  })
  if (!response) return { message: "Сервер не працює." }
  if (response.ok) return { message: null }
  return { message: "Не можемо підтвердити пошту." }
}
