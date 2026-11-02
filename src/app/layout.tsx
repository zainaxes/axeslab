import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PromptModal } from '@/components/PromptModal';
import { Toaster } from 'sonner';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Axes Lab — AI Website Prompts, Agent Skills & MCP Server',
  description:
    'Build beautiful landing pages, animated interfaces, and agentic workflows in minutes with ready-to-use prompts, skills, and open MCP. 100% Free & Unlocked.',
  keywords: [
    'AI prompts',
    'MCP server',
    'Agent skills',
    'Claude Code',
    'Cursor rules',
    '3D WebGL websites',
    'Animated backgrounds',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#050507] text-[#FAFAFA] font-sans antialiased selection:bg-violet-500/30 selection:text-white">
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
              background: '#0E0E14',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              color: '#FAFAFA',
            },
          }}
        />
      </body>
    </html>
  );
}
