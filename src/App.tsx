/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Terminal, 
  Folder, 
  FileCode, 
  Sparkles, 
  Cpu, 
  Eye, 
  Settings, 
  CheckCircle2, 
  Layers, 
  Compass, 
  Code2, 
  ExternalLink,
  ChevronRight,
  Info,
  Award,
  Send,
  Check
} from 'lucide-react';
import { PortfolioLayout } from './layouts/PortfolioLayout';
import { Card } from './components/ui/Card';
import { Button } from './components/ui/Button';
import { Badge } from './components/ui/Badge';
import { ContactSection } from './components/ContactSection';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { JourneyTimeline } from './components/JourneyTimeline';
import { Certificates } from './components/Certificates';
import { ConnectWithMe } from './components/ConnectWithMe';
import { useActiveSection } from './hooks/useActiveSection';
import { NavItem } from './types';

// Defined navigation links
const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Connect', href: '#connect' },
  { label: 'Contact', href: '#contact' },
];

export default function App() {
  // Scroll tracking to feed navbar highlights
  const activeSection = useActiveSection(['hero', 'about', 'skills', 'projects', 'journey', 'certificates', 'connect', 'contact'], 0.15);

  return (
    <PortfolioLayout navItems={NAV_ITEMS} activeSection={activeSection}>
      {/* SECTION 1: Outstanding Hero Section */}
      <Hero />

      {/* SECTION 2: Elegant About Me section */}
      <About />

      {/* SECTION 3: Premium Skills & Architecture Visualizer */}
      <Skills />

      {/* SECTION 4: Premium Featured Projects Grid */}
      <Projects />

      {/* SECTION 4.5: My Learning Journey Timeline */}
      <JourneyTimeline />

      {/* SECTION 6: Certificates Showcase */}
      <Certificates />

      {/* SECTION 6.5: Connect With Me Channels */}
      <ConnectWithMe />

      {/* SECTION 7: Premium Interactive Contact Form & Connections */}
      <ContactSection />

    </PortfolioLayout>
  );
}
