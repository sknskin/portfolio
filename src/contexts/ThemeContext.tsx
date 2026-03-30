import { createContext, useContext, useState, useLayoutEffect, useCallback, useRef, useEffect, type ReactNode } from 'react';

type Theme = 'dark' | 'light';

// ── 애니메이션 설정 / Animation config ──
const EXPAND_MS = 1200;
const DISSOLVE_MS = 600;
const THEME_SWITCH_RATIO = 0.40;
const PEAK_BLUR = 22;
const PEAK_SATURATE = 0.3;
const TINT_OPACITY = 0.05;

// 테마 배경 RGB (미세 틴트용)
// Theme background RGB (for subtle tint)
const THEME_RGB: Record<Theme, string> = {
  dark: '10, 10, 10',
  light: '240, 244, 240',
};

// 블롭 구성 — 여러 타원이 겹쳐 유기적 경계 형성
// Blob configs — overlapping ellipses create organic boundaries
const BLOBS = [
  { ox: 0,   oy: 0,   sx: 1.0,  sy: 0.92, delay: 0 },
  { ox: -60, oy: -50, sx: 0.82, sy: 0.95, delay: 0.04 },
  { ox: 75,  oy: 35,  sx: 0.85, sy: 0.72, delay: 0.06 },
  { ox: -35, oy: 70,  sx: 0.78, sy: 0.90, delay: 0.03 },
  { ox: 50,  oy: -60, sx: 0.72, sy: 0.82, delay: 0.05 },
  { ox: -85, oy: 20,  sx: 0.68, sy: 0.85, delay: 0.07 },
  { ox: 25,  oy: 80,  sx: 0.62, sy: 0.78, delay: 0.05 },
];

/**
 * Quintic ease-in-out — 매우 부드러운 가속/감속
 * Quintic ease-in-out — very smooth acceleration/deceleration
 */
function smoothEase(t: number): number {
  return t < 0.5
    ? 16 * t * t * t * t * t
    : 1 - Math.pow(-2 * t + 2, 5) / 2;
}

/** 0~1 클램프 / Clamp to 0–1 */
function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (originX: number, originY: number) => void;
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
  // index.html 인라인 스크립트가 이미 적용한 클래스를 읽어 초기 상태 결정
  // Read initial state from class applied by inline script in index.html
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('light') ? 'light' : 'dark';
    }
    return 'dark';
  });
  const busyRef = useRef(false);

  // 테마 클래스 동기화 + localStorage 저장
  // Sync theme class + save to localStorage
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') root.classList.add('light');
    else root.classList.remove('light');
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  // 언마운트 시 잔여 오버레이 정리
  // Clean up leftover overlay on unmount
  useEffect(() => {
    return () => {
      document.getElementById('theme-blur-overlay')?.remove();
    };
  }, []);

  /**
   * backdrop-filter 블러 번짐 효과로 테마 전환
   * Toggle theme with spreading backdrop-filter blur effect
   *
   * Phase 1 (확장): mask-image로 블러 영역이 유기적으로 확장
   * Phase 1 (expand): mask-image expands blur region organically
   *
   * Phase 2 (디졸브): 블러 강도 + 투명도가 서서히 감소
   * Phase 2 (dissolve): blur intensity + opacity fade out smoothly
   */
  const toggleTheme = useCallback((originX: number, originY: number) => {
    if (busyRef.current) return;

    // 모션 감소 설정 시 즉시 전환
    // Instant toggle when prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTheme(prev => prev === 'dark' ? 'light' : 'dark');
      return;
    }

    busyRef.current = true;
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';

    // 진원지에서 가장 먼 뷰포트 모서리까지의 거리
    // Distance from origin to farthest viewport corner
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxDist = Math.sqrt(
      Math.max(originX, vw - originX) ** 2 + Math.max(originY, vh - originY) ** 2
    );
    const maxRadius = maxDist * 1.25;

    // 기존 오버레이 제거 / Remove any existing overlay
    document.getElementById('theme-blur-overlay')?.remove();

    // ── 오버레이 생성: backdrop-filter로 콘텐츠를 흐리게만 함 (뒤덮지 않음)
    // ── Create overlay: backdrop-filter only blurs content (doesn't cover it)
    const overlay = document.createElement('div');
    overlay.id = 'theme-blur-overlay';
    overlay.style.cssText = [
      'position:fixed',
      'inset:0',
      'z-index:9999',
      'pointer-events:none',
      `backdrop-filter:blur(${PEAK_BLUR}px) saturate(${PEAK_SATURATE})`,
      `-webkit-backdrop-filter:blur(${PEAK_BLUR}px) saturate(${PEAK_SATURATE})`,
      `background:rgba(${THEME_RGB[nextTheme]},${TINT_OPACITY})`,
      // 초기 마스크: 모든 블롭 반지름 0 → 아직 아무 것도 보이지 않음
      // Initial mask: all blob radii 0 → nothing visible yet
      `mask-image:radial-gradient(ellipse 0px 0px at ${originX}px ${originY}px,black 0%,transparent 100%)`,
      `-webkit-mask-image:radial-gradient(ellipse 0px 0px at ${originX}px ${originY}px,black 0%,transparent 100%)`,
    ].join(';');
    document.body.appendChild(overlay);

    // ── rAF 애니메이션 루프 / rAF animation loop ──
    let themeApplied = false;
    const startTime = performance.now();
    const totalDuration = EXPAND_MS + DISSOLVE_MS;

    function tick(now: number) {
      const elapsed = now - startTime;

      if (elapsed <= EXPAND_MS) {
        // ── Phase 1: 확장 — 블러 영역이 유기적으로 퍼져나감
        // ── Phase 1: Expand — blur region spreads organically
        const expandP = Math.min(elapsed / EXPAND_MS, 1);

        // 여러 radial-gradient 마스크로 유기적 경계 형성
        // Multiple radial-gradient masks create organic boundaries
        const gradients = BLOBS.map((cfg) => {
          const localP = clamp01((expandP - cfg.delay) / (1 - cfg.delay));
          const e = smoothEase(localP);
          const rx = e * maxRadius * cfg.sx;
          const ry = e * maxRadius * cfg.sy;
          const cx = originX + cfg.ox;
          const cy = originY + cfg.oy;
          // 60% 지점까지 불투명 → 100%까지 부드러운 페이드 (넓은 소프트 엣지)
          // Opaque to 60% → soft fade to 100% (wide soft edge)
          return `radial-gradient(ellipse ${rx}px ${ry}px at ${cx}px ${cy}px,black 0%,black 55%,transparent 100%)`;
        });

        const maskVal = gradients.join(',');
        overlay.style.maskImage = maskVal;
        overlay.style.webkitMaskImage = maskVal;

        // 40% 시점에 테마 클래스 전환 (블러 뒤에서 보이지 않음)
        // Switch theme class at 40% (invisible behind blur)
        if (!themeApplied && expandP >= THEME_SWITCH_RATIO) {
          themeApplied = true;
          setTheme(nextTheme);
        }

      } else {
        // ── Phase 2: 디졸브 — 블러가 서서히 걷힘
        // ── Phase 2: Dissolve — blur gradually lifts
        const dissolveP = clamp01((elapsed - EXPAND_MS) / DISSOLVE_MS);
        const e = smoothEase(dissolveP);

        // 마스크 제거 (이미 전체 커버됨) / Remove mask (already full coverage)
        if (dissolveP < 0.02) {
          overlay.style.maskImage = 'none';
          overlay.style.webkitMaskImage = 'none';
        }

        // 블러 강도 + 투명도 동시 감소 → 자연스러운 안착
        // Blur intensity + opacity decrease together → smooth settle
        const blur = PEAK_BLUR * (1 - e);
        const sat = PEAK_SATURATE + (1 - PEAK_SATURATE) * e;
        const opacity = 1 - e;

        overlay.style.backdropFilter = `blur(${blur.toFixed(1)}px) saturate(${sat.toFixed(2)})`;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (overlay.style as any).webkitBackdropFilter = `blur(${blur.toFixed(1)}px) saturate(${sat.toFixed(2)})`;
        overlay.style.opacity = opacity.toFixed(3);
      }

      if (elapsed < totalDuration) {
        requestAnimationFrame(tick);
      } else {
        overlay.remove();
        busyRef.current = false;
      }
    }

    requestAnimationFrame(tick);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
