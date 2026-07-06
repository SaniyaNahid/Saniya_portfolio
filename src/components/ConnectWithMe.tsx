import React from 'react';
import { motion } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  ExternalLink, 
  ArrowUpRight, 
  GitBranch, 
  Star, 
  Users, 
  Briefcase, 
  Sparkles, 
  Layers 
} from 'lucide-react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';

export function ConnectWithMe() {
  const socialProfiles = [
    {
      id: 'github',
      name: 'GitHub',
      username: '@SaniyaNahid',
      description: 'Explore my repositories, AI projects, web development projects, and open-source contributions.',
      href: 'https://github.com/SaniyaNahid',
      icon: Github,
      glow: 'purple' as const,
      accentColor: 'text-purple-400',
      gradient: 'from-purple-500/15 via-indigo-500/5 to-transparent',
      borderColor: 'group-hover:border-purple-500/30',
      badge: 'Open Source',
      stats: [
        { label: 'Repos', value: '10+' },
        { label: 'Commits', value: '15+' },
        { label: 'Status', value: 'Building' }
      ]
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      username: 'Shaik Saniya Nahid',
      description: 'Connect with me professionally and explore my education, certifications, projects, and career journey.',
      href: 'https://www.linkedin.com/in/shaik-saniya-nahid-926403384',
      icon: LinkedInIcon, // Custom high-fidelity LinkedIn icon
      glow: 'blue' as const,
      accentColor: 'text-blue-400',
      gradient: 'from-blue-500/15 via-cyan-500/5 to-transparent',
      borderColor: 'group-hover:border-blue-500/30',
      badge: 'Professional',
      stats: [
        { label: 'Connections', value: '200+' },
        { label: 'Certs', value: '12+' },
        { label: 'Status', value: 'Active' }
      ]
    }
  ];

  return (
    <section id="connect" className="scroll-mt-24 py-20 px-6 max-w-5xl mx-auto w-full relative">
      
      {/* Decorative localized ambient glowing elements */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      {/* Animated Header Section */}
      <div className="flex flex-col gap-4 mb-12 text-center">
        <Badge variant="indigo" className="self-center px-3 py-1 text-xs font-mono tracking-wider uppercase bg-white/[0.01] border-white/5 text-gray-400">
          Professional Channels
        </Badge>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Connect <span className="text-gradient-purple">With Me</span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Let's build together. Reach out via GitHub to inspect raw codebase assets, or connect on LinkedIn to engage on full-time engineering prospects.
        </p>
      </div>

      {/* Grid containing GitHub & LinkedIn Profiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {socialProfiles.map((profile, idx) => {
          const Icon = profile.icon;

          return (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ 
                type: 'spring', 
                stiffness: 90, 
                damping: 15,
                delay: idx * 0.15 
              }}
              className="group h-full"
            >
              <Card 
                className={`p-6 md:p-8 h-full flex flex-col justify-between gap-8 relative overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 transition-all duration-300 ${profile.borderColor}`}
                glowColor={profile.glow}
              >
                {/* Custom Gradient Underlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${profile.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none`} />
                
                <div className="space-y-5 relative z-10">
                  {/* Top line with Icon and Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center ${profile.accentColor} group-hover:scale-110 group-hover:border-white/20 transition-all duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <Badge variant="indigo" className="text-[10px] font-mono tracking-wider uppercase bg-white/[0.02] border-white/5 text-gray-400">
                      {profile.badge}
                    </Badge>
                  </div>

                  {/* Profile Header information */}
                  <div className="space-y-1">
                    <h3 className="font-display font-extrabold text-2xl text-white tracking-tight group-hover:text-white/90 transition-colors">
                      {profile.name}
                    </h3>
                    <p className="font-mono text-xs text-gray-500 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-purple-400" />
                      {profile.username}
                    </p>
                  </div>

                  {/* Short Description */}
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {profile.description}
                  </p>

                  {/* Simulated High-Fidelity Stats Bar */}
                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/[0.04]">
                    {profile.stats.map((stat) => (
                      <div key={stat.label} className="text-left space-y-0.5">
                        <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider">{stat.label}</span>
                        <span className="block text-sm font-semibold text-white tracking-tight font-display">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Platform Action Trigger Button */}
                <div className="relative z-10 pt-2">
                  <a 
                    href={profile.href}
                    target="_blank"
                    rel="noreferrer referrer"
                    className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/10 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>Visit Profile</span>
                    <ArrowUpRight className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>

              </Card>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}

// Custom SVG-based LinkedIn icon for pixel-perfect brand alignment
function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
