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
                <span className="inline-block w-6 h-px bg-zinc-300 dark:bg-zinc-600" />
                Competitive Programming
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-zinc-900 dark:text-zinc-100 leading-[1.15]">
                Competitions &amp; Ratings
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={fetchRealTimeData}
                disabled={isRefreshing}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium hover:bg-emerald-500/20 transition-all cursor-pointer disabled:opacity-60"
                title="Click to refresh live data"
              >
                <span className={`w-2 h-2 rounded-full bg-emerald-500 ${isRefreshing ? 'animate-ping' : 'animate-pulse'}`} />
                {isRefreshing ? 'Syncing...' : lastUpdatedTime ? `Live Synced (${lastUpdatedTime})` : 'Live API Active'}
              </button>
            </div>
          </div>
        </Reveal>

        {/* Profile Cards (LeetCode + Codeforces) */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          
          {/* LeetCode Card */}
          <Reveal delay={100}>
            <div className="p-7 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm hover:border-amber-500/40 hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 font-bold text-xl">
                      ⚡
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg">LeetCode</h3>
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
                          {leetcodeData.badge} 🛡️
                        </span>
                      </div>
                      <p className="font-mono text-xs text-zinc-400 dark:text-zinc-500">@{leetcodeData.handle}</p>
                    </div>
                  </div>

                  <a
                    href={`https://leetcode.com/u/${leetcodeData.handle}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 hover:border-zinc-400 transition-all shrink-0"
                    title="Open LeetCode Profile"
                  >
                    <ExternalLinkIcon size={14} />
                  </a>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/70 dark:border-zinc-800/70">
                  <div>
                    <div className="text-[11px] font-mono uppercase text-zinc-400 dark:text-zinc-500">Rating</div>
                    <div className="font-mono text-2xl font-bold text-zinc-900 dark:text-zinc-100">{leetcodeData.rating}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase text-zinc-400 dark:text-zinc-500">Top %</div>
                    <div className="font-mono text-2xl font-bold text-amber-600 dark:text-amber-400">
                      {leetcodeData.topPercentage}%
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase text-zinc-400 dark:text-zinc-500">Contests</div>
                    <div className="font-mono text-2xl font-bold text-zinc-900 dark:text-zinc-100">{leetcodeData.contestsAttended}</div>
                  </div>
                </div>

                {/* Problem Solving Breakdown with GREEN highlights */}
                <div className="space-y-2.5 mb-4">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Problems Solved: {leetcodeData.totalSolved}
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      Global Rank: #{leetcodeData.globalRanking.toLocaleString()}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex">
                    <div style={{ width: `${(leetcodeData.easySolved / leetcodeData.totalSolved) * 100}%` }} className="bg-emerald-500" title={`Easy: ${leetcodeData.easySolved}`} />
                    <div style={{ width: `${(leetcodeData.mediumSolved / leetcodeData.totalSolved) * 100}%` }} className="bg-amber-500" title={`Medium: ${leetcodeData.mediumSolved}`} />
                    <div style={{ width: `${(leetcodeData.hardSolved / leetcodeData.totalSolved) * 100}%` }} className="bg-rose-500" title={`Hard: ${leetcodeData.hardSolved}`} />
                  </div>

                  <div className="flex justify-between items-center text-[11px] font-mono pt-0.5 text-zinc-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Easy: <strong>{leetcodeData.easySolved}</strong></span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Medium: <strong>{leetcodeData.mediumSolved}</strong></span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Hard: <strong>{leetcodeData.hardSolved}</strong></span>
                  </div>
                </div>

                {/* Badges / Awards List */}
                <div className="pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 mt-3">
                  <div className="text-[11px] font-mono text-zinc-400 mb-2 flex items-center justify-between">
                    <span>🏆 Badges Earned ({leetcodeData.badgesCount}):</span>
                    <span className="text-emerald-500 font-semibold">Top {leetcodeData.topPercentage}% Worldwide</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {leetcodeData.badgesList.map((b, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-[10.5px] font-mono font-medium bg-zinc-100 dark:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/80 flex items-center gap-1"
                        title={b.date}
                      >
                        <span>{b.icon}</span> {b.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60 mt-4 flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">🏅 Verified {leetcodeData.badge} Title</span>
                <span>{leetcodeData.contestsAttended} Rated Contests</span>
              </div>
            </div>
          </Reveal>

          {/* Codeforces Card */}
          <Reveal delay={200}>
            <div className="p-7 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm hover:border-blue-500/40 hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-bold text-xl">
                      🏆
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg">Codeforces</h3>
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 capitalize flex items-center gap-1">
                          {codeforcesData.rank} 🟢
                        </span>
                      </div>
                      <p className="font-mono text-xs text-zinc-400 dark:text-zinc-500">@{codeforcesData.handle}</p>
                    </div>
                  </div>

                  <a
                    href={`https://codeforces.com/profile/${codeforcesData.handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 hover:border-zinc-400 transition-all shrink-0"
                    title="Open Codeforces Profile"
                  >
                    <ExternalLinkIcon size={14} />
                  </a>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/70 dark:border-zinc-800/70">
                  <div>
                    <div className="text-[11px] font-mono uppercase text-zinc-400 dark:text-zinc-500">Rating</div>
                    <div className="font-mono text-2xl font-bold text-emerald-600 dark:text-emerald-400">{codeforcesData.rating}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase text-zinc-400 dark:text-zinc-500">Max Rating</div>
                    <div className="font-mono text-2xl font-bold text-zinc-900 dark:text-zinc-100">{codeforcesData.maxRating}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase text-zinc-400 dark:text-zinc-500">Rounds</div>
                    <div className="font-mono text-2xl font-bold text-zinc-900 dark:text-zinc-100">{codeforcesData.contestsAttended}</div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-center justify-between p-2.5 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-950/30">
                    <span>🏛️ Institution / Organization</span>
                    <strong className="font-semibold text-zinc-800 dark:text-zinc-200">{codeforcesData.organization}</strong>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-950/30">
                    <span>📈 Peak Rank &amp; Rating</span>
                    <strong className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      +{codeforcesData.maxRating} Peak ({codeforcesData.maxRank})
                    </strong>
                  </div>
                  {codeforcesData.city && (
                    <div className="flex items-center justify-between p-2.5 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-950/30">
                      <span>📍 City / Region</span>
                      <strong className="font-semibold text-zinc-800 dark:text-zinc-200">{codeforcesData.city}</strong>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60 mt-4 flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">🎯 Active {codeforcesData.rank} Rank</span>
                <span>{codeforcesData.contestsAttended} Rated Rounds</span>
              </div>
            </div>
          </Reveal>

        </div>

        {/* Live Rating Progression Graph */}
        <Reveal delay={300}>
          <div className="p-7 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-md">
            
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
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                <button
                  onClick={() => { setActiveTab('leetcode'); setHoveredPoint(null); }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                    activeTab === 'leetcode'
                      ? 'bg-white dark:bg-zinc-900 text-amber-600 dark:text-amber-400 shadow-sm border border-zinc-200/60 dark:border-zinc-700/60 font-semibold'
                      : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                  }`}
                >
                  ⚡ LeetCode ({leetcodeData.rating})
                </button>
                <button
                  onClick={() => { setActiveTab('codeforces'); setHoveredPoint(null); }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                    activeTab === 'codeforces'
                      ? 'bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-sm border border-zinc-200/60 dark:border-zinc-700/60 font-semibold'
                      : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                  }`}
                >
                  🏆 Codeforces ({codeforcesData.rating})
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
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                  </linearGradient>
                  {/* Codeforces Gradient */}
                  <linearGradient id="codeforcesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
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
                    strokeWidth="3"
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
                          r="12"
                          fill={color}
                          opacity="0.25"
                        />
                      )}
                      {/* Main point */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isHovered ? '6' : '4'}
                        fill={color}
                        stroke="#fff"
                        strokeWidth="2"
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
                  <div className="text-[10px] text-zinc-400 pt-1 border-t border-zinc-100 dark:border-zinc-800 mt-1 font-mono">
                    📅 {hoveredPoint.data.date}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Timeline Legend */}
            <div className="flex justify-between items-center pt-3 border-t border-zinc-100 dark:border-zinc-800 text-[11px] font-mono text-zinc-400">
              <span>{points[0]?.data.date || 'Earlier'}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                {activeTab === 'leetcode' ? `📈 Peak: ${leetcodeData.rating} (${leetcodeData.badge})` : `📈 Peak: ${codeforcesData.maxRating} (${codeforcesData.rank})`}
              </span>
              <span>{points[points.length - 1]?.data.date || 'Latest'}</span>
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}
