/**
 * Redirect subdomains to URL's on new domain name or same domain name.
 *
 * Created by LMT Solutions v0.1 - https://lmt.ca
 *
 * newdomainName - This is the new domain name you're redirecting to, but can also be the same as the original domain name.
 * redirectHttpCode - The HTTP status code for the redirect.
 * redirectMap - The redirect map, subdomain.domain.com to ${newdomainName}/URL
 *
 */
const newdomainName = `testingdomain2.com`
const redirectHttpCode = 301
const redirectMap = new Map([
  ['subdomain1','/page-on-new-domain'],
  ['subdomain2','/page2'],
  ['subdomain3','/testing-page/page-test'],
])

addEventListener('fetch', event => {
  console.log(`Received new request: ${event.request.url}`)
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
  const url = new URL(request.url)
  const { host } = url
  console.log(`URL = ${url} and host = ${host}`)

  const domainParts = host.split('.')
  const subDomain = domainParts[0]
  console.log(`subDomain = ${subDomain}`)

  const targetUrl = redirectMap.get(subDomain)
  console.log(`targetUrl = ${targetUrl}`)
  if (targetUrl) {
    console.log(`Triggered on ${targetUrl}`)
    const redirectUrl = `https://${newdomainName}${targetUrl}`
    console.log(`Redirecting to ${redirectUrl}`)
    return Response.redirect(redirectUrl, redirectHttpCode)
  }

  return fetch(request)
}
