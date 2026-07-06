/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  ArrowUp, 
  Mail, 
  Terminal, 
  Sparkles, 
  Heart,
  ExternalLink
} from 'lucide-react';
import { NavItem } from '../../types';

interface FooterProps {
  navItems: NavItem[];
}

export function Footer({ navItems }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-[#03010c]/90 backdrop-blur-2xl py-16 overflow-hidden z-20">
      
      {/* Premium top animated gradient border */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-pulse" />

      {/* Localized backlighting atmospheric glows */}
      <div className="absolute bottom-0 left-1/4 -translate-x-1/2 w-[300px] h-[150px] bg-purple-600/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-[300px] h-[150px] bg-blue-600/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Upper Master Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.04]">
          
          {/* Logo & Bio Info (5 columns) */}
          <div className="md:col-span-5 flex flex-col gap-4 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 p-[1px] shadow-lg shadow-purple-500/10">
                <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center text-white">
                  <Terminal className="w-4.5 h-4.5" />
                </div>
              </div>
              <div>
                <span className="font-display font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-gray-100 to-purple-300 bg-clip-text text-transparent">
                  Saniya.Dev
                </span>
                <span className="block text-[8px] font-mono tracking-widest text-purple-400 uppercase font-bold">AI & Software Engineer</span>
              </div>
            </div>

            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Dedicated to continuous growth, crafting high-performance full-stack architectures, intelligent AI models, and beautiful glassmorphic web experiences.
            </p>
          </div>

          {/* Quick Sitemap Links (4 columns) */}
          <div className="md:col-span-4 flex flex-col gap-4 text-left">
            <h4 className="font-mono text-xs font-bold text-gray-500 uppercase tracking-widest">Sitemap Index</h4>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-400 hover:text-purple-300 text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-purple-500/40 group-hover:bg-purple-400 group-hover:scale-125 transition-all" />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Connect & Back-to-Top Control (3 columns) */}
          <div className="md:col-span-3 flex flex-col gap-5 items-start md:items-end justify-between">
            
            <div className="space-y-3 w-full md:text-right">
              <h4 className="font-mono text-xs font-bold text-gray-500 uppercase tracking-widest block">Channels</h4>
              
              {/* Premium Social Buttons */}
              <div className="flex items-center gap-3 md:justify-end">
                <a
                  href="https://github.com/SaniyaNahid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/10 hover:border-purple-500/20 active:scale-95 transition-all duration-300"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4.5 h-4.5" />
                </a>
                
                <a
                  href="https://www.linkedin.com/in/shaik-saniya-nahid-926403384"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-500/10 hover:border-blue-500/20 active:scale-95 transition-all duration-300"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4.5 h-4.5" />
                </a>

                <a
                  href="mailto:shaiksaniya1828@gmail.com"
                  className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/10 hover:border-purple-500/20 active:scale-95 transition-all duration-300"
                  aria-label="Send direct Mail"
                >
                  <Mail className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>

            {/* Premium Animated Lift Back to Top Trigger */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-xl bg-white/[0.02] hover:bg-purple-500/10 border border-white/5 hover:border-purple-500/20 text-gray-400 hover:text-white flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer self-start md:self-auto"
              aria-label="Scroll back to top"
            >
              <span>Back To top</span>
              <ArrowUp className="w-3.5 h-3.5 animate-bounce" />
            </motion.button>

          </div>

        </div>

        {/* Lower Meta Block */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p className="text-xs text-gray-500">
              &copy; {currentYear} Saniya.Dev. All rights reserved.
            </p>
            <span className="hidden sm:inline text-gray-800">|</span>
            <span className="text-[10px] font-mono text-purple-400/70 uppercase tracking-widest font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-400" /> Secure SSL Nodes Node Active
            </span>
          </div>

          <p className="text-xs text-gray-500 flex items-center gap-1.5 font-mono">
            <span>Handcrafted with</span>
            <Heart className="w-3 h-3 text-red-500 animate-pulse fill-red-500/20" />
            <span>via React & Tailwind CSS v4</span>
          </p>

        </div>

      </div>

    </footer>
  );
}

