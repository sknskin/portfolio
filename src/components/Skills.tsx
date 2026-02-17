import { skills, navItems } from '../data/portfolio';
import { useLanguage } from '../contexts/LanguageContext';
import GlowCard from './GlowCard';
import ScrollReveal from './ScrollReveal';

export default function Skills() {
  const { lang } = useLanguage();

  return (
    <section id="skills" className="relative py-28 px-6">
      <div className="relative max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-sm text-text-secondary font-medium mb-10 tracking-widest uppercase">
            {navItems[2].label[lang]}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <ScrollReveal
                  key={skill.name}
                  className="h-full"
                  y={20}
                  duration={0.4}
                  delay={idx * 0.08}
                  margin="-50px"
                >
                  <GlowCard className="h-full">
                    <div className="p-6 h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <Icon size={18} className="text-primary-light" />
                        <h3 className="font-medium text-sm text-text-primary">
                          {skill.name}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skill.items.map((item) => (
                          <span
                            key={item}
                            className="text-xs px-3 py-1 rounded-full bg-tag text-text-secondary"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GlowCard>
                </ScrollReveal>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
