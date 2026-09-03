import { useState } from 'react';
import { skills, skillCategories } from '../data';
import Reveal from './Reveal';
import { LuCode, LuZap } from 'react-icons/lu';

export default function Skills() {
  const [active, setActive] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const filtered = active === 'all' ? skills : skills.filter(s => s.cat === active);

  return (
    <section id="skills" className="py-14 md:py-16">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <p className="font-mono text-xs font-semibold tracking-[0.15em] uppercase text-zinc-400 dark:text-zinc-500 mb-3 flex items-center gap-2">
                {/* <span className="inline-block w-6 h-px bg-zinc-300 dark:bg-zinc-600" /> */}
                Technical Arsenal
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-zinc-900 dark:text-zinc-100 leading-[1.15]">
                Skills and Technologies
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Hover any skill to see where & how I used it</span>
            </div>
          </div>
        </Reveal>

        {/* Filter tabs */}
        <Reveal delay={60}>
          <div className="flex flex-wrap gap-2 mb-10">
            {skillCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActive(cat.id); setHoveredSkill(null); }}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium border transition-all duration-200 cursor-pointer ${
                  active === cat.id
                    ? 'bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-sm font-semibold'
                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-800 dark:hover:text-zinc-200 bg-white/40 dark:bg-zinc-900/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Skills grid with Animated Hover Popovers */}
        <Reveal delay={120} duration={550}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
            {filtered.map((skill, index) => {
              const isHovered = hoveredSkill?.name === skill.name;

              return (
                <div
                  key={skill.name}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onClick={() => setHoveredSkill(isHovered ? null : skill)}
                  className={`group relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                    isHovered
                      ? 'z-40 border-zinc-900 dark:border-zinc-100 shadow-xl bg-white dark:bg-zinc-900 -translate-y-1.5 ring-2 ring-zinc-900/10 dark:ring-zinc-100/10'
                      : 'border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-md hover:-translate-y-1'
                  }`}
                >
                  {/* Skill Icon / Emoji */}
                  <div className="w-10 h-10 flex items-center justify-center mb-2">
                    {skill.icon ? (
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className={`w-10 h-10 object-contain ${skill.invert ? 'icon-invert' : ''} group-hover:scale-110 transition-transform duration-200`}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-200">
                        <LuCode size={20} className="text-zinc-600 dark:text-zinc-400" />
                      </div>
                    )}
                  </div>

                  {/* Skill Name */}
                  <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors text-center leading-tight">
                    {skill.name}
                  </span>

                  {/* Animated Popover Tooltip */}
                  {isHovered && (
                    <div
                      className={`absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 md:w-72 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 shadow-2xl z-50 pointer-events-none transition-all duration-200 animate-fade-in ${
                        index % 6 === 0 ? 'left-0 translate-x-0' : index % 6 === 5 ? 'right-0 left-auto translate-x-0' : ''
                      }`}
                    >
                      {/* Top Skill & Project Name */}
                      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100">{skill.name}</span>
                        </div>
                        {skill.project && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 truncate max-w-[140px]">
                            {skill.project}
                          </span>
                        )}
                      </div>

                      {/* Work Description from Resume */}
                      <p className="font-serif-text text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mb-2.5">
                        {skill.summary || `Used extensively across full-stack and distributed architecture projects.`}
                      </p>

                      {/* Highlight Pill */}
                      {skill.highlight && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-[10.5px] font-mono font-semibold">
                          <LuZap size={11} className="text-emerald-500 shrink-0" /> {skill.highlight}
                        </div>
                      )}

                      {/* Bottom Arrow Pointer */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-2.5 h-2.5 bg-white dark:bg-zinc-950 border-r border-b border-zinc-200 dark:border-zinc-700 rotate-45" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>

      </div>
    </section>
  );
}
