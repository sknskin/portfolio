import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, ExternalLink } from 'lucide-react';
import { profile, socialLinks } from '../data/portfolio';

const iconMap: Record<string, typeof Github> = {
  GitHub: Github,
  LinkedIn: Linkedin,
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 text-center max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-primary font-medium mb-4"
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-text-primary to-primary bg-clip-text text-transparent"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-text-secondary mb-4"
        >
          {profile.role}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-text-secondary mb-8 max-w-xl mx-auto"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          {socialLinks.map((link) => {
            const Icon = iconMap[link.label] || ExternalLink;
            return (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-dark-border text-text-secondary hover:text-primary hover:border-primary/50 transition-all"
              >
                <Icon size={18} />
                <span className="text-sm">{link.label}</span>
              </a>
            );
          })}
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="inline-block animate-bounce text-text-secondary hover:text-primary transition-colors"
        >
          <ArrowDown size={24} />
        </motion.a>
      </div>
    </section>
  );
}
