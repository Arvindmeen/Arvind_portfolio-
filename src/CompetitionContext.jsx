import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Initial fallback snapshot data
export const INITIAL_LEETCODE = {
  handle: 'arvind_meena014',
  rating: 1869,
  topPercentage: 5.66,
  globalRanking: 48521,
  totalSolved: 410,
  easySolved: 121,
  mediumSolved: 230,
  hardSolved: 59,
  contestsAttended: 16,
  badge: 'Knight',
  badgesCount: 8,
  badgesList: [
    { name: 'Knight', date: 'Aug 2026', icon: '🛡️' },
    { name: '100 Days Badge 2026', date: 'Jul 2026', icon: '💯' },
    { name: '50 Days Badge 2026', date: 'Jun 2026', icon: '🎯' },
    { name: '100 Days Badge 2025', date: 'Dec 2025', icon: '⭐' },
    { name: '50 Days Badge 2025', date: 'Jul 2025', icon: '🔥' },
  ],
  history: [
    { title: 'Weekly Contest 454', rating: 1495, rank: 11118, solved: 1, date: 'Jun 2024' },
    { title: 'Weekly Contest 457', rating: 1573, rank: 3790, solved: 2, date: 'Jul 2024' },
    { title: 'Biweekly Contest 162', rating: 1581, rank: 9766, solved: 2, date: 'Aug 2024' },
    { title: 'Weekly Contest 461', rating: 1591, rank: 8441, solved: 2, date: 'Aug 2024' },
    { title: 'Biweekly Contest 163', rating: 1588, rank: 6641, solved: 2, date: 'Sep 2024' },
    { title: 'Weekly Contest 464', rating: 1614, rank: 5536, solved: 2, date: 'Sep 2024' },
    { title: 'Biweekly Contest 185', rating: 1572, rank: 7302, solved: 3, date: 'Nov 2024' },
    { title: 'Weekly Contest 508', rating: 1619, rank: 3423, solved: 3, date: 'Dec 2024' },
    { title: 'Biweekly Contest 186', rating: 1650, rank: 4463, solved: 3, date: 'Jan 2025' },
    { title: 'Weekly Contest 509', rating: 1766, rank: 253, solved: 4, date: 'Jan 2025' },
    { title: 'Weekly Contest 513', rating: 1795, rank: 2363, solved: 3, date: 'Feb 2025' },
    { title: 'Weekly Contest 515', rating: 1869, rank: 476, solved: 4, date: 'Feb 2025' },
  ]
};

export const INITIAL_CODEFORCES = {
  handle: 'arvind_meena014',
  rating: 1329,
  maxRating: 1329,
  rank: 'pupil',
  maxRank: 'pupil',
  organization: 'IIT Kharagpur',
  city: 'Morādābād',
  contestsAttended: 25,
  history: [
    { title: 'Round 976 (Div. 2)', rating: 360, rank: 12170, date: 'Sep 2024' },
    { title: 'Round 979 (Div. 2)', rating: 576, rank: 16643, date: 'Oct 2024' },
    { title: 'Round 993 (Div. 4)', rating: 706, rank: 23238, date: 'Dec 2024' },
    { title: 'Round 994 (Div. 2)', rating: 753, rank: 13056, date: 'Dec 2024' },
    { title: 'Round 995 (Div. 3)', rating: 786, rank: 18391, date: 'Dec 2024' },
    { title: 'Round 1026 (Div. 2)', rating: 653, rank: 16413, date: 'May 2025' },
    { title: 'Round 1043 (Div. 3)', rating: 643, rank: 16117, date: 'Aug 2025' },
    { title: 'Round 1045 (Div. 2)', rating: 714, rank: 13212, date: 'Aug 2025' },
    { title: 'Round 1046 (Div. 2)', rating: 712, rank: 13985, date: 'Aug 2025' },
    { title: 'Edu Round 188 (Div. 2)', rating: 676, rank: 11655, date: 'Mar 2026' },
    { title: 'Round 1101 (Div. 2)', rating: 819, rank: 8798, date: 'May 2026' },
    { title: 'Round 1106 (Div. 2)', rating: 927, rank: 6883, date: 'Jun 2026' },
    { title: 'Edu Round 192 (Div. 2)', rating: 1180, rank: 1245, date: 'Jul 2026' },
    { title: 'Round 1111 (Div. 2)', rating: 1239, rank: 3286, date: 'Jul 2026' },
    { title: 'Round 1112 (Div. 2)', rating: 1279, rank: 3304, date: 'Aug 2026' },
    { title: 'Round 1115 (Div. 2)', rating: 1329, rank: 2332, date: 'Aug 2026' },
  ]
};

const CompetitionContext = createContext(null);

export function CompetitionProvider({ children }) {
  const [leetcodeData, setLeetcodeData] = useState(() => {
    try {
      const cached = localStorage.getItem('portfolio_leetcode_data');
      return cached ? { ...INITIAL_LEETCODE, ...JSON.parse(cached) } : INITIAL_LEETCODE;
    } catch {
      return INITIAL_LEETCODE;
    }
  });

  const [codeforcesData, setCodeforcesData] = useState(() => {
    try {
      const cached = localStorage.getItem('portfolio_codeforces_data');
      return cached ? { ...INITIAL_CODEFORCES, ...JSON.parse(cached) } : INITIAL_CODEFORCES;
    } catch {
      return INITIAL_CODEFORCES;
    }
  });

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdatedTime, setLastUpdatedTime] = useState(null);

  const fetchRealTimeData = useCallback(async () => {
    setIsRefreshing(true);

    // 1. Fetch Codeforces Info
    try {
      const res = await fetch(`https://codeforces.com/api/user.info?handles=${codeforcesData.handle}`);
      if (res.ok) {
        const info = await res.json();
        if (info.status === 'OK' && info.result?.[0]) {
          const user = info.result[0];
          setCodeforcesData(prev => {
            const updated = {
              ...prev,
              rating: user.rating ?? prev.rating,
              maxRating: user.maxRating ?? prev.maxRating,
              rank: user.rank ?? prev.rank,
              maxRank: user.maxRank ?? prev.maxRank,
              organization: user.organization ?? prev.organization,
              city: user.city ?? prev.city
            };
            try { localStorage.setItem('portfolio_codeforces_data', JSON.stringify(updated)); } catch {}
            return updated;
          });
        }
      }
    } catch {}

    // 2. Fetch Codeforces Rating History
    try {
      const res = await fetch(`https://codeforces.com/api/user.rating?handle=${codeforcesData.handle}`);
      if (res.ok) {
        const ratings = await res.json();
        if (ratings.status === 'OK' && Array.isArray(ratings.result) && ratings.result.length > 0) {
          const formatted = ratings.result.map(c => {
            const dateObj = new Date(c.ratingUpdateTimeSeconds * 1000);
            return {
              title: c.contestName,
              rating: c.newRating,
              rank: c.rank,
              date: dateObj.toLocaleString('en-US', { month: 'short', year: 'numeric' })
            };
          });
          setCodeforcesData(prev => {
            const updated = {
              ...prev,
              contestsAttended: ratings.result.length,
              history: formatted
            };
            try { localStorage.setItem('portfolio_codeforces_data', JSON.stringify(updated)); } catch {}
            return updated;
          });
        }
      }
    } catch {}

    // 3. Fetch LeetCode User Solves (Primary: Vercel serverless API, Fallback: Render API)
    let solvedUpdated = false;
    try {
      const res = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${leetcodeData.handle}`);
      if (res.ok) {
        const data = await res.json();
        if (typeof data.totalSolved === 'number' && data.totalSolved > 0) {
          solvedUpdated = true;
          setLeetcodeData(prev => {
            const updated = {
              ...prev,
              totalSolved: data.totalSolved,
              easySolved: data.easySolved ?? prev.easySolved,
              mediumSolved: data.mediumSolved ?? prev.mediumSolved,
              hardSolved: data.hardSolved ?? prev.hardSolved,
              globalRanking: data.ranking ? Number(data.ranking) : prev.globalRanking
            };
            try { localStorage.setItem('portfolio_leetcode_data', JSON.stringify(updated)); } catch {}
            return updated;
          });
        }
      }
    } catch {}

    if (!solvedUpdated) {
      try {
        const res = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${leetcodeData.handle}`);
        if (res.ok) {
          const data = await res.json();
          if (data.totalSolved !== undefined) {
            setLeetcodeData(prev => {
              const updated = {
                ...prev,
                totalSolved: data.totalSolved ?? prev.totalSolved,
                easySolved: data.easySolved ?? prev.easySolved,
                mediumSolved: data.mediumSolved ?? prev.mediumSolved,
                hardSolved: data.hardSolved ?? prev.hardSolved,
              };
              try { localStorage.setItem('portfolio_leetcode_data', JSON.stringify(updated)); } catch {}
              return updated;
            });
          }
        }
      } catch {}
    }

    // 4. Fetch LeetCode Contest Stats & History
    try {
      const res = await fetch(`https://alfa-leetcode-api.onrender.com/${leetcodeData.handle}/contest`);
      if (res.ok) {
        const contest = await res.json();
        if (contest.contestRating) {
          const attended = (contest.contestParticipation || [])
            .filter(c => c.attended)
            .map(c => {
              const dateObj = new Date(c.contest.startTime * 1000);
              return {
                title: c.contest.title,
                rating: Math.round(c.rating),
                rank: c.ranking,
                solved: c.problemsSolved,
                date: dateObj.toLocaleString('en-US', { month: 'short', year: 'numeric' })
              };
            });

          setLeetcodeData(prev => {
            const updated = {
              ...prev,
              rating: Math.round(contest.contestRating) || prev.rating,
              topPercentage: contest.contestTopPercentage ?? prev.topPercentage,
              globalRanking: contest.contestGlobalRanking ?? prev.globalRanking,
              badge: contest.contestBadges?.name || prev.badge,
              contestsAttended: contest.contestAttend ?? prev.contestsAttended,
              history: attended.length > 0 ? attended : prev.history
            };
            try { localStorage.setItem('portfolio_leetcode_data', JSON.stringify(updated)); } catch {}
            return updated;
          });
        }
      }
    } catch {}

    // 5. Fetch LeetCode Badges
    try {
      const res = await fetch(`https://alfa-leetcode-api.onrender.com/${leetcodeData.handle}/badges`);
      if (res.ok) {
        const badges = await res.json();
        if (badges.badges && Array.isArray(badges.badges)) {
          const list = badges.badges.slice(0, 6).map(b => ({
            name: b.displayName,
            date: b.creationDate ? new Date(b.creationDate).toLocaleString('en-US', { month: 'short', year: 'numeric' }) : '',
            icon: b.displayName.includes('Knight') ? '🛡️' : b.displayName.includes('100') ? '💯' : b.displayName.includes('50') ? '🎯' : '⭐'
          }));
          setLeetcodeData(prev => {
            const updated = {
              ...prev,
              badgesCount: badges.badgesCount || prev.badgesCount,
              badgesList: list.length > 0 ? list : prev.badgesList
            };
            try { localStorage.setItem('portfolio_leetcode_data', JSON.stringify(updated)); } catch {}
            return updated;
          });
        }
      }
    } catch {}

    setLastUpdatedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    setIsRefreshing(false);
  }, [codeforcesData.handle, leetcodeData.handle]);

  useEffect(() => {
    fetchRealTimeData();
    const timer = setInterval(fetchRealTimeData, 60 * 60 * 1000);// 1 hour polling (3600000 ms)
    return () => clearInterval(timer);
  }, [fetchRealTimeData]);

  return (
    <CompetitionContext.Provider
      value={{
        leetcodeData,
        codeforcesData,
        isRefreshing,
        lastUpdatedTime,
        fetchRealTimeData
      }}
    >
      {children}
    </CompetitionContext.Provider>
  );
}

export function useCompetition() {
  const context = useContext(CompetitionContext);
  if (!context) {
    return {
      leetcodeData: INITIAL_LEETCODE,
      codeforcesData: INITIAL_CODEFORCES,
      isRefreshing: false,
      lastUpdatedTime: null,
      fetchRealTimeData: () => {}
    };
  }
  return context;
}
