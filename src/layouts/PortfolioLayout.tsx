/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from 'react';
import { AuroraBackground } from '../components/background/AuroraBackground';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/navigation/Footer';
import { NavItem } from '../types';

interface PortfolioLayoutProps {
  children: ReactNode;
  navItems: NavItem[];
  activeSection: string;
}

export function PortfolioLayout({ children, navItems, activeSection }: PortfolioLayoutProps) {
  return (
    <div className="relative min-h-screen bg-[#050505] text-[#E0E0E0] selection:bg-purple-500/30 selection:text-white overflow-x-hidden">
      {/* Immersive Animated Backdrops */}
      <AuroraBackground />

      {/* Floating Glass Navbar */}
      <Navbar navItems={navItems} activeSection={activeSection} />

      {/* Main Page Body Frame */}
      <main className="relative z-10 flex flex-col pt-24 pb-12">
        {children}
      </main>

      {/* Polished Glass Footer */}
      <Footer navItems={navItems} />
    </div>
  );
}
