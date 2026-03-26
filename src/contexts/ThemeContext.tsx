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

// 빛 번짐 오버레이 생성 — 버튼 위치에서 방사형 글로우
// Create bloom overlay — radial glow from button position
function showBloomOverlay(x: number, y: number, isToLight: boolean): HTMLDivElement {
  const overlay = document.createElement('div');
  overlay.className = 'theme-bloom-overlay';

  // 다중 레이어 그라데이션 — 경계를 더욱 흐리게
  // Multi-layer gradient — makes edge much softer
  const c1 = isToLight ? 'rgba(255,255,255,0.45)' : 'rgba(110,231,183,0.2)';
  const c2 = isToLight ? 'rgba(255,255,255,0.15)' : 'rgba(110,231,183,0.08)';
  overlay.style.background = [
    `radial-gradient(circle at ${x}px ${y}px, ${c1} 0%, transparent 50%)`,
    `radial-gradient(circle at ${x}px ${y}px, ${c2} 0%, transparent 80%)`,
  ].join(', ');

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('active'));
  return overlay;
}

function removeBloomOverlay(overlay: HTMLDivElement) {
  overlay.classList.remove('active');
  overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
  // 안전장치 — transitionend 미발생 시 제거
  // Safety — remove if transitionend doesn't fire
  setTimeout(() => { if (overlay.parentNode) overlay.remove(); }, 600);
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

  // 테마 전환 — 버튼 중앙에서 부드러운 빛 번짐 확산
  // Theme toggle — soft light bloom spreading from button center
  const toggleTheme = useCallback((e?: React.MouseEvent) => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    const isToLight = nextTheme === 'light';

    // 버튼 요소의 정중앙 좌표 사용 (클릭 위치가 아닌 아이콘 중심)
    // Use exact center of button element (not click position)
    let x: number, y: number;
    const btn = e?.currentTarget as HTMLElement | null;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    } else {
      x = window.innerWidth / 2;
      y = window.innerHeight / 2;
    }

    // 화면 대각선 + 여유 — 원이 화면을 완전히 덮는 반지름
    // Screen diagonal + margin — radius to fully cover screen
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    ) + 200;

    // 빛 번짐 오버레이
    // Bloom overlay
    const overlay = showBloomOverlay(x, y, isToLight);

    if (document.startViewTransition) {
      const transition = document.startViewTransition(() => {
        setTheme(nextTheme);
      });

      transition.ready.then(() => {
        // 균일하게 천천히 확산 — linear easing으로 일정한 속도
        // Even, slow spread — linear easing for constant speed
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 1200,
            easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        );
      });

      transition.finished.then(() => removeBloomOverlay(overlay));
    } else {
      // 미지원 브라우저 — 오버레이 페이드
      // Unsupported browser — overlay fade
      setTimeout(() => {
        setTheme(nextTheme);
        removeBloomOverlay(overlay);
      }, 300);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
