import { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { navItems } from '../data/portfolio';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLanguage();
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);

      if (y < 50) {
        setVisible(true);
      } else if (y < lastY.current) {
        setVisible(true);
      } else if (y > lastY.current + 5) {
        setVisible(false);
        setMenuOpen(false);
      }
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,transform,opacity] duration-400 ${
        scrolled ? 'bg-header backdrop-blur-xl shadow-[0_1px_0_var(--border-subtle)]' : 'bg-transparent'
      } ${visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
      style={{ paddingRight: 'var(--scrollbar-compensation, 0px)' }}
    >
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Left: Logo + Toggles */}
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="text-lg font-semibold text-text-primary tracking-tight hover:text-primary transition-colors mr-1"
          >
            Portfolio
          </a>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg bg-tag text-text-secondary hover:text-text-primary hover:bg-tag-hover transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              onClick={toggleLang}
              className="px-2 py-1 rounded-lg bg-tag text-text-secondary hover:text-text-primary hover:bg-tag-hover transition-all duration-200 text-xs font-medium"
            >
              {lang === 'ko' ? 'EN' : '한'}
            </button>
          </div>
        </div>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                {item.label[lang]}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-header-mobile backdrop-blur-xl px-6 py-4">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  {item.label[lang]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
