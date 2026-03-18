import { useEffect, useCallback, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, Github, ExternalLink, GitBranch } from 'lucide-react';
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
  const [maximized, setMaximized] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  if (project && project !== dp) {
    setDp(project);
  }

  if (project && phase === 'idle') {
    setPhase('opening');
  }

  if (phase === 'idle' && !project && dp) {
    setDp(null);
  }

  useEffect(() => {
    if (phase === 'opening') {
      const t = window.setTimeout(() => setPhase('open'), DURATION * 1000);
      return () => window.clearTimeout(t);
    }
  }, [phase]);

  const handleClose = useCallback(() => {
    setMaximized(false);
    setPhase('closing');
    setTimeout(() => {
      onClose();
      setPhase('fading');
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

  const baseWidth = Math.min(672, window.innerWidth - 64);
  const baseHeight = Math.min(window.innerHeight * 0.85, 700);
  const modalWidth = maximized ? window.innerWidth - 32 : baseWidth;
  const modalHeight = maximized ? window.innerHeight - 32 : baseHeight;

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

      {/* Shell */}
      <div
        style={{
          opacity: isFading ? 0 : 1,
          transition: 'opacity 0.25s ease',
        }}
      >
        <motion.div
          className="absolute rounded-xl bg-dark-card overflow-hidden border border-dark-border"
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
            className="pointer-events-none absolute inset-0 z-0 rounded-xl transition-opacity duration-300"
            style={{ opacity: 0 }}
          />

          {/* Terminal-style top bar */}
          <div className="absolute top-0 left-0 right-0 h-8 flex items-center gap-1.5 px-3 bg-black/20 border-b border-dark-border z-[3]"
            style={{
              opacity: showContent ? 1 : 0,
              transition: `opacity ${DURATION * 0.5}s ease`,
            }}
          >
            <button onClick={handleClose} className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] hover:brightness-125 cursor-pointer" aria-label="닫기" />
            <button onClick={handleClose} className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] hover:brightness-125 cursor-pointer" aria-label="최소화" />
            <button onClick={() => setMaximized((v) => !v)} className="w-2.5 h-2.5 rounded-full bg-[#27c93f] hover:brightness-125 cursor-pointer" aria-label="최대화" />
            <span className="ml-2 text-[10px] font-mono text-text-tertiary truncate">{dp.title}</span>
          </div>

          <button
            onClick={handleClose}
            className="absolute top-10 right-4 z-10 p-2 rounded-lg bg-tag text-text-tertiary hover:text-terminal-green hover:bg-tag-hover transition-all duration-200 cursor-pointer"
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
            className="relative z-[2] p-8 md:p-10 pt-12"
            style={{
              opacity: showContent ? 1 : 0,
              transform: showContent ? 'translateY(0)' : 'translateY(12px)',
              transition: `opacity ${DURATION * 0.6}s ease, transform ${DURATION * 0.6}s ease`,
            }}
          >
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <GitBranch size={18} className="text-terminal-green" />
                <h2 className="text-2xl font-bold font-mono text-text-primary">
                  {dp.title}
                </h2>
              </div>

              {(dp.period || dp.role) && (
                <div className="flex items-center gap-3 text-sm font-mono text-text-tertiary">
                  {dp.period && (
                    <span className="px-2 py-0.5 rounded border border-dark-border text-xs">{dp.period}</span>
                  )}
                  {dp.role && (
                    <span className="text-terminal-cyan text-xs">{dp.role[lang]}</span>
                  )}
                </div>
              )}
            </div>

            <p className="text-text-secondary leading-relaxed mb-8 font-mono text-sm">
              {dp.description[lang]}
            </p>

            {dp.details && dp.details.length > 0 && (
              <div className="mb-8">
                <h3 className="font-mono text-xs text-terminal-green font-medium tracking-widest mb-4">
                  $ {tr('modal.details', lang).toLowerCase()}
                </h3>
                <ul className="space-y-2.5">
                  {dp.details.map((detail, i) => (
                    <li
                      key={i}
                      className="text-sm font-mono text-text-secondary flex items-start gap-2.5"
                    >
                      <span className="text-terminal-green mt-0.5 text-xs">
                        &gt;
                      </span>
                      {detail[lang]}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {dp.features && dp.features.length > 0 && (
              <div className="mb-8">
                <h3 className="font-mono text-xs text-terminal-green font-medium tracking-widest mb-4">
                  $ {tr('modal.features', lang).toLowerCase()}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {dp.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 text-sm font-mono text-text-secondary px-3 py-2 rounded-lg bg-feature border border-dark-border"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-terminal-green shrink-0" />
                      {feature[lang]}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <h3 className="font-mono text-xs text-terminal-green font-medium tracking-widest mb-4">
                $ {tr('modal.tech', lang).toLowerCase()}
              </h3>
              <div className="flex flex-wrap gap-2">
                {dp.techs.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-2.5 py-1 rounded border border-dark-border text-terminal-cyan"
                  >
                    [{tech}]
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
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono bg-tag text-sm text-text-secondary hover:bg-tag-hover hover:text-terminal-green transition-all duration-200 border border-dark-border"
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
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono bg-terminal-green/15 border border-terminal-green/30 text-sm text-terminal-green hover:bg-terminal-green/25 transition-all duration-200"
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
