export default defineEventHandler(({ req, res, context }) => {
  const hostname = req.headers.host || "arvrtise.link"

  const mainDomain = ["localhost:3000", "arvrtise.link"]

  if (!mainDomain.includes(hostname)) {
    const currentHost =
      process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
        ? hostname.replace(`.arvrtise.link`, "")
        : hostname.replace(`.localhost:3000`, "")

    console.log({ currentHost })
    context.subdomain = currentHost
  }
})
