import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const directoryLinks = [
    { label: "AI prompts", href: "/" },
    { label: "MCP server", href: "/mcp" },
    { label: "Agent skills", href: "/skills" },
    { label: "Full web apps", href: "/apps" },
    { label: "3D scenes", href: "/3d-websites" },
    { label: "Backgrounds", href: "/backgrounds" },
    { label: "UI sections", href: "/sections" },
    { label: "Top prompts", href: "/top" },
    { label: "Restyle studio", href: "/restyle" },
  ];

  const platformLinks = [
    { label: "About Axes Lab", href: "/about" },
    { label: "Methodology", href: "/methodology" },
    { label: "Changelog", href: "/changelog" },
    { label: "Submit resource", href: "/submit" },
    { label: "Saved prompts", href: "/saved" },
    { label: "Safety and security", href: "/safety-and-security" },
    { label: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms of use", href: "/terms" },
    { label: "Licensing and rights", href: "/licensing" },
    { label: "LLM machine data", href: "/llms.txt" },
  ];

  return (
    <footer className="w-full border-t border-rule bg-paper-3 text-muted text-xs mt-24">
      <div className="max-w-[var(--container)] mx-auto px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-rule">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-7 h-7 rounded-pill bg-paper-2 border border-rule flex items-center justify-center p-1">
                <img
                  src="/logo-white.png"
                  alt="Axes Lab"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm font-display font-medium text-ink">
                Axes Lab
              </span>
            </Link>

            <p className="text-muted text-xs leading-relaxed max-w-sm">
              An independent, non-commercial directory and technical reference library of verified AI prompts, agent skills, and Model Context Protocol servers.
            </p>

            <div className="pt-2 text-xs text-muted">
              <span>Maintained by </span>
              <a
                href="https://instagram.com/zainaxes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:underline focus-visible:outline-2 focus-visible:outline-accent"
              >
                @zainaxes
              </a>
              <span> (</span>
              <a
                href="https://zainaxes.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:underline focus-visible:outline-2 focus-visible:outline-accent"
              >
                zainaxes.com
              </a>
              <span>)</span>
            </div>
          </div>

          {/* Directory Links */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-sans text-ink font-medium">
              Directory
            </h3>
            <ul className="space-y-2">
              {directoryLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted hover:text-ink transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Links */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-sans text-ink font-medium">
              Platform
            </h3>
            <ul className="space-y-2">
              {platformLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted hover:text-ink transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-sans text-ink font-medium">
              Governance
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted hover:text-ink transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <div>
            <span>Axes Lab · Technical reference library</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-ink transition-colors duration-150">Terms</Link>
            <Link href="/privacy" className="hover:text-ink transition-colors duration-150">Privacy</Link>
            <Link href="/licensing" className="hover:text-ink transition-colors duration-150">Licensing</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
