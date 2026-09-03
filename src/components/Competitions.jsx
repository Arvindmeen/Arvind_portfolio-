import { useState, useMemo } from 'react';
import { useCompetition } from '../CompetitionContext';
import Reveal from './Reveal';
import { ExternalLinkIcon } from '../icons';

export default function Competitions() {
  const [activeTab, setActiveTab] = useState('leetcode'); // 'leetcode' | 'codeforces'
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const {
    leetcodeData,
    codeforcesData,
    isRefreshing,
    lastUpdatedTime,
    fetchRealTimeData
  } = useCompetition();

  // Compute SVG line chart paths dynamically
  const chartData = activeTab === 'leetcode' ? leetcodeData.history : codeforcesData.history;

  const { points, pathD, areaD, minRating, maxRating } = useMemo(() => {
    if (!chartData || chartData.length === 0) {
      return { points: [], pathD: '', areaD: '', minRating: 0, maxRating: 2000 };
    }

    const ratings = chartData.map(d => d.rating);
    const rawMin = Math.min(...ratings);
    const rawMax = Math.max(...ratings);
    const padding = (rawMax - rawMin) * 0.15 || 50;
    const min = Math.max(0, Math.floor(rawMin - padding));
    const max = Math.ceil(rawMax + padding);

    const width = 800;
    const height = 260;
    const paddingX = 40;
    const paddingY = 30;

    const pts = chartData.map((d, index) => {
      const x = paddingX + (index / (chartData.length - 1 || 1)) * (width - paddingX * 2);
      const y = height - paddingY - ((d.rating - min) / (max - min || 1)) * (height - paddingY * 2);
      return { x, y, data: d, index };
    });

    let pD = '';
    pts.forEach((pt, i) => {
      if (i === 0) pD += `M ${pt.x} ${pt.y}`;
      else {
        const prev = pts[i - 1];
        const cx1 = prev.x + (pt.x - prev.x) / 2;
        const cy1 = prev.y;
        const cx2 = prev.x + (pt.x - prev.x) / 2;
        const cy2 = pt.y;
        pD += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${pt.x} ${pt.y}`;
      }
    });

    const last = pts[pts.length - 1];
    const first = pts[0];
    const aD = `${pD} L ${last.x} ${height - paddingY} L ${first.x} ${height - paddingY} Z`;

    return { points: pts, pathD: pD, areaD: aD, minRating: min, maxRating: max };
  }, [chartData]);

  return (
    <section id="competitions" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <p className="font-mono text-xs font-semibold tracking-[0.15em] uppercase text-zinc-400 dark:text-zinc-500 mb-3 flex items-center gap-2">
                {/* <span className="inline-block w-6 h-px bg-zinc-300 dark:bg-zinc-600" /> */}
                Competitive Programming
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-zinc-900 dark:text-zinc-100 leading-[1.15]">
                Competitions and Ratings
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={fetchRealTimeData}
                disabled={isRefreshing}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-300 text-xs font-mono font-medium hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 shadow-sm transition-all cursor-pointer disabled:opacity-60"
                title="Click to refresh live data"
              >
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 ${isRefreshing ? 'duration-500' : ''}`} />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>{isRefreshing ? 'Syncing...' : lastUpdatedTime ? `Live Synced (${lastUpdatedTime})` : 'Live API Active'}</span>
              </button>
            </div>
          </div>
        </Reveal>

        {/* Profile Cards (LeetCode + Codeforces) */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          
          {/* LeetCode Card */}
          <Reveal delay={100}>
            <div className="p-7 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md hover:border-amber-500/30 hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 p-2 flex items-center justify-center shrink-0 shadow-sm">
                      <img src="/leetcode.svg" alt="LeetCode" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg tracking-tight">LeetCode</h3>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25 flex items-center gap-1.5">
                          <img
                            src="https://leetcode.com/static/images/badges/knight.png"
                            alt="Knight Badge"
                            className="w-3.5 h-3.5 object-contain shrink-0"
                            loading="lazy"
                          />
                          {leetcodeData.badge}
                        </span>
                      </div>
                      <p className="font-mono text-xs text-zinc-400 dark:text-zinc-500">@{leetcodeData.handle}</p>
                    </div>
                  </div>

                  <a
                    href={`https://leetcode.com/u/${leetcodeData.handle}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shrink-0"
                    title="Open LeetCode Profile"
                  >
                    <ExternalLinkIcon size={14} />
                  </a>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-zinc-50/70 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60">
                  <div>
                    <div className="text-[11px] font-mono uppercase text-zinc-400 dark:text-zinc-500 mb-0.5">Rating</div>
                    <div className="font-mono text-2xl font-bold text-amber-500 dark:text-amber-400 tracking-tight">{leetcodeData.rating}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase text-zinc-400 dark:text-zinc-500 mb-0.5">Top %</div>
                    <div className="font-mono text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                      {leetcodeData.topPercentage}%
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase text-zinc-400 dark:text-zinc-500 mb-0.5">Contests</div>
                    <div className="font-mono text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">{leetcodeData.contestsAttended}</div>
                  </div>
                </div>

                {/* Problem Solving Breakdown */}
                <div className="space-y-2.5 mb-4">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-emerald-500 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Problems Solved: {leetcodeData.totalSolved}
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      Global Rank: #{leetcodeData.globalRanking.toLocaleString()}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 rounded-full bg-zinc-100 dark:bg-zinc-800/90 overflow-hidden flex gap-0.5 p-0.5">
                    <div style={{ width: `${(leetcodeData.easySolved / leetcodeData.totalSolved) * 100}%` }} className="h-full rounded-full bg-emerald-500" title={`Easy: ${leetcodeData.easySolved}`} />
                    <div style={{ width: `${(leetcodeData.mediumSolved / leetcodeData.totalSolved) * 100}%` }} className="h-full rounded-full bg-amber-500" title={`Medium: ${leetcodeData.mediumSolved}`} />
                    <div style={{ width: `${(leetcodeData.hardSolved / leetcodeData.totalSolved) * 100}%` }} className="h-full rounded-full bg-rose-500" title={`Hard: ${leetcodeData.hardSolved}`} />
                  </div>

                  <div className="flex justify-between items-center text-[11px] font-mono pt-0.5 text-zinc-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Easy: <strong className="text-zinc-800 dark:text-zinc-200">{leetcodeData.easySolved}</strong></span>
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Medium: <strong className="text-zinc-800 dark:text-zinc-200">{leetcodeData.mediumSolved}</strong></span>
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Hard: <strong className="text-zinc-800 dark:text-zinc-200">{leetcodeData.hardSolved}</strong></span>
                  </div>
                </div>

                {/* Badges / Awards List */}
                <div className="pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 mt-3">
                  <div className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 mb-2.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                        <path d="M4 22h16"/>
                        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                      </svg>
                      Badges Earned ({leetcodeData.badgesCount}):
                    </span>
                    <span className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400">
                      Top {leetcodeData.topPercentage}% Worldwide
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {leetcodeData.badgesList.map((b, idx) => {
                      const iconSrc = (b.icon && (b.icon.startsWith('http') || b.icon.startsWith('/')))
                        ? (b.icon.startsWith('/') ? `https://leetcode.com${b.icon}` : b.icon)
                        : (b.name === 'Knight' ? 'https://leetcode.com/static/images/badges/knight.png'
                          : b.name.includes('100') && b.name.includes('2026') ? 'https://assets.leetcode.com/static_assets/others/100_1080_1080.png'
                          : b.name.includes('50') && b.name.includes('2026') ? 'https://assets.leetcode.com/static_assets/others/50_1080_1080.png'
                          : b.name.includes('100') ? 'https://assets.leetcode.com/static_assets/others/lg25100.png'
                          : b.name.includes('50') ? 'https://assets.leetcode.com/static_assets/others/lg2550.png'
                          : b.name.includes('Jul') ? 'https://leetcode.com/static/images/badges/dcc-2026-7.png'
                          : null);

                      return (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-zinc-100/90 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 border border-zinc-200/70 dark:border-zinc-700/60 flex items-center gap-1.5 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors"
                          title={b.date}
                        >
                          {iconSrc ? (
                            <img
                              src={iconSrc}
                              alt=""
                              className="w-3.5 h-3.5 object-contain shrink-0"
                              loading="lazy"
                            />
                          ) : (
                            <span className="text-xs">{b.icon}</span>
                          )}
                          <span>{b.name}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60 mt-4 flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                <span className="text-zinc-700 dark:text-zinc-300 font-medium flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Active {leetcodeData.badge} Badge
                </span>
                <span>{leetcodeData.contestsAttended} Rated Contests</span>
              </div>
            </div>
          </Reveal>

          {/* Codeforces Card */}
          <Reveal delay={200}>
            <div className="p-7 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md hover:border-blue-500/30 hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 p-2 flex items-center justify-center shrink-0 shadow-sm">
                      <img src="/codeforces.svg" alt="Codeforces" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg tracking-tight">Codeforces</h3>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 capitalize flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {codeforcesData.rank}
                        </span>
                      </div>
                      <p className="font-mono text-xs text-zinc-400 dark:text-zinc-500">@{codeforcesData.handle}</p>
                    </div>
                  </div>

                  <a
                    href={`https://codeforces.com/profile/${codeforcesData.handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shrink-0"
                    title="Open Codeforces Profile"
                  >
                    <ExternalLinkIcon size={14} />
                  </a>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-zinc-50/70 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60">
                  <div>
                    <div className="text-[11px] font-mono uppercase text-zinc-400 dark:text-zinc-500 mb-0.5">Rating</div>
                    <div className="font-mono text-2xl font-bold text-emerald-500 dark:text-emerald-400 tracking-tight">{codeforcesData.rating}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase text-zinc-400 dark:text-zinc-500 mb-0.5">Max Rating</div>
                    <div className="font-mono text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">{codeforcesData.maxRating}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase text-zinc-400 dark:text-zinc-500 mb-0.5">Rounds</div>
                    <div className="font-mono text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">{codeforcesData.contestsAttended}</div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-center justify-between p-2.5 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-950/30">
                    <span className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                      <svg className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 21h18M5 21V9l7-5 7 5v12M9 14h6M9 18h6"/>
                      </svg>
                      Institution / Organization
                    </span>
                    <strong className="font-semibold text-zinc-800 dark:text-zinc-200">{codeforcesData.organization}</strong>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-950/30">
                    <span className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                      <svg className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                        <polyline points="17 6 23 6 23 12"/>
                      </svg>
                      Peak Rank &amp; Rating
                    </span>
                    <strong className="font-mono text-zinc-800 dark:text-zinc-200 font-semibold flex items-center gap-1.5">
                      <span>+{codeforcesData.maxRating} Peak</span>
                      <span className="text-zinc-500 dark:text-zinc-400 font-normal">({codeforcesData.maxRank})</span>
                    </strong>
                  </div>
                  {codeforcesData.city && (
                    <div className="flex items-center justify-between p-2.5 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-950/30">
                      <span className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                        <svg className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        City / Region
                      </span>
                      <strong className="font-semibold text-zinc-800 dark:text-zinc-200">{codeforcesData.city}</strong>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60 mt-4 flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                <span className="text-zinc-700 dark:text-zinc-300 font-medium flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Active {codeforcesData.rank} Rank
                </span>
                <span>{codeforcesData.contestsAttended} Rated Rounds</span>
              </div>
            </div>
          </Reveal>

        </div>

        {/* Live Rating Progression Graph */}
        <Reveal delay={300}>
          <div className="p-7 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-md">
            
            {/* Chart Header + Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-serif text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  Rating Progression History
                </h3>
                <p className="font-serif-text text-xs text-zinc-500 dark:text-zinc-400">
                  Hover over data points to inspect contest name, exact rating, rank &amp; solve counts
                </p>
              </div>

              {/* Toggle Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80">
                <button
                  onClick={() => { setActiveTab('leetcode'); setHoveredPoint(null); }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                    activeTab === 'leetcode'
                      ? 'bg-white dark:bg-zinc-900 text-amber-600 dark:text-amber-400 shadow-sm border border-zinc-200/60 dark:border-zinc-700/60 font-semibold'
                      : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                  LeetCode ({leetcodeData.rating})
                </button>
                <button
                  onClick={() => { setActiveTab('codeforces'); setHoveredPoint(null); }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                    activeTab === 'codeforces'
                      ? 'bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-sm border border-zinc-200/60 dark:border-zinc-700/60 font-semibold'
                      : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  Codeforces ({codeforcesData.rating})
                </button>
              </div>
            </div>

            {/* Interactive SVG Graph */}
            <div className="relative w-full overflow-hidden">
              <svg
                viewBox="0 0 800 260"
                className="w-full h-auto overflow-visible select-none"
              >
                <defs>
                  {/* LeetCode Gradient */}
                  <linearGradient id="leetcodeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                  </linearGradient>
                  {/* Codeforces Gradient */}
                  <linearGradient id="codeforcesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid lines */}
                {[0.2, 0.4, 0.6, 0.8].map((ratio, i) => {
                  const y = 30 + ratio * 200;
                  const val = Math.round(maxRating - ratio * (maxRating - minRating));
                  return (
                    <g key={i}>
                      <line
                        x1="30"
                        y1={y}
                        x2="770"
                        y2={y}
                        stroke="currentColor"
                        className="text-zinc-200 dark:text-zinc-800/80"
                        strokeDasharray="4 4"
                      />
                      <text
                        x="24"
                        y={y + 4}
                        textAnchor="end"
                        className="fill-zinc-400 dark:fill-zinc-500 text-[10px] font-mono"
                      >
                        {val}
                      </text>
                    </g>
                  );
                })}

                {/* Shaded Area */}
                {areaD && (
                  <path
                    d={areaD}
                    fill={activeTab === 'leetcode' ? 'url(#leetcodeGrad)' : 'url(#codeforcesGrad)'}
                  />
                )}

                {/* Smooth Curve Path */}
                {pathD && (
                  <path
                    d={pathD}
                    fill="none"
                    stroke={activeTab === 'leetcode' ? '#f59e0b' : '#10b981'}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Data Points */}
                {points.map((pt, idx) => {
                  const isHovered = hoveredPoint?.index === idx;
                  const color = activeTab === 'leetcode' ? '#f59e0b' : '#10b981';
                  return (
                    <g key={idx} className="cursor-pointer">
                      {/* Outer pulse when hovered */}
                      {isHovered && (
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="10"
                          fill={color}
                          opacity="0.25"
                        />
                      )}
                      {/* Main point */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isHovered ? '5' : '3.5'}
                        fill={color}
                        stroke="#fff"
                        strokeWidth="1.5"
                        className="transition-all duration-150"
                        onMouseEnter={() => setHoveredPoint(pt)}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Tooltip Card */}
              {hoveredPoint && (
                <div
                  className="absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-full -mt-3 px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white/95 dark:bg-zinc-950/95 shadow-xl text-xs backdrop-blur-md min-w-[190px]"
                  style={{
                    left: `${(hoveredPoint.x / 800) * 100}%`,
                    top: `${(hoveredPoint.y / 260) * 100}%`
                  }}
                >
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100 text-[11px] mb-1 truncate">
                    {hoveredPoint.data.title}
                  </div>
                  <div className="flex items-center justify-between font-mono text-[11px] mb-0.5">
                    <span className="text-zinc-400">Rating:</span>
                    <strong className={activeTab === 'leetcode' ? 'text-amber-500' : 'text-emerald-500'}>
                      {hoveredPoint.data.rating}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[11px] mb-0.5">
                    <span className="text-zinc-400">Rank:</span>
                    <span className="text-zinc-700 dark:text-zinc-300">#{hoveredPoint.data.rank}</span>
                  </div>
                  {hoveredPoint.data.solved !== undefined && (
                    <div className="flex items-center justify-between font-mono text-[11px] mb-0.5">
                      <span className="text-zinc-400">Solved:</span>
                      <span className="text-zinc-700 dark:text-zinc-300">{hoveredPoint.data.solved}/4</span>
                    </div>
                  )}
                  <div className="text-[10px] text-zinc-400 dark:text-zinc-500 pt-1 border-t border-zinc-100 dark:border-zinc-800 mt-1 font-mono flex items-center gap-1">
                    <svg className="w-3 h-3 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {hoveredPoint.data.date}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Timeline Legend */}
            <div className="flex justify-between items-center pt-3 border-t border-zinc-100 dark:border-zinc-800 text-[11px] font-mono text-zinc-400">
              <span>{points[0]?.data.date || 'Earlier'}</span>
              <span className="text-zinc-700 dark:text-zinc-300 font-medium flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                  <polyline points="17 6 23 6 23 12"/>
                </svg>
                {activeTab === 'leetcode' ? `Peak: ${leetcodeData.rating} (${leetcodeData.badge})` : `Peak: ${codeforcesData.maxRating} (${codeforcesData.rank})`}
              </span>
              <span>{points[points.length - 1]?.data.date || 'Latest'}</span>
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}
