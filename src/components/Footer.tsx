import React from 'react';
import Link from 'next/link';
import { Sparkles, Terminal, ArrowUpRight, Github, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  const directoryLinks = [
    { label: "AI Prompts Library", href: "/" },
    { label: "MCP Server Integration", href: "/mcp" },
    { label: "Agent Skills", href: "/skills" },
    { label: "Full Web Apps", href: "/apps" },
    { label: "3D & WebGL Sites", href: "/3d-websites" },
    { label: "Animated Backgrounds", href: "/backgrounds" },
    { label: "UI Sections & Blocks", href: "/sections" },
    { label: "TOP Curated Prompts", href: "/top" },
    { label: "Restyle Studio", href: "/restyle" },
  ];

  const platformLinks = [
    { label: "About Axes Lab", href: "/about" },
    { label: "Editorial Methodology", href: "/methodology" },
    { label: "Changelog & Updates", href: "/changelog" },
    { label: "Submit a Resource", href: "/submit" },
    { label: "Saved Prompts", href: "/saved" },
    { label: "Safety & Security", href: "/safety-and-security" },
    { label: "Contact Us", href: "/contact" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Licensing & Rights", href: "/licensing" },
    { label: "LLM Machine Data", href: "/llms.txt" },
  ];

  return (
    <footer className="w-full border-t border-white/[0.07] bg-[#030305] text-zinc-400 text-xs mt-20 relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-gradient-to-t from-violet-600/10 via-indigo-600/5 to-transparent blur-[120px] pointer-events-none" />

      {/* Main Grid Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-12 border-b border-white/[0.07]">
          {/* Brand Column (Span 4) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 p-[1px] shadow-glow flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-[#050507] rounded-[11px] flex items-center justify-center p-1.5">
                  <img
                    src="/logo-white.png"
                    alt="Axes Lab Logo"
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                  Axes Lab
                </span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/[0.08] text-zinc-300 border border-white/[0.1]">
                  AI
                </span>
              </div>
            </Link>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              The premier open-access index of production-ready AI website prompts, agentic workflows, 3D WebGL modules, and Model Context Protocol servers. 100% Free &amp; Unlocked.
            </p>

            {/* Creator Attribution Badge */}
            <div className="p-3.5 rounded-2xl border border-white/[0.08] bg-white/[0.02] max-w-sm flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-zinc-300">
                  Engineered by{' '}
                  <a
                    href="https://instagram.com/zainaxes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-white hover:text-violet-300 underline underline-offset-2 transition-colors"
                  >
                    @zainaxes
                  </a>
                </span>
              </div>
              <a
                href="https://zainaxes.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-white transition-colors"
              >
                <span>zainaxes.com</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Directory Links (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-200 font-semibold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-violet-400" />
              Directory &amp; Tools
            </h3>
            <ul className="space-y-2.5">
              {directoryLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-zinc-400 hover:text-white transition-colors text-xs flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-zinc-600 group-hover:bg-violet-400 transition-colors" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Links (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-200 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Ecosystem &amp; Trust
            </h3>
            <ul className="space-y-2.5">
              {platformLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-zinc-400 hover:text-white transition-colors text-xs flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-zinc-600 group-hover:bg-indigo-400 transition-colors" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Governance (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-200 font-semibold">
              Governance
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-zinc-400 hover:text-white transition-colors text-xs flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-zinc-600 group-hover:bg-cyan-400 transition-colors" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-3">
              <div className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.01] text-[11px] text-zinc-500 leading-normal">
                Non-commercial, community-driven AI architecture index.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <img src="/logo-white.png" alt="Axes Lab Mark" className="w-3.5 h-3.5 object-contain opacity-70" />
            <span>© 2026 Axes Lab · Official AI Website Prompts, Skills &amp; MCP</span>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-zinc-400 font-medium">
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/licensing" className="hover:text-white transition-colors">Licensing</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
