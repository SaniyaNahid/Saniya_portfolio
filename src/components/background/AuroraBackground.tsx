/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GlowingBlobs } from './GlowingBlobs';

export function AuroraBackground() {
  return (
    <div className="fixed inset-0 w-full h-full bg-[#050505] z-0 pointer-events-none overflow-hidden">
      {/* Dynamic Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(139, 92, 246, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Aurora Gradient Radiance */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-screen animate-aurora"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% -20%, rgba(120, 119, 198, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 0% 100%, rgba(59, 130, 246, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.15) 0%, transparent 40%)
          `,
          backgroundSize: '200% 200%',
        }}
      />

      {/* Floating Glowing Blobs */}
      <GlowingBlobs />

      {/* High-quality vignettes to constrain edges */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50 pointer-events-none" />
    </div>
  );
}
