import React from "react";

export default function ProgressBar({
  value = 0,
  max = 100
}) {

  const percent = (value / max) * 100;

  return (
    <div className="
      w-full
      h-4
      bg-[#1a1818]
      rounded-full
      overflow-hidden
    ">
      <div
        className="
        h-full
        bg-emerald-500
        transition-all
        "
        style={{
          width:`${percent}%`
        }}
      />
    </div>
  );
}