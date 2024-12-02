import {sequence} from "@sveltejs/kit/hooks";
import * as Sentry from "@sentry/sveltekit";
import type { HandleFetch } from "@sveltejs/kit"

Sentry.init({
    dsn: "https://6e69b0f3d2c6b8208f9e359d3d86a32a@o4508394399596544.ingest.de.sentry.io/4508400276865104",
    tracesSampleRate: 1
})

export const handleFetch = (async ({ event, request, fetch }) => {
  const cookie = event.request.headers.get("cookie")
  if (cookie) request.headers.set("cookie", cookie)

  return fetch(request)
}) satisfies HandleFetch
export const handleError = Sentry.handleErrorWithSentry();
export const handle = sequence(Sentry.sentryHandle());