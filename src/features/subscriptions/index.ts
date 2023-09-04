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
