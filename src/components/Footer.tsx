import React from "react";
import Link from "next/link";
import { Terminal, Shield, BookOpen, Layers } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-subtleBorder bg-surface mt-16 text-xs text-mutedText-secondary">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-btn bg-state-inverse text-state-inverseText flex items-center justify-center font-bold text-xs">
                AL
              </div>
              <span className="font-bold text-sm text-primaryText tracking-tight">Axes Lab</span>
            </div>
            <p className="text-xs text-mutedText-secondary leading-relaxed max-w-sm mb-4">
              An independent, curated reference library of AI prompts, agent skills, MCP servers,
              workflows, and open-source models. Discover and evaluate the verified tools behind AI.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-canvas border border-subtleBorder text-[11px] text-primaryText font-medium">
              <span className="w-2 h-2 rounded-full bg-state-success" />
              Verified Open-Access Directory
            </div>
          </div>

          {/* Catalogue Taxonomy */}
          <div>
            <h4 className="font-semibold text-primaryText text-xs uppercase tracking-wider mb-3">
              Catalogue
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/prompts" className="hover:text-primaryText transition-colors">
                  Prompts
                </Link>
              </li>
              <li>
                <Link href="/skills" className="hover:text-primaryText transition-colors">
                  Agent Skills
                </Link>
              </li>
              <li>
                <Link href="/mcp" className="hover:text-primaryText transition-colors">
                  MCP Servers
                </Link>
              </li>
              <li>
                <Link href="/agents" className="hover:text-primaryText transition-colors">
                  Agents & Frameworks
                </Link>
              </li>
              <li>
                <Link href="/workflows" className="hover:text-primaryText transition-colors">
                  Workflows & Automations
                </Link>
              </li>
              <li>
                <Link href="/models" className="hover:text-primaryText transition-colors">
                  Models & Weights
                </Link>
              </li>
              <li>
                <Link href="/datasets" className="hover:text-primaryText transition-colors">
                  Datasets & Evaluations
                </Link>
              </li>
            </ul>
          </div>

          {/* Discovery & Tools */}
          <div>
            <h4 className="font-semibold text-primaryText text-xs uppercase tracking-wider mb-3">
              Discovery
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/explore" className="hover:text-primaryText transition-colors">
                  All Resources
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-primaryText transition-colors">
                  Curated Collections
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-primaryText transition-colors">
                  Starter Templates
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-primaryText transition-colors">
                  Developer Utilities
                </Link>
              </li>
              <li>
                <Link href="/submit" className="hover:text-primaryText transition-colors">
                  Submit a Resource
                </Link>
              </li>
              <li>
                <Link href="/saved" className="hover:text-primaryText transition-colors">
                  Saved Bookmarks
                </Link>
              </li>
            </ul>
          </div>

          {/* Standards & Transparency */}
          <div>
            <h4 className="font-semibold text-primaryText text-xs uppercase tracking-wider mb-3">
              Trust & Policy
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/methodology" className="hover:text-primaryText transition-colors">
                  Curation Methodology
                </Link>
              </li>
              <li>
                <Link href="/licensing" className="hover:text-primaryText transition-colors">
                  Licensing & Redistribution
                </Link>
              </li>
              <li>
                <Link href="/safety-and-security" className="hover:text-primaryText transition-colors">
                  Safety & Security Policy
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primaryText transition-colors">
                  About Axes Lab
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primaryText transition-colors">
                  Contact & Takedowns
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="hover:text-primaryText transition-colors">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-6 border-t border-subtleBorder flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-mutedText">
          <p>© {currentYear} Axes Lab. Independent AI Resource Library. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <Link href="/llms.txt" className="hover:text-primaryText font-mono">
              /llms.txt
            </Link>
            <Link href="/api/public/resources" className="hover:text-primaryText font-mono">
              /api/public/resources
            </Link>
            <Link href="/sitemap.xml" className="hover:text-primaryText">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
