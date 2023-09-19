export type Banner = {
  id: string
  url: string
}

export type Link = {
  id: string
  link: string
  name: string
}
export type ShopSettings = {
  banners: Banner[]
  links: Link[]
  name: string
  logo: string
  topBanner: string
}
