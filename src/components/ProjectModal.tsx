import { useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink } from 'lucide-react';
import type { Project } from '../data/portfolio';
import { useLanguage } from '../contexts/LanguageContext';
import { tr } from '../data/i18n';

interface ProjectModalProps {
  project: Project | null;
  cardRect: DOMRect | null;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  cardRect,
  onClose,
}: ProjectModalProps) {
  const { lang } = useLanguage();
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 500);
  }, [onClose]);

  useEffect(() => {
    if (!project) return;

    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [project, handleClose]);

  // Calculate animation values from card rect
  const modalWidth = Math.min(672, window.innerWidth - 64); // max-w-2xl = 672px
  const modalHeight = Math.min(window.innerHeight * 0.85, 700);

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const cardCenterX = cardRect ? cardRect.left + cardRect.width / 2 : centerX;
  const cardCenterY = cardRect ? cardRect.top + cardRect.height / 2 : centerY;

  const offsetX = cardCenterX - centerX;
  const offsetY = cardCenterY - centerY;

  const scaleX = cardRect ? cardRect.width / modalWidth : 0.5;
  const scaleY = cardRect ? cardRect.height / modalHeight : 0.3;

  return createPortal(
    <AnimatePresence mode="wait">
      {project && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8"
          initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
          animate={
            isClosing
              ? { backgroundColor: 'rgba(0, 0, 0, 0)' }
              : { backgroundColor: 'rgba(0, 0, 0, 0.8)' }
          }
          transition={{ duration: 0.4 }}
          onClick={handleClose}
          style={{ perspective: '1200px' }}
        >
          <motion.div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-dark-card"
            style={{
              boxShadow: 'var(--modal-card-shadow)',
              transformStyle: 'preserve-3d',
            }}
            initial={{
              x: offsetX,
              y: offsetY,
              scaleX,
              scaleY,
              rotateY: -180,
              rotateX: 8,
              opacity: 0,
            }}
            animate={
              isClosing
                ? {
                    x: offsetX,
                    y: offsetY,
                    scaleX,
                    scaleY,
                    rotateY: -180,
                    rotateX: 8,
                    opacity: 0,
                  }
                : {
                    x: 0,
                    y: 0,
                    scaleX: 1,
                    scaleY: 1,
                    rotateY: 0,
                    rotateX: 0,
                    opacity: 1,
                  }
            }
            transition={{
              type: 'spring',
              damping: 28,
              stiffness: 200,
              mass: 0.8,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-tag text-text-tertiary hover:text-text-primary hover:bg-tag-hover transition-all duration-200"
            >
              <X size={18} />
            </button>

            <div className="p-8 md:p-10">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-text-primary mb-3">
                  {project.title}
                </h2>

                {(project.period || project.role) && (
                  <div className="flex items-center gap-3 text-sm text-text-tertiary">
                    {project.period && <span>{project.period}</span>}
                    {project.period && project.role && (
                      <span className="text-[4px]">&#9679;</span>
                    )}
                    {project.role && <span>{project.role[lang]}</span>}
                  </div>
                )}
              </div>

              <p className="text-text-secondary leading-relaxed mb-8">
                {project.description[lang]}
              </p>

              {project.details && project.details.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xs text-text-tertiary font-medium tracking-widest uppercase mb-4">
                    {tr('modal.details', lang)}
                  </h3>
                  <ul className="space-y-2.5">
                    {project.details.map((detail, i) => (
                      <li
                        key={i}
                        className="text-sm text-text-secondary flex items-start gap-2.5"
                      >
                        <span className="text-primary mt-1.5 text-[5px]">
                          &#9679;
                        </span>
                        {detail[lang]}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.features && project.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xs text-text-tertiary font-medium tracking-widest uppercase mb-4">
                    {tr('modal.features', lang)}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 text-sm text-text-secondary px-3 py-2 rounded-lg bg-feature"
                      >
                        <div className="w-1 h-1 rounded-full bg-primary-light shrink-0" />
                        {feature[lang]}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xs text-text-tertiary font-medium tracking-widest uppercase mb-4">
                  {tr('modal.tech', lang)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techs.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1.5 rounded-full bg-tag text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {(project.github || project.demo) && (
                <div className="flex items-center gap-3 pt-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-tag text-sm text-text-secondary hover:bg-tag-hover hover:text-text-primary transition-all duration-200"
                    >
                      <Github size={15} />
                      GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-accent-blue text-sm text-white hover:opacity-90 transition-opacity duration-200"
                    >
                      <ExternalLink size={15} />
                      {tr('modal.demo', lang)}
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
