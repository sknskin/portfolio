import { motion } from 'framer-motion';
import { skills, navItems } from '../data/portfolio';
import { useLanguage } from '../contexts/LanguageContext';
import GlowCard from './GlowCard';

export default function Skills() {
  const { lang } = useLanguage();

  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm text-text-secondary font-medium mb-10 tracking-widest uppercase">
            {navItems[1].label[lang]}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: '-50px' }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                >
                  <GlowCard className="h-full">
                    <div className="p-6 h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <Icon size={18} className="text-primary-light" />
                        <h3 className="font-medium text-sm text-text-primary">
                          {skill.name}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skill.items.map((item) => (
                          <span
                            key={item}
                            className="text-xs px-3 py-1 rounded-full bg-tag text-text-secondary"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
