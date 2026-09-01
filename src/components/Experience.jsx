import { experience } from '../data';
import Reveal from './Reveal';

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-zinc-100/50 dark:bg-zinc-900/40">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <p className="font-mono text-xs font-semibold tracking-[0.15em] uppercase text-zinc-400 dark:text-zinc-500 mb-3 flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-zinc-300 dark:bg-zinc-600" />
            Career
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-zinc-900 dark:text-zinc-100 mb-12 leading-[1.15]">
            Work Experience
          </h2>
        </Reveal>

        <div className="relative pl-8">
          {/* Timeline line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-zinc-300 dark:from-zinc-600 via-zinc-200 dark:via-zinc-700 to-transparent" />

          {experience.map((job, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="relative mb-10 group">
                {/* Timeline dot */}
                <div className="absolute -left-[37px] top-2 w-3 h-3 rounded-full bg-zinc-400 dark:bg-zinc-500 ring-4 ring-zinc-100 dark:ring-zinc-950 group-hover:bg-zinc-700 dark:group-hover:bg-zinc-300 group-hover:scale-125 transition-all duration-300" />

                {/* Card */}
                <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md hover:translate-x-1 transition-all duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-[1.02rem]">{job.role}</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">{job.company}</p>
                    </div>
                    <time className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 whitespace-nowrap">
                      {job.period}
                    </time>
                  </div>
                  <p className="font-serif-text text-zinc-600 dark:text-zinc-400 text-[0.92rem] leading-relaxed mb-4">
                    {job.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
