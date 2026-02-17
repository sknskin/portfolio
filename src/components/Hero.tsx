import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { profile } from '../data/portfolio';
import { useLanguage } from '../contexts/LanguageContext';
import { tr } from '../data/i18n';
import TechMarquee from './TechMarquee';

export default function Hero() {
  const { lang } = useLanguage();

  return (
    <section id="intro" className="relative min-h-screen flex items-center justify-center px-6">
      {/* CSS-only animated background gradients */}
      <div className="absolute inset-0">
        <div
          className="absolute w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px]"
          style={{ top: '10%', left: '15%', animation: 'blob-1 20s ease-in-out infinite', transform: 'translate3d(0,0,0)' }}
        />
        <div
          className="absolute w-[500px] h-[500px] bg-accent-blue/15 rounded-full blur-[130px]"
          style={{ bottom: '15%', right: '10%', animation: 'blob-2 25s ease-in-out infinite', transform: 'translate3d(0,0,0)' }}
        />
        <div
          className="absolute w-[400px] h-[400px] bg-accent-pink/10 rounded-full blur-[120px]"
          style={{ top: '55%', left: '45%', animation: 'blob-3 22s ease-in-out infinite', transform: 'translate3d(0,0,0)' }}
        />
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
          {profile.name[lang]}
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
          className="mb-14"
        >
          <TechMarquee />
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
