import React from "react";


export default function FloatingText({
  value,
  x = 50,
  y = 50
}) {


  const rotation =
    Math.random() * 30 - 15;



  const scale =
    Math.min(
      1.5,
      1 + (value / 100)
    );





  return (

    <div

      className="
        fixed
        pointer-events-none
        z-50
        font-black
        text-3xl
        text-emerald-400
        drop-shadow-lg
        animate-floatingText
        select-none
      "


      style={{

        left:`${x}%`,

        top:`${y}%`,

        transform:
          `rotate(${rotation}deg) scale(${scale})`

      }}

    >

      +{value}

    </div>

  );

}