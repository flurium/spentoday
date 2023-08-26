import { call, callJson } from "$lib/fetch"
import type { Fetch, FetchSide } from "$lib/fetch"

export async function changeName(
  fetch: Fetch,
  side: FetchSide,
  name: string
): Promise<"not-found" | "success" | "fail"> {
  var response = await call(fetch, side, {
    route: "/v1/site/account/name",
    method: "POST",
    body: {
      name: name
    }
  })
  if (!response) return "fail"
  if (response.ok) return "success"
  if (response.status === 404) return "not-found"
  return "fail"
}

export async function uploadUserImage(
  fetch: Fetch,
  side: FetchSide,
  input: {
    file: File
  }
): Promise<
  | { status: "not-found" | "not-image" | "problem" | "fail" }
  | { data: string; status: "success" }
> {
  const formData = new FormData()
  formData.append("file", input.file)

  const response = await call(fetch, side, {
    route: `/v1/site/account/image`,
    method: "POST",
    body: formData
  })
  if (!response) return { status: "fail" }
  if (response.ok) {
    const json = await callJson<string>(response)
    if (!json) return { status: "problem" }
    return { data: json, status: "success" }
  }

  if (response.status == 400) return { status: "not-image" }
  if (response.status == 404) return { status: "not-found" }
  return { status: "problem" }
}

export async function changePassword(
  fetch: Fetch,
  side: FetchSide,
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
): Promise<"not-found" | "passwords-mismatch" | "success" | "fail"> {
  const response = await call(fetch, side, {
    route: "/v1/site/account/password",
    method: "POST",
    body: {
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    }
  })

  if (!response) return "fail"
  if (response.status === 404) return "not-found"
  if (response.status === 400) return "passwords-mismatch"
  if (response.ok) return "success"
  return "fail"
}

export async function deleteAccount(
  fetch: Fetch,
  side: FetchSide,
  email: string,
  password: string
): Promise<"not-found" | "success" | "fail"> {
  const response = await call(fetch, side, {
    route: "/v1/site/account/delete",
    method: "POST",
    body: {
      email: email,
      password: password
    }
  })

  if (!response) return "fail"
  if (response.status == 404) return "not-found"
  if (response.ok) "success"
  return "fail"
}
