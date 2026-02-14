import { useRef, useCallback, type ReactNode, type MouseEvent } from 'react';

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

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !glowRef.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, var(--glow-1), var(--glow-2) 40%, transparent 70%)`;
  }, []);

  const handleEnter = useCallback(() => {
    if (!ref.current || !glowRef.current || !borderRef.current || !defaultBorderRef.current) return;
    ref.current.style.boxShadow = 'var(--card-hover-shadow)';
    ref.current.style.backgroundColor = 'var(--card-hover-bg, var(--bg-card))';
    glowRef.current.style.opacity = '1';
    borderRef.current.style.opacity = '1';
    defaultBorderRef.current.style.opacity = '0';
  }, []);

  const handleLeave = useCallback(() => {
    if (!ref.current || !glowRef.current || !borderRef.current || !defaultBorderRef.current) return;
    ref.current.style.boxShadow = 'none';
    ref.current.style.backgroundColor = '';
    glowRef.current.style.opacity = '0';
    borderRef.current.style.opacity = '0';
    defaultBorderRef.current.style.opacity = '1';
  }, []);

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
