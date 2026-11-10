import type { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PromptModal } from "@/components/PromptModal";

export const metadata: Metadata = {
  metadataBase: new URL("https://axeslab.zainaxes.com"),
  title: {
    default: "Axes Lab — AI Website Prompts, Motion Directives, Skills & MCP",
    template: "%s | Axes Lab",
  },
  description:
    "An independent resource discovery library and sub-brand of ZainAxes featuring 375 verified website prompts, motion directives, agent skills, and Model Context Protocol tools.",
  keywords: [
    "Axes Lab",
    "ZainAxes",
    "AI website prompts",
    "motion design prompts",
    "agent skills",
    "MCP server",
    "UI sections",
    "3D WebGL prompts",
  ],
  openGraph: {
    type: "website",
    siteName: "Axes Lab",
    url: "https://axeslab.zainaxes.com",
    title: "Axes Lab — AI Website Prompts, Motion Directives & Agent Skills",
    description:
      "An independent resource library and sub-brand of ZainAxes featuring website prompts, motion-design resources, agent skills, and MCP servers.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Axes Lab — AI Website Prompts & Motion Library",
    description:
      "Discover website prompts, motion-design directives, agent skills, and UI references.",
  },
  icons: {
    icon: [
      { url: "/icon.png?v=2", type: "image/png" },
      { url: "/favicon.ico?v=2", sizes: "any" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: "/icon.png?v=2",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://axeslab.zainaxes.com/#organization",
        name: "Axes Lab",
        url: "https://axeslab.zainaxes.com",
        logo: "https://axeslab.zainaxes.com/logo-white.png",
        parentOrganization: {
          "@type": "Organization",
          name: "ZainAxes",
          url: "https://zainaxes.com",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://axeslab.zainaxes.com/#website",
        url: "https://axeslab.zainaxes.com",
        name: "Axes Lab",
        publisher: {
          "@id": "https://axeslab.zainaxes.com/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://axeslab.zainaxes.com/explore?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-paper text-ink font-sans antialiased selection:bg-accent-soft selection:text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <Suspense fallback={null}>
          <PromptModal />
        </Suspense>
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "var(--color-paper-2)",
              borderColor: "var(--color-rule-2)",
              color: "var(--color-ink)",
            },
          }}
        />
      </body>
    </html>
  );
}
