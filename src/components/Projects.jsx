import { projects, profile } from '../data';
import Reveal from './Reveal';
import { ExternalLinkIcon, GithubIcon } from '../icons';
import { TbTrain, TbMotorbike, TbCube, TbGauge } from 'react-icons/tb';
import { LuShoppingCart, LuHeartPulse } from 'react-icons/lu';

const PROJECT_ICONS = {
  train: TbTrain,
  mobility: TbMotorbike,
  cube: TbCube,
  traffic: TbGauge,
  insurance: LuHeartPulse,
  ecommerce: LuShoppingCart,
};

export default function Projects() {
  return (
    <section id="projects" className="py-14 md:py-16">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <p className="font-mono text-xs font-semibold tracking-[0.15em] uppercase text-zinc-400 dark:text-zinc-500 mb-3 flex items-center gap-2">
                {/* <span className="inline-block w-6 h-px bg-zinc-300 dark:bg-zinc-600" /> */}
                My Work
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-zinc-900 dark:text-zinc-100 leading-[1.15]">
                Featured Projects
              </h2>
            </div>
            <a href={profile.github} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-200 shrink-0">
              <GithubIcon size={14} /> View All on GitHub
            </a>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => {
            const ProjectIcon = PROJECT_ICONS[project.iconKey] || TbCube;
            return (
              <Reveal key={i} delay={(i % 3) * 100}>
                <article className="group flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 h-full">
                  <div className={`relative flex items-center justify-center h-36 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                    <ProjectIcon className="w-16 h-16 text-white/90 drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300">
                    <a href={project.demo} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold hover:bg-white/30 transition-colors">
                      <ExternalLinkIcon size={11} /> Live Demo
                    </a>
                    <a href={project.repo} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold hover:bg-white/30 transition-colors">
                      <GithubIcon size={11} /> Code
                    </a>
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-5">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-[0.95rem] mb-2">{project.title}</h3>
                  <p className="font-serif-text text-zinc-500 dark:text-zinc-400 text-[0.85rem] leading-relaxed flex-1 mb-4">
                    {project.desc}
                  </p>
                  <div className="flex items-center justify-between gap-2 mt-auto">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag}
                          className="px-2 py-0.5 rounded-full font-mono text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <a href={project.demo} target="_blank" rel="noopener noreferrer"
                        className="w-7 h-7 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-500 transition-all">
                        <ExternalLinkIcon size={12} />
                      </a>
                      <a href={project.repo} target="_blank" rel="noopener noreferrer"
                        className="w-7 h-7 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-500 transition-all">
                        <GithubIcon size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
        </div>
      </div>
    </section>
  );
}
