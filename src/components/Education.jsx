import { education, certifications } from '../data';
import Reveal from './Reveal';

export default function Education() {
  return (
    <section id="education" className="py-24 bg-zinc-100/50 dark:bg-zinc-900/40">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <p className="font-mono text-xs font-semibold tracking-[0.15em] uppercase text-zinc-400 dark:text-zinc-500 mb-3 flex items-center gap-2">
            {/* <span className="inline-block w-6 h-px bg-zinc-300 dark:bg-zinc-600" /> */}
            Academic Background
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-zinc-900 dark:text-zinc-100 mb-12 leading-[1.15]">
            Education
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {education.map((edu, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200 dark:border-zinc-700/80 shadow-sm p-1.5 flex items-center justify-center mb-4 overflow-hidden shrink-0">
                  {edu.logo ? (
                    <img
                      src={edu.logo}
                      alt={edu.institution}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-2xl">{edu.emoji}</span>
                  )}
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-[0.95rem] mb-1">{edu.degree}</h3>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">{edu.institution}</p>
                <time className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500 mb-4">{edu.period}</time>
                <p className="font-serif-text text-zinc-500 dark:text-zinc-400 text-[0.85rem] leading-relaxed flex-1 mb-4">
                  {edu.desc}
                </p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[11px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 self-start">
                  {edu.badge || edu.grade}
                </span>
              </div>
            </Reveal>
          ))}

          {/* Certifications card */}
          <Reveal delay={300}>
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-2xl mb-4 shrink-0">
                🏆
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-[0.95rem] mb-1">Certifications</h3>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-5">Online Platforms</p>
              <div className="flex flex-col gap-2 flex-1">
                {certifications.map((cert, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50"
                  >
                    <span className="text-zinc-400 mt-0.5 shrink-0">🎯</span>
                    <span className="font-serif-text text-[0.82rem] text-zinc-600 dark:text-zinc-400 leading-snug">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
