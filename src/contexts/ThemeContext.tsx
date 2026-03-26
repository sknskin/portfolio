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

  // 테마 전환 — 클릭 위치에서 빛이 번지듯 원형으로 전환
  // Theme toggle — radial light spread from click position
  const toggleTheme = useCallback((e?: React.MouseEvent) => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';

    // 클릭 좌표 (없으면 화면 중앙)
    // Click coordinates (fallback to center)
    const x = e?.clientX ?? window.innerWidth / 2;
    const y = e?.clientY ?? window.innerHeight / 2;

    // 화면 꼭짓점까지의 최대 거리 (원이 화면을 완전히 덮는 반지름)
    // Max distance to screen corner (radius to fully cover screen)
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    // View Transition API 지원 시 — 부드러운 원형 확산 애니메이션
    // When View Transition API is supported — smooth radial spread animation
    if (document.startViewTransition) {
      const transition = document.startViewTransition(() => {
        setTheme(nextTheme);
      });

      transition.ready.then(() => {
        // 새 뷰를 원형 clip-path로 애니메이션
        // Animate new view with circular clip-path
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 500,
            easing: 'ease-out',
            pseudoElement: '::view-transition-new(root)',
          },
        );
      });
    } else {
      // 미지원 브라우저 — 기존 방식 (즉시 전환)
      // Unsupported browser — fallback (instant switch)
      setTheme(nextTheme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
