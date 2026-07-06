import React from 'react';
import { motion } from 'motion/react';
import { 
  Terminal, 
  Cpu, 
  Code2, 
  Database, 
  Layers, 
  Sparkles, 
  BrainCircuit, 
  Globe, 
  Server, 
  GitBranch, 
  Github, 
  AppWindow, 
  Wand2, 
  Braces, 
  FileCode
} from 'lucide-react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';

// Interfaces
interface SkillItem {
  name: string;
  level: number; // 0-100
  label: string; // e.g. "Advanced", "Intermediate"
  icon: React.ComponentType<any>;
}

interface SkillCategory {
  id: string;
  title: string;
  desc: string;
  icon: React.ComponentType<any>;
  glow: 'purple' | 'blue' | 'indigo' | 'none';
  skills: SkillItem[];
}

export function Skills() {
  const categories: SkillCategory[] = [
    {
      id: 'ai',
      title: 'AI & Data Science',
      desc: 'Deep neural models, prompt mechanics, and predictive algorithms.',
      icon: BrainCircuit,
      glow: 'purple',
      skills: [
        { name: 'Machine Learning', level: 60, label: 'Intermediate', icon: Cpu },
        { name: 'Generative AI', level: 80, label: 'Fluent', icon: Sparkles },
        { name: 'Prompt Engineering', level: 95, label: 'Pro', icon: Terminal }
      ]
    },
    {
      id: 'programming',
      title: 'Programming Languages',
      desc: 'Core computational languages and analytical syntaxes.',
      icon: Code2,
      glow: 'blue',
      skills: [
        { name: 'Python', level: 92, label: 'Expert', icon: Terminal },
        { name: 'Java', level: 70, label: 'Fluent', icon: Braces },
        { name: 'JavaScript', level: 60, label: 'Intermediate', icon: Code2 },
        { name: 'SQL', level: 85, label: 'Fluent', icon: Database }
      ]
    },
    {
      id: 'frontend',
      title: 'Frontend Development',
      desc: 'Reactive state structures and high-fidelity layouts.',
      icon: Globe,
      glow: 'indigo',
      skills: [
        { name: 'React', level: 50, label: 'Familiar', icon: Globe },
        { name: 'Next.js', level: 70, label: 'Fluent', icon: Sparkles },
        { name: 'HTML', level: 95, label: 'Advanced', icon: FileCode },
        { name: 'CSS', level: 90, label: 'Expert', icon: Layers }
      ]
    },
    {
      id: 'backend',
      title: 'Backend Engineering',
      desc: 'Server environments, async handling, and secure routing.',
      icon: Server,
      glow: 'purple',
      skills: [
        { name: 'Node.js', level: 60, label: 'familiar', icon: Server }
      ]
    },
    {
      id: 'databases',
      title: 'Databases & Storage',
      desc: 'Durable relational systems and real-time document layers.',
      icon: Database,
      glow: 'blue',
      skills: [
        { name: 'MongoDB', level: 70, label: 'Familiar', icon: Database },
      ]
    },
    {
      id: 'tools',
      title: 'Tools & Platforms',
      desc: 'Developer workflows, version systems, and deployment suites.',
      icon: AppWindow,
      glow: 'indigo',
      skills: [
        { name: 'Git', level: 80, label: 'Fluent', icon: GitBranch },
        { name: 'GitHub', level: 85, label: 'Advanced', icon: Github },
        { name: 'VS Code', level: 90, label: 'Expert', icon: AppWindow },
        { name: 'Google AI Studio', level: 94, label: 'Expert', icon: Wand2 }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="skills" className="scroll-mt-24 py-20 px-6 max-w-7xl mx-auto w-full relative">
      
      {/* Background ambient lighting */}
      <div className="absolute top-[30%] right-[5%] w-[300px] h-[300px] rounded-full bg-violet-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[250px] h-[250px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col gap-4 mb-10 text-center">
        <Badge variant="purple" className="self-center">Skill Matrix</Badge>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Technical <span className="text-gradient-purple">Competency</span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Explore my multi-faceted skill categories spanning Artificial Intelligence, core programming, responsive frontends, and backend storage.
        </p>
      </div>

      {/* PREMIUM CORE TECH STACK CATEGORIES GRID */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {categories.map((cat) => (
          <motion.div key={cat.id} variants={cardVariants} className="h-full">
            <Card className="p-6 h-full flex flex-col justify-between gap-6" glowColor={cat.glow}>
              
              {/* Category Header */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-purple-400 border border-white/10 shadow-inner`}>
                    <cat.icon className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-white">{cat.title}</h3>
                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Active Focus</p>
                  </div>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              {/* Progress bars inside each category */}
              <div className="space-y-4 pt-2 border-t border-white/[0.03]">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5 group/skill">
                    
                    {/* Skill metadata */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <skill.icon className="w-3.5 h-3.5 text-gray-500 group-hover/skill:text-purple-400 transition-colors duration-300" />
                        <span className="font-medium text-gray-300 group-hover/skill:text-white transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-[10px]">
                        <span className="text-gray-500 uppercase tracking-wider">{skill.label}</span>
                        <span className="text-purple-300 font-bold">{skill.level}%</span>
                      </div>
                    </div>

                    {/* Animated Progress bar */}
                    <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/[0.02]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: sIdx * 0.1 }}
                        className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full"
                      />
                    </div>

                  </div>
                ))}
              </div>

            </Card>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}
