import React from "react";

import { useGame } from "../../hooks/useGame";


export default function GlowEffect({
  children,
  color = "emerald"
}) {


  const {
    game
  } = useGame();




  if(
    game.settings?.effects?.glowEffects === false
  ) {

    return children;

  }





  const colors = {


    emerald:
      "bg-emerald-500/20",


    purple:
      "bg-purple-500/20",


    blue:
      "bg-blue-500/20",


    gold:
      "bg-yellow-500/20"


  };





  return (

    <div className="
      relative
    ">


      <div

        className={`
          absolute
          inset-0
          rounded-full
          blur-3xl
          ${colors[color]}
        `}

      />


      <div className="
        relative
      ">

        {children}

      </div>


    </div>

  );

}