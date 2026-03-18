import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { profile } from '../data/portfolio';
import { useLanguage } from '../contexts/LanguageContext';
import TechMarquee from './TechMarquee';

function useTypingEffect(text: string, speed = 60, delay = 0) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let index = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < text.length) {
          index++;
          setDisplayed(text.slice(0, index));
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayed, done };
}

export default function Hero() {
  const { lang } = useLanguage();
  const name = profile.name[lang];
  const { displayed: typedName, done: nameDone } = useTypingEffect(name, 80, 300);

  return (
    <section id="intro" className="relative min-h-screen flex items-center justify-center px-6">
      {/* Matrix-style subtle background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{ top: '10%', left: '15%', backgroundColor: 'rgba(34,197,94,0.06)', animation: 'blob-1 20s ease-in-out infinite', transform: 'translate3d(0,0,0)' }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[130px]"
          style={{ bottom: '15%', right: '10%', backgroundColor: 'rgba(6,182,212,0.04)', animation: 'blob-2 25s ease-in-out infinite', transform: 'translate3d(0,0,0)' }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[120px]"
          style={{ top: '55%', left: '45%', backgroundColor: 'rgba(34,197,94,0.03)', animation: 'blob-3 22s ease-in-out infinite', transform: 'translate3d(0,0,0)' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-3xl">
        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="terminal-window"
        >
          {/* Title Bar */}
          <div className="terminal-titlebar">
            <div className="terminal-dot terminal-dot-red" />
            <div className="terminal-dot terminal-dot-yellow" />
            <div className="terminal-dot terminal-dot-green" />
            <span className="ml-3 text-xs font-mono text-text-tertiary">portfolio@dev:~</span>
          </div>

          {/* Terminal Body */}
          <div className="terminal-body space-y-4">
            {/* whoami */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span className="terminal-prompt text-sm">$ </span>
              <span className="font-mono text-sm text-text-primary">whoami</span>
            </motion.div>

            {/* Name with typing effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h1
                className="text-4xl md:text-6xl font-bold font-mono bg-clip-text text-transparent inline"
                style={{
                  backgroundImage: `linear-gradient(135deg, var(--hero-from), var(--hero-via), var(--hero-to))`,
                }}
              >
                {typedName}
              </h1>
              <span
                className="inline-block w-[3px] h-[0.9em] ml-1 align-middle"
                style={{
                  backgroundColor: 'var(--terminal-green)',
                  animation: 'cursor-blink 1s step-end infinite',
                  opacity: nameDone ? 1 : 1,
                }}
              />
            </motion.div>

            {/* Role */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-2"
            >
              <span className="terminal-prompt text-base">&gt;</span>
              <span className="font-mono text-lg md:text-xl text-text-secondary">
                {profile.role[lang]}
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex items-start gap-2"
            >
              <span className="terminal-prompt text-sm mt-0.5">#</span>
              <p className="font-mono text-sm text-text-tertiary leading-relaxed">
                {profile.tagline[lang]}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Tech Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-10 mb-14"
        >
          <TechMarquee />
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="block text-center animate-bounce text-terminal-green hover:text-terminal-cyan transition-colors"
        >
          <ArrowDown size={20} />
        </motion.a>
      </div>
    </section>
  );
}
