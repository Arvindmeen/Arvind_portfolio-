import { profile } from '../data';
import { GithubIcon, LinkedinIcon, MailIcon, PhoneIcon, ChevronUpIcon, MapPinIcon } from '../icons';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Competitions', href: '#competitions' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

const TECH_PILLS = [
  'Distributed Systems',
  'Microservices',
  'Apache Kafka',
  'Apache Flink',
  'Redis & Caching',
  'PostgreSQL',
  'Docker',
  'Node.js',
  'C++',
  'System Design',
  'DSA & Algorithms',
  'WebSockets',
  'React.js',
];

const SOCIAL_ICONS = [
  {
    icon: <LinkedinIcon size={16} />,
    href: profile.linkedin,
    label: 'LinkedIn',
    hoverClass: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/10 hover:shadow-[0_0_14px_rgba(10,102,194,0.35)]',
  },
  {
    icon: <GithubIcon size={16} />,
    href: profile.github,
    label: 'GitHub',
    hoverClass: 'hover:text-zinc-950 dark:hover:text-white hover:border-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:shadow-[0_0_14px_rgba(255,255,255,0.15)]',
  },
  {
    icon: <MailIcon size={16} />,
    href: `mailto:${profile.email}`,
    label: 'Email',
    hoverClass: 'hover:text-rose-500 hover:border-rose-500/60 hover:bg-rose-500/10 hover:shadow-[0_0_14px_rgba(244,63,94,0.35)]',
  },
  {
    icon: <PhoneIcon size={16} />,
    href: `tel:${profile.phone?.replace(/\s+/g, '')}`,
    label: 'Phone / WhatsApp',
    hoverClass: 'hover:text-emerald-500 hover:border-emerald-500/60 hover:bg-emerald-500/10 hover:shadow-[0_0_14px_rgba(16,185,129,0.35)]',
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-16 pb-10 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-950/70 overflow-hidden">
      {/* Subtle ambient lighting line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-20 bg-gradient-to-b from-zinc-200/30 dark:from-zinc-800/20 to-transparent blur-2xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-200/80 dark:border-zinc-800/80">
          
          {/* Brand and Philosophy (6 cols) */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-zinc-200 dark:ring-zinc-800 shadow-sm"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-950" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                    {profile.name}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mt-0.5">
                    <span className="inline-flex items-center gap-1">
                      <MapPinIcon size={11} className="text-zinc-400" />
                      IIT Kharagpur, India
                    </span>
                  </div>
                </div>
              </div>

              <p className="font-serif-text text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-5 max-w-md">
                Architecting high-throughput distributed systems, event-driven pipelines, and scalable APIs with a passion for clean software design.
              </p>

              {/* Core Technologies Pills */}
              <div>
                <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2.5">
                  Core Technical Competencies
                </div>
                <div className="flex flex-wrap gap-1.5 max-w-lg">
                  {TECH_PILLS.map(tech => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Navigation (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-xs font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-4 flex items-center gap-2">
              <span className="w-2 h-px bg-zinc-400 dark:bg-zinc-600" />
              Sitemap
            </h4>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-2">
              {NAV_LINKS.map(item => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200"
                  >
                    <span className="text-zinc-300 dark:text-zinc-700 text-xs">&rsaquo;</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Competitive & Social Quick Links (3 cols) */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="font-mono text-xs font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-4 flex items-center gap-2">
                <span className="w-2 h-px bg-zinc-400 dark:bg-zinc-600" />
                Live Profiles
              </h4>
              <div className="flex flex-col gap-2 mb-5">
                <a
                  href="https://leetcode.com/u/arvind_meena014/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 text-xs hover:border-amber-500/50 hover:bg-amber-500/10 transition-all duration-200"
                >
                  <span className="font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 flex items-center gap-2">
                    <img src="/leetcode.svg" alt="LeetCode" className="w-4 h-4 object-contain" />
                    LeetCode
                  </span>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-medium">
                    Knight
                  </span>
                </a>
                <a
                  href="https://codeforces.com/profile/arvind_meena014"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 text-xs hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-200"
                >
                  <span className="font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-blue-500 flex items-center gap-2">
                    <img src="/codeforces.svg" alt="Codeforces" className="w-4 h-4 object-contain" />
                    Codeforces
                  </span>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
                    Pupil
                  </span>
                </a>
              </div>

              {/* Minimal Clean Social Icon Strip */}
              <div className="flex items-center gap-2">
                {SOCIAL_ICONS.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href?.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className={`w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 flex items-center justify-center text-zinc-500 dark:text-zinc-400 transition-all duration-200 hover:scale-110 ${s.hoverClass}`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Signature */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-400 dark:text-zinc-500">
          <p>
            &copy; {new Date().getFullYear()} <strong className="text-zinc-700 dark:text-zinc-300 font-semibold">{profile.name}</strong> &middot; All rights reserved &middot; Engineered for high performance &amp; scale
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-800 dark:hover:text-zinc-200 transition-all duration-200 cursor-pointer"
          >
            <span>Back to top</span>
            <ChevronUpIcon size={12} />
          </button>
        </div>

      </div>
    </footer>
  );
}
