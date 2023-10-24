export * from "./domains"
export * from "./settings"
export * from "./orders"
export * from "./auth"

export type Image = {
  provider: string // "storj" | "github"
  bucket: string
  key: string
}
const storjShopsPublicKey = "jxacrqaiskr265rjf7wdytj72bcq"

export function imageUrl(image: Image): string | null {
  if (image.provider == "storj") {
    // shops bucket
    return `https://link.storjshare.io/raw/${storjShopsPublicKey}/${image.bucket}/${image.key}`
  }

  if (image.provider == "github") {
    return `https://raw.githubusercontent.com/flurium/${image.bucket}/main/${image.key}`
  }

  return null
}
