import { useRef, useState, type ReactNode, type MouseEvent } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

export default function GlowCard({ children, className = '', onClick }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({});
  const [hovering, setHovering] = useState(false);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setGlowStyle({
      background: `radial-gradient(600px circle at ${x}px ${y}px, var(--glow-1), var(--glow-2) 40%, transparent 70%)`,
    });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl bg-dark-card transition-all duration-300 ${className}`}
      style={{
        boxShadow: hovering ? 'var(--card-hover-shadow)' : 'none',
        backgroundColor: hovering ? 'var(--card-hover-bg, var(--bg-card))' : undefined,
      }}
    >
      {/* Cursor-following glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{ ...glowStyle, opacity: hovering ? 1 : 0 }}
      />
      {/* Hover border */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl transition-opacity duration-300"
        style={{
          boxShadow: 'inset 0 0 0 1px var(--glow-border)',
          opacity: hovering ? 1 : 0,
        }}
      />
      {/* Default border */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl transition-opacity duration-300"
        style={{
          boxShadow: 'inset 0 0 0 1px var(--border-subtle)',
          opacity: hovering ? 0 : 1,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
