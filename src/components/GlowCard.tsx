import { useRef, useCallback, useEffect, type ReactNode, type MouseEvent } from 'react';

// Global mouse position shared across all GlowCard instances
let gMouseX = -1;
let gMouseY = -1;
let gListenerAttached = false;

function ensureGlobalMouseTracker() {
  if (gListenerAttached) return;
  gListenerAttached = true;
  window.addEventListener('mousemove', (e) => {
    gMouseX = e.clientX;
    gMouseY = e.clientY;
  }, { passive: true });
}

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

export default function GlowCard({ children, className = '', onClick }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const defaultBorderRef = useRef<HTMLDivElement>(null);
  const hoveredRef = useRef(false);

  const applyGlow = useCallback((clientX: number, clientY: number) => {
    if (!ref.current || !glowRef.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, var(--glow-1), var(--glow-2) 40%, transparent 70%)`;
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    applyGlow(e.clientX, e.clientY);
  }, [applyGlow]);

  const handleEnter = useCallback(() => {
    if (!ref.current || !glowRef.current || !borderRef.current || !defaultBorderRef.current) return;
    hoveredRef.current = true;
    ref.current.style.boxShadow = 'var(--card-hover-shadow)';
    ref.current.style.backgroundColor = 'var(--card-hover-bg, var(--bg-card))';
    glowRef.current.style.opacity = '1';
    borderRef.current.style.opacity = '1';
    defaultBorderRef.current.style.opacity = '0';
  }, []);

  const handleLeave = useCallback(() => {
    if (!ref.current || !glowRef.current || !borderRef.current || !defaultBorderRef.current) return;
    hoveredRef.current = false;
    ref.current.style.boxShadow = 'none';
    ref.current.style.backgroundColor = '';
    glowRef.current.style.opacity = '0';
    borderRef.current.style.opacity = '0';
    defaultBorderRef.current.style.opacity = '1';
  }, []);

  // Re-evaluate hover state on scroll (cursor stays still, cards move)
  useEffect(() => {
    ensureGlobalMouseTracker();

    const onScroll = () => {
      if (!ref.current || gMouseX < 0) return;
      const rect = ref.current.getBoundingClientRect();
      const inside =
        gMouseX >= rect.left && gMouseX <= rect.right &&
        gMouseY >= rect.top && gMouseY <= rect.bottom;

      if (inside && !hoveredRef.current) {
        handleEnter();
        applyGlow(gMouseX, gMouseY);
      } else if (!inside && hoveredRef.current) {
        handleLeave();
      } else if (inside) {
        applyGlow(gMouseX, gMouseY);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleEnter, handleLeave, applyGlow]);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl bg-dark-card transition-[box-shadow,background-color] duration-300 ${className}`}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{ opacity: 0 }}
      />
      <div
        ref={borderRef}
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl transition-opacity duration-300"
        style={{
          boxShadow: 'inset 0 0 0 1px var(--glow-border)',
          opacity: 0,
        }}
      />
      <div
        ref={defaultBorderRef}
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl transition-opacity duration-300"
        style={{
          boxShadow: 'inset 0 0 0 1px var(--border-subtle)',
          opacity: 1,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
