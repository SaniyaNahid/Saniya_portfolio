import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  Download, 
  ExternalLink, 
  Eye, 
  Filter, 
  CheckCircle2, 
  X, 
  Calendar, 
  ShieldCheck, 
  Check,
  Cpu, 
  Globe, 
  Sparkles,
  FileSpreadsheet,
  Lock,
  Printer,
  ChevronRight
} from 'lucide-react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';

// Interface
interface Certificate {
  id: string;
  title: string;
  issuer: string;
  credentialId: string;
  date: string;
  category: 'ai' | 'web' | 'cloud';
  skills: string[];
  glow: 'purple' | 'blue' | 'indigo';
  bgGradient: string;
  issuerLogo: React.ComponentType<any>;
  pdfPath: string;
}

export function Certificates() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ai' | 'web' | 'cloud'>('all');
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);
  const [pdfAvailability, setPdfAvailability] = useState<Record<string, boolean>>({});

  // Sample Certificate Datasets
  const certificatesList: Certificate[] = [
    {
      id: 'React',
      title: 'Advanced React',
      issuer: 'Meta',
      credentialId: 'APIH74NV20ZT',
      date: 'Issued June 29, 2026',
      category: 'web',
      skills: [
        'React Hooks',
        'State Management',
        'Component Composition',
        'Performance Optimization',
        'Reusable Components'
      ],
      glow: 'purple',
      bgGradient: 'from-purple-500/10 via-indigo-500/5 to-transparent',
      issuerLogo: Cpu,
      pdfPath: '/certificates/Advanced_React.pdf'
    },
    {
      id: 'html-css',
      title: 'HTML and CSS in depth',
      issuer: 'Meta',
      credentialId: 'S5ATSHLFMRZN',
      date: 'Issued June 26, 2026',
      category: 'web',
      skills: [
        'HTML5',
        'CSS3',
        'Responsive Web Design',
        'CSS Grid & Flexbox',
        'Animations & Transitions'
      ],
      glow: 'purple',
      bgGradient: 'from-violet-500/10 via-purple-500/5 to-transparent',
      issuerLogo: Sparkles,
      pdfPath: '/certificates/HTML_CSS_Depth.pdf'
    },
    {
      id: 'meta-fed',
      title: 'Meta Front-End Developer',
      issuer: 'Meta',
      credentialId: 'Z58EZEPR1W07',
      date: 'Issued June 29, 2026',
      category: 'web',
      skills: [
        'Frontend Development',
        'JavaScript',
        'React',
        'Git & GitHub',
        'Web Accessibility (A11y)',
        'UI/UX Principles'
      ],
      glow: 'blue',
      bgGradient: 'from-blue-500/10 via-cyan-500/5 to-transparent',
      issuerLogo: Globe,
      pdfPath: '/certificates/Meta_Frontend_developer_PC.pdf'
    },
    {
      id: 'ML',
      title: 'Machine Learning with Python',
      issuer: 'IBM',
      credentialId: '0QFATE0Z0V6N',
      date: 'Issued June 29, 2026',
      category: 'ai',
      skills: [
        'Python',
        'Machine Learning',
        'Supervised Learning',
        'Scikit-learn',
        'Model Evaluation'
      ],
      glow: 'indigo',
      bgGradient: 'from-indigo-500/10 via-violet-500/5 to-transparent',
      issuerLogo: Globe,
      pdfPath: '/certificates/Machine_learning_with_python.pdf'
    },
    {
      id: 'Genai',
      title: 'Generative AI: Elevate Your Data Science Career',
      issuer: 'IBM',
      credentialId: 'QMEH7ZWVX9UK',
      date: 'Issued June 29, 2026',
      category: 'ai',
      skills: [
        'Generative AI',
        'Prompt Engineering',
        'LLMs',
        'RAG Systems',
        'NLP'
      ],
      glow: 'blue',
      bgGradient: 'from-blue-500/10 via-indigo-500/5 to-transparent',
      issuerLogo: ShieldCheck,
      pdfPath: '/certificates/Generative_AI.pdf'
    },
    {
      id: 'Ai Essentials',
      title: 'Google AI Essentials',
      issuer: 'Google',
      credentialId: '2NCFGSZ9XNPC',
      date: 'Issued May 26, 2026',
      category: 'ai',
      skills: [
        'Generative AI',
        'Prompt Engineering',
        'AI Productivity',
        'Responsible AI',
        'AI Tools'
      ],
      glow: 'blue',
      bgGradient: 'from-blue-500/10 via-indigo-500/5 to-transparent',
      issuerLogo: ShieldCheck,
      pdfPath: '/certificates/Pc_google_essentials.pdf'
    },
    {
      id: 'python',
      title: 'Python for Data Science, AI & Development',
      issuer: 'IBM',
      credentialId: 'EQDBJ7FJP3A3',
      date: 'Issued June 23, 2026',
      category: 'ai',
      skills: [
        'Python Programming',
        'Data Analysis',
        'NumPy & Pandas',
        'Jupyter Notebooks',
        'Data Visualization'
      ],
      glow: 'blue',
      bgGradient: 'from-blue-500/10 via-indigo-500/5 to-transparent',
      issuerLogo: ShieldCheck,
      pdfPath: '/certificates/python for Data Science,AI and development.pdf'
    },
    {
      id: 'sql',
      title: 'Databases and SQL for Data Science with Python',
      issuer: 'IBM',
      credentialId: '2TQYZ3DX4ZEU',
      date: 'Issued June 21, 2026',
      category: 'ai',
      skills: [
        'SQL',
        'Python',
        'Data Querying',
        'Joins & Aggregations',
        'Database Management'
      ],
      glow: 'indigo',
      bgGradient: 'from-indigo-500/10 via-blue-500/5 to-transparent',
      issuerLogo: FileSpreadsheet,
      pdfPath: '/certificates/SQL for Data Science with python.pdf'
    }
  ];

  // Dynamic file check hook
  useEffect(() => {
    const checkPdfAvailability = async () => {
      const availability: Record<string, boolean> = {};
      await Promise.all(
        certificatesList.map(async (cert) => {
          if (!cert.pdfPath) return;
          try {
            const response = await fetch(cert.pdfPath);
            availability[cert.id] = response.ok;
          } catch (e) {
            availability[cert.id] = false;
          }
        })
      );
      setPdfAvailability(availability);
    };

    checkPdfAvailability();
  }, []);

  // Category list metadata
  const categories = [
    { id: 'all' as const, label: 'All Credentials', count: certificatesList.length },
    { id: 'ai' as const, label: 'AI & Data Science', count: certificatesList.filter(c => c.category === 'ai').length },
    { id: 'web' as const, label: 'Web Development', count: certificatesList.filter(c => c.category === 'web').length }
  ];

  const filteredCerts = selectedCategory === 'all' 
    ? certificatesList 
    : certificatesList.filter(c => c.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 95,
        damping: 14
      }
    }
  };

  // Simulate High-Fidelity Download Progression
  const triggerDownload = (e: React.MouseEvent, cert: Certificate) => {
    e.stopPropagation(); // Avoid triggering card modal popup
    if (downloadedIds.includes(cert.id)) return;
    if (!pdfAvailability[cert.id]) return;

    setDownloadingId(cert.id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedIds(prev => [...prev, cert.id]);
      
      // Download the actual PDF file
      const link = document.createElement('a');
      link.href = cert.pdfPath;
      link.setAttribute('download', cert.pdfPath.split('/').pop() || `${cert.id}.pdf`);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1200);
  };

  return (
    <section id="certificates" className="scroll-mt-24 py-20 px-6 max-w-7xl mx-auto w-full relative">
      
      {/* Absolute blurry layout lights */}
      <div className="absolute top-[20%] right-[-5%] w-[320px] h-[320px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-5%] w-[280px] h-[280px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

      {/* Header section */}
      <div className="flex flex-col gap-4 mb-12 text-center">
        <Badge variant="purple" className="self-center">Verified Credentials</Badge>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Professional <span className="text-gradient-purple">Certificates</span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Industry accredited certifications and continuous study licenses demonstrating deep focus in advanced AI workflows, reactive software design, and database integrity.
        </p>

        {/* Categories Capsules filter */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent shadow-lg shadow-purple-500/10'
                  : 'bg-white/[0.02] hover:bg-white/[0.04] text-gray-400 hover:text-white border-white/5 hover:border-white/10'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-sans ${
                selectedCategory === cat.id 
                  ? 'bg-white/20 text-white' 
                  : 'bg-white/[0.06] text-gray-500 group-hover:text-gray-300'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* CERTIFICATES RESPONISVE GRID */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredCerts.map((cert) => {
            const Icon = cert.issuerLogo;
            const isDownloading = downloadingId === cert.id;
            const isDownloaded = downloadedIds.includes(cert.id);
            const isPdfAvailable = pdfAvailability[cert.id];

            return (
              <motion.div
                key={cert.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                className="h-full group"
                onClick={() => setActiveCert(cert)}
              >
                <Card 
                  className="p-6 h-full flex flex-col justify-between gap-6 relative overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/10 transition-all duration-300 cursor-pointer" 
                  glowColor={cert.glow}
                >
                  {/* Subtle card-specific radial gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cert.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                  <div className="space-y-4 relative z-10">
                    
                    {/* Upper Metadata */}
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest">Verified</span>
                      </div>
                    </div>

                    {/* Certificate Title */}
                    <h3 className="font-display font-bold text-lg text-white leading-snug tracking-tight group-hover:text-purple-300 transition-colors duration-300">
                      {cert.title}
                    </h3>

                    {/* Issuer Details */}
                    <div className="text-xs font-mono space-y-1">
                      <p className="text-purple-300 font-medium">{cert.issuer}</p>
                      <p className="text-gray-500 text-[11px]">ID: {cert.credentialId}</p>
                    </div>

                  </div>

                  {/* Skills tags preview */}
                  <div className="flex flex-wrap gap-1.5 pt-1 relative z-10">
                    {cert.skills.slice(0, 3).map((skill) => (
                      <span key={skill}>
                        <Badge variant="indigo" className="text-[9px] bg-white/[0.02] border-white/5 text-gray-400 font-mono">
                          {skill}
                        </Badge>
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="text-[10px] font-mono text-gray-500 self-center pl-1">
                        +{cert.skills.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Bottom verification and download anchor trigger */}
                  <div className="flex items-center justify-between border-t border-white/[0.05] pt-4 mt-2 relative z-10">
                    <span className="text-xs text-gray-500 font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-purple-400" />
                      {cert.date.replace('Issued ', '')}
                    </span>

                    <div className="flex items-center gap-2">
                      <a
                        href={cert.pdfPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                          !isPdfAvailable
                            ? 'bg-white/[0.01] text-gray-600 border border-white/5 cursor-not-allowed opacity-40 pointer-events-none'
                            : 'bg-white/[0.03] hover:bg-white/[0.08] text-gray-400 hover:text-white border border-white/5 active:scale-95 cursor-pointer'
                        }`}
                      >
                        <Eye className="w-3 h-3" />
                        <span>View</span>
                      </a>

                      <button
                        onClick={(e) => triggerDownload(e, cert)}
                        disabled={isDownloading || !isPdfAvailable}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                          !isPdfAvailable
                            ? 'bg-white/[0.01] text-gray-600 border border-white/5 cursor-not-allowed opacity-40'
                            : isDownloaded 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-pointer'
                              : 'bg-white/[0.03] hover:bg-white/[0.08] text-gray-400 hover:text-white border border-white/5 active:scale-95 cursor-pointer'
                        }`}
                      >
                        {isDownloading ? (
                          <>
                            <div className="w-3 h-3 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                            <span>Downloading</span>
                          </>
                        ) : isDownloaded ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Downloaded</span>
                          </>
                        ) : !isPdfAvailable ? (
                          <>
                            <Lock className="w-3 h-3 text-gray-600" />
                            <span>Unavailable</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3 h-3" />
                            <span>Download</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Hover interactive visual guide */}
                  <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-md opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition-all duration-300 pointer-events-none z-20">
                    <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 scale-90 group-hover:scale-100 transition-all duration-300">
                      <Eye className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-white tracking-widest uppercase">Inspect Credential</span>
                    <span className="text-[10px] text-gray-400 font-mono">Click anywhere to open validator</span>
                  </div>

                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* ==================== HIGH FIDELITY CREDENTIAL VALIDATOR MODAL ==================== */}
      <AnimatePresence>
        {activeCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Modal Glass Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCert(null)}
              className="absolute inset-0 bg-[#02010d]/85 backdrop-blur-md cursor-zoom-out"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 20, stiffness: 180 }}
              className="relative w-full max-w-3xl bg-[#060414] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.15)] z-10 flex flex-col md:flex-row h-full max-h-[90vh] md:max-h-[580px]"
            >
              
              {/* Close Button */}
              <button
                onClick={() => setActiveCert(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer z-30"
                aria-label="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* LEFT COLUMN: Aesthetic Certificate Document Drawing */}
              <div className="flex-1 bg-gradient-to-br from-slate-950 via-[#03010f] to-slate-950 p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/[0.08] relative overflow-hidden min-h-[300px] md:min-h-auto">
                
                {/* Secure Watermark pattern */}
                <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                  <Award className="w-64 h-64 text-purple-500" />
                </div>

                {/* Secure Holographic Border */}
                <div className="absolute inset-3 border border-dashed border-white/10 rounded-xl pointer-events-none" />
                <div className="absolute inset-4 border border-solid border-white/5 rounded-xl pointer-events-none" />

                {/* Content Header */}
                <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 relative z-10">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4.5 h-4.5 text-purple-400" />
                    <span className="font-mono text-[9px] text-purple-300 font-bold uppercase tracking-widest">Aistudio Secure Node</span>
                  </div>
                  <span className="font-mono text-[9px] text-gray-500">ID: {activeCert.credentialId}</span>
                </div>

                {/* Main Certificate Title body */}
                <div className="text-center py-6 space-y-4 relative z-10">
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">Certificate of Achievement</span>
                  
                  <div className="space-y-1">
                    <h4 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight leading-snug">
                      {activeCert.title}
                    </h4>
                    <p className="text-xs font-mono text-purple-400">Authenticated by {activeCert.issuer}</p>
                  </div>

                  <div className="py-2">
                    <span className="text-[10px] font-mono text-gray-500">proudly presented to</span>
                    <h5 className="font-display font-extrabold text-white text-lg tracking-wide border-b border-white/10 pb-1.5 max-w-[240px] mx-auto mt-1">
                      Saniya Nahid
                    </h5>
                  </div>

                  <p className="text-gray-400 text-[11px] leading-relaxed max-w-[320px] mx-auto">
                    Who successfully proved theoretical and practical knowledge in advanced domain skills during supervised technical assessment.
                  </p>
                </div>

                {/* Secure Stamps & Seals Footer */}
                <div className="flex items-end justify-between relative z-10 border-t border-white/[0.05] pt-3">
                  <div className="flex flex-col text-left">
                    <span className="font-mono text-[8px] text-gray-500 uppercase tracking-wider">Verification Date</span>
                    <span className="font-mono text-[10px] text-gray-300 font-semibold">{activeCert.date.replace('Issued ', '')}</span>
                  </div>

                  {/* Stamp */}
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full border border-dashed border-purple-500/40 flex items-center justify-center bg-purple-500/5 rotate-12">
                      <div className="w-8 h-8 rounded-full border border-solid border-purple-500/30 flex items-center justify-center text-[8px] font-mono font-bold text-purple-400 text-center uppercase tracking-tighter leading-none">
                        SECURE
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Interactive Control center */}
              <div className="w-full md:w-[280px] p-6 md:p-8 flex flex-col justify-between gap-6 relative overflow-hidden bg-[#070519]">
                
                {/* Meta details */}
                <div className="space-y-5">
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest font-bold">Validator Control</span>
                    <h3 className="font-display font-bold text-lg text-white">Verified Skills</h3>
                  </div>

                  {/* Skills capsule lists */}
                  <div className="flex flex-wrap gap-1.5">
                    {activeCert.skills.map((skill) => (
                      <span key={skill}>
                        <Badge variant="indigo" className="text-[10px] font-mono bg-white/[0.03] border-white/5 text-gray-300">
                          {skill}
                        </Badge>
                      </span>
                    ))}
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Lock className="w-3.5 h-3.5 text-purple-400" />
                      <span>Security Ledger</span>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-normal">
                      This certificate is secured by dynamic content-hash cryptography. Any duplication or modifications will instantly void status.
                    </p>
                  </div>
                </div>

                {/* Interactive Download Action Controls */}
                <div className="space-y-3">
                  <button
                    onClick={(e) => triggerDownload(e, activeCert)}
                    disabled={(downloadingId === activeCert.id) || !pdfAvailability[activeCert.id]}
                    className={`w-full py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md cursor-pointer ${
                      !pdfAvailability[activeCert.id]
                        ? 'bg-white/[0.02] text-gray-600 border border-white/5 cursor-not-allowed opacity-40'
                        : 'text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-purple-500/10'
                    }`}
                  >
                    {(downloadingId === activeCert.id) ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Downloading...</span>
                      </>
                    ) : !pdfAvailability[activeCert.id] ? (
                      <>
                        <Lock className="w-3.5 h-3.5 text-gray-600" />
                        <span>Unavailable</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF File</span>
                      </>
                    )}
                  </button>

                  <a
                    href={activeCert.pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer ${
                      !pdfAvailability[activeCert.id]
                        ? 'bg-white/[0.01] text-gray-600 border border-white/5 cursor-not-allowed opacity-40 pointer-events-none'
                        : 'text-gray-400 hover:text-white bg-white/[0.03] border border-white/5 hover:bg-white/[0.06]'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Certificate</span>
                  </a>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
