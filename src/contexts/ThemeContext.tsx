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

function getBtnCenter(btn: HTMLButtonElement | null): { x: number; y: number } {
  if (btn) {
    const r = btn.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }
  return { x: window.innerWidth / 2, y: 40 };
}

// 빛 번짐 오버레이 — 버튼에서 시작하여 화면 전체로 서서히 퍼짐
// Bloom overlay — starts at button and gradually fills the screen
function createBloom(x: number, y: number): HTMLDivElement {
  const el = document.createElement('div');

  // 6겹 그라데이션 — 경계가 거의 인지되지 않을 만큼 부드러운 페더링
  // 6-layer gradient — feathering so soft the edge is nearly imperceptible
  el.style.cssText = `
    position: fixed; inset: 0; z-index: 99999; pointer-events: none;
    will-change: transform, opacity;
    background:
      radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.22) 0%, transparent 40%),
      radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.12) 0%, transparent 55%),
      radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.06) 0%, transparent 70%);
    opacity: 0;
    transform: scale(0.6);
    transform-origin: ${x}px ${y}px;
    transition:
      opacity 1s cubic-bezier(0.4, 0, 0.2, 1),
      transform 2.4s cubic-bezier(0.16, 1, 0.3, 1);
  `;

  document.body.appendChild(el);
  requestAnimationFrame(() => {
    el.style.opacity = '1';
    el.style.transform = 'scale(5)';
  });

  return el;
}

function fadeOutBloom(el: HTMLDivElement) {
  el.style.transition = 'opacity 1.6s cubic-bezier(0.4, 0, 0.2, 1)';
  el.style.opacity = '0';
  setTimeout(() => { if (el.parentNode) el.remove(); }, 2000);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const transitioning = useRef(false);

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') root.classList.add('light');
    else root.classList.remove('light');
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    // 연타 방지
    // Prevent rapid fire
    if (transitioning.current) return;
    transitioning.current = true;

    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    const { x, y } = getBtnCenter(toggleBtnRef.current);

    const bloom = createBloom(x, y);

    if (document.startViewTransition) {
      setTimeout(() => {
        // 방향별 CSS 애니메이션 분기를 위해 클래스 설정
        // Set direction class for CSS animation branching
        document.documentElement.setAttribute('data-theme-dir', nextTheme === 'light' ? 'to-light' : 'to-dark');

        const t = document.startViewTransition(() => setTheme(nextTheme));

        // 크로스페이드 시작 직후 글로우 서서히 소멸 — 두 애니메이션이 자연스럽게 겹침
        // Bloom fades shortly after crossfade starts — both animations overlap naturally
        setTimeout(() => fadeOutBloom(bloom), 400);

        t.finished.then(() => {
          document.documentElement.removeAttribute('data-theme-dir');
          transitioning.current = false;
        });
      }, 500);
    } else {
      setTimeout(() => {
        setTheme(nextTheme);
        fadeOutBloom(bloom);
        transitioning.current = false;
      }, 500);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, toggleBtnRef }}>
      {children}
    </ThemeContext.Provider>
  );
}
