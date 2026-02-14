import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';
import { skills } from '../data/portfolio';

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Wrench size={20} className="text-primary" />
            <h2 className="text-2xl font-bold">Skills</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-dark-card border border-dark-border rounded-2xl p-6 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon size={20} className="text-primary" />
                    <h3 className="font-semibold">{skill.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary-light"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
