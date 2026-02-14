import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { profile, socialLinks, navItems } from '../data/portfolio';
import { useLanguage } from '../contexts/LanguageContext';
import { tr } from '../data/i18n';
import GlowCard from './GlowCard';

export default function Contact() {
  const { lang } = useLanguage();

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm text-text-secondary font-medium mb-10 tracking-widest uppercase">
            {navItems[3].label[lang]}
          </h2>

          <GlowCard>
            <div className="p-8 md:p-12 text-center">
              <p className="text-text-secondary mb-8 max-w-md mx-auto leading-relaxed">
                {tr('contact.desc', lang)}
              </p>

              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-primary to-accent-blue text-white font-medium text-sm hover:opacity-90 transition-opacity duration-300"
              >
                <Send size={16} />
                {tr('contact.send', lang)}
              </a>

              <div className="flex items-center justify-center gap-8 mt-10">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-tertiary hover:text-text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </div>
    </section>
  );
}
