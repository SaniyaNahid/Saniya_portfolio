import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Sparkles, 
  ArrowRight, 
  Download, 
  Brain, 
  Cpu, 
  Code2, 
  Database, 
  Layers, 
  ChevronDown,
  Terminal,
  Server,
  Network
} from 'lucide-react';
import { Button } from './ui/Button';

// --- TYPING EFFECT COMPONENT ---
function TypingEffect({ texts, speed = 80, delay = 2000 }: { texts: string[]; speed?: number; delay?: number }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor timer
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typing logic
  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      const holdTimeout = setTimeout(() => setReverse(true), delay);
      return () => clearTimeout(holdTimeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const typingTimeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? speed / 2 : speed);

    return () => clearTimeout(typingTimeout);
  }, [subIndex, index, reverse, texts, speed, delay]);

  return (
    <span className="inline-block min-h-[1.5em] text-purple-400 font-mono font-bold">
      {texts[index].substring(0, subIndex)}
      <span className={`${blink ? 'opacity-100' : 'opacity-0'} font-sans text-purple-300 transition-opacity duration-100 ml-0.5`}>|</span>
    </span>
  );
}

// --- CANVAS PARTICLES COMPONENT ---
function CanvasParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 800);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || 800;
    };

    window.addEventListener('resize', handleResize);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.size = Math.random() * 1.5 + 0.6;
        this.color = `rgba(${139 + Math.random() * 50}, ${92 + Math.random() * 50}, 246, ${0.15 + Math.random() * 0.35})`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const particleCount = Math.min(80, Math.floor((width * height) / 14000));
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.15;
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      drawConnections();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

// --- SLOW FLOATING TECH ICONS ---
interface FloatingTechProps {
  icon: React.ComponentType<any>;
  className: string;
  delay: number;
  duration: number;
  label: string;
}

function FloatingTech({ icon: Icon, className, delay, duration, label }: FloatingTechProps) {
  return (
    <motion.div
      className={`absolute ${className} z-10 pointer-events-none hidden md:block`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0.15, 0.45, 0.15],
        scale: [1, 1.06, 0.94, 1],
        y: [0, -18, 18, 0],
        x: [0, 10, -10, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/[0.02] border border-white/[0.05] shadow-xl backdrop-blur-md">
        <Icon className="w-4 h-4 text-purple-400" />
        <span className="text-[10px] text-gray-400 font-mono tracking-wider font-semibold uppercase">{label}</span>
      </div>
    </motion.div>
  );
}

// --- OUTSTANDING HERO COMPONENT ---
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Track mouse coordinates relative to Hero section container
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const roles = [
    'AI Engineer',
    'Software Developer',
    'Data Science Enthusiast',
  ];

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 px-6 md:px-12 bg-[#050505]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Interactive Mouse Spotlight Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000 z-1"
        style={{
          opacity: isHovered ? 1 : 0.4,
          background: `radial-gradient(650px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.06), transparent 80%)`
        }}
      />

      {/* 2. Particles constellation network layer */}
      <CanvasParticles />

      {/* 3. Floating Technology Tags / Milestones */}
      <FloatingTech icon={Brain} className="top-[20%] left-[8%]" delay={0} duration={12} label="PyTorch / JAX" />
      <FloatingTech icon={Cpu} className="top-[15%] right-[10%]" delay={2} duration={10} label="LLM Inference" />
      <FloatingTech icon={Code2} className="bottom-[22%] left-[12%]" delay={1.5} duration={14} label="React / Node" />
      <FloatingTech icon={Database} className="bottom-[18%] right-[12%]" delay={3} duration={11} label="SQL / Spanner" />
      <FloatingTech icon={Network} className="top-[48%] left-[5%]" delay={4} duration={13} label="Neural Networks" />

      {/* Hero content grid container */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 mt-10 lg:mt-0">
        
        {/* LEFT COLUMN: Texts and CTA Buttons */}
        <div className="lg:col-span-7 flex flex-col items-start text-left gap-6 md:gap-8 order-2 lg:order-1">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span className="text-xs font-mono text-purple-300 tracking-wider uppercase font-semibold">Available for New Projects</span>
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-none"
            >
              Hi, I'm <br />
              <span className="text-gradient-purple block mt-1 pb-1">Shaik Saniya Nahid</span>
            </motion.h1>

            {/* Dynamic typing roles animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg sm:text-2xl md:text-3xl font-display font-medium tracking-wide flex items-center gap-2 h-[40px] text-gray-200"
            >
              <span className="text-white/80">I am a</span>
              <TypingEffect texts={roles} />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="text-gray-400 text-sm sm:text-lg max-w-xl leading-relaxed font-sans"
          >
            Computer Science student passionate about Artificial Intelligence, Software Development, and continuous learning.Exploring modern technologies through hands-on projects and strengthening my problem-solving skills every day.Aspiring to build innovative solutions that create a positive real-world impact.
          </motion.p>

          {/* Social Icons Trigger */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex items-center gap-4 py-2"
          >
            {[
              { icon: Github, href: 'https://github.com/SaniyaNahid', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/shaik-saniya-nahid-926403384', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:shaiksaniya1828@gmail.com', label: 'Email' },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-11 h-11 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/10 hover:border-purple-500/20 shadow-lg shadow-black/20 transition-all duration-300"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-2"
          >
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 group relative overflow-hidden"
            >
              <span className="flex items-center justify-center gap-2">
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
            </Button>
            
            <Button 
              variant="glass" 
              size="lg" 
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/Saniya_Nahid_Resume.pdf';
                link.setAttribute('download', 'Shaik_Saniya_Nahid_Resume.pdf');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="w-full sm:w-auto text-white border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Resume
            </Button>
          </motion.div>

        </div>

        {/* RIGHT COLUMN: Premium Glowing Profile Image Placeholder */}
        <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 100, damping: 15 }}
            className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 aspect-square max-w-full"
          >
            
            {/* Ambient Background Outer Pulsing Aura */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-purple-600/30 via-indigo-600/20 to-blue-500/30 blur-[45px] animate-pulse" />
            
            {/* Animated Concentric Tech Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-3xl border border-dashed border-purple-500/20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-3 rounded-3xl border border-purple-500/10 pointer-events-none"
            />
            <motion.div
              animate={{ scale: [1, 1.04, 0.96, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-6 rounded-full border border-purple-500/15 pointer-events-none"
            />

            {/* Glowing avatar card wrapper with floating effect */}
            <motion.div
              animate={{
                y: [0, -12, 12, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-8 rounded-[2rem] overflow-hidden glass-card p-2 flex items-center justify-center shadow-2xl border border-white/10 group cursor-pointer"
            >
              
              {/* Premium Shaik Saniya Nahid Profile Photo */}
              <div className="w-full h-full rounded-[1.6rem] overflow-hidden bg-[#0c0a1a] relative flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500">
                <img 
                  src="/images/My_image.jpeg" 
                  alt="Shaik Saniya Nahid" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover select-none"
                />
                
                {/* Overlay subtle border inside */}
                <div className="absolute inset-0 border border-white/10 rounded-[1.6rem] pointer-events-none" />

                {/* Cyber premium floating label */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-purple-500/40 text-[9px] font-mono text-purple-300 font-extrabold tracking-widest uppercase whitespace-nowrap shadow-xl">
                  AI ENGINEER ACTIVE
                </div>

                {/* Gloss flare reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              </div>
            </motion.div>

          </motion.div>
        </div>

      </div>

      {/* 4. Smooth scrolling indicator mouse wheel */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors duration-300 select-none z-10">
        <span className="text-[10px] font-mono uppercase tracking-widest font-semibold opacity-60">Scroll to Explore</span>
        <motion.div 
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-6 h-10 rounded-full border border-gray-600 flex justify-center py-1.5 cursor-pointer hover:border-purple-400/50 transition-colors"
          whileHover={{ y: 2 }}
        >
          <motion.div 
            animate={{ 
              y: [0, 10, 0],
              opacity: [1, 0.4, 1]
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="w-1.5 h-1.5 rounded-full bg-purple-400"
          />
        </motion.div>
      </div>

    </section>
  );
}
