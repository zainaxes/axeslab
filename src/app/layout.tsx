import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://axeslab.org"),
  title: {
    default: "Axes Lab — Discover the Tools Behind AI",
    template: "%s | Axes Lab",
  },
  description:
    "An independent library of AI prompts, agent skills, MCP servers, workflows and open-source resources. Discover, inspect, and evaluate verified tools behind modern AI systems.",
  openGraph: {
    title: "Axes Lab — Discover the Tools Behind AI",
    description:
      "An independent library of AI prompts, agent skills, MCP servers, workflows and open-source resources.",
    url: "https://axeslab.org",
    siteName: "Axes Lab",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Axes Lab — Discover the Tools Behind AI",
    description:
      "An independent library of AI prompts, agent skills, MCP servers, workflows and open-source resources.",
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
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-canvas text-primaryText antialiased">
        <Header />
        <main className="flex-1 w-full max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
