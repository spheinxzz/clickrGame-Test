import React from "react";

import {
  useGame
} from "../../hooks/useGame";


import formatNumber from "../../utils/formatNumber";



export default function MoneyDisplay(){


  const {
    game,
    cps
  } = useGame();




  return (

    <div className="
      bg-[#1c1a1a]
      border
      border-emerald-400/30
      rounded-2xl
      px-5
      py-3
      min-w-48
      shadow-lg
    ">


      <div className="
        text-xs
        text-gray-400
        font-bold
      ">

        MONEY

      </div>



      <div className="
        text-3xl
        font-black
        text-emerald-400
      ">

        ${formatNumber(game.money)}

      </div>




      <div className="
        text-sm
        text-gray-300
      ">

        +{formatNumber(cps)}/sec

      </div>



    </div>

  );

}