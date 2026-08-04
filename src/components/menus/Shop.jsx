import React from "react";

import useGame from "../../hooks/useGame";

import formatNumber from "../../utils/formatNumber";

import {
  playSound
} from "../../systems/audio";


import {
  passiveUpgrades
} from "../../data/passiveUpgrades";


import {
  buyPassiveUpgrade,
  getPassiveUpgradeCost
} from "../../systems/upgrades";




export default function Shop({
  onClose
}) {


  const {
    game,
    setGame,
    addNotification
  } = useGame();







  function buy(id){


    const upgrade =
      passiveUpgrades.find(
        item =>
          item.id === id
      );



    if(!upgrade){

      return;

    }





    setGame(previous=>{


      const level =
        previous.passiveUpgrades?.[id] || 0;



      const cost =
        getPassiveUpgradeCost(
          id,
          level
        );



      if(previous.money < cost){

        return previous;

      }




      const updated =
        buyPassiveUpgrade(
          previous,
          id
        );




      if(updated !== previous){


  addNotification(

    "Passive Upgrade Purchased",

    `${upgrade.name} is now level ${level + 1}`

  );


  if(
    previous.settings?.audio?.clickSounds !== false
  ){

    playSound(
      "purchase",
      (previous.settings?.audio?.masterVolume ?? 100) / 100
    );

  }


}





      return updated;


    });


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
      p-6
    ">


      <div className="
        w-[520px]
        max-h-[75vh]
        bg-[#242222]
        rounded-3xl
        border-2
        border-emerald-400/30
        p-6
        shadow-2xl
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
            text-emerald-400
          ">

            CPS Shop

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
          flex
          flex-col
          gap-4
          overflow-y-auto
          max-h-[55vh]
        ">


        {
          passiveUpgrades.map(item=>{


            const level =
              game.passiveUpgrades?.[item.id] || 0;



            const cost =
              getPassiveUpgradeCost(
                item.id,
                level
              );



            const maxed =
              level >= item.maxLevel;



            const canBuy =
              game.money >= cost;





            return (

              <div

                key={item.id}

                className="
                  bg-[#1c1a1a]
                  rounded-2xl
                  border
                  border-[#383434]
                  p-4
                  flex
                  justify-between
                  items-center
                "

              >


                <div>


                  <h3 className="
                    font-bold
                  ">

                    {item.name}

                  </h3>



                  <p className="
                    text-gray-400
                    text-sm
                  ">

                    {item.description}

                  </p>



                  <p className="
                    text-emerald-400
                    text-sm
                  ">

                    Level {level}/{item.maxLevel}

                  </p>


                </div>





                <button

                  disabled={
                    maxed ||
                    !canBuy
                  }


                  onClick={()=>buy(item.id)}


                  className={`
                    px-4
                    py-2
                    rounded-xl
                    font-bold

                    ${
                      maxed

                      ?

                      "bg-gray-600 text-gray-300"

                      :

                      canBuy

                      ?

                      "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/40"

                      :

                      "bg-gray-700 text-gray-500"

                    }

                  `}

                >

                  {
                    maxed

                    ?

                    "MAX"

                    :

                    "$" + formatNumber(cost)

                  }


                </button>


              </div>


            );


          })

        }


        </div>


      </div>


    </div>

  );

}