import React from "react";

import { gemShopItems } from "../../data/gemShop";

import { useGame } from "../../hooks/useGame";

import formatNumber from "../../utils/formatNumber";



export default function GemShop({
  onClose
}) {


  const {
    game,
    updateGame
  } = useGame();







  function buy(item){



    if(game.gems < item.cost)
      return;





    updateGame(previous => {


      const newGame = {


        ...previous,


        gems:
          previous.gems - item.cost



      };






      if(item.type === "clickPower"){


        newGame.clickPower += item.amount;


      }






      if(item.type === "moneyMultiplier"){


        newGame.moneyMultiplier =

          (newGame.moneyMultiplier || 1)

          +

          item.amount;


      }






      if(item.type === "gemMultiplier"){


        newGame.gemMultiplier =

          (newGame.gemMultiplier || 1)

          *

          item.amount;


      }





      return newGame;


    });



  }









  return (

    <div className="
      fixed
      inset-0
      bg-black/60
      flex
      justify-center
      items-center
      z-50
    ">



      <div className="
        w-[650px]
        max-h-[80vh]
        bg-[#242222]
        rounded-3xl
        border-2
        border-purple-400/30
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
            text-purple-400
          ">

            💎 Gem Shop

          </h2>




          <button

            onClick={onClose}

            className="
              text-gray-400
              hover:text-white
            "

          >

            ✕

          </button>



        </div>






        <div className="
          overflow-y-auto
          max-h-[60vh]
          flex
          flex-col
          gap-4
        ">


          {

            gemShopItems.map(item => (


              <div

                key={item.id}

                className="
                  bg-[#1c1a1a]
                  border
                  border-[#383434]
                  rounded-2xl
                  p-5
                "

              >


                <h3 className="
                  text-white
                  font-black
                  text-xl
                ">

                  {item.name}

                </h3>




                <p className="
                  text-gray-400
                  text-sm
                  mt-2
                ">

                  {item.description}

                </p>





                <button

                  disabled={
                    game.gems < item.cost
                  }

                  onClick={()=>buy(item)}

                  className={`
                    mt-4
                    w-full
                    rounded-xl
                    p-3
                    font-black

                    ${
                      game.gems >= item.cost

                      ?

                      "bg-purple-500 text-white"

                      :

                      "bg-gray-700 text-gray-400"

                    }

                  `}

                >

                  💎 {formatNumber(item.cost)}

                </button>



              </div>


            ))

          }


        </div>



      </div>


    </div>

  );

}