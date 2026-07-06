import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Check, 
  AlertCircle, 
  MapPin, 
  Mail, 
  Phone,
  Github, 
  Linkedin, 
  Download, 
  FileText, 
  ExternalLink, 
  Sparkles, 
  ArrowUpRight,
  Clipboard,
  CheckCircle,
  Clock,
  Compass
} from 'lucide-react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';

export function ContactSection() {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // Validation States
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  
  const [touched, setTouched] = useState<{
    name?: boolean;
    email?: boolean;
    message?: boolean;
  }>({});

  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [downloadingResume, setDownloadingResume] = useState(false);
  const [downloadedResume, setDownloadedResume] = useState(false);

  // Validate email address regex
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Live input validation handlers
  const handleBlur = (field: 'name' | 'email' | 'message') => {
    setTouched({ ...touched, [field]: true });
    validateField(field, formData[field]);
  };

  const validateField = (field: 'name' | 'email' | 'message', value: string) => {
    let errors = { ...formErrors };

    if (field === 'name') {
      if (!value.trim()) {
        errors.name = 'Full name is required';
      } else if (value.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
      } else {
        delete errors.name;
      }
    }

    if (field === 'email') {
      if (!value.trim()) {
        errors.email = 'Email address is required';
      } else if (!validateEmail(value)) {
        errors.email = 'Please provide a valid email address';
      } else {
        delete errors.email;
      }
    }

    if (field === 'message') {
      if (!value.trim()) {
        errors.message = 'Message content cannot be blank';
      } else if (value.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters';
      } else {
        delete errors.message;
      }
    }

    setFormErrors(errors);
  };

  const handleInputChange = (field: 'name' | 'email' | 'subject' | 'message', value: string) => {
    setFormData({ ...formData, [field]: value });
    if (touched[field as 'name' | 'email' | 'message']) {
      validateField(field as 'name' | 'email' | 'message', value);
    }
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all as touched
    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);

    // Run complete validation check
    const errors: typeof formErrors = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    else if (formData.name.trim().length < 2) errors.name = 'Name must be at least 2 characters';

    if (!formData.email.trim()) errors.email = 'Email address is required';
    else if (!validateEmail(formData.email)) errors.email = 'Please provide a valid email address';

    if (!formData.message.trim()) errors.message = 'Message content cannot be blank';
    else if (formData.message.trim().length < 10) errors.message = 'Message must be at least 10 characters';

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSending(true);

    // Simulate sending transition with high-fidelity delays
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTouched({});
    }, 1800);
  };

  // Location Copy coordinates helper
  const copyToClipboard = () => {
    navigator.clipboard.writeText('Hyderabad, India');
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  // Resume Download script trigger
  const triggerResumeDownload = () => {
    if (downloadedResume) return;
    setDownloadingResume(true);

    setTimeout(() => {
      setDownloadingResume(false);
      setDownloadedResume(true);

      const link = document.createElement('a');
      link.href = '/Shaik_Saniya_Nahid_Resume.pdf';
      link.setAttribute('download', 'Shaik_Saniya_Nahid_Resume.pdf');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1200);
  };

  return (
    <section id="contact" className="scroll-mt-24 py-20 px-6 max-w-7xl mx-auto w-full relative">
      
      {/* Dynamic Background visual ornaments */}
      <div className="absolute top-[30%] left-[-15%] w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-[130px] pointer-events-none" />

      {/* Grid heading block */}
      <div className="flex flex-col gap-4 mb-16 text-center">
        <Badge variant="emerald" className="self-center">Connect & Collaborate</Badge>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Get In <span className="text-gradient-purple">Touch</span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Have an exciting project, research challenge, or professional role in mind? Reach out directly using the form below or access my professional indexes.
        </p>
      </div>

      {/* Main content grid: Form (Left/Right depending on responsive flow) + Contact Info (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
        
        {/* LEFT COMPONENT: High Fidelity Glassmorphic Form Card */}
        <div className="lg:col-span-7 w-full">
          <Card className="p-6 md:p-8 bg-white/[0.01] border-white/5 relative overflow-hidden" glowColor="indigo">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />
            
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  noValidate
                >
                  <div className="space-y-1">
                    <h3 className="font-display font-extrabold text-xl text-white">Send an Electronic Transmission</h3>
                    <p className="text-xs text-gray-500 font-mono">Fill in verified metadata channels below.</p>
                  </div>

                  {/* Name and Email side-by-side on wider screens */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Name input */}
                    <div className="space-y-2">
                      <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider">Your Name *</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onBlur={() => handleBlur('name')}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl bg-white/[0.02] border text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-1 transition-all duration-300 ${
                            touched.name && formErrors.name
                              ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                              : 'border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20'
                          }`}
                          required
                        />
                        {touched.name && formErrors.name && (
                          <div className="absolute right-3.5 top-3.5 text-red-400">
                            <AlertCircle className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      
                      <AnimatePresence>
                        {touched.name && formErrors.name && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-[11px] font-mono text-red-400 pl-1"
                          >
                            {formErrors.name}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Email input */}
                    <div className="space-y-2">
                      <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider">Your Email *</label>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onBlur={() => handleBlur('email')}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl bg-white/[0.02] border text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-1 transition-all duration-300 ${
                            touched.email && formErrors.email
                              ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                              : 'border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20'
                          }`}
                          required
                        />
                        {touched.email && formErrors.email && (
                          <div className="absolute right-3.5 top-3.5 text-red-400">
                            <AlertCircle className="w-4 h-4" />
                          </div>
                        )}
                      </div>

                      <AnimatePresence>
                        {touched.email && formErrors.email && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-[11px] font-mono text-red-400 pl-1"
                          >
                            {formErrors.email}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>

                  {/* Subject input */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider">Subject</label>
                    <input
                      type="text"
                      placeholder="Collaboration Project, Engineering Role..."
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all duration-300"
                    />
                  </div>

                  {/* Message input */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider">Message *</label>
                    <div className="relative">
                      <textarea
                        placeholder="Detail your parameters or query..."
                        value={formData.message}
                        onBlur={() => handleBlur('message')}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        rows={5}
                        className={`w-full px-4 py-3 rounded-xl bg-white/[0.02] border text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-1 transition-all duration-300 resize-none ${
                          touched.message && formErrors.message
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20'
                        }`}
                        required
                      />
                      {touched.message && formErrors.message && (
                        <div className="absolute right-3.5 top-3.5 text-red-400">
                          <AlertCircle className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    <AnimatePresence>
                      {touched.message && formErrors.message && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-[11px] font-mono text-red-400 pl-1"
                        >
                          {formErrors.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full py-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/10 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Encrypting & Dispatching...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Transmit Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                /* Success Animated State */
                <motion.div
                  key="success-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-12 px-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-lg shadow-emerald-500/10 relative">
                    <Check className="w-8 h-8 relative z-10" />
                    <div className="absolute -inset-2 rounded-full border border-emerald-500/20 animate-ping" />
                  </div>
                  
                  <h3 className="font-display font-black text-2xl text-white mb-2">Transmission Succeeded</h3>
                  <p className="text-gray-400 text-sm max-w-sm leading-relaxed mb-8">
                    Your packets have been routed to my local mail queue securely. I will compile a response within 24 standard cycles.
                  </p>

                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-purple-400 hover:text-white bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 active:scale-95 transition-all cursor-pointer"
                  >
                    Open New Session
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>

        {/* RIGHT COMPONENT: Elegant Contact Info + Resume + Social Deck */}
        <div className="lg:col-span-5 w-full flex flex-col gap-6">
          
          {/* 1. Location & Availability Card */}
          <Card className="p-6 relative overflow-hidden bg-white/[0.01] border-white/5" glowColor="blue">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 flex items-center justify-center">
                  <Compass className="w-5 h-5 animate-spin-slow" />
                </div>
                <Badge variant="indigo" className="text-[10px] font-mono uppercase bg-white/[0.02] border-white/5 text-gray-400">
                  Location Node
                </Badge>
              </div>

              <div className="space-y-1 text-left">
                <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">Physical Coordinates</h4>
                <p className="font-display font-extrabold text-white text-lg flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  Hyderabad, India
                </p>
                <p className="text-xs text-gray-400 leading-normal pt-1">
                  Available for remote arrangements internationally, and on-premise integrations locally.
                </p>
              </div>

              {/* Copy coordinates action button */}
              <button
                onClick={copyToClipboard}
                className="w-full py-2.5 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 hover:text-white bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                {copiedCoords ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Coordinates Copied!</span>
                  </>
                ) : (
                  <>
                    <Clipboard className="w-3.5 h-3.5 text-blue-400" />
                    <span>Copy Address Specs</span>
                  </>
                )}
              </button>
            </div>
          </Card>

          {/* 2. Download Resume High-Fidelity Card */}
          <Card className="p-6 relative overflow-hidden bg-white/[0.01] border-white/5" glowColor="purple">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <Badge variant="purple" className="text-[10px] font-mono uppercase bg-white/[0.02] border-white/5 text-purple-400">
                  Resume Ledger
                </Badge>
              </div>

              <div className="space-y-1 text-left">
                <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">Technical CV</h4>
                <p className="font-display font-extrabold text-white text-lg">
                  Shaik_Saniya_Nahid.pdf
                </p>
                <p className="text-xs text-gray-400 leading-normal pt-1">
                  Review absolute academic indexes, verified machine learning stacks, and deep engineering history.
                </p>
              </div>

              {/* View and Download action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/Shaik_Saniya_Nahid_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-gray-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View Resume</span>
                </a>

                <button
                  onClick={triggerResumeDownload}
                  disabled={downloadingResume}
                  className={`flex-1 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer ${
                    downloadedResume
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-500/5'
                  }`}
                >
                  {downloadingResume ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Pulling...</span>
                    </>
                  ) : downloadedResume ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Saved</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download Resume</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </Card>

          {/* 3. Electronic Mail Info and Social links capsule */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* GitHub Card Link */}
            <a 
              href="https://github.com/SaniyaNahid" 
              target="_blank" 
              rel="noreferrer referrer"
              className="group block"
            >
              <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-purple-500/20 transition-all duration-300 text-left space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 flex items-center justify-center">
                    <Github className="w-4.5 h-4.5" />
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <div className="space-y-0.5">
                  <span className="block text-[8px] font-mono text-gray-500 uppercase tracking-widest">Repositories</span>
                  <span className="block text-xs font-bold text-white font-display group-hover:text-purple-300 transition-colors">Inspect Raw Code</span>
                </div>
              </div>
            </a>

            {/* LinkedIn Card Link */}
            <a 
              href="https://www.linkedin.com/in/shaik-saniya-nahid-926403384" 
              target="_blank" 
              rel="noreferrer referrer"
              className="group block"
            >
              <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-blue-500/20 transition-all duration-300 text-left space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 flex items-center justify-center">
                    <Linkedin className="w-4.5 h-4.5" />
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <div className="space-y-0.5">
                  <span className="block text-[8px] font-mono text-gray-500 uppercase tracking-widest">LinkedIn Node</span>
                  <span className="block text-xs font-bold text-white font-display group-hover:text-blue-300 transition-colors">Join Network</span>
                </div>
              </div>
            </a>

          </div>

          {/* Quick email and phone boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border border-white/5 bg-[#03020b]/30 text-left flex items-center gap-3">
              <div className="w-8 h-8 shrink-0 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center text-gray-400">
                <Mail className="w-4 h-4 text-purple-400" />
              </div>
              <div className="space-y-0.5 overflow-hidden">
                <span className="block text-[8px] font-mono text-gray-500 uppercase tracking-widest">Direct Mailbox</span>
                <a 
                  href="mailto:shaiksaniya1828@gmail.com" 
                  className="block text-xs font-mono text-gray-300 hover:text-purple-300 transition-colors truncate"
                >
                  shaiksaniya1828@gmail.com
                </a>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-white/5 bg-[#03020b]/30 text-left flex items-center gap-3">
              <div className="w-8 h-8 shrink-0 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center text-gray-400">
                <Phone className="w-4 h-4 text-blue-400" />
              </div>
              <div className="space-y-0.5 overflow-hidden">
                <span className="block text-[8px] font-mono text-gray-500 uppercase tracking-widest">Direct Phone</span>
                <a 
                  href="tel:9390197183" 
                  className="block text-xs font-mono text-gray-300 hover:text-blue-300 transition-colors truncate"
                >
                  +91 9390197183
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
