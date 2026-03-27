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

  // 테마 전환 — 순수 CSS 크로스페이드만 사용 (글로우 오버레이 없음)
  // Theme toggle — pure CSS crossfade only (no bloom overlay)
  const toggleTheme = useCallback(() => {
    if (transitioning.current) return;
    transitioning.current = true;

    if (document.startViewTransition) {
      const t = document.startViewTransition(() => setTheme(
        (prev) => prev === 'dark' ? 'light' : 'dark',
      ));
      t.finished.then(() => { transitioning.current = false; });
    } else {
      setTheme((prev) => prev === 'dark' ? 'light' : 'dark');
      transitioning.current = false;
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, toggleBtnRef }}>
      {children}
    </ThemeContext.Provider>
  );
}
