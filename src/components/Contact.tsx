import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Copy, Check, Github, Mail, Phone } from 'lucide-react';
import { profile, socialLinks, navItems } from '../data/portfolio';
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
          <h2 className="text-sm text-text-secondary font-medium mb-10 tracking-widest uppercase">
            {navItems[4].label[lang]}
          </h2>

          {/* 연락처 카드 */}
          <GlowCard>
            <div className="p-8 md:p-10">
              <p className="text-text-secondary mb-6 text-center leading-relaxed">
                {tr('contact.desc', lang)}
              </p>

              <div className="flex flex-col items-center gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-text-tertiary" />
                  <span className="text-text-primary font-medium text-lg tracking-wide">
                    {profile.email}
                  </span>
                  <button
                    onClick={(e) => handleCopy(profile.email, 'email', e)}
                    className="p-2 rounded-full bg-tag text-text-tertiary hover:text-text-primary hover:bg-tag-hover transition-all duration-200 cursor-pointer"
                  >
                    {copiedKey === 'email' ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-text-tertiary" />
                  <span className="text-text-primary font-medium text-lg tracking-wide">
                    {profile.phone}
                  </span>
                  <button
                    onClick={(e) => handleCopy(profile.phone, 'phone', e)}
                    className="p-2 rounded-full bg-tag text-text-tertiary hover:text-text-primary hover:bg-tag-hover transition-all duration-200 cursor-pointer"
                  >
                    {copiedKey === 'phone' ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>

                {/* <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-text-tertiary shrink-0" />
                  <span className="text-text-primary font-medium text-sm tracking-wide">
                    {profile.address[lang]}
                  </span>
                  <button
                    onClick={(e) => handleCopy(profile.address[lang], 'address', e)}
                    className="p-2 rounded-full bg-tag text-text-tertiary hover:text-text-primary hover:bg-tag-hover transition-all duration-200 cursor-pointer shrink-0"
                  >
                    {copiedKey === 'address' ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div> */}
              </div>

              <div className="flex justify-center">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-accent-blue text-sm text-white hover:opacity-90 transition-opacity duration-200"
                >
                  <Send size={15} />
                  {tr('contact.send', lang)}
                </a>
              </div>
            </div>
          </GlowCard>

          {/* GitHub 카드 */}
          {githubLink && (
            <ScrollReveal y={20} duration={0.4} delay={0.1} margin="-50px" className="mt-5">
              <GlowCard>
                <div className="p-8 md:p-10">
                  <p className="text-text-secondary mb-6 text-center leading-relaxed">
                    {tr('contact.github.desc', lang)}
                  </p>

                  <div className="flex items-center justify-center gap-2 mb-6">
                    <Github size={16} className="text-text-tertiary" />
                    <span className="text-text-primary font-medium text-lg tracking-wide">
                      {githubLink.url.replace('https://', '')}
                    </span>
                    <button
                      onClick={(e) => handleCopy(githubLink.url, 'github', e)}
                      className="p-2 rounded-full bg-tag text-text-tertiary hover:text-text-primary hover:bg-tag-hover transition-all duration-200 cursor-pointer"
                    >
                      {copiedKey === 'github' ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>

                  <div className="flex justify-center">
                    <a
                      href={githubLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-accent-blue text-sm text-white hover:opacity-90 transition-opacity duration-200"
                    >
                      <Github size={15} />
                      GitHub
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
            className="fixed z-[9999] px-4 py-2.5 rounded-xl bg-dark-card text-text-primary text-sm font-medium pointer-events-none"
            style={{
              left: toastPos.x,
              top: toastPos.y - 16,
              boxShadow: 'var(--modal-card-shadow)',
            }}
          >
            <div className="flex items-center gap-2">
              <Check size={14} className="text-primary-light" />
              {tr('contact.copied', lang)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
