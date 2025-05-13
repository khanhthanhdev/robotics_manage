import React from 'react';

export function SwissRankingsDisplay({ rankings }: { rankings: any[] }) {
  if (!rankings || rankings.length === 0) {
    return (
      <div className="text-center text-blue-700 text-xl py-8">No rankings available for this stage yet.</div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl shadow border border-blue-200">
        <thead className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <tr>
            <th className="px-4 py-2 text-left font-extrabold text-yellow-300 text-lg">Rank</th>
            <th className="px-4 py-2 text-left font-extrabold text-yellow-300 text-lg">Team #</th>
            <th className="px-4 py-2 text-left font-extrabold text-yellow-300 text-lg">Team Name</th>
            <th className="px-2 py-2 text-left font-semibold text-blue-100 text-sm">W-L-T</th>
            <th className="px-4 py-2 text-left font-extrabold text-green-300 text-lg">Ranking Pts</th>
            <th className="px-2 py-2 text-left font-semibold text-blue-100 text-sm">OWP</th>
            <th className="px-2 py-2 text-left font-semibold text-blue-100 text-sm">Pt Diff</th>
            <th className="px-2 py-2 text-left font-semibold text-blue-100 text-sm">Matches</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((r: any, idx: number) => (
            <tr
              key={r.teamId}
              className={
                `transition hover:bg-yellow-50 ${idx === 0 ? 'bg-yellow-100 font-bold' : idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`
              }
            >
              <td className="px-4 py-2 font-extrabold text-blue-900 text-lg">{idx + 1}</td>
              <td className="px-4 py-2 font-extrabold text-blue-800 text-lg">{r.team?.teamNumber || '-'}</td>
              <td className="px-4 py-2 font-bold text-blue-700">{r.team?.name || '-'}</td>
              <td className="px-2 py-2 text-blue-600 text-sm">{r.wins}-{r.losses}-{r.ties}</td>
              <td className="px-4 py-2 font-extrabold text-green-700 text-lg">{r.rankingPoints}</td>
              <td className="px-2 py-2 text-blue-500 text-xs">{(r.opponentWinPercentage * 100).toFixed(1)}%</td>
              <td className="px-2 py-2 text-blue-500 text-xs">{r.pointDifferential}</td>
              <td className="px-2 py-2 text-blue-500 text-xs">{r.matchesPlayed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
