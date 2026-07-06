/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HTMLAttributes, ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowColor?: 'purple' | 'blue' | 'indigo' | 'none';
}

export function Card({
  children,
  className,
  hoverEffect = true,
  glowColor = 'indigo',
  ...props
}: CardProps) {
  const glowClasses = {
    purple: "hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.3)] hover:border-violet-500/30",
    blue: "hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)] hover:border-blue-500/30",
    indigo: "hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)] hover:border-indigo-500/30",
    none: "",
  };

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        "relative rounded-2xl glass-card transition-all duration-300",
        hoverEffect && glowClasses[glowColor],
        className
      )}
      {...props as any}
    >
      {/* Decorative inner light reflection border */}
      <div className="absolute inset-px rounded-[15px] bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />
      
      {/* Glow highlight spot */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-violet-500/0 via-violet-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}
