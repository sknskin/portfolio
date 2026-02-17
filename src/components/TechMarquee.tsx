import { useState, useEffect, memo } from 'react';
import { techs, preloadTechIcons } from '../data/techIcons';

const TechItem = memo(({ name, icon }: { name: string; icon: string }) => (
  <div className="flex flex-col items-center gap-2 px-2 shrink-0">
    <img
      src={icon}
      alt={name}
      width={32}
      height={32}
      className="w-8 h-8 object-contain"
      draggable={false}
      loading="eager"
      decoding="async"
    />
    <span className="text-xs text-text-secondary whitespace-nowrap">
      {name}
    </span>
  </div>
));

TechItem.displayName = 'TechItem';

export default memo(function TechMarquee() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    preloadTechIcons().then(() => setLoaded(true));
  }, []);

  return (
    <div
      className="max-w-2xl mx-auto overflow-hidden select-none pointer-events-none"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        contain: 'layout style paint',
      }}
    >
      <div
        className="flex gap-8 w-max"
        style={{
          animation: loaded ? 'marquee-left 30s linear infinite' : 'none',
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        {[0, 1].map((set) =>
          techs.map((tech) => (
            <TechItem key={`${set}-${tech.name}`} name={tech.name} icon={tech.icon} />
          )),
        )}
      </div>
    </div>
  );
});
