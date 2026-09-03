import { education } from '../data';
import Reveal from './Reveal';

const certDetails = [
  {
    badge: 'Knight Badge',
    platform: 'LeetCode',
    rating: '1869 Peak',
    highlight: 'Top 5.6% Worldwide',
    logo: '/leetcode.svg',
    url: 'https://leetcode.com/u/arvind_meena014/',
  },
  {
    badge: 'Pupil Rank',
    platform: 'Codeforces',
    rating: '1329 Peak',
    highlight: '25+ Rated Rounds',
    logo: '/codeforces.svg',
    url: 'https://codeforces.com/profile/arvind_meena014',
  },
];

export default function Education() {
  return (
    <section id="education" className="py-14 md:py-16 bg-zinc-100/50 dark:bg-zinc-900/40">
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
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-2xl shrink-0">
                  🏆
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Verified
                </span>
              </div>

              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-[0.95rem] mb-1">Certifications</h3>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-4">Online Platforms</p>
              
              <div className="flex flex-col gap-2.5 flex-1">
                {certDetails.map((cert, i) => (
                  <a
                    key={i}
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/cert flex items-center justify-between p-3 rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950/60 hover:bg-white dark:hover:bg-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xs transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-800 p-1 border border-zinc-200 dark:border-zinc-700 shadow-2xs flex items-center justify-center shrink-0">
                        <img src={cert.logo} alt={cert.platform} className="w-full h-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-[13px] group-hover/cert:text-blue-600 dark:group-hover/cert:text-blue-400 transition-colors">
                            {cert.badge}
                          </span>
                          <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
                            on {cert.platform}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                          <span className="font-semibold text-zinc-800 dark:text-zinc-200">{cert.rating}</span>
                          <span className="text-zinc-300 dark:text-zinc-600">·</span>
                          <span>{cert.highlight}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-zinc-400 group-hover/cert:text-zinc-700 dark:group-hover/cert:text-zinc-200 group-hover/cert:translate-x-0.5 transition-all shrink-0 pl-2">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                    </div>
                  </a>
                ))}
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[11px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 self-start mt-4">
                🏆 2 Verified Credentials
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
