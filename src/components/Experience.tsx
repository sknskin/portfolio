import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { experiences } from '../data/portfolio';

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Briefcase size={20} className="text-primary" />
            <h2 className="text-2xl font-bold">Experience</h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-dark-border" />

            <div className="space-y-8">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={`${exp.company}-${idx}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.15 }}
                  className="relative pl-12"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-dark-bg" />

                  <div className="bg-dark-card border border-dark-border rounded-2xl p-6 hover:border-primary/30 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="font-semibold text-lg">{exp.role}</h3>
                      <span className="text-xs text-text-secondary">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-primary text-sm mb-3">{exp.company}</p>
                    <ul className="space-y-1.5">
                      {exp.description.map((desc, i) => (
                        <li
                          key={i}
                          className="text-sm text-text-secondary flex items-start gap-2"
                        >
                          <span className="text-primary mt-1.5 text-[6px]">●</span>
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
