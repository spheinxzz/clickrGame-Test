import React from "react";

export default function ClickAnimation({ children }) {
  return (
    <div className="transition-transform duration-100 active:scale-90">
      {children}
    </div>
  );
}