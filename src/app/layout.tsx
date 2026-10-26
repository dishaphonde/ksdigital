import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ksdigital.co.in"),
  title: {
    default: "Digital Marketing Agency for Growth | KS Digital",
    template: "%s | KS Digital",
  },
  description:
    "KS Digital helps businesses grow with SEO, performance marketing, social media, web design and marketing automation. Get a growth strategy tailored to your goals.",
  keywords: [
    "digital marketing agency",
    "performance marketing",
    "SEO services",
    "social media marketing",
    "website design",
    "marketing automation",
  ],
  authors: [{ name: "Ketan Sawant", url: "https://ksdigital.co.in" }],
  creator: "KS Digital",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ksdigital.co.in/",
    siteName: "KS Digital",
    title: "Digital Marketing Agency for Growth | KS Digital",
    description:
      "KS Digital helps businesses grow with SEO, performance marketing, social media, web design and marketing automation.",
    images: [
      {
        url: "/images/stats_photo.png",
        width: 1200,
        height: 630,
        alt: "KS Digital Performance Marketing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Agency for Growth | KS Digital",
    description:
      "KS Digital helps businesses grow with SEO, performance marketing, social media, web design and marketing automation.",
    images: ["/images/stats_photo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('ks_theme') === 'light') {
                  document.documentElement.classList.add('light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </body>
    </html>
  );
}
