import React from "react";

export default function ClickParticles({ amount }) {
  return (
    <div className="pointer-events-none absolute">
      <span className="text-emerald-400 font-bold animate-bounce">
        +{amount}
      </span>
    </div>
  );
}