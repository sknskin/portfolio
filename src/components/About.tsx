import { GraduationCap } from 'lucide-react';
import { profile, education, navItems } from '../data/portfolio';
import { useLanguage } from '../contexts/LanguageContext';
import { tr } from '../data/i18n';
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

        <ScrollReveal y={20} duration={0.4} delay={0.1} margin="-50px">
          <h3 className="text-sm text-text-secondary font-medium mb-6 mt-14 tracking-widest uppercase">
            {tr('about.education', lang)}
          </h3>

          <div className="flex flex-col gap-4">
            {education.map((edu, i) => (
              <GlowCard key={i}>
                <div className="p-6 md:p-8 flex items-start gap-4">
                  <div className="mt-1 p-2 rounded-lg bg-tag">
                    <GraduationCap size={18} className="text-primary-light" />
                  </div>
                  <div>
                    <h4 className="text-text-primary font-semibold text-lg">
                      {edu.school[lang]}
                    </h4>
                    {edu.major && (
                      <p className="text-text-secondary mt-1">
                        {edu.major[lang]}
                      </p>
                    )}
                    <p className="text-text-tertiary text-sm mt-1">
                      {edu.period}{edu.graduated && ` · ${tr('about.graduated', lang)}`}
                    </p>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
