import { GraduationCap } from 'lucide-react';
import { profile, education } from '../data/portfolio';
import { useLanguage } from '../contexts/LanguageContext';
import { tr } from '../data/i18n';
import GlowCard from './GlowCard';
import ScrollReveal from './ScrollReveal';

const commitHashes = ['a3f7c21', 'e5b9d04'];

export default function About() {
  const { lang } = useLanguage();

  return (
    <section id="about" className="relative py-28 px-6">
      <div className="relative max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="font-mono text-sm text-terminal-green font-medium mb-10 tracking-widest">
            <span className="text-text-tertiary">$</span> about --me
          </h2>

          <GlowCard>
            <div className="p-8 md:p-10">
              {/* man-page style header */}
              <div className="font-mono text-xs text-terminal-cyan mb-4 border-b border-dark-border pb-3">
                <span className="text-text-tertiary">NAME</span>
                <span className="text-text-secondary ml-6">{profile.name[lang]} - {profile.role[lang]}</span>
              </div>

              <div className="font-mono text-xs text-terminal-cyan mb-4">
                <span className="text-text-tertiary">DESCRIPTION</span>
              </div>
              <div className="pl-4 md:pl-6">
                <p className="text-text-secondary leading-relaxed text-base font-mono whitespace-pre-line">
                  {profile.about[lang]}
                </p>
              </div>
            </div>
          </GlowCard>
        </ScrollReveal>

        <ScrollReveal y={20} duration={0.4} delay={0.1} margin="-50px">
          <h3 className="font-mono text-sm text-terminal-green font-medium mb-6 mt-14 tracking-widest">
            <span className="text-text-tertiary">$</span> git log --education
          </h3>

          <div className="flex flex-col gap-4">
            {education.map((edu, i) => (
              <GlowCard key={i}>
                <div className="p-6 md:p-8 flex items-start gap-4">
                  <div className="mt-1 p-2 rounded-lg bg-tag">
                    <GraduationCap size={18} className="text-terminal-green" />
                  </div>
                  <div className="font-mono">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-terminal-cyan text-xs">commit</span>
                      <span className="text-text-tertiary text-xs">{commitHashes[i] ?? 'f0c8a12'}</span>
                      <span className="text-text-tertiary text-xs">--</span>
                    </div>
                    <h4 className="text-text-primary font-semibold text-base mt-1">
                      {edu.school[lang]}
                    </h4>
                    {edu.major && (
                      <p className="text-text-secondary mt-1 text-sm">
                        {edu.major[lang]}
                      </p>
                    )}
                    <p className="text-text-tertiary text-xs mt-1">
                      {edu.period}{edu.graduated && ` | ${tr('about.graduated', lang)}`}
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
