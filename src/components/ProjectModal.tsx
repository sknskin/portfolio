import { useEffect, useCallback, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, Github, ExternalLink } from 'lucide-react';
import type { Project } from '../data/portfolio';
import { useLanguage } from '../contexts/LanguageContext';
import { tr } from '../data/i18n';

interface ProjectModalProps {
  project: Project | null;
  cardRect: DOMRect | null;
  onClose: () => void;
}

const DURATION = 0.5;
type Phase = 'idle' | 'opening' | 'open' | 'closing' | 'fading';

export default function ProjectModal({
  project,
  cardRect,
  onClose,
}: ProjectModalProps) {
  const { lang } = useLanguage();
  const [phase, setPhase] = useState<Phase>('idle');
  const [dp, setDp] = useState<Project | null>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Capture project for display — persists through close animation
  // (React "adjust state during render" pattern)
  if (project && project !== dp) {
    setDp(project);
  }

  // Start opening when project arrives
  if (project && phase === 'idle') {
    setPhase('opening');
  }

  // Clear display project when fully idle
  if (phase === 'idle' && !project && dp) {
    setDp(null);
  }

  // Schedule content reveal after shell expansion
  useEffect(() => {
    if (phase === 'opening') {
      const t = window.setTimeout(() => setPhase('open'), DURATION * 1000);
      return () => window.clearTimeout(t);
    }
  }, [phase]);

  const handleClose = useCallback(() => {
    setPhase('closing');
    setTimeout(() => {
      onClose();          // card starts fade-in
      setPhase('fading'); // shell starts cross-fade out
      setTimeout(() => setPhase('idle'), 250);
    }, DURATION * 0.6 * 1000);
  }, [onClose]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!glowRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.background = `radial-gradient(500px circle at ${x}px ${y}px, var(--glow-1), transparent 70%)`;
    glowRef.current.style.opacity = '1';
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!glowRef.current) return;
    glowRef.current.style.opacity = '0';
  }, []);

  useEffect(() => {
    if (phase === 'idle' || !dp) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-compensation', `${scrollbarWidth}px`);
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.documentElement.style.removeProperty('--scrollbar-compensation');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [phase, dp, handleClose]);

  if (phase === 'idle' || !dp) return null;

  const modalWidth = Math.min(672, window.innerWidth - 64);
  const modalHeight = Math.min(window.innerHeight * 0.85, 700);

  const isExpanded = phase === 'opening' || phase === 'open';
  const showContent = phase === 'open';
  const isFading = phase === 'fading';

  const cardInitial = {
    top: cardRect?.top ?? (window.innerHeight - modalHeight) / 2,
    left: cardRect?.left ?? (window.innerWidth - modalWidth) / 2,
    width: cardRect?.width ?? modalWidth,
    height: cardRect?.height ?? modalHeight,
  };

  const modalFinal = {
    top: (window.innerHeight - modalHeight) / 2,
    left: (window.innerWidth - modalWidth) / 2,
    width: modalWidth,
    height: modalHeight,
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[10000]"
      style={{ pointerEvents: isFading ? 'none' : 'auto' }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        onClick={handleClose}
        style={{
          backgroundColor: 'var(--modal-overlay)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          opacity: isExpanded ? 1 : 0,
          transition: `opacity ${DURATION * 0.7}s cubic-bezier(0.4, 0, 0.2, 1)`,
          pointerEvents: isExpanded ? 'auto' : 'none',
        }}
      />

      {/* Shell — morphs from card rect to modal rect, cross-fades on close */}
      <div
        style={{
          opacity: isFading ? 0 : 1,
          transition: 'opacity 0.25s ease',
        }}
      >
        <motion.div
          className="absolute rounded-2xl bg-dark-card overflow-hidden"
          style={{
            boxShadow: isExpanded
              ? 'var(--modal-card-shadow)'
              : 'inset 0 0 0 1px var(--border-subtle)',
            transition: `box-shadow ${DURATION}s cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
          initial={cardInitial}
          animate={isExpanded ? modalFinal : cardInitial}
          transition={{ duration: DURATION, ease: [0.4, 0, 0.2, 1] }}
          onClick={(e) => e.stopPropagation()}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={glowRef}
            className="pointer-events-none absolute inset-0 z-0 rounded-2xl transition-opacity duration-300"
            style={{ opacity: 0 }}
          />

          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent z-[1]" />

          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-tag text-text-tertiary hover:text-text-primary hover:bg-tag-hover transition-all duration-200 cursor-pointer"
            style={{
              opacity: showContent ? 1 : 0,
              transition: `opacity ${DURATION * 0.5}s ease`,
            }}
          >
            <X size={18} />
          </button>

          <div
            className="h-full"
            style={{ overflowY: showContent ? 'auto' : 'hidden' }}
          >
          <div
            className="relative z-[2] p-8 md:p-10"
            style={{
              opacity: showContent ? 1 : 0,
              transform: showContent ? 'translateY(0)' : 'translateY(12px)',
              transition: `opacity ${DURATION * 0.6}s ease, transform ${DURATION * 0.6}s ease`,
            }}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-3">
                {dp.title}
              </h2>

              {(dp.period || dp.role) && (
                <div className="flex items-center gap-3 text-sm text-text-tertiary">
                  {dp.period && <span>{dp.period}</span>}
                  {dp.period && dp.role && (
                    <span className="text-[4px]">&#9679;</span>
                  )}
                  {dp.role && <span>{dp.role[lang]}</span>}
                </div>
              )}
            </div>

            <p className="text-text-secondary leading-relaxed mb-8">
              {dp.description[lang]}
            </p>

            {dp.details && dp.details.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs text-text-tertiary font-medium tracking-widest uppercase mb-4">
                  {tr('modal.details', lang)}
                </h3>
                <ul className="space-y-2.5">
                  {dp.details.map((detail, i) => (
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

            {dp.features && dp.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs text-text-tertiary font-medium tracking-widest uppercase mb-4">
                  {tr('modal.features', lang)}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {dp.features.map((feature, i) => (
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
                {dp.techs.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1.5 rounded-full bg-tag text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {(dp.github || dp.demo) && (
              <div className="flex items-center gap-3 pt-2">
                {dp.github && (
                  <a
                    href={dp.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-tag text-sm text-text-secondary hover:bg-tag-hover hover:text-text-primary transition-all duration-200"
                  >
                    <Github size={15} />
                    GitHub
                  </a>
                )}
                {dp.demo && (
                  <a
                    href={dp.demo}
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
          </div>
        </motion.div>
      </div>
    </div>,
    document.body,
  );
}
