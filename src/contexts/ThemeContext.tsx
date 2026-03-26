import { createContext, useContext, useState, useLayoutEffect, useCallback, useRef, type ReactNode, type RefObject } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  toggleBtnRef: RefObject<HTMLButtonElement | null>;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  toggleBtnRef: { current: null },
});

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(ThemeContext);
}

// 버튼 ref에서 정확한 중심 좌표 반환
// Get exact center coordinates from button ref
function getBtnCenter(btn: HTMLButtonElement | null): { x: number; y: number } {
  if (btn) {
    const r = btn.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }
  return { x: window.innerWidth / 2, y: 40 };
}

// 빛 번짐 오버레이 — 버튼 위치에서 시작하는 글로우
// Bloom overlay — glow starting from button position
function createBloom(x: number, y: number): HTMLDivElement {
  const el = document.createElement('div');
  el.className = 'theme-bloom';

  // 양방향 동일한 부드러운 흰색 글로우 (다크/라이트 모두)
  // Same soft white glow for both directions
  el.style.cssText = `
    position:fixed; inset:0; z-index:99999; pointer-events:none;
    background: radial-gradient(circle at ${x}px ${y}px,
      rgba(255,255,255,0.35) 0%,
      rgba(255,255,255,0.15) 20%,
      rgba(255,255,255,0.05) 40%,
      transparent 65%);
    opacity:0;
    transform: scale(1);
    transform-origin: ${x}px ${y}px;
    transition: opacity 0.6s ease-out, transform 1.8s cubic-bezier(0.22, 1, 0.36, 1);
  `;
  document.body.appendChild(el);

  // 다음 프레임에서 확장 시작
  // Start expansion on next frame
  requestAnimationFrame(() => {
    el.style.opacity = '1';
    el.style.transform = 'scale(4)';
  });

  return el;
}

function removeBloom(el: HTMLDivElement) {
  el.style.opacity = '0';
  const handler = () => el.remove();
  el.addEventListener('transitionend', handler, { once: true });
  setTimeout(() => { if (el.parentNode) el.remove(); }, 2000);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  // 테마 전환 — 양방향 동일한 빛 번짐 + 뿌연 크로스페이드
  // Theme toggle — same bloom + hazy crossfade in both directions
  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';

    // 항상 버튼 ref에서 좌표 추출 — 모바일/웹 동일
    // Always get coords from button ref — same on mobile/web
    const { x, y } = getBtnCenter(toggleBtnRef.current);

    // 빛 번짐 시작
    // Start bloom
    const bloom = createBloom(x, y);

    if (document.startViewTransition) {
      // 글로우가 약간 퍼진 뒤 테마 전환
      // Switch theme after glow has slightly spread
      setTimeout(() => {
        // 전환 시작과 동시에 글로우 제거 시작 — 전환 후 깜빡임 방지
        // Start removing bloom at same time as transition — prevents flash after switch
        removeBloom(bloom);
        document.startViewTransition(() => setTheme(nextTheme));
      }, 300);
    } else {
      setTimeout(() => {
        removeBloom(bloom);
        setTheme(nextTheme);
      }, 300);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, toggleBtnRef }}>
      {children}
    </ThemeContext.Provider>
  );
}
