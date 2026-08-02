import type { Metadata, Viewport } from "next"
import { Poppins, Inter, Montserrat } from "next/font/google"
import ThemeProvider from "@/components/ThemeProvider"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-button",
  display: "swap",
})

export const metadata: Metadata = {
  title: "CHUGAZ ICT SERVICES OFFICE SUPPLIES | Professional ICT & Engineering Training Center",
  description:
    "CHUGAZ ICT SERVICES OFFICE SUPPLIES offers professional ICT and Engineering courses in Mbeya, Tanzania. Computer Basics, Python, JavaScript, AutoCAD, Web Design and more. Empowering Minds, Building Futures.",
  keywords: [
    "CHUGAZ",
    "ICT Services Office Supplies",
    "ICT Training",
    "Engineering Training",
    "Mbeya",
    "Tanzania",
    "Computer Courses",
    "Python",
    "JavaScript",
    "AutoCAD",
    "Web Design",
  ],
  authors: [{ name: "CHUGAZ ICT SERVICES OFFICE SUPPLIES" }],
  creator: "CHUGAZ ICT SERVICES OFFICE SUPPLIES",
  publisher: "CHUGAZ ICT SERVICES OFFICE SUPPLIES",
  metadataBase: new URL("https://chugaz-professional-course.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chugaz-professional-course.vercel.app",
    siteName: "CHUGAZ ICT SERVICES OFFICE SUPPLIES",
    title: "CHUGAZ ICT SERVICES OFFICE SUPPLIES | Professional ICT & Engineering Training Center",
    description:
      "Professional ICT and Engineering courses in Mbeya, Tanzania. Empowering Minds, Building Futures.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CHUGAZ ICT SERVICES OFFICE SUPPLIES",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CHUGAZ ICT SERVICES OFFICE SUPPLIES | Professional ICT & Engineering Training Center",
    description:
      "Professional ICT and Engineering courses in Mbeya, Tanzania. Empowering Minds, Building Futures.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1F4D",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${inter.variable} ${montserrat.variable}`}
    >
      <body className="font-sans antialiased min-h-screen flex flex-col overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
