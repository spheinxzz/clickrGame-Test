import React from "react";

import {
  useGame
} from "../../hooks/useGame";


import formatNumber from "../../utils/formatNumber";



export default function GemsDisplay(){


  const {
    game
  } = useGame();




  return (

    <div className="
      bg-[#1c1a1a]
      border
      border-purple-400/30
      rounded-2xl
      px-5
      py-3
      min-w-36
      shadow-lg
    ">


      <div className="
        text-xs
        text-gray-400
        font-bold
      ">

        GEMS

      </div>



      <div className="
        text-3xl
        font-black
        text-purple-400
      ">

        💎 {formatNumber(game.gems)}

      </div>


    </div>

  );

}