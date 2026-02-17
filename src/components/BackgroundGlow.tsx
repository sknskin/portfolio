import { memo } from 'react';

// Pure CSS animated blobs — no JS animation runtime overhead
const blobs = [
  { className: 'w-[800px] h-[800px] opacity-50', style: { top: '-5%', left: '-10%', backgroundColor: 'var(--bg-glow-1)', filter: 'blur(200px)', animation: 'blob-1 30s ease-in-out infinite' } },
  { className: 'w-[700px] h-[700px] opacity-40', style: { top: '10%', right: '-5%', backgroundColor: 'var(--bg-glow-2)', filter: 'blur(200px)', animation: 'blob-2 35s ease-in-out infinite' } },
  { className: 'w-[600px] h-[600px] opacity-35', style: { top: '35%', left: '20%', backgroundColor: 'var(--bg-glow-3)', filter: 'blur(180px)', animation: 'blob-3 28s ease-in-out infinite' } },
  { className: 'w-[750px] h-[750px] opacity-45', style: { bottom: '5%', right: '0%', backgroundColor: 'var(--bg-glow-1)', filter: 'blur(200px)', animation: 'blob-4 32s ease-in-out infinite' } },
  { className: 'w-[650px] h-[650px] opacity-40', style: { bottom: '15%', left: '-5%', backgroundColor: 'var(--bg-glow-2)', filter: 'blur(190px)', animation: 'blob-5 26s ease-in-out infinite' } },
] as const;

export default memo(function BackgroundGlow() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundColor: 'var(--bg-glow-tint)',
        backgroundImage: `
          radial-gradient(ellipse 140% 140% at 50% 50%, var(--bg-glow-base), transparent),
          radial-gradient(ellipse 100% 50% at 50% 0%, var(--bg-glow-1), transparent),
          radial-gradient(ellipse 80% 70% at 10% 20%, var(--bg-glow-1), transparent),
          radial-gradient(ellipse 70% 60% at 90% 15%, var(--bg-glow-2), transparent),
          radial-gradient(ellipse 65% 70% at 40% 50%, var(--bg-glow-3), transparent),
          radial-gradient(ellipse 70% 75% at 20% 75%, var(--bg-glow-1), transparent),
          radial-gradient(ellipse 75% 65% at 80% 80%, var(--bg-glow-2), transparent),
          radial-gradient(ellipse 60% 55% at 50% 95%, var(--bg-glow-3), transparent)
        `,
        transition: 'background-color 0.3s ease',
        contain: 'strict',
      }}
    >
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={`absolute rounded-full will-change-transform ${blob.className}`}
          style={{ ...blob.style, transform: 'translate3d(0,0,0)' }}
        />
      ))}
    </div>
  );
});
