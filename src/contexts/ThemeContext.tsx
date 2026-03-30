import { createContext, useContext, useState, useLayoutEffect, useCallback, useRef, useEffect, type ReactNode } from 'react';

type Theme = 'dark' | 'light';

// ── SVG 네임스페이스 / SVG namespace ──
const SVG_NS = 'http://www.w3.org/2000/svg';

// ── 애니메이션 설정 / Animation config ──
const ANIMATION_DURATION = 1100;
const BLOB_COUNT = 7;
const GOOEY_BLUR = 18;
const GOOEY_MATRIX = '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -11';
const THEME_SWITCH_AT = 0.55;
const FADE_OUT_MS = 150;

// 테마 배경색 / Theme background colors
const THEME_BG: Record<Theme, string> = {
  dark: '#0a0a0a',
  light: '#f0f4f0',
};

// 블롭 구성 — 불규칙한 경계를 만드는 7개 타원
// Blob configs — 7 ellipses creating organic irregular boundaries
const BLOBS = [
  { ox: 0,    oy: 0,    sx: 1.0,  sy: 0.88, delay: 0 },
  { ox: -90,  oy: -70,  sx: 0.78, sy: 0.92, delay: 0.04 },
  { ox: 100,  oy: 50,   sx: 0.82, sy: 0.68, delay: 0.06 },
  { ox: -50,  oy: 90,   sx: 0.72, sy: 0.88, delay: 0.03 },
  { ox: 70,   oy: -80,  sx: 0.68, sy: 0.78, delay: 0.05 },
  { ox: -110, oy: 30,   sx: 0.62, sy: 0.82, delay: 0.07 },
  { ox: 40,   oy: 100,  sx: 0.58, sy: 0.72, delay: 0.05 },
];

/**
 * Smoothstep easing — cubic-bezier(0.65, 0, 0.35, 1) 근사
 * Smoothstep easing — approximates cubic-bezier(0.65, 0, 0.35, 1)
 */
function blobEase(t: number): number {
  return t * t * (3 - 2 * t);
}

/**
 * SVG 요소 헬퍼 / SVG element helper
 */
function svgEl(tag: string): SVGElement {
  return document.createElementNS(SVG_NS, tag);
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
      document.getElementById('theme-blob-overlay')?.remove();
    };
  }, []);

  /**
   * SVG 블롭 번짐 효과로 테마 전환
   * Toggle theme with SVG blob spread effect
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
    const fillColor = THEME_BG[nextTheme];

    // 진원지에서 가장 먼 뷰포트 모서리까지의 거리 + gooey 여유분
    // Distance from origin to farthest viewport corner + gooey margin
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxDist = Math.sqrt(
      Math.max(originX, vw - originX) ** 2 + Math.max(originY, vh - originY) ** 2
    );
    const maxRadius = maxDist + 120;

    // 기존 오버레이 제거 / Remove any existing overlay
    document.getElementById('theme-blob-overlay')?.remove();

    // ── SVG 오버레이 생성 / Create SVG overlay ──
    const svg = svgEl('svg') as SVGSVGElement;
    svg.id = 'theme-blob-overlay';
    svg.setAttribute('viewBox', `0 0 ${vw} ${vh}`);
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;z-index:9999;pointer-events:none;';

    // ── Gooey 필터 정의 / Gooey filter definition ──
    const defs = svgEl('defs');
    const filter = svgEl('filter');
    filter.setAttribute('id', 'theme-gooey');
    filter.setAttribute('x', '-50%');
    filter.setAttribute('y', '-50%');
    filter.setAttribute('width', '200%');
    filter.setAttribute('height', '200%');

    const blur = svgEl('feGaussianBlur');
    blur.setAttribute('in', 'SourceGraphic');
    blur.setAttribute('stdDeviation', String(GOOEY_BLUR));
    blur.setAttribute('result', 'blur');

    const matrix = svgEl('feColorMatrix');
    matrix.setAttribute('in', 'blur');
    matrix.setAttribute('type', 'matrix');
    matrix.setAttribute('values', GOOEY_MATRIX);

    filter.appendChild(blur);
    filter.appendChild(matrix);
    defs.appendChild(filter);
    svg.appendChild(defs);

    // ── 블롭 그룹 (필터 적용) / Blob group (filtered) ──
    const g = svgEl('g');
    g.setAttribute('filter', 'url(#theme-gooey)');
    svg.appendChild(g);

    // ── 7개 타원 생성 / Create 7 ellipses ──
    const ellipses: SVGEllipseElement[] = [];
    for (let i = 0; i < BLOB_COUNT; i++) {
      const el = svgEl('ellipse') as SVGEllipseElement;
      const cfg = BLOBS[i];
      el.setAttribute('cx', String(originX + cfg.ox));
      el.setAttribute('cy', String(originY + cfg.oy));
      el.setAttribute('rx', '0');
      el.setAttribute('ry', '0');
      el.setAttribute('fill', fillColor);
      g.appendChild(el);
      ellipses.push(el);
    }

    document.body.appendChild(svg);

    // ── requestAnimationFrame 애니메이션 루프 / rAF animation loop ──
    let themeApplied = false;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / ANIMATION_DURATION, 1);

      // 각 블롭의 크기 업데이트 (지연 시작으로 유기적 확장)
      // Update each blob size (staggered start for organic spread)
      for (let i = 0; i < BLOB_COUNT; i++) {
        const cfg = BLOBS[i];
        const localP = Math.max(0, Math.min(1, (rawProgress - cfg.delay) / (1 - cfg.delay)));
        const eased = blobEase(localP);

        ellipses[i].setAttribute('rx', String(eased * maxRadius * cfg.sx));
        ellipses[i].setAttribute('ry', String(eased * maxRadius * cfg.sy));
      }

      // 블롭이 화면의 ~55% 덮으면 실제 테마 클래스 변경 (블롭 뒤에서)
      // Apply actual theme class when blobs cover ~55% (hidden behind blobs)
      if (!themeApplied && rawProgress >= THEME_SWITCH_AT) {
        themeApplied = true;
        setTheme(nextTheme);
      }

      if (rawProgress < 1) {
        requestAnimationFrame(tick);
      } else {
        // 애니메이션 완료 — 오버레이 페이드아웃 후 제거
        // Animation complete — fade out overlay then remove
        svg.style.transition = `opacity ${FADE_OUT_MS}ms ease-out`;
        svg.style.opacity = '0';
        setTimeout(() => {
          svg.remove();
          busyRef.current = false;
        }, FADE_OUT_MS + 10);
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
