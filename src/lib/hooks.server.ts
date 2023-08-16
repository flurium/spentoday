import type { HandleFetch } from "@sveltejs/kit"

export const handleFetch = (async ({ event, request, fetch }) => {
  // if (request.url.startsWith("https://api.my-domain.com/"))

  const cookie = event.request.headers.get("cookie")
  // if (dev) console.log(`server hook: ${cookie}`)
  if (cookie) request.headers.set("cookie", cookie)

  return fetch(request)
}) satisfies HandleFetch
