import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

// 스크롤 위치 기준값 (px) — 이 이상 스크롤 시 버튼 표시
// Scroll threshold (px) — button appears when scrolled past this value
const SCROLL_THRESHOLD = 400;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 스크롤 이벤트로 버튼 표시/숨김 결정
    // Determine button visibility based on scroll position
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 페이지 최상단으로 부드럽게 스크롤
  // Smoothly scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-dark-card border border-dark-border text-text-secondary hover:text-terminal-green hover:border-terminal-green/30 hover:shadow-[0_0_20px_rgba(110,231,183,0.15)] transition-all duration-300 cursor-pointer ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp size={18} />
    </button>
  );
}
