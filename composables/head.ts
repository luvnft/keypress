import { ComputedRef } from "vue"

export const useCustomHead = (
  title?: string | ComputedRef<string>,
  description?: string | ComputedRef<string>,
  image?: string | ComputedRef<string>
) => {
  useHead({
    title,
    meta: [
      {
        name: "Arvrtise.link",
        content:
          description ?? "Post a free what3words Web5 arvrtising ad barting One $LUV or using Arvrtise.x crypto escrow.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@arvrtise" },
      { name: "twitter:title", content: title ?? "Arvrtise.Link | Web5 Ads" },
      {
        name: "twitter:description",
        content:
          description ?? "Post a Web5 ad arvrtising X with What3Words and Arvrtise.X as escrow",
      },
      { name: "twitter:image", content: image ?? "https://arvrtise.link/og.png" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title ?? "Arvrtise.Link | Post a Web5 ad" },
      { property: "og:url", content: "https://arvrtise.link/" },
      { property: "og:image", content: image ?? "https://arvrtise.link/og.png" },
      { property: "og:image:secure_url", content: image ?? "https://arvrtise.link/og.png" },
      { property: "og:image:type", content: "image/png" },
      {
        property: "og:description",
        content:
          description ?? "Post a Web5 ad arvrtising X with What3Words and Arvrtise.X as escrow",
      },
    ],
  })
}
