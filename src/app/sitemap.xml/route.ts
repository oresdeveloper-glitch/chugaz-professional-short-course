export async function GET() {
  const content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://chugazprofessionalcourse.vercel.app</loc><priority>1.0</priority></url>
  <url><loc>https://chugazprofessionalcourse.vercel.app/about</loc><priority>0.8</priority></url>
  <url><loc>https://chugazprofessionalcourse.vercel.app/courses</loc><priority>0.9</priority></url>
  <url><loc>https://chugazprofessionalcourse.vercel.app/contact</loc><priority>0.7</priority></url>
  <url><loc>https://chugazprofessionalcourse.vercel.app/login</loc><priority>0.5</priority></url>
  <url><loc>https://chugazprofessionalcourse.vercel.app/register</loc><priority>0.8</priority></url>
</urlset>`

  return new Response(content, {
    headers: { "Content-Type": "application/xml" },
  })
}