import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { navItems } from '../data/portfolio';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const terminalPaths: Record<string, string> = {
  '#intro': '~/',
  '#about': '~/about',
  '#skills': '~/skills',
  '#projects': '~/projects',
  '#contact': '~/contact',
};

function useActiveSection() {
  const [active, setActive] = useState('#intro');

  useEffect(() => {
    const ids = navItems.map((item) => item.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActive(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme, toggleBtnRef } = useTheme();
  const { lang, toggleLang } = useLanguage();
  const activeSection = useActiveSection();
  const headerRef = useRef<HTMLElement>(null);

  // 모바일 메뉴 닫기 핸들러
  // Close mobile menu handler
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 모바일 메뉴: 바깥 클릭 및 Escape 키로 닫기
  // Mobile menu: close on outside click and Escape key
  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen, closeMenu]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter] duration-300 ${
        scrolled ? 'bg-header backdrop-blur-xl shadow-[0_1px_0_var(--border-subtle)]' : 'bg-transparent'
      }`}
      style={{ paddingRight: 'var(--scrollbar-compensation, 0px)' }}
    >
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Left: Logo + Toggles */}
        <div className="flex items-center gap-2">
          <a
            href="#intro"
            className="text-sm font-mono font-semibold text-terminal-green tracking-tight hover:text-terminal-cyan transition-colors mr-1"
          >
            <span className="text-text-tertiary">$</span> portfolio
          </a>

          <div className="flex items-center gap-1">
            <button
              ref={toggleBtnRef}
              onClick={toggleTheme}
              className="p-1.5 rounded-lg bg-tag text-text-secondary hover:text-terminal-green hover:bg-tag-hover transition-all duration-200 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              onClick={toggleLang}
              className="px-2 py-1 rounded-lg bg-tag text-text-secondary hover:text-terminal-green hover:bg-tag-hover transition-all duration-200 text-xs font-mono font-medium cursor-pointer"
            >
              {lang === 'ko' ? 'EN' : '한'}
            </button>
          </div>
        </div>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.href;
            const path = terminalPaths[item.href] || item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`font-mono text-sm px-3 py-1.5 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'text-terminal-green font-medium bg-tag shadow-[inset_0_0_0_1px_var(--glow-border)]'
                      : 'text-text-secondary hover:text-terminal-green'
                  }`}
                >
                  {isActive && <span className="text-terminal-cyan mr-1">&gt;</span>}
                  {path}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-text-secondary hover:text-terminal-green transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* 모바일 메뉴 백드롭 오버레이
           Mobile menu backdrop overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[-1] md:hidden"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(4px)' }}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* 모바일 메뉴
           Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-header-mobile backdrop-blur-xl px-6 py-4 border-t border-dark-border">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              const path = terminalPaths[item.href] || item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className={`inline-block font-mono text-sm px-3 py-1.5 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'text-terminal-green font-medium bg-tag shadow-[inset_0_0_0_1px_var(--glow-border)]'
                        : 'text-text-secondary hover:text-terminal-green'
                    }`}
                  >
                    {isActive && <span className="text-terminal-cyan mr-1">&gt;</span>}
                    {path}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
