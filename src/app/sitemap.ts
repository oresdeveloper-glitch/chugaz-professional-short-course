import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://chugazprofessionalcourse.vercel.app'

  return [
    { url: baseUrl, priority: 1.0 },
    { url: `${baseUrl}/about`, priority: 0.8 },
    { url: `${baseUrl}/courses`, priority: 0.9 },
    { url: `${baseUrl}/contact`, priority: 0.7 },
    { url: `${baseUrl}/login`, priority: 0.5 },
    { url: `${baseUrl}/register`, priority: 0.8 },
  ]
}
