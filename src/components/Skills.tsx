import { skills } from '../data/portfolio';
import GlowCard from './GlowCard';
import ScrollReveal from './ScrollReveal';

const categoryCommands: Record<string, string> = {
  Frontend: 'cat skills/frontend.txt',
  Backend: 'cat skills/backend.txt',
  Database: 'cat skills/database.txt',
  DevOps: 'cat skills/devops.txt',
  Language: 'cat skills/languages.txt',
};

export default function Skills() {

  return (
    <section id="skills" className="relative py-28 px-6">
      <div className="relative max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="font-mono text-sm text-terminal-green font-medium mb-10 tracking-widest">
            <span className="text-text-tertiary">$</span> skills --list
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, idx) => {
              const cmd = categoryCommands[skill.name] || `cat skills/${skill.name.toLowerCase()}.txt`;
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
                    <div className="p-5 h-full font-mono">
                      {/* Terminal header */}
                      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-dark-border">
                        <span className="text-terminal-green text-xs">$</span>
                        <span className="text-xs text-text-primary">{cmd}</span>
                      </div>

                      {/* File listing style */}
                      <div className="space-y-1.5">
                        {skill.items.map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-2 text-xs"
                          >
                            <span className="text-terminal-dim">-rw-r--r--</span>
                            <span className="text-terminal-cyan">{item}</span>
                          </div>
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
