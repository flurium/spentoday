import { goto } from "$app/navigation"
import { PUBLIC_API_URL } from "$env/static/public"
import { redirect } from "@sveltejs/kit"

export type HttpMethod = "POST" | "GET" | "PUT" | "DELETE" | "PATCH"

export type Fetch = (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => Promise<Response>

export type FetchSide = "client" | "load"

export type FetchInfo = {
  route: `/${string}`
  method: HttpMethod
  body?: FormData | object
}

async function secureFetch(fetch: Fetch, info: FetchInfo) {
  try {
    const headers = new Headers({
      accept: "application/json",
      "double-submit": "ueqc1"
    })

    let body: BodyInit | undefined
    if (info.body == undefined || info.body instanceof FormData) {
      body = info.body
    } else {
      headers.append("content-type", "application/json")
      body = JSON.stringify(info.body)
    }

    const response = await fetch(new URL(info.route, PUBLIC_API_URL), {
      method: info.method,
      credentials: "include",
      headers: headers,
      body: body
    })

    return response
  } catch {
    // return new Response("Call error", {
    //   status: 500
    // })
    return null
  }
}

/**
 * Fetch data from server. Will redirect to /login if response status code is 401.
 */
export async function call(fetch: Fetch, side: FetchSide, info: FetchInfo) {
  const response = await secureFetch(fetch, info)
  if (response == null) return null
  if (response.status == 401) {
    if (side == "client") {
      goto("/login")
    } else {
      throw redirect(302, "/login")
    }
  }
  return response
}

export async function callJson<T>(response: Response) {
  try {
    return (await response.json()) as T
  } catch {
    return null
  }
}
