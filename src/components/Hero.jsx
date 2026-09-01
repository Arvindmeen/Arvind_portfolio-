import { useEffect, useRef } from 'react';
import { useTyping, useInView, useCounter } from '../hooks';
import { useCompetition } from '../CompetitionContext';
import { profile } from '../data';
import { DownloadIcon, ArrowRightIcon } from '../icons';

function StatItem({ value, suffix, label }) {
  const [ref, inView] = useInView(0.5);
  const { count, start } = useCounter(value);
  useEffect(() => { if (inView) start(); }, [inView]);
  return (
    <div ref={ref} className="text-left">
      <div className="font-mono text-2xl font-bold text-zinc-900 dark:text-zinc-100 leading-none">
        {count}{suffix}
      </div>
      <div className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">{label}</div>
    </div>
  );
}

export default function Hero() {
  const { leetcodeData } = useCompetition();
  const typed = useTyping(profile.roles);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [], raf;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.3;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.opacity = Math.random() * 0.4 + 0.05;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(161,161,170,${this.opacity})`;
        ctx.fill();
      }
    }

    const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < count; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update(); p.draw();
        particles.forEach(q => {
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(161,161,170,${0.06 * (1 - d / 100)})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full pt-24 pb-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          <div className="animate-fade-in">
            {profile.available && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                <span className="font-mono text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 tracking-widest uppercase">
                  Available for Opportunities
                </span>
              </div>
            )}

            <h1 className="font-serif text-5xl md:text-6xl font-semibold leading-[1.1] mb-4 text-zinc-900 dark:text-zinc-100">
              <span className="block font-sans font-light text-lg italic text-zinc-400 dark:text-zinc-500 mb-1">Hello, I&apos;m</span>
              {profile.name}
            </h1>

            <p className="font-mono text-base text-zinc-500 dark:text-zinc-400 mb-6 min-h-[1.5em]">
              {typed}
              <span className="inline-block w-px h-[1em] bg-zinc-400 dark:bg-zinc-500 ml-0.5 align-text-bottom cursor-blink" />
            </p>

            <p className="font-serif-text text-zinc-600 dark:text-zinc-400 text-[1.05rem] leading-relaxed mb-10 max-w-md">
              {profile.tagline} Passionate about clean code, elegant architecture, and solving complex problems.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <a href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 text-sm font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-all duration-200 hover:-translate-y-0.5">
                View Projects <ArrowRightIcon size={14} />
              </a>
              {/* Resume download button — Uncomment when resume is fully prepared & uploaded */}
              {/*
              <a href={profile.resumeUrl}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-semibold hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-200 hover:-translate-y-0.5">
                <DownloadIcon size={14} /> Resume
              </a>
              */}
            </div>

            <div className="flex gap-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              {profile.stats.map(s => {
                const isDsa = s.label.toLowerCase().includes('dsa') || s.label.toLowerCase().includes('problem');
                const dynamicValue = isDsa && leetcodeData?.totalSolved ? leetcodeData.totalSolved : s.value;
                return (
                  <StatItem
                    key={s.label}
                    {...s}
                    value={dynamicValue}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="relative w-72 h-72 md:w-80 md:h-80">
              <div className="absolute inset-[-20px] rounded-full border border-zinc-200 dark:border-zinc-700 animate-spin-slow">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-500" />
              </div>
              <div className="absolute inset-[-36px] rounded-full border border-dashed border-zinc-200/60 dark:border-zinc-700/60 animate-spin-slow-reverse" />

              <div className="w-full h-full rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 border-2 border-zinc-300 dark:border-zinc-600 overflow-hidden shadow-xl ring-8 ring-zinc-100 dark:ring-zinc-900 relative z-10">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-serif text-7xl font-semibold text-zinc-400 dark:text-zinc-500 select-none">
                    {profile.initials}
                  </div>
                )}
              </div>

              {/* Floating badges */}
              <div className="absolute top-2 -left-8 z-20 animate-float-delay px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-md text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 backdrop-blur-sm">
                <span>🚀</span> Full Stack Dev
              </div>

              <div className="absolute top-2 -right-8 z-20 animate-float px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-md text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 backdrop-blur-sm">
                <span>⚡</span> DSA &amp; CP
              </div>

              <div className="absolute bottom-2 -left-7 z-20 animate-float px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-md text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 backdrop-blur-sm">
                <span>📐</span> System Design
              </div>

              <div className="absolute bottom-2 -right-6 z-20 animate-float-delay flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-md text-xs font-semibold text-zinc-700 dark:text-zinc-300 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
                Open to Work
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
