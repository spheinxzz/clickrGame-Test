import React from "react";

export default function Button({
  children,
  onClick
}) {
  return (
    <button
      onClick={onClick}
      className="
      px-5 py-3
      rounded-xl
      bg-[#343232]
      border border-[#5A5555]
      hover:bg-[#3f3c3c]
      active:scale-95
      transition
      "
    >
      {children}
    </button>
  );
}