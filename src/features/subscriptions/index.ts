import { call, callJson, type Fetch, type FetchSide } from "$lib/fetch"

export type ApiSubscription = {
  id: string
  email: string
  date: string
}

export type Subscription = {
  id: string
  email: string
  date: Date
}

export function toSubscription(apiSubscription: ApiSubscription): Subscription {
  return {
    id: apiSubscription.id,
    email: apiSubscription.email,
    date: new Date(apiSubscription.date)
  }
}

const months = [
  "січня",
  "лютого",
  "березня",
  "квітня",
  "травня",
  "червня",
  "липня",
  "серпня",
  "вересня",
  "жовтня",
  "листопада",
  "грудня"
]

export function ukrDateString(date: Date) {
  const month = months[date.getMonth()]
  return `${date.getDate()} ${month} ${date.getFullYear()} р`
}

export async function querySubscriptions(
  fetch: Fetch,
  side: FetchSide,
  query: {
    shopId: string
    search: string | null
    start: number
  }
) {
  const searchQuery: string[] = []

  if (query.search) searchQuery.push(`search=${query.search}`)
  searchQuery.push(`start=${query.start}`)

  const response = await call(fetch, side, {
    route: `/v1/site/subscriptions/${query.shopId}?${searchQuery.join("&")}`,
    method: "GET"
  })
  if (response == null) return null

  const subscriptions = await callJson<ApiSubscription[]>(response)
  if (subscriptions == null) return null

  return subscriptions
}
