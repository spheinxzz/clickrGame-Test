import React from 'react';

export default function IconPlaceholder({ name = "ICON", className = "w-6 h-6" }) {
  return (
    <div className={`flex items-center justify-center bg-white/10 rounded-lg text-[10px] font-extrabold uppercase border border-white/20 select-none ${className}`}>
      {name.substring(0, 3)}
    </div>
  );
}