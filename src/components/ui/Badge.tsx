/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  className?: string;
  variant?: 'purple' | 'blue' | 'indigo' | 'cyan' | 'emerald';
}

export function Badge({
  children,
  className,
  variant = 'indigo',
  ...props
}: BadgeProps) {
  const variants = {
    purple: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    blue: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    indigo: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border backdrop-blur-md transition-all duration-300",
        variants[variant],
        className
      )}
      {...props}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current animate-pulse-slow" />
      {children}
    </span>
  );
}
