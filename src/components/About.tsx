import React from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Target, 
  Heart, 
  BrainCircuit, 
  Globe, 
  Database, 
  Calendar, 
  Award,
  ChevronRight,
  TrendingUp,
  Cpu,
  Code
} from 'lucide-react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';

export function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const statItems = [
    { label: 'Academic Year', value: '3rd Year', sub: 'B.Tech CSE', icon: GraduationCap, color: 'text-purple-400' },
    { label: 'Core Projects', value: '3+', sub: 'Intelligent Shells', icon: Code, color: 'text-blue-400' },
    { label: 'Tech Stack Stacked', value: '6+', sub: 'Tools & SDKs', icon: Cpu, color: 'text-indigo-400' },
    { label: 'Active Passion', value: '100%', sub: 'AI and web development', icon: Target, color: 'text-emerald-400' },
  ];

  const educationTimeline = [
    {
      degree: 'B.Tech in Computer Science and Engineering',
      institution: 'Vardhaman College of Engineering',
      period: '2024 - 2028 (Expected)',
      status: 'Current (Third Year)',
      description: 'Gaining foundations in Computational Mathematics, Algorithms, Data Structures, and introductory Machine Learning techniques.',
      icon: GraduationCap,
    },
    {
      degree: 'Intermediate',
      institution: 'Sri Chaitanya Junior College',
      period: '2022 - 2024',
      status: 'Completed with Excellence',
      description: 'Focused deeply on Physics, Chemistry, Mathematics, and Computer Science. Participated in multiple high-school coding clubs.',
      icon: Award,
    }
  ];

  const interests = [
    {
      title: 'Artificial Intelligence',
      desc: 'Developing AI bots, fine-tuning lightweight models to run efficiently.',
      icon: BrainCircuit,
      color: 'purple',
    },
    {
      title: 'Full Stack Engineering',
      desc: 'Crafting responsive, high-fidelity user experiences using React and Node microservices.',
      icon: Globe,
      color: 'blue',
    },
    {
      title: 'Data Science',
      desc: 'Performing predictive statistical model training, complex data manipulation, and high-quality charts using D3.js.',
      icon: Database,
      color: 'indigo',
    }
  ];

  return (
    <section id="about" className="scroll-mt-24 py-20 px-6 max-w-7xl mx-auto w-full relative">
      
      {/* Visual background gradient blur */}
      <div className="absolute top-[20%] right-[10%] w-[250px] h-[250px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      {/* About Section Header */}
      <div className="flex flex-col gap-4 mb-16 text-center">
        <Badge variant="purple" className="self-center">Profile Blueprint</Badge>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          About <span className="text-gradient-purple">Saniya Nahid</span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Get a transparent look into my academic baseline, career ambitions, and deep-seated technical focus areas.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        
        {/* LEFT COLUMN: Narrative & Career Goals (7 Cols) */}
        <div className="lg:col-span-7 space-y-8 flex flex-col h-full">
          
          {/* Main Introduction Card */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 md:p-8" glowColor="purple">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <BrainCircuit className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">Who I Am</h3>
                    <p className="text-xs font-mono text-purple-300">Undergraduate Academic Path</p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm sm:text-base leading-relaxed pt-2">
                  I am a passionate <span className="text-white font-semibold">Third Year B.Tech student</span> focused on the intersections of Artificial Intelligence, Machine Learning, Data Science, and Full Stack Development. 
                </p>
                
                <p className="text-gray-400 text-sm leading-relaxed">
                  My learning journey is fueled by a profound curiosity regarding how machine decision pipelines can be safely scaled to deliver instantaneous, tangible human value in real-world user interfaces.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Career Goal Card */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 md:p-8" glowColor="indigo">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Target className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">Career Goal</h3>
                    <p className="text-xs font-mono text-indigo-300">Ultimate Engineering Horizon</p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed pt-1">
                  My long-term aspiration is to <span className="text-white font-semibold">become a Lead AI Engineer</span> who specializes in designing and scaling impactful, highly intelligent edge applications. 
                </p>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex gap-3 items-start">
                  <TrendingUp className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-400 leading-relaxed">
                    By combining foundational statistical data processing with modern, reactive client technologies, I build systems that make complex AI intelligence accessible, lightning-fast, and deeply contextual.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Interests Section */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Core Interest Spheres</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {interests.map((interest, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <Card className="p-5 h-full flex flex-col gap-3 justify-between" glowColor={interest.color as any}>
                    <div className="space-y-2.5">
                      <div className={`w-9 h-9 rounded-xl bg-${interest.color}-500/10 border border-${interest.color}-500/20 flex items-center justify-center text-${interest.color}-400`}>
                        <interest.icon className="w-4.5 h-4.5" />
                      </div>
                      <h4 className="font-display font-bold text-sm text-white">{interest.title}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">{interest.desc}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Education Timeline & Stats (5 Cols) */}
        <div className="lg:col-span-5 space-y-8 flex flex-col h-full">
          
          {/* Animated Statistics */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            {statItems.map((stat, i) => (
              <div key={i} className="h-full">
                <Card className="p-5 text-center flex flex-col items-center justify-center gap-1.5 h-full" glowColor="blue">
                  <div className={`w-8 h-8 rounded-full bg-white/[0.03] flex items-center justify-center ${stat.color} mb-1 mx-auto`}>
                    <stat.icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs text-gray-500 uppercase tracking-wider">{stat.label}</span>
                  <span className="text-2xl font-display font-black text-white">{stat.value}</span>
                  <span className="text-[10px] text-gray-400 font-mono">{stat.sub}</span>
                </Card>
              </div>
            ))}
          </motion.div>

          {/* Education Timeline */}
          <motion.div variants={itemVariants} className="flex-1">
            <Card className="p-6 md:p-8 h-full flex flex-col gap-6" glowColor="indigo">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <GraduationCap className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Education Timeline</h3>
                  <p className="text-xs font-mono text-purple-300">Verified Academic Record</p>
                </div>
              </div>

              <div className="relative border-l border-white/10 ml-3.5 pl-5 space-y-6 pt-2">
                {educationTimeline.map((edu, idx) => (
                  <div key={idx} className="relative">
                    {/* Node Dot */}
                    <div className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-purple-500 border-2 border-[#050505] shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                    
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-1.5">
                        <h4 className="font-display font-bold text-sm text-white leading-snug">
                          {edu.degree}
                        </h4>
                        <span className="text-[10px] font-mono text-purple-400 font-semibold bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                          {edu.period}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-gray-400">{edu.institution}</span>
                        <span className="text-emerald-400 font-medium">{edu.status}</span>
                      </div>

                      <p className="text-gray-500 text-xs leading-relaxed pt-0.5">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

        </div>

      </motion.div>

    </section>
  );
}
