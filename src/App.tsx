import { useState, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import BackgroundGlow from './components/BackgroundGlow';
import Preloader from './components/Preloader';
import { useLanguage } from './contexts/LanguageContext';
import { tr } from './data/i18n';

export default function App() {
  const [ready, setReady] = useState(false);
  const handleFinish = useCallback(() => setReady(true), []);
  const { lang } = useLanguage();

  return (
    <>
      <Preloader onFinish={handleFinish} />
      <BackgroundGlow />
      {ready && (
        <>
          <Header />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <div className="relative z-10 py-8 text-center">
            <p className="text-xs text-text-tertiary">
              &copy; {new Date().getFullYear()} Portfolio. {tr('footer.built', lang)}
            </p>
          </div>
        </>
      )}
    </>
  );
}
