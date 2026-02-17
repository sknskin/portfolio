import { useRef, useEffect, useState, memo, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  delay?: number;
  margin?: string;
}

export default memo(function ScrollReveal({
  children,
  className,
  y = 40,
  duration = 0.6,
  delay = 0,
  margin = '-100px',
}: Props) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const timeoutId = useRef<number | undefined>(undefined);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.clearTimeout(timeoutId.current);
          setVisible(true);
        } else {
          timeoutId.current = window.setTimeout(() => setVisible(false), 400);
        }
      },
      { rootMargin: margin },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timeoutId.current);
    };
  }, [margin]);

  return (
    <div ref={sentinelRef} className={className}>
      <motion.div
        className="h-full"
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y }}
        transition={{ duration, delay, ease: 'easeOut' }}
        style={{ willChange: visible ? 'auto' : 'transform, opacity' }}
      >
        {children}
      </motion.div>
    </div>
  );
});
