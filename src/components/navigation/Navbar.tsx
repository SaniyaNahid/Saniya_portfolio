/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Code, ExternalLink } from 'lucide-react';
import { NavItem } from '../../types';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { cn } from '../../utils/cn';

interface NavbarProps {
  navItems: NavItem[];
  activeSection: string;
}

export function Navbar({ navItems, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollDirection, isAtTop } = useScrollDirection();

  // Magnetic hover state for menu buttons
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: scrollDirection === 'down' && !isAtTop ? -100 : 0,
        opacity: 1,
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 25 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isAtTop 
          ? "bg-transparent py-6 border-b border-transparent" 
          : "glass-nav py-3.5 shadow-2xl shadow-black/40 backdrop-blur-md"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo (Magnetic + Glow) */}
        <motion.a 
          href="#hero" 
          className="flex items-center gap-2 group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300">
            <Code className="w-4.5 h-4.5 text-white group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight bg-gradient-to-r from-white via-white to-purple-300 bg-clip-text text-transparent">
            SANIYA.DEV
          </span>
        </motion.a>

        {/* Desktop Navigation Menu (Magnetic & Underline animations) */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-white/[0.02] border border-white/[0.05] backdrop-blur-md">
          {navItems.map((item, idx) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <motion.a
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "relative px-4 py-2 rounded-full text-xs lg:text-sm font-medium tracking-wide transition-colors duration-300",
                  isActive ? "text-white" : "text-white/60 hover:text-white"
                )}
                whileHover={{ y: -1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {/* Magnetic pill backup shadow */}
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.span
                      layoutId="hoverBg"
                      className="absolute inset-0 rounded-full bg-white/[0.03] -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    />
                  )}
                </AnimatePresence>

                <span>{item.label}</span>

                {/* Animated premium underline */}
                {isActive && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs font-semibold hover:bg-white/10 transition-colors cursor-pointer"
          >
            Resume.pdf
          </motion.button>
        </div>

        {/* Mobile Toggle Trigger */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-9 h-9 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-white"
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="md:hidden glass-nav overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-3.5 border-t border-white/[0.05] bg-[#050505]/98">
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={cn(
                      "flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive 
                        ? "bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 text-white" 
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />}
                  </motion.a>
                );
              })}
              
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="mt-4 w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
                onClick={() => {
                  setIsOpen(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Resume <ExternalLink className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
