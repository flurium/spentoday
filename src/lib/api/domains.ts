import { call, callJson } from "$lib/fetch"
import type { Fetch, FetchSide } from "$lib/fetch"

export type DomainVerification = {
  type: string
  domain: string
  value: string
}

export type ShopDomain =
  | {
      domain: string
      status: "no-status" | "taken" | "verified"
      verification?: undefined
    }
  | {
      domain: string
      status: "not-verified"
      verification: DomainVerification
    }

export async function verifyDomain(
  fetch: Fetch,
  side: FetchSide,
  input: {
    domain: string
    shopId: string
  }
): Promise<
  | {
      status: "not-found" | "problem" | "bad-domain" | "domain-taken"
    }
  | {
      status: "ok"
      data: ShopDomain
    }
> {
  const response = await call(fetch, side, {
    route: `/v1/site/domains/verify`,
    method: "PATCH",
    body: {
      domain: input.domain,
      shopId: input.shopId
    }
  })
  if (!response) return { status: "problem" }

  if (response.ok) {
    const json = await callJson<ShopDomain>(response)
    if (!json) return { status: "problem" }
    return { status: "ok", data: json }
  }

  if (response.status == 409) return { status: "domain-taken" }
  if (response.status == 400) return { status: "bad-domain" }
  if (response.status == 404) return { status: "not-found" }
  return { status: "problem" }
}

export async function removeDomain(
  fetch: Fetch,
  side: FetchSide,
  shopId: string,
  domain: string
): Promise<"fail" | "ok" | "not-found" | "bad-domain"> {
  const response = await call(fetch, side, {
    route: `/v1/site/domains/${shopId}/${domain}`,
    method: "DELETE"
  })
  if (!response) return "fail"
  if (response.ok) return "ok"
  if (response.status == 404) return "not-found"
  if (response.status == 400) return "bad-domain"
  return "fail"
}

export async function addDomain(
  fetch: Fetch,
  side: FetchSide,
  input: {
    shopId: string
    domain: string
  }
): Promise<
  | {
      status:
        | "fail"
        | "no-permission"
        | "bad-domain"
        | "has-free-domain"
        | "domain-taken"
      data?: undefined
    }
  | {
      data: ShopDomain
      status: "ok"
    }
> {
  const response = await call(fetch, side, {
    route: `/v1/site/domains/${input.shopId}`,
    method: "POST",
    body: { domain: input.domain }
  })
  if (!response) return { status: "fail" }
  if (response.ok) {
    var json = await callJson<ShopDomain>(response)
    if (!json) return { status: "fail" }
    return { data: json, status: "ok" }
  }
  if (response.status == 409) {
    var reason = await callJson<"has-free-domain" | "domain-taken">(response)
    return { status: reason ?? "fail" }
  }
  if (response.status == 400) return { status: "bad-domain" }
  if (response.status == 403) return { status: "no-permission" }
  return { status: "fail" }
}
