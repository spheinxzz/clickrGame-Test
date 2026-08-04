import React from "react";

export default function Modal({
  children,
  open
}) {

  if(!open) return null;

  return (
    <div className="
      fixed inset-0
      bg-black/60
      flex
      items-center
      justify-center
      z-50
    ">
      <div className="
        bg-[#242222]
        border-2
        border-[#5A5555]
        rounded-2xl
        p-6
      ">
        {children}
      </div>
    </div>
  );
}