import { createContext, useContext, useState, type ReactNode } from 'react';

export type Lang = 'ko' | 'en';

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ko',
  toggleLang: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('portfolio-lang');
    return saved === 'en' ? 'en' : 'ko';
  });

  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === 'ko' ? 'en' : 'ko';
      localStorage.setItem('portfolio-lang', next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
