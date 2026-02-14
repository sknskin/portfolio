import { motion } from 'framer-motion';
import { profile, navItems } from '../data/portfolio';
import { useLanguage } from '../contexts/LanguageContext';
import GlowCard from './GlowCard';

export default function About() {
  const { lang } = useLanguage();

  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm text-text-secondary font-medium mb-10 tracking-widest uppercase">
            {navItems[0].label[lang]}
          </h2>

          <GlowCard>
            <div className="p-8 md:p-10">
              <p className="text-text-secondary leading-relaxed text-lg">
                {profile.about[lang]}
              </p>
            </div>
          </GlowCard>
        </motion.div>
      </div>
    </section>
  );
}
