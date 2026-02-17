import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { navItems } from '../data/portfolio';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

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
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLanguage();
  const activeSection = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
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
            className="text-lg font-semibold text-text-primary tracking-tight hover:text-primary transition-colors mr-1"
          >
            Portfolio
          </a>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg bg-tag text-text-secondary hover:text-text-primary hover:bg-tag-hover transition-all duration-200 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              onClick={toggleLang}
              className="px-2 py-1 rounded-lg bg-tag text-text-secondary hover:text-text-primary hover:bg-tag-hover transition-all duration-200 text-xs font-medium cursor-pointer"
            >
              {lang === 'ko' ? 'EN' : '한'}
            </button>
          </div>
        </div>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`text-sm px-4 py-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'text-text-primary font-medium bg-tag shadow-[inset_0_0_0_1px_var(--glow-border)]'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {item.label[lang]}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-header-mobile backdrop-blur-xl px-6 py-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`inline-block text-sm px-4 py-1.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'text-text-primary font-medium bg-tag shadow-[inset_0_0_0_1px_var(--glow-border)]'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {item.label[lang]}
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
