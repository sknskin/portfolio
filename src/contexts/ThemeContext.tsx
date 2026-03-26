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

// 빛 번짐 오버레이 생성 — 클릭 위치에서 방사형 글로우
// Create bloom overlay — radial glow from click position
function createBloomOverlay(x: number, y: number, isToLight: boolean): HTMLDivElement {
  const overlay = document.createElement('div');
  overlay.className = 'theme-bloom-overlay';
  const color = isToLight
    ? 'rgba(255, 255, 255, 0.3)'
    : 'rgba(110, 231, 183, 0.15)';
  overlay.style.background = `radial-gradient(circle at ${x}px ${y}px, ${color} 0%, transparent 70%)`;
  document.body.appendChild(overlay);
  return overlay;
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

  // 테마 전환 — 클릭 위치에서 부드러운 빛 번짐 + 원형 확산
  // Theme toggle — soft light bloom + circular spread from click position
  const toggleTheme = useCallback((e?: React.MouseEvent) => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    const isToLight = nextTheme === 'light';

    const x = e?.clientX ?? window.innerWidth / 2;
    const y = e?.clientY ?? window.innerHeight / 2;

    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    // 빛 번짐 오버레이 표시
    // Show bloom overlay
    const overlay = createBloomOverlay(x, y, isToLight);
    requestAnimationFrame(() => overlay.classList.add('active'));

    if (document.startViewTransition) {
      const transition = document.startViewTransition(() => {
        setTheme(nextTheme);
      });

      transition.ready.then(() => {
        // 부드러운 경계의 원형 확산 — 더 긴 시간 + 부드러운 이징
        // Soft-edged circular spread — longer duration + smooth easing
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0% at ${x}px ${y}px)`,
              `circle(${maxRadius + 100}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 700,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        );
      });

      // 전환 완료 후 오버레이 제거
      // Remove overlay after transition completes
      transition.finished.then(() => {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
      });
    } else {
      // 미지원 브라우저 — 오버레이 페이드만 사용
      // Unsupported browser — use overlay fade only
      setTimeout(() => {
        setTheme(nextTheme);
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
      }, 200);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
