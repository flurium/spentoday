/*

Possible login situation:
- email not found
- password is incorrect
- ok
- unexpected fail

*/

import { call, callJson } from "$lib/fetch"
import type { Fetch, FetchSide } from "$lib/fetch"

export async function login(
  fetch: Fetch,
  side: FetchSide,
  email: string,
  password: string
): Promise<"ok" | "fail" | "email-not-found" | "bad-password"> {
  const response = await call(fetch, side, {
    route: "/v1/auth/login",
    method: "POST",
    body: {
      email: email,
      password: password
    }
  })

  if (!response) return "fail"
  if (response.ok) return "ok"
  if (response.status === 400) return "bad-password"
  if (response.status === 404) return "email-not-found"
  return "fail"
}

/*

Possible register situations
- ok
- email is taken by another account
- password mismatch confirm password 
- fail

*/

export async function register(
  fetch: Fetch,
  side: FetchSide,
  input: {
    name: string
    email: string
    password: string
    confirmPassword: string
  }
): Promise<
  | { status: "success" | "fail" | "password-mismatch" }
  | { data: string[]; status: "problem" }
> {
  const response = await call(fetch, side, {
    route: "/v1/auth/register",
    method: "POST",
    body: {
      name: input.name,
      email: input.email,
      password: input.password,
      confirmPassword: input.confirmPassword
    }
  })

  if (!response) return { status: "fail" }
  if (response.ok) return { status: "success" }
  console.log(response.status)
  if (response.status == 500) {
    const json = await callJson<string[]>(response)
    if (!json) return { status: "fail" }
    return { data: json, status: "problem" }
  }
  if (response.status == 400) return { status: "password-mismatch" }
  return { status: "fail" }
}

export async function forgot(
  fetch: Fetch,
  side: FetchSide,
  email: string
): Promise<"ok" | "email-not-found" | "fail"> {
  const response = await call(fetch, side, {
    route: "/v1/auth/forgot",
    method: "POST",
    body: { email: email }
  })
  if (!response) return "fail"
  if (response.ok) return "ok"
  if (response.status === 404) return "email-not-found"
  return "fail"
}

export async function reset(
  fetch: Fetch,
  side: FetchSide,
  input: {
    email: string
    token: string
    password: string
    confirmPassword: string
  }
): Promise<
  | { status: "success" | "fail" | "password-mismatch" }
  | { data: string[]; status: "problem" }
> {
  const response = await call(fetch, side, {
    route: "/v1/auth/reset",
    method: "POST",
    body: {
      email: input.email,
      token: input.token,
      password: input.password,
      confirmPassword: input.confirmPassword
    }
  })
  if (!response) return { status: "fail" }
  if (response.ok) return { status: "success" }
  console.log(response.status)
  if (response.status == 500) {
    const json = await callJson<string[]>(response)
    if (!json) return { status: "fail" }
    return { data: json, status: "problem" }
  }
  if (response.status == 400) return { status: "password-mismatch" }
  return { status: "fail" }
}
