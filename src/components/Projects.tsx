import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { projects, navItems, type Project } from '../data/portfolio';
import { useLanguage } from '../contexts/LanguageContext';
import GlowCard from './GlowCard';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const { lang } = useLanguage();
  const [selected, setSelected] = useState<Project | null>(null);
  const [cardRect, setCardRect] = useState<DOMRect | null>(null);

  function openModal(project: Project, e: React.MouseEvent) {
    const el = e.currentTarget as HTMLElement;
    setCardRect(el.getBoundingClientRect());
    setSelected(project);
  }

  return (
    <>
      <section id="projects" className="py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm text-text-secondary font-medium mb-10 tracking-widest uppercase">
              {navItems[2].label[lang]}
            </h2>

            <div className="space-y-5">
              {projects.map((project, idx) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <GlowCard
                    className="cursor-pointer"
                    onClick={(e) => openModal(project, e)}
                  >
                    <div className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-text-primary">
                              {project.title}
                            </h3>
                            {project.period && (
                              <span className="text-xs text-text-tertiary hidden sm:inline">
                                {project.period}
                              </span>
                            )}
                          </div>

                          <p className="text-text-secondary text-sm leading-relaxed mb-4">
                            {project.description[lang]}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {project.techs.map((tech) => (
                              <span
                                key={tech}
                                className="text-xs px-2.5 py-1 rounded-full bg-tag text-text-secondary"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex md:flex-col items-center gap-3 md:gap-2 shrink-0">
                          <div className="flex items-center gap-3">
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-2 rounded-full bg-tag text-text-tertiary hover:text-text-primary hover:bg-tag-hover transition-all duration-200"
                              >
                                <Github size={16} />
                              </a>
                            )}
                            {project.demo && (
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-2 rounded-full bg-tag text-text-tertiary hover:text-text-primary hover:bg-tag-hover transition-all duration-200"
                              >
                                <ExternalLink size={16} />
                              </a>
                            )}
                          </div>
                          <div className="text-text-tertiary">
                            <ArrowRight size={16} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <ProjectModal
        project={selected}
        cardRect={cardRect}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
