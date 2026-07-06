/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

export function GlowingBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Blob 1 - Sophisticated Purple (Top Left) */}
      <motion.div
        className="absolute -top-[100px] -left-[100px] w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[120px]"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Blob 2 - Sophisticated Blue (Bottom Right) */}
      <motion.div
        className="absolute -bottom-[100px] -right-[100px] w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[150px]"
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Blob 3 - Sophisticated Indigo (Top Right Center) */}
      <motion.div
        className="absolute top-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-indigo-500/10 blur-[100px]"
        animate={{
          x: [0, 25, -25, 0],
          y: [0, 40, -40, 0],
          scale: [1, 1.15, 0.85, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
