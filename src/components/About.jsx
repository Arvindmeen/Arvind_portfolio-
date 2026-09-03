import { profile } from '../data';
import Reveal from './Reveal';
import { MapPinIcon, GraduationCapIcon, BriefcaseIcon, GlobeIcon, ArrowRightIcon } from '../icons';

const tags = [
  { icon: <MapPinIcon size={14} />,        label: 'Location',  value: profile.location },
  { icon: <GraduationCapIcon size={14} />, label: 'Education', value: 'Dual Dgree (B.Tech + M.Tech), Bioscience and Biotechnology' },
  { icon: <BriefcaseIcon size={14} />,     label: 'Status',    value: 'Available for hire' }, 
  { icon: <GlobeIcon size={14} />,         label: 'Languages', value: 'Hindi, English' },
];

export default function About() {
  return (
    <section id="about" className="py-14 md:py-16 bg-zinc-100/50 dark:bg-zinc-900/40">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 md:gap-16 items-start">

          {/* Left Column on Desktop / Below About Me on Mobile */}
          <div className="order-2 md:order-1">
            <Reveal>
              <div className="md:sticky md:top-24">
                {/* Photo: hidden on mobile, visible on laptop/desktop */}
                <div className="hidden md:flex w-full max-w-[320px] mx-auto md:mx-0 aspect-[4/5] max-h-[350px] rounded-2xl bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 border border-zinc-300 dark:border-zinc-700 shadow-md mb-5 overflow-hidden items-center justify-center">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <span className="font-serif text-8xl font-semibold text-zinc-400/40 dark:text-zinc-500/40 select-none">AM</span>
                  )}
                </div>
                <div className="flex flex-col gap-2 w-full max-w-md mx-auto md:max-w-[320px] md:mx-0">
                  {tags.map(t => (
                    <div key={t.label} className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm text-sm">
                      <span className="text-zinc-400 dark:text-zinc-500">{t.icon}</span>
                      <span className="text-zinc-400 dark:text-zinc-500 text-xs font-medium w-20 shrink-0">{t.label}</span>
                      <span className="text-zinc-700 dark:text-zinc-300 font-medium">{t.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column on Desktop / Above Data on Mobile */}
          <div className="order-1 md:order-2">
            <Reveal>
              <p className="font-mono text-xs font-semibold tracking-[0.15em] uppercase text-zinc-400 dark:text-zinc-500 mb-3 flex items-center gap-2">
                {/* <span className="inline-block w-6 h-px bg-zinc-300 dark:bg-zinc-600" /> */}
                About Me
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-zinc-900 dark:text-zinc-100 mb-8 leading-[1.15]">
                Building digital<br />
                <em>experiences that matter</em>
              </h2>
            </Reveal>

            {profile.bio.map((para, i) => (
              <Reveal key={i} delay={i * 100}>
                <p className="font-serif-text text-zinc-600 dark:text-zinc-400 text-[1.02rem] leading-[1.9] mb-5">
                  {para}
                </p>
              </Reveal>
            ))}

            <Reveal delay={300}>
              <div className="flex flex-wrap gap-3 mt-8">
                <a href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 text-sm font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-all duration-200 hover:-translate-y-0.5">
                  Let&apos;s Talk <ArrowRightIcon size={14} />
                </a>
                {/* Resume download button - Uncomment when resume is fully prepared & uploaded */}
                {/*
                <a href={profile.resumeUrl}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-semibold hover:border-zinc-400 dark:hover:border-zinc-500 transition-all duration-200 hover:-translate-y-0.5">
                  <DownloadIcon size={14} /> Download Resume
                </a>
                */}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
