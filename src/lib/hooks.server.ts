import {sequence} from "@sveltejs/kit/hooks";
import * as Sentry from "@sentry/sveltekit";
import type { HandleFetch } from "@sveltejs/kit"

Sentry.init({
    dsn: "https://6b35e077a6c4bccea35fa1cca08f0a3c@o4508394399596544.ingest.de.sentry.io/4508394401497168",
    tracesSampleRate: 1
})

export const handleFetch = (async ({ event, request, fetch }) => {
  const cookie = event.request.headers.get("cookie")
  if (cookie) request.headers.set("cookie", cookie)

  return fetch(request)
}) satisfies HandleFetch
export const handleError = Sentry.handleErrorWithSentry();
export const handle = sequence(Sentry.sentryHandle());