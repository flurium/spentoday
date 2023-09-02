export const login = "/login"
export const register = "/register"
export const accountForgot = "/account/forgot"
export const accountConfirm = "/account/confirm"
export const accountConfirmSuccess = "/account/confirm-success"
export const accountSettings = "/account/settings"
export const accountDelete = "/account/settings/delete"

export const dashboard = "/shops"

export const shop = (shopId: string) => `/shops/${shopId}`
export const categories = (shopId: string) => `/shops/${shopId}/categories`
export const domains = (shopId: string) => `/shops/${shopId}/domains`
export const orders = (shopId: string) => `/shops/${shopId}/orders`
export const pages = (shopId: string) => `/shops/${shopId}/pages`
export const shopPage = (shopId: string, slug: string) => `/shops/${shopId}/pages/${slug}`
export const settings = (shopId: string) => `/shops/${shopId}/settings`
export const shopProduct = (shopId: string, productId: string) =>
  `/shops/${shopId}/products/${productId}`

export const subscriptions = (shopId: string) => `/shops/${shopId}/subscriptions`
