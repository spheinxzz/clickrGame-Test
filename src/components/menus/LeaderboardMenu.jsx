import React, { useState, useEffect } from "react";
import { useLeaderboard } from "../../context/LeaderboardContext";

export function LeaderboardMenu({ onClose }) {
  const { scores, loading, error, currentUser, fetchLeaderboard, updateUsername } = useLeaderboard();

  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [savingUsername, setSavingUsername] = useState(false);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const handleSaveUsername = async () => {
    if (!newUsername.trim()) return;
    setSavingUsername(true);
    const result = await updateUsername(newUsername.trim());
    setSavingUsername(false);
    if (result.success) {
      setIsEditing(false);
    }
  };

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

        {currentUser && (
          <div className="bg-[#282828] p-3 rounded-xl border border-[#3f3f3f] flex items-center justify-between">
            {isEditing ? (
              <div className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Enter username"
                  className="bg-[#1e1e1e] text-sm text-white px-3 py-1.5 rounded-lg border border-[#444] focus:outline-none focus:border-yellow-500 flex-1"
                  maxLength={18}
                />
                <button
                  onClick={handleSaveUsername}
                  disabled={savingUsername}
                  className="bg-emerald-600 hover:bg-emerald-500 text-xs font-bold px-3 py-2 rounded-lg transition-all"
                >
                  {savingUsername ? "..." : "Save"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-600 hover:bg-gray-500 text-xs font-bold px-2.5 py-2 rounded-lg transition-all"
                >
                  ✕
                </button>
              </div>
            ) : (
              <>
                <span className="text-xs text-gray-400">
                  Logged in as:{" "}
                  <strong className="text-white font-medium">
                    {currentUser.user_metadata?.display_name || currentUser.email?.split("@")[0]}
                  </strong>
                </span>
                <button
                  onClick={() => {
                    setNewUsername(currentUser.user_metadata?.display_name || currentUser.email?.split("@")[0] || "");
                    setIsEditing(true);
                  }}
                  className="text-xs bg-[#333] hover:bg-[#444] text-yellow-400 border border-yellow-500/30 font-semibold px-2.5 py-1 rounded-lg transition-all"
                >
                  ✏️ Edit Name
                </button>
              </>
            )}
          </div>
        )}

        <div className="grid grid-cols-12 text-xs uppercase font-semibold text-gray-400 px-3 py-1">
          <span className="col-span-2">Rank</span>
          <span className="col-span-6">Player</span>
          <span className="col-span-4 text-right">Money</span>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1 custom-scrollbar">
          {loading ? (
            <div className="text-center py-8 text-gray-400">Loading scores...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-400">Error: {error}</div>
          ) : scores.length === 0 ? (
            <div className="text-center py-8 text-gray-400">No scores logged yet.</div>
          ) : (
            scores.map((entry, index) => {
              const rank = index + 1;
              const isSelf = currentUser && entry.user_id === currentUser.id;

              let rankColor = "text-gray-300";
              let rowBg = isSelf ? "bg-emerald-900/30 border border-emerald-500/40" : "bg-[#282828]";

              if (rank === 1) {
                rankColor = "text-yellow-400 font-extrabold";
                if (!isSelf) rowBg = "bg-yellow-500/10 border border-yellow-500/30";
              } else if (rank === 2) {
                rankColor = "text-gray-300 font-bold";
                if (!isSelf) rowBg = "bg-slate-400/10 border border-slate-400/20";
              } else if (rank === 3) {
                rankColor = "text-amber-600 font-bold";
                if (!isSelf) rowBg = "bg-amber-700/10 border border-amber-700/20";
              }

              return (
                <div
                  key={entry.id || entry.user_id || index}
                  className={`grid grid-cols-12 items-center px-3 py-2.5 rounded-xl ${rowBg} hover:brightness-110 transition-all`}
                >
                  <span className={`col-span-2 text-sm ${rankColor}`}>
                    #{rank}
                  </span>
                  <span className="col-span-6 font-medium text-sm truncate flex items-center gap-1">
                    {entry.username || "Anonymous"}
                    {isSelf && <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold">YOU</span>}
                  </span>
                  <span className="col-span-4 text-right font-bold text-emerald-400 text-sm truncate">
                    ${Number(entry.money || 0).toLocaleString()}
                  </span>
                </div>
              );
            })
          )}
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