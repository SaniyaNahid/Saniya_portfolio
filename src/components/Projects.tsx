import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { 
  Sparkles, 
  Terminal, 
  Code2, 
  FileText, 
  GraduationCap, 
  BrainCircuit, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  Layers, 
  Play, 
  Bookmark, 
  BarChart3, 
  Cpu, 
  ChevronRight, 
  HelpCircle,
  MessageSquare,
  Volume2
} from 'lucide-react';
import { Badge } from './ui/Badge';

// Interfaces
interface ProjectItem {
  id: string;
  title: string;
  desc: string;
  badges: string[];
  glowColor: 'purple' | 'blue' | 'indigo' | 'emerald';
  liveUrl: string;
  githubUrl: string;
  renderMockup: () => React.ReactNode;
}

// Interactive 3D Tilt Component
function TiltCard({ 
  children, 
  className = '', 
  glowColor = 'indigo' 
}: { 
  children: React.ReactNode; 
  className?: string; 
  glowColor?: 'purple' | 'blue' | 'indigo' | 'emerald' 
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tracking cursor position (-0.5 to 0.5 range)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotational transformations
  const springConfig = { damping: 22, stiffness: 220, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig);

  // Translate-Z mock depth for visual layers (3D pop effect)
  const translateZ = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  // Dynamic light flash overlay style
  const opacity = useSpring(isHovered ? 0.3 : 0, springConfig);
  const lightX = useTransform(x, [-0.5, 0.5], ['0%', '100%']);
  const lightY = useTransform(y, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const glowColors = {
    purple: 'shadow-purple-500/10 border-purple-500/20 group-hover:border-purple-500/40',
    blue: 'shadow-blue-500/10 border-blue-500/20 group-hover:border-blue-500/40',
    indigo: 'shadow-indigo-500/10 border-indigo-500/20 group-hover:border-indigo-500/40',
    emerald: 'shadow-emerald-500/10 border-emerald-500/20 group-hover:border-emerald-500/40',
  };

  const ambientGlows = {
    purple: 'bg-purple-500/5',
    blue: 'bg-blue-500/5',
    indigo: 'bg-indigo-500/5',
    emerald: 'bg-emerald-500/5',
  };

  return (
    <div className="perspective-1000 w-full h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`group relative rounded-2xl border bg-white/[0.01] backdrop-blur-md p-6 h-full flex flex-col justify-between transition-all duration-300 shadow-xl ${glowColors[glowColor]} ${className}`}
      >
        {/* Ambient back lighting */}
        <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${ambientGlows[glowColor]} ${isHovered ? 'opacity-100' : 'opacity-40'}`} />

        {/* Dynamic glare shine overlay */}
        <motion.div
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)',
            left: lightX,
            top: lightY,
            opacity,
          }}
          className="absolute -inset-20 rounded-full pointer-events-none z-30"
        />

        {/* Extra decorative corner accents */}
        <div className="absolute top-3 left-3 w-1.5 h-1.5 border-t border-l border-white/20 rounded-tl pointer-events-none" />
        <div className="absolute top-3 right-3 w-1.5 h-1.5 border-t border-r border-white/20 rounded-tr pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-1.5 h-1.5 border-b border-l border-white/20 rounded-bl pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-1.5 h-1.5 border-b border-r border-white/20 rounded-br pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full justify-between" style={{ transform: 'translateZ(20px)' }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export function Projects() {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  // Dynamic illustrative mockups
  const renderResumeMockup = () => {
    return (
      <div className="w-full h-44 rounded-xl bg-slate-950/80 border border-purple-500/20 overflow-hidden relative p-4 flex flex-col justify-between group/mock">
        {/* Animated matrix scanning line */}
        <motion.div 
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_8px_rgba(168,85,247,0.8)] z-20 pointer-events-none"
        />

        <div className="flex gap-3 h-full items-stretch">
          {/* Mock PDF Document representation */}
          <div className="w-[45%] rounded-lg bg-white/[0.02] border border-white/10 p-2.5 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center gap-1.5 border-b border-white/5 pb-1.5">
              <FileText className="w-3.5 h-3.5 text-purple-400" />
              <span className="font-mono text-[8px] text-gray-400 truncate">resume_draft.pdf</span>
            </div>
            
            <div className="space-y-1.5 py-1 flex-1">
              <div className="h-1.5 w-full bg-white/10 rounded-full" />
              <div className="h-1.5 w-5/6 bg-white/10 rounded-full" />
              <div className="h-1.5 w-4/5 bg-white/10 rounded-full" />
              <div className="h-1.5 w-11/12 bg-white/10 rounded-full" />
            </div>

            <div className="flex items-center gap-1 text-[8px] text-purple-300 font-mono">
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
              <span>Parsed 42 entities</span>
            </div>
          </div>

          {/* Core score widget on the right */}
          <div className="flex-1 flex flex-col justify-between gap-2.5">
            {/* Live ATS Match Grade Ring */}
            <div className="flex-1 rounded-lg bg-white/[0.02] border border-white/10 p-3 flex flex-col items-center justify-center relative overflow-hidden">
              {/* Spinning circular loading arc background */}
              <svg className="w-16 h-16 transform -rotate-90">
                <circle cx="32" cy="32" r="26" className="stroke-white/5 fill-none" strokeWidth="4" />
                <motion.circle 
                  cx="32" 
                  cy="32" 
                  r="26" 
                  className="stroke-purple-500 fill-none" 
                  strokeWidth="4" 
                  strokeDasharray="163"
                  initial={{ strokeDashoffset: 163 }}
                  whileInView={{ strokeDashoffset: 163 - (163 * 0.94) }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center mt-1">
                <span className="font-display font-black text-white text-sm">94%</span>
                <span className="text-[7px] font-mono text-gray-500 uppercase tracking-widest">ATS Match</span>
              </div>
            </div>

            {/* Keyword chips preview */}
            <div className="flex gap-1.5">
              <div className="flex-1 text-center py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[7px] text-emerald-400 font-mono">
                + Python ML
              </div>
              <div className="flex-1 text-center py-1 rounded bg-amber-500/10 border border-amber-500/20 text-[7px] text-amber-400 font-mono font-bold">
                Missing: CI/CD
              </div>
            </div>
          </div>
        </div>

        {/* Tech backdrop overlay logo */}
        <Cpu className="absolute -bottom-4 -right-4 w-12 h-12 text-purple-500/5 rotate-12" />
      </div>
    );
  };

  const renderStudyMockup = () => {
    return (
      <div className="w-full h-44 rounded-xl bg-slate-950/80 border border-blue-500/20 overflow-hidden relative p-4 flex flex-col justify-between group/mock">
        {/* Background circuit graphics */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:12px_12px]" />

        <div className="flex flex-col h-full gap-3 justify-between">
          {/* Deck of active notes modules */}
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span className="font-display font-bold text-[10px] text-white">Study Module: AI Ethics</span>
            </div>
            <Badge variant="blue" className="px-1.5 py-0 text-[8px]">Streak: 12 Days</Badge>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-3 pt-1">
            {/* Dynamic Flashcard Interactive Preview */}
            <motion.div 
              whileHover={{ rotateY: 10 }}
              className="rounded-lg bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 p-2.5 flex flex-col justify-between"
            >
              <div className="flex justify-between items-center">
                <span className="text-[7px] font-mono text-blue-300 uppercase tracking-wider">Concept Card</span>
                <Bookmark className="w-2.5 h-2.5 text-blue-400" />
              </div>
              <p className="text-[8px] text-gray-300 leading-snug font-medium pt-1">
                How does reinforcement feedback scale model safety alignment?
              </p>
              <span className="text-[7px] font-mono text-gray-500 italic text-right">Click to Flip</span>
            </motion.div>

            {/* Simulated Quiz progress tracker */}
            <div className="rounded-lg bg-white/[0.02] border border-white/10 p-2.5 flex flex-col justify-between">
              <span className="text-[7px] font-mono text-gray-400 uppercase tracking-wider">Mastery Curve</span>
              
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[8px] font-mono text-gray-300">
                  <span>Accuracy Rate</span>
                  <span className="text-emerald-400 font-bold">88%</span>
                </div>
                {/* Micro chart line representing metrics */}
                <div className="h-6 flex items-end gap-1 pt-1">
                  {[20, 45, 30, 60, 50, 85].map((val, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-sm" 
                      style={{ height: `${val}%` }} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ambient watermark */}
        <Layers className="absolute -bottom-4 -right-4 w-12 h-12 text-blue-500/5 rotate-12" />
      </div>
    );
  };

  const renderAssistiveMockup = () => {
    return (
      <div className="w-full h-44 rounded-xl bg-slate-950/80 border border-emerald-500/20 overflow-hidden relative p-4 flex flex-col justify-between group/mock">
        {/* Watermark grid backings */}
        <div className="absolute inset-0 bg-grid opacity-[0.02]" />

        <div className="flex flex-col h-full gap-2.5 justify-between">
          {/* Connected Agent Pipeline Status */}
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-display font-bold text-[10px] text-white">Assistive AI Engine Active</span>
            </div>
            <span className="font-mono text-[8px] text-emerald-400">FPS: 60 / Node 1.0</span>
          </div>

          {/* Interactive Chat Bubble Feed */}
          <div className="flex-1 flex flex-col gap-2 pt-1">
            {/* User prompt message */}
            <div className="flex gap-2 items-start justify-end">
              <div className="max-w-[70%] bg-white/5 border border-white/10 rounded-lg rounded-tr-none px-2 py-1.5">
                <p className="text-[8px] text-gray-300 leading-normal">
                  "Summarize current data cluster nodes."
                </p>
              </div>
              <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center font-mono text-[7px] text-gray-400 shrink-0">U</div>
            </div>

            {/* AI Response message with voice/pulse waves */}
            <div className="flex gap-2 items-start">
              <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <BrainCircuit className="w-2.5 h-2.5" />
              </div>
              <div className="flex-1 bg-emerald-500/5 border border-emerald-500/10 rounded-lg rounded-tl-none px-2 py-1.5 flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <Volume2 className="w-3 h-3 text-emerald-400 animate-bounce" />
                  <span className="text-[7px] font-mono text-emerald-300 uppercase tracking-wider">Voice feedback dispatching</span>
                </div>
                {/* Voice sound wave visualization bars */}
                <div className="flex gap-0.5 items-center h-4.5 pt-0.5">
                  {[4, 10, 6, 12, 16, 9, 14, 5, 11, 7].map((height, i) => (
                    <motion.div 
                      key={i}
                      animate={{ height: [height / 2, height, height / 2] }}
                      transition={{ duration: 1 + (i % 3) * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-1 bg-emerald-400 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ambient watermark */}
        <Sparkles className="absolute -bottom-4 -right-4 w-12 h-12 text-emerald-500/5 rotate-12" />
      </div>
    );
  };

  const projects: ProjectItem[] = [
    {
      id: 'resume',
      title: 'AI Resume Analyzer',
      desc: 'An intelligent AI-powered PDF compiler and parser. It processes standard resume schemas, conducts instant ATS grading metrics, maps comprehensive skills gap analytics, and leverages Gemini models for semantic keyword suggestions.',
      badges: ['Python', 'Generative AI', 'FastAPI', 'Tailwind CSS', 'PyPDF'],
      glowColor: 'purple',
      liveUrl: 'https://github.com/SaniyaNahid/AI_Resume_Analyzer',
      githubUrl: 'https://github.com/SaniyaNahid/AI_Resume_Analyzer',
      renderMockup: renderResumeMockup
    },
    {
      id: 'study',
      title: 'AI Study Assistant',
      desc: 'An elite, responsive academic companion tool. Generates dynamic context-aware flashcards, drafts comprehensive mock exam modules, summarizes uploaded documents, and visualizes study trajectories with clean interactive metrics charts.',
      badges: ['React', 'Next.js', 'Generative AI', 'MongoDB', 'Node.js'],
      glowColor: 'blue',
      liveUrl: 'https://github.com/SaniyaNahid/AI-Learning-platform',
      githubUrl: 'https://github.com/SaniyaNahid/AI-Learning-platform',
      renderMockup: renderStudyMockup
    },
    {
      id: 'assistive',
      title: 'Smart Assistive AI',
      desc: 'An empathetic, context-grounded task assistant. Features dynamic speech-to-text integration pipelines, agentic execution loop, and smart alerts dispatcher optimized with semantic search pipelines for accessibility challenges.',
      badges: ['JavaScript', 'Generative AI', 'Firebase', 'Framer Motion', 'Google AI Studio'],
      glowColor: 'emerald',
      liveUrl: 'https://github.com/SaniyaNahid/Smart-Assistive-AI',
      githubUrl: 'https://github.com/SaniyaNahid/Smart-Assistive-AI',
      renderMockup: renderAssistiveMockup
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 14
      }
    }
  };

  return (
    <section id="projects" className="scroll-mt-24 py-20 px-6 max-w-7xl mx-auto w-full relative">
      
      {/* Background radial highlight glow */}
      <div className="absolute top-[30%] left-[10%] w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      {/* Header section */}
      <div className="flex flex-col gap-4 mb-16 text-center">
        <Badge variant="indigo" className="self-center">Engineering Portfolio</Badge>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Featured <span className="text-gradient-purple">Projects</span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          A selection of deep-tech engineering integrations featuring real-time AI agents, automated analysis engines, and rich responsive layouts.
        </p>
      </div>

      {/* Grid containing project cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {projects.map((project) => (
          <motion.div 
            key={project.id} 
            variants={cardVariants}
            className="h-full"
          >
            <TiltCard glowColor={project.glowColor}>
              {/* Card visual contents */}
              <div className="space-y-5">
                
                {/* 1. Project Mockup Screenshot Placeholder */}
                {project.renderMockup()}

                {/* 2. Project Meta & Title */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                    <span className="font-mono text-[10px] text-purple-400 uppercase tracking-wider font-bold">Featured Prototype</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-white tracking-tight group-hover:text-purple-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>

                {/* 3. Short description */}
                <p className="text-gray-400 text-xs sm:text-[13px] leading-relaxed line-clamp-4">
                  {project.desc}
                </p>

                {/* 4. Technology Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.badges.map((badge) => (
                    <span key={badge} className="block">
                      <Badge variant="indigo" className="text-[10px] px-2 py-0.5 bg-white/[0.02] border-white/10 hover:bg-white/[0.04] text-gray-300">
                        {badge}
                      </Badge>
                    </span>
                  ))}
                </div>

              </div>

              {/* 5. Bottom Action Controls */}
              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-white/[0.05]">
                {/* Live Demo button */}
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 active:scale-[0.97] transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                >
                  <Play className="w-3.5 h-3.5 text-white fill-white group-hover/btn:translate-x-0.5 transition-transform" />
                  <span>Live Demo</span>
                </a>

                {/* GitHub button */}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] text-gray-400 hover:text-white transition-all duration-200 flex items-center justify-center"
                  title="Source Code"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>

            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}
