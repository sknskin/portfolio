import { profile, navItems } from '../data/portfolio';
import { useLanguage } from '../contexts/LanguageContext';
import GlowCard from './GlowCard';
import ScrollReveal from './ScrollReveal';

export default function About() {
  const { lang } = useLanguage();

  return (
    <section id="about" className="relative py-28 px-6">
      <div className="relative max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-sm text-text-secondary font-medium mb-10 tracking-widest uppercase">
            {navItems[1].label[lang]}
          </h2>

          <GlowCard>
            <div className="p-8 md:p-10">
              <p className="text-text-secondary leading-relaxed text-lg whitespace-pre-line">
                {profile.about[lang]}
              </p>
            </div>
          </GlowCard>
        </ScrollReveal>
      </div>
    </section>
  );
}
