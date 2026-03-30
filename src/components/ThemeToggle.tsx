// 테마 토글 버튼 컴포넌트 — 클릭 위치를 진원지로 SVG 블롭 번짐 효과 트리거
// Theme toggle button — triggers SVG blob spread effect from click position

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  /**
   * 클릭 좌표를 진원지로 전달
   * Pass click coordinates as spread origin
   */
  const handleClick = (e: React.MouseEvent) => {
    toggleTheme(e.clientX, e.clientY);
  };

  return (
    <button
      onClick={handleClick}
      className="p-1.5 rounded-lg bg-tag text-text-secondary hover:text-terminal-green hover:bg-tag-hover transition-all duration-200 cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
