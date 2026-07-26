export async function GET() {
  const content = `User-agent: *
Allow: /
Sitemap: https://chugazprofessionalcourse.vercel.app/sitemap.xml

Disallow: /admin
Disallow: /dashboard
Disallow: /api/`

  return new Response(content, {
    headers: { "Content-Type": "text/plain" },
  })
}