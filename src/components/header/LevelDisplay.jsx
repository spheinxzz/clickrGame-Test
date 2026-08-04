import React from "react";

import {
  useGame
} from "../../hooks/useGame";



export default function LevelDisplay(){


  const {
    game
  } = useGame();




  return (

    <div className="
      bg-[#1c1a1a]
      border
      border-blue-400/30
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

        LEVEL

      </div>



      <div className="
        text-3xl
        font-black
        text-blue-400
      ">

        {game.level}

      </div>


    </div>

  );

}