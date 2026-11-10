import React from "react";
import Link from "next/link";

const DIRECTORY_LINKS = [
  { label: "All resources", href: "/explore" },
  { label: "Categories", href: "/categories" },
  { label: "Prompts", href: "/prompts" },
  { label: "Web design", href: "/web-design" },
  { label: "UI sections", href: "/sections" },
  { label: "3D websites", href: "/3d-websites" },
  { label: "Backgrounds", href: "/backgrounds" },
  { label: "Applications", href: "/apps" },
  { label: "Top picks", href: "/top" },
  { label: "Collections", href: "/collections" },
];

const TOOLS_AND_PLATFORM_LINKS = [
  { label: "Customize prompts", href: "/customize" },
  { label: "Templates", href: "/templates" },
  { label: "Agent skills", href: "/skills" },
  { label: "MCP server", href: "/mcp" },
  { label: "Restyle studio", href: "/restyle" },
  { label: "Saved items", href: "/saved" },
];

const PLATFORM_INFO_LINKS = [
  { label: "About Axes Lab", href: "/about" },
  { label: "Methodology", href: "/methodology" },
  { label: "Changelog", href: "/changelog" },
  { label: "Submit resource", href: "/submit" },
  { label: "Contact", href: "/contact" },
];

const GOVERNANCE_LINKS = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of use", href: "/terms" },
  { label: "Licensing and rights", href: "/licensing" },
  { label: "Safety and security", href: "/safety-and-security" },
  { label: "LLM machine data", href: "/llms.txt" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-rule bg-paper-3 text-muted text-xs mt-20">
      <div className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-rule">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-3.5">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-accent rounded-pill"
            >
              <img
                src="/logo-white.png"
                alt="Axes Lab"
                className="w-6 h-6 object-contain"
              />
              <span className="text-sm font-display font-medium text-ink">
                Axes Lab
              </span>
            </Link>

            <p className="text-muted text-xs leading-relaxed max-w-sm">
              An independent resource discovery library and sub-brand of ZainAxes bringing prompts, design references, motion-design resources, agent skills, and MCP servers together in one place.
            </p>

            <p className="text-xs text-muted">
              Parent brand:{" "}
              <a
                href="https://zainaxes.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:underline focus-visible:outline-2 focus-visible:outline-accent"
              >
                ZainAxes
              </a>{" "}
              (
              <a
                href="https://instagram.com/zainaxes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:underline focus-visible:outline-2 focus-visible:outline-accent"
              >
                @zainaxes
              </a>
              )
            </p>
          </div>

          {/* Resource Directory */}
          <div className="lg:col-span-3 space-y-2.5">
            <h3 className="text-xs font-sans text-ink font-medium">
              Directory
            </h3>
            <ul className="space-y-1.5">
              {DIRECTORY_LINKS.map((item) => (
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

          {/* Tools & Platform */}
          <div className="lg:col-span-3 space-y-5">
            <div className="space-y-2.5">
              <h3 className="text-xs font-sans text-ink font-medium">
                Tools &amp; Agents
              </h3>
              <ul className="space-y-1.5">
                {TOOLS_AND_PLATFORM_LINKS.map((item) => (
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

            <div className="space-y-2.5">
              <h3 className="text-xs font-sans text-ink font-medium">
                Platform
              </h3>
              <ul className="space-y-1.5">
                {PLATFORM_INFO_LINKS.map((item) => (
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

          {/* Governance & Legal */}
          <div className="lg:col-span-2 space-y-2.5">
            <h3 className="text-xs font-sans text-ink font-medium">
              Governance
            </h3>
            <ul className="space-y-1.5">
              {GOVERNANCE_LINKS.map((item) => (
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

        {/* Bottom Line */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted">
          <span>
            Axes Lab · Independent sub-brand of ZainAxes · Original resource ownership remains with respective creators
          </span>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-ink transition-colors duration-150">
              About
            </Link>
            <Link href="/licensing" className="hover:text-ink transition-colors duration-150">
              Licensing
            </Link>
            <Link href="/privacy" className="hover:text-ink transition-colors duration-150">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ink transition-colors duration-150">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
