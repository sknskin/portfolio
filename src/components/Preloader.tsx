import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { preloadTechIcons } from '../data/techIcons';

const FULL_TEXT = '> Loading...';

export default function Preloader({ onFinish }: { onFinish: () => void }) {
  const [visible, setVisible] = useState(true);
  const [typed, setTyped] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (indexRef.current < FULL_TEXT.length) {
        indexRef.current += 1;
        setTyped(FULL_TEXT.slice(0, indexRef.current));
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const minDelay = new Promise((r) => setTimeout(r, 1500));
    Promise.all([preloadTechIcons(), minDelay]).then(() => {
      setVisible(false);
      setTimeout(onFinish, 400);
    });
  }, [onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: 'var(--bg-glow-tint)' }}
        >
          <span className="font-mono text-2xl text-text-secondary">
            {typed}
            <span className="inline-block w-[2px] h-[1.1em] bg-primary ml-[2px] align-middle animate-[blink_0.8s_step-end_infinite]" />
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
