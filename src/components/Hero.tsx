import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, ExternalLink } from 'lucide-react';
import { profile, socialLinks } from '../data/portfolio';
import { useLanguage } from '../contexts/LanguageContext';
import { tr } from '../data/i18n';

const iconMap: Record<string, typeof Github> = {
  GitHub: Github,
  LinkedIn: Linkedin,
};

export default function Hero() {
  const { lang } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-[15%] left-[20%] w-[500px] h-[500px] bg-primary/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] bg-accent-blue/10 rounded-full blur-[130px]" />
        <div className="absolute top-[60%] left-[50%] w-[300px] h-[300px] bg-accent-pink/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 text-center max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm text-text-secondary font-medium mb-6 tracking-widest uppercase"
        >
          {tr('hero.greeting', lang)}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(to right, var(--hero-from), var(--hero-via), var(--hero-to))`,
          }}
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-text-secondary mb-4 font-light"
        >
          {profile.role[lang]}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-text-secondary mb-10 max-w-xl mx-auto leading-relaxed"
        >
          {profile.tagline[lang]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-3 mb-16"
        >
          {socialLinks.map((link) => {
            const Icon = iconMap[link.label] || ExternalLink;
            return (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-tag text-text-secondary hover:bg-tag-hover hover:text-text-primary transition-all duration-300"
              >
                <Icon size={16} />
                <span className="text-sm">{link.label}</span>
              </a>
            );
          })}
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="inline-block animate-bounce text-text-tertiary hover:text-text-secondary transition-colors"
        >
          <ArrowDown size={20} />
        </motion.a>
      </div>
    </section>
  );
}
