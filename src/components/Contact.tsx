import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Copy, Check, Github, Mail, Phone } from 'lucide-react';
import { profile, socialLinks } from '../data/portfolio';
import { useLanguage } from '../contexts/LanguageContext';
import { tr } from '../data/i18n';
import GlowCard from './GlowCard';
import ScrollReveal from './ScrollReveal';

const githubLink = socialLinks.find((l) => l.label === 'GitHub');

export default function Contact() {
  const { lang } = useLanguage();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [toastPos, setToastPos] = useState({ x: 0, y: 0 });

  const handleCopy = useCallback((text: string, key: string, e: React.MouseEvent) => {
    setToastPos({ x: e.clientX, y: e.clientY });
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    });
  }, []);

  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="relative max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="font-mono text-sm text-terminal-green font-medium mb-10 tracking-widest">
            <span className="text-text-tertiary">$</span> contact --send
          </h2>

          {/* Contact card */}
          <GlowCard>
            <div className="p-8 md:p-10">
              <p className="font-mono text-text-secondary mb-6 text-center text-sm leading-relaxed">
                <span className="text-terminal-cyan">#</span> {tr('contact.desc', lang)}
              </p>

              <div className="flex flex-col items-center gap-3 mb-6 font-mono">
                {/* Email */}
                <div className="flex items-center gap-2">
                  <span className="text-terminal-green text-sm">email&gt;</span>
                  <Mail size={14} className="text-text-tertiary" />
                  <span className="text-text-primary font-medium text-sm tracking-wide">
                    {profile.email}
                  </span>
                  <button
                    onClick={(e) => handleCopy(profile.email, 'email', e)}
                    className="p-1.5 rounded-lg bg-tag text-text-tertiary hover:text-terminal-green hover:bg-tag-hover transition-all duration-200 cursor-pointer"
                  >
                    {copiedKey === 'email' ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-2">
                  <span className="text-terminal-green text-sm">phone&gt;</span>
                  <Phone size={14} className="text-text-tertiary" />
                  <span className="text-text-primary font-medium text-sm tracking-wide">
                    {profile.phone}
                  </span>
                  <button
                    onClick={(e) => handleCopy(profile.phone, 'phone', e)}
                    className="p-1.5 rounded-lg bg-tag text-text-tertiary hover:text-terminal-green hover:bg-tag-hover transition-all duration-200 cursor-pointer"
                  >
                    {copiedKey === 'phone' ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-center">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono bg-terminal-green/15 border border-terminal-green/30 text-sm text-terminal-green hover:bg-terminal-green/25 transition-all duration-200"
                >
                  <Send size={15} />
                  $ send --message
                </a>
              </div>
            </div>
          </GlowCard>

          {/* GitHub card */}
          {githubLink && (
            <ScrollReveal y={20} duration={0.4} delay={0.1} margin="-50px" className="mt-5">
              <GlowCard>
                <div className="p-8 md:p-10">
                  <p className="font-mono text-text-secondary mb-6 text-center text-sm leading-relaxed">
                    <span className="text-terminal-cyan">#</span> {tr('contact.github.desc', lang)}
                  </p>

                  <div className="flex items-center justify-center gap-2 mb-6 font-mono">
                    <span className="text-terminal-green text-sm">repo&gt;</span>
                    <Github size={14} className="text-text-tertiary" />
                    <span className="text-text-primary font-medium text-sm tracking-wide">
                      {githubLink.url.replace('https://', '')}
                    </span>
                    <button
                      onClick={(e) => handleCopy(githubLink.url, 'github', e)}
                      className="p-1.5 rounded-lg bg-tag text-text-tertiary hover:text-terminal-green hover:bg-tag-hover transition-all duration-200 cursor-pointer"
                    >
                      {copiedKey === 'github' ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>

                  <div className="flex justify-center">
                    <a
                      href={githubLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono bg-terminal-cyan/15 border border-terminal-cyan/30 text-sm text-terminal-cyan hover:bg-terminal-cyan/25 transition-all duration-200"
                    >
                      <Github size={15} />
                      $ open --github
                    </a>
                  </div>
                </div>
              </GlowCard>
            </ScrollReveal>
          )}
        </ScrollReveal>
      </div>

      {/* Toast notification at cursor */}
      <AnimatePresence>
        {copiedKey && (
          <motion.div
            initial={{ opacity: 0, x: 8, scale: 0.9 }}
            animate={{ opacity: 1, x: 16, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="fixed z-[9999] px-4 py-2.5 rounded-lg bg-dark-card border border-terminal-green/30 text-text-primary text-sm font-mono pointer-events-none"
            style={{
              left: toastPos.x,
              top: toastPos.y - 16,
              boxShadow: 'var(--modal-card-shadow)',
            }}
          >
            <div className="flex items-center gap-2">
              <Check size={14} className="text-terminal-green" />
              {tr('contact.copied', lang)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
