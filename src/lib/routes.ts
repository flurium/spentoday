export const login = "/login"
export const register = "/register"
export const accountForgot = "/account/forgot"
export const accountConfirm = "/account/confirm"
export const accountConfirmSuccess = "/account/confirm-success"
export const accountSettings = "/account/settings"
export const accountDelete = "/account/settings/delete"

export const dashboard = "/shops"

export const shop = (shopId: string) => `/shops/${shopId}`
export const shopCategories = (shopId: string) => `/shops/${shopId}/categories`
export const shopDomains = (shopId: string) => `/shops/${shopId}/domains`
export const shopOrders = (shopId: string) => `/shops/${shopId}/orders`
export const shopPages = (shopId: string) => `/shops/${shopId}/pages`
export const shopPage = (shopId: string, slug: string) => `/shops/${shopId}/pages/${slug}`
export const shopSettings = (shopId: string) => `/shops/${shopId}/settings`
export const shopProduct = (shopId: string, productId: string) =>
  `/shops/${shopId}/products/${productId}`
