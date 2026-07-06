/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Variants } from 'motion/react';

// Standard transition settings
export const defaultTransition = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 15,
  mass: 1,
};

export const slowTransition = {
  type: 'spring' as const,
  stiffness: 50,
  damping: 20,
};

// Fade animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: defaultTransition
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: defaultTransition
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: defaultTransition
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: defaultTransition
  },
};

// Scale/Hover animations
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: defaultTransition
  },
};

// Stagger container
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// Magnetic hover effect (standard button/card response)
export const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.2 },
};

export const hoverScaleMild = {
  scale: 1.01,
  y: -2,
  transition: { duration: 0.2 },
};
