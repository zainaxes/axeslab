import React from 'react';
import Link from 'next/link';
import { Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.06] bg-[#050507] py-10 px-4 sm:px-8 text-xs text-zinc-500">
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Brand Copyright & Creator Attribution */}
        <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-violet-400" />
            <span>© 2026 Axes Lab · Official AI Website Prompts, Skills &amp; MCP</span>
          </div>
          <span className="hidden sm:inline text-zinc-600">·</span>
          <span>
            Crafted by{' '}
            <a
              href="https://instagram.com/zainaxes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-white underline underline-offset-2 transition-colors"
            >
              @zainaxes
            </a>{' '}
            (<a
              href="https://zainaxes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-white underline underline-offset-2 transition-colors"
            >
              zainaxes.com
            </a>)
          </span>
        </div>

        {/* Right Links */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-zinc-400 font-medium">
          <Link href="/mcp" className="hover:text-white transition-colors">MCP Server</Link>
          <Link href="/" className="hover:text-white transition-colors">Prompts</Link>
          <Link href="/skills" className="hover:text-white transition-colors">Skills</Link>
          <Link href="/backgrounds" className="hover:text-white transition-colors">Backgrounds</Link>
          <Link href="/sections" className="hover:text-white transition-colors">Sections</Link>
          <Link href="/3d-websites" className="hover:text-white transition-colors">3D Websites</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
