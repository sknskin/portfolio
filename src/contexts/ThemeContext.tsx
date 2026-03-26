import { createContext, useContext, useState, useLayoutEffect, useCallback, type ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (e?: React.MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(ThemeContext);
}

// 버튼 중심 좌표 반환
// Get button center coordinates
function getButtonCenter(e?: React.MouseEvent): { x: number; y: number } {
  const btn = e?.currentTarget as HTMLElement | null;
  if (btn) {
    const rect = btn.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }
  return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
}

// 빛 번짐 오버레이 — 버튼 위치에서 서서히 퍼지는 글로우
// Bloom overlay — glow that slowly spreads from button position
function createBloomOverlay(x: number, y: number, isToLight: boolean): HTMLDivElement {
  const overlay = document.createElement('div');
  overlay.className = 'theme-bloom-overlay';

  const inner = isToLight ? 'rgba(255,255,255,0.5)' : 'rgba(110,231,183,0.25)';
  const mid = isToLight ? 'rgba(255,255,255,0.2)' : 'rgba(110,231,183,0.1)';

  // 작은 글로우로 시작 — CSS transition으로 확장
  // Start small — expand via CSS transition
  overlay.style.background = `radial-gradient(circle at ${x}px ${y}px, ${inner} 0%, ${mid} 30%, transparent 60%)`;
  overlay.style.transform = 'scale(0.3)';
  overlay.style.opacity = '0';

  document.body.appendChild(overlay);

  // 다음 프레임에서 확장 시작
  // Start expansion on next frame
  requestAnimationFrame(() => {
    overlay.style.transform = 'scale(3)';
    overlay.style.opacity = '1';
  });

  return overlay;
}

function removeBloomOverlay(overlay: HTMLDivElement) {
  overlay.style.opacity = '0';
  overlay.style.transform = 'scale(4)';
  overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
  setTimeout(() => { if (overlay.parentNode) overlay.remove(); }, 2000);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  // 테마 전환 — 빛이 번지듯 뿌옇게 → 점차 선명하게
  // Theme toggle — hazy light bloom → gradually clears into new theme
  const toggleTheme = useCallback((e?: React.MouseEvent) => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    const isToLight = nextTheme === 'light';
    const { x, y } = getButtonCenter(e);

    // 빛 번짐 오버레이 시작
    // Start bloom overlay
    const overlay = createBloomOverlay(x, y, isToLight);

    if (document.startViewTransition) {
      // 오버레이가 퍼진 뒤 테마 전환 시작
      // Start theme switch after overlay has spread
      setTimeout(() => {
        const transition = document.startViewTransition(() => {
          setTheme(nextTheme);
        });

        transition.finished.then(() => {
          // 전환 완료 후 오버레이 서서히 제거
          // Slowly remove overlay after transition
          setTimeout(() => removeBloomOverlay(overlay), 200);
        });
      }, 400);
    } else {
      // 미지원 브라우저
      // Unsupported browser
      setTimeout(() => {
        setTheme(nextTheme);
        setTimeout(() => removeBloomOverlay(overlay), 300);
      }, 400);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
