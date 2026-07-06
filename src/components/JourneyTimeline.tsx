import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  Terminal, 
  Braces, 
  Globe, 
  BrainCircuit, 
  Sparkles, 
  TrendingUp, 
  Calendar, 
  ChevronRight, 
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { Badge } from './ui/Badge';

// Milestones Data
const MILESTONES = [
  {
    id: 1,
    title: "Started Programming",
    subtitle: "Phase 1: The Inception",
    desc: "Began my programming journey by learning fundamental concepts and problem-solving techniques.",
    icon: Terminal,
    color: "purple" as const,
    glow: "rgba(168, 85, 247, 0.4)",
    gradient: "from-purple-500 to-indigo-500",
    badge: "Genesis"
  },
  {
    id: 2,
    title: "Learning Python",
    subtitle: "Phase 2: Computational Math",
    desc: "Developed a strong foundation in Python, including data structures, algorithms, and object-oriented programming.",
    icon: Braces,
    color: "blue" as const,
    glow: "rgba(59, 130, 246, 0.4)",
    gradient: "from-blue-500 to-cyan-500",
    badge: "Core Logic"
  },
  {
    id: 3,
    title: "Learning Web Development",
    subtitle: "Phase 3: Interactive UIs",
    desc: "Built responsive websites using HTML, CSS, JavaScript, React, Next.js, and Tailwind CSS while understanding modern frontend development.",
    icon: Globe,
    color: "indigo" as const,
    glow: "rgba(99, 102, 241, 0.4)",
    gradient: "from-indigo-500 to-purple-500",
    badge: "Web Stack"
  },
  {
    id: 4,
    title: "Exploring AI & Data Science",
    subtitle: "Phase 4: Predictive Models",
    desc: "Studying Machine Learning, Deep Learning, Data Science, Generative AI, and Prompt Engineering while experimenting with AI tools and real-world applications.",
    icon: BrainCircuit,
    color: "purple" as const,
    glow: "rgba(139, 92, 246, 0.4)",
    gradient: "from-purple-500 via-violet-500 to-indigo-500",
    badge: "Intelligent Systems"
  },
  {
    id: 5,
    title: "Building Real Projects",
    subtitle: "Phase 5: Full-Scale Engineering",
    desc: "Creating practical projects such as AI Study Assistant, AI Resume Analyzer, Medical AI Assistant, and Data Science applications to strengthen development skills.",
    icon: Sparkles,
    color: "blue" as const,
    glow: "rgba(59, 130, 246, 0.4)",
    gradient: "from-blue-500 to-teal-500",
    badge: "Portfolio Prototypes"
  },
  {
    id: 6,
    title: "Preparing for Software Engineering Career",
    subtitle: "Phase 6: Professional Track",
    desc: "Actively improving Data Structures & Algorithms, system design fundamentals, Git/GitHub workflow, and interview preparation to become a skilled Software Engineer.",
    icon: TrendingUp,
    color: "indigo" as const,
    glow: "rgba(99, 102, 241, 0.4)",
    gradient: "from-indigo-500 to-blue-500",
    badge: "Career Ready"
  }
];

// Interactive 3D Tilt Card specifically designed for Timeline Milestones
function TimelineTiltCard({ 
  children, 
  glowColor = 'rgba(139, 92, 246, 0.35)', 
  className = '' 
}: { 
  children: React.ReactNode; 
  glowColor?: string;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  // Spring animations for 3D rotation
  const rotateX = useSpring(coords.y * -15, { damping: 20, stiffness: 150 });
  const rotateY = useSpring(coords.x * 15, { damping: 20, stiffness: 150 });

  return (
    <div className="perspective-1000 w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`relative rounded-2xl glass-card p-6 md:p-8 bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors duration-300 shadow-xl ${className}`}
      >
        {/* Dynamic backlighting glow */}
        <div 
          className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${glowColor} 0%, transparent 70%)`,
            opacity: isHovered ? 0.08 : 0.03,
          }}
        />

        {/* Dynamic glare shine */}
        {isHovered && (
          <div 
            className="absolute inset-0 rounded-2xl pointer-events-none z-20 mix-blend-overlay"
            style={{
              background: `radial-gradient(circle at ${(coords.x + 0.5) * 100}% ${(coords.y + 0.5) * 100}%, rgba(255, 255, 255, 0.12) 0%, transparent 50%)`,
            }}
          />
        )}

        {/* Content Container with depth */}
        <div style={{ transform: 'translateZ(15px)' }} className="relative z-10">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  // Desktop Scroll-Linked Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Mobile Swipe-Linked Progress
  const { scrollXProgress } = useScroll({
    container: mobileScrollRef,
    axis: "x"
  });

  // Smooth springs for progress bars
  const smoothYProgress = useSpring(scrollYProgress, { damping: 15, stiffness: 100 });
  const smoothXProgress = useSpring(scrollXProgress, { damping: 15, stiffness: 100 });

  const scrollMobile = (direction: 'left' | 'right') => {
    if (mobileScrollRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      mobileScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="journey" className="scroll-mt-24 py-20 px-6 max-w-7xl mx-auto w-full relative overflow-hidden">
      
      {/* Decorative blurred background shapes */}
      <div className="absolute top-[25%] left-[-10%] w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[25%] right-[-10%] w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col gap-4 mb-16 text-center">
        <Badge variant="purple" className="self-center">Chronological Progress</Badge>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          My Learning <span className="text-gradient-purple">Journey</span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          A premium chronicle showcasing my persistent expansion, technological leaps, and milestones toward becoming an elite AI and Software Engineer.
        </p>
      </div>

      {/* ==================== DESKTOP VERTICAL TIMELINE ==================== */}
      <div ref={containerRef} className="hidden md:block relative max-w-5xl mx-auto py-10">
        
        {/* Background Guide Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/[0.06] rounded-full" />

        {/* Animated Fill Line */}
        <motion.div 
          style={{ 
            scaleY: smoothYProgress,
            originY: 0
          }}
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 via-indigo-500 to-blue-500 rounded-full"
        />

        {/* Timeline Milestones Grid */}
        <div className="space-y-16">
          {MILESTONES.map((item, idx) => {
            const isEven = idx % 2 === 0;
            const IconComponent = item.icon;

            return (
              <div key={item.id} className="grid grid-cols-12 gap-4 items-center relative">
                
                {/* Node Center Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 flex items-center justify-center z-20">
                  {/* Glowing core dot */}
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    className="w-4 h-4 rounded-full bg-white border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)] relative"
                  >
                    {/* Pulsing ring */}
                    <div className="absolute -inset-2 rounded-full border border-purple-500/30 animate-ping" />
                  </motion.div>
                </div>

                {/* Left side content (renders card if even, meta if odd) */}
                <div className={`col-span-5 ${isEven ? 'text-right pr-8' : 'pl-8 col-start-7 order-2'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                  >
                    <TimelineTiltCard glowColor={item.glow}>
                      <div className="flex flex-col gap-4 text-left">
                        {/* Header Row */}
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} p-[1px]`}>
                            <div className="w-full h-full rounded-[11px] bg-slate-950 flex items-center justify-center text-white">
                              <IconComponent className="w-4.5 h-4.5" />
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-400">
                              {item.badge}
                            </span>
                            <h3 className="font-display font-bold text-lg text-white leading-snug">
                              {item.title}
                            </h3>
                          </div>
                        </div>

                        {/* Subtitle */}
                        <p className="text-xs font-mono text-gray-500">
                          {item.subtitle}
                        </p>

                        {/* Description */}
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </TimelineTiltCard>
                  </motion.div>
                </div>

                {/* Center Gap Col (Spans Node area) */}
                <div className="col-span-2" />

                {/* Opposite side meta details */}
                <div className={`col-span-5 ${isEven ? 'pl-8 col-start-7 text-left' : 'text-right pr-8 col-start-1'}`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 0.6, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col gap-1.5"
                  >
                    <span className="font-display font-black text-4xl text-white/5">0{item.id}</span>
                    <Badge variant="indigo" className="self-start md:self-auto inline-flex px-3 py-1 font-mono text-xs uppercase tracking-wider bg-white/[0.01] border-white/5 text-gray-400">
                      Milestone Phase 0{item.id}
                    </Badge>
                  </motion.div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* ==================== MOBILE HORIZONTAL TIMELINE ==================== */}
      <div className="block md:hidden w-full relative">
        
        {/* Navigation Arrows & Indicator bar */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-gray-500">
            <span>Swipe milestones</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => scrollMobile('left')}
              className="p-2 rounded-lg bg-white/[0.03] border border-white/5 active:bg-white/[0.08] text-gray-400 active:text-white transition-all cursor-pointer"
              aria-label="Previous Milestone"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => scrollMobile('right')}
              className="p-2 rounded-lg bg-white/[0.03] border border-white/5 active:bg-white/[0.08] text-gray-400 active:text-white transition-all cursor-pointer"
              aria-label="Next Milestone"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Background Horizontal Line */}
        <div className="absolute top-[32px] left-6 right-6 h-[2px] bg-white/[0.06] rounded-full z-0" />

        {/* Animated Horizontal Progress Bar linked to scrollXProgress */}
        <motion.div 
          style={{ 
            scaleX: smoothXProgress,
            originX: 0
          }}
          className="absolute top-[32px] left-6 right-6 h-[2px] bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full z-10"
        />

        {/* Horizontal Swiper Container */}
        <div 
          ref={mobileScrollRef}
          className="flex overflow-x-auto gap-6 pb-8 pt-2 scrollbar-none snap-x snap-mandatory relative z-20"
          style={{ scrollbarWidth: 'none' }}
        >
          {MILESTONES.map((item, idx) => {
            const IconComponent = item.icon;

            return (
              <div 
                key={item.id} 
                className="w-[290px] shrink-0 snap-center first:pl-2 last:pr-2 flex flex-col gap-6"
              >
                
                {/* Node marker alignment */}
                <div className="flex items-center gap-4 pl-4 relative">
                  <div className="w-6 h-6 rounded-full bg-slate-900 border-2 border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.6)] flex items-center justify-center z-20">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  </div>
                  <span className="font-mono text-xs font-bold text-gray-500">0{item.id} / Milestone</span>
                </div>

                {/* Timeline Glass Card */}
                <TimelineTiltCard glowColor={item.glow} className="h-full">
                  <div className="flex flex-col gap-4 text-left">
                    {/* Header Row */}
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.gradient} p-[1px]`}>
                        <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center text-white">
                          <IconComponent className="w-4 h-4" />
                        </div>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-purple-400">
                          {item.badge}
                        </span>
                        <h3 className="font-display font-bold text-sm text-white leading-snug">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Subtitle */}
                    <p className="text-[11px] font-mono text-gray-500">
                      {item.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-gray-300 text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </TimelineTiltCard>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
