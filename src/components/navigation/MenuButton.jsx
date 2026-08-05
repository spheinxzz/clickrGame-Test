import React from 'react';

export default function MenuButton({ iconSrc, label, badge, color = 'emerald', onClick }) {
  const colorMap = {
    emerald: 'border-emerald-500/30 hover:bg-emerald-500/10 active:border-emerald-400',
    amber: 'border-amber-500/30 hover:bg-amber-500/10 active:border-amber-400',
    indigo: 'border-indigo-500/30 hover:bg-indigo-500/10 active:border-indigo-400',
    rose: 'border-rose-500/30 hover:bg-rose-500/10 active:border-rose-400',
    purple: 'border-purple-500/30 hover:bg-purple-500/10 active:border-purple-400',
    gray: 'border-gray-500/30 hover:bg-gray-500/10 active:border-gray-400',
  };

  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-3 w-48 px-4 py-3 bg-[#1c1a1a] border-2 rounded-2xl transition-all duration-150 transform active:scale-95 shadow-md hover:shadow-lg group ${colorMap[color] || colorMap.emerald}`}
    >
      <div className="w-10 h-10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-150 rounded-lg overflow-hidden">
        {iconSrc ? (
          <img 
            src={iconSrc} 
            alt={`${label} icon`} 
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full bg-neutral-700 animate-pulse rounded" />
        )}
      </div>

      <span className="font-bold text-sm tracking-wide text-white truncate">
        {label}
      </span>
      
      {badge && (
        <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-[#242222]">
          {badge}
        </span>
      )}
    </button>
  );
}