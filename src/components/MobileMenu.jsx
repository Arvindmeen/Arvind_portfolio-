import { useEffect } from 'react';
import { profile } from '../data';
import { XIcon, SunIcon, MoonIcon, GithubIcon, LinkedinIcon, ArrowRightIcon, MapPinIcon } from '../icons';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Competitions', href: '#competitions', badge: 'Knight' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function MobileMenu({ open, onClose, dark, toggleTheme }) {
  // Prevent background scrolling while mobile drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    /* Dimmed backdrop covering full screen - clicking anywhere outside the menu card closes it */
    <div
      onClick={onClose}
      className="fixed inset-0 z-[2000] flex items-start justify-end p-2.5 sm:p-4 bg-black/60 dark:bg-black/75 backdrop-blur-sm transition-opacity duration-200 cursor-pointer"
      aria-label="Close menu"
    >
      {/* Decorative ambient background glow orbs */}
      <div className="fixed top-1/4 right-0 w-64 h-64 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-8 w-60 h-60 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 blur-3xl pointer-events-none" />

      {/* Floating Menu Card - strictly hugs content height without stretching */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative self-start w-[82%] max-w-[315px] h-auto max-h-[calc(100dvh-24px)] bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_12px_48px_rgba(0,0,0,0.5)] flex flex-col overflow-y-auto z-10 animate-slide-right cursor-default"
      >
        
        {/* Top Header Section with Photo */}
        <div className="p-4 sm:p-5 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/40"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-950" />
            </div>
            <div>
              <div className="font-serif font-bold text-sm text-zinc-900 dark:text-zinc-100 leading-tight">
                {profile.name}
              </div>
              <div className="font-mono text-[10.5px] text-zinc-400 dark:text-zinc-500">
                IIT Kharagpur &middot; Backend
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {toggleTheme && (
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-sm"
              >
                {dark ? <SunIcon size={13} /> : <MoonIcon size={13} />}
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 flex items-center justify-center hover:rotate-90 hover:bg-zinc-200 dark:hover:bg-zinc-800 active:scale-95 transition-all shadow-sm"
            >
              <XIcon size={16} />
            </button>
          </div>
        </div>

        {/* Clean Navigation Links - tight and snug */}
        <div className="px-3.5 py-3 flex flex-col gap-0.5">
          <p className="font-mono text-[9.5px] font-bold tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-500 px-3 mb-1">
            Menu
          </p>

          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="group flex items-center justify-between px-3 py-2 rounded-xl hover:bg-zinc-100/80 dark:hover:bg-zinc-900/80 border border-transparent hover:border-zinc-200/80 dark:hover:border-zinc-800/80 transition-all duration-200"
            >
              <div className="flex items-center gap-2.5">
                <span className="font-serif text-[15.5px] font-semibold text-zinc-800 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {item.label}
                </span>
                {item.badge && (
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-amber-500/10 border border-amber-500/25 text-amber-600 dark:text-amber-400">
                    {item.badge}
                  </span>
                )}
              </div>

              <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 group-hover:translate-x-0.5 transition-all">
                <ArrowRightIcon size={11} />
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA Card & Profiles - shifted directly below Contact */}
        <div className="p-3.5 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/50 flex flex-col gap-2.5">
          {/* Quick Contact CTA */}
          <a
            href="#contact"
            onClick={onClose}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-zinc-900 to-zinc-800 dark:from-zinc-100 dark:to-zinc-200 text-zinc-50 dark:text-zinc-900 font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md hover:opacity-90 active:scale-[0.98] transition-all"
          >
            <span>Let&apos;s Build Together</span>
            <ArrowRightIcon size={12} />
          </a>

          {/* Social Profiles Bar with Location Pill */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center gap-1.5">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon size={14} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-[#0A66C2] transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={14} />
              </a>
              <a
                href="https://leetcode.com/u/arvind_meena014/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center hover:border-amber-500/50 transition-colors"
                aria-label="LeetCode"
              >
                <img src="/leetcode.svg" alt="LeetCode" className="w-3.5 h-3.5 object-contain" />
              </a>
              <a
                href="https://codeforces.com/profile/arvind_meena014"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center hover:border-emerald-500/50 transition-colors"
                aria-label="Codeforces"
              >
                <img src="/codeforces.svg" alt="Codeforces" className="w-3.5 h-3.5 object-contain" />
              </a>
            </div>

            {/* IIT Kharagpur Location Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-[10.5px] font-mono font-medium shadow-xs">
              <MapPinIcon size={11} className="text-emerald-500" />
              <span>IIT Kharagpur</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
