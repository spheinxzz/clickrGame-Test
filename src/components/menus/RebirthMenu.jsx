import React from "react";

import { useGame } from "../../hooks/useGame";
import formatNumber from "../../utils/formatNumber";


export default function RebirthMenu({ onClose }) {


  const { game } = useGame();



  const rebirthCost = 1000000;



  function rebirth() {

    if (game.money < rebirthCost) {
      return;
    }


    // Placeholder until rebirth system is wired
    console.log("Rebirth activated");

  }



  return (

    <div className="
      fixed
      inset-0
      bg-black/60
      flex
      items-center
      justify-center
      z-50
    ">


      <div className="
        w-[500px]
        bg-[#242222]
        border-2
        border-[#383434]
        rounded-3xl
        p-6
      ">


        <div className="
          flex
          justify-between
          items-center
          mb-5
        ">


          <h2 className="
            text-3xl
            font-black
            text-rose-400
          ">
            Rebirths
          </h2>


          <button
            onClick={onClose}
            className="
              text-gray-400
              hover:text-white
              text-xl
            "
          >
            ✕
          </button>


        </div>



        <p className="
          text-gray-400
          mb-4
        ">
          Reset progress to gain permanent bonuses.
        </p>



        <div className="
          bg-[#1c1a1a]
          rounded-2xl
          p-4
          border
          border-[#383434]
        ">


          <h3 className="
            text-white
            font-bold
          ">
            First Rebirth
          </h3>


          <p className="
            text-gray-400
            text-sm
          ">
            Cost: ${formatNumber(rebirthCost)}
          </p>


          <button

            onClick={rebirth}

            className="
              mt-4
              px-5
              py-2
              rounded-xl
              bg-rose-500/20
              text-rose-400
              border
              border-rose-400/30
            "

          >
            Rebirth
          </button>


        </div>


      </div>


    </div>

  );

}