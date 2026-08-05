import React from 'react';

export function LeaderboardMenu({ onClose, scores = [] }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e1e1e] border-2 border-[#333] rounded-2xl w-full max-w-md p-6 text-white shadow-2xl relative flex flex-col gap-4 max-h-[85vh]">
        
        <div className="flex justify-between items-center border-b border-[#333] pb-3">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-2xl font-bold">🏆</span>
            <h2 className="text-xl font-bold tracking-wide">Leaderboard</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl font-bold px-2 rounded-lg hover:bg-[#2e2e2e] transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-12 text-xs uppercase font-semibold text-gray-400 px-3 py-1">
          <span className="col-span-2">Rank</span>
          <span className="col-span-6">Player</span>
          <span className="col-span-4 text-right">Score</span>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1 custom-scrollbar">
          {scores.map((entry, index) => {
            const rank = index + 1;
            let rankColor = 'text-gray-300';
            let rowBg = 'bg-[#282828]';

            if (rank === 1) {
              rankColor = 'text-yellow-400 font-extrabold';
              rowBg = 'bg-yellow-500/10 border border-yellow-500/30';
            } else if (rank === 2) {
              rankColor = 'text-gray-300 font-bold';
              rowBg = 'bg-slate-400/10 border border-slate-400/20';
            } else if (rank === 3) {
              rankColor = 'text-amber-600 font-bold';
              rowBg = 'bg-amber-700/10 border border-amber-700/20';
            }

            return (
              <div
                key={entry.id || index}
                className={`grid grid-cols-12 items-center px-3 py-2.5 rounded-xl ${rowBg} hover:brightness-110 transition-all`}
              >
                <span className={`col-span-2 text-sm ${rankColor}`}>
                  #{rank}
                </span>
                <span className="col-span-6 font-medium text-sm truncate">
                  {entry.username}
                </span>
                <span className="col-span-4 text-right font-bold text-emerald-400 text-sm truncate">
                  {Number(entry.score).toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>

        <div className="pt-2 border-t border-[#333] flex justify-end">
          <button
            onClick={onClose}
            className="w-full bg-red-600/80 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl transition-all active:scale-95"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default LeaderboardMenu;