import React from "react";

import {
  useGame
} from "../../hooks/useGame";


import {
  achievements
} from "../../data/achievements";



export default function AchievementMenu({
  onClose
}) {


  const {
    game,
    setGame
  } = useGame();





  function claimAchievement(
    achievement
  ){


    setGame(previous=>{


      if(
        !previous.achievements[achievement.id]
      ){

        return previous;

      }



      if(
        previous.claimedAchievements[achievement.id]
      ){

        return previous;

      }




      let updated = {

        ...previous,

        claimedAchievements:{

          ...previous.claimedAchievements,


          [achievement.id]:true

        }

      };






      if(
        achievement.reward.type === "money"
      ){


        updated.money +=
          achievement.reward.amount;



      }



      if(
        achievement.reward.type === "gems"
      ){


        updated.gems +=
          achievement.reward.amount;


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
    ">


      <div className="
        bg-[#242222]
        border
        border-indigo-400
        rounded-xl
        p-6
        w-[500px]
        max-h-[80vh]
        overflow-y-auto
      ">


        <div className="
          flex
          justify-between
          items-center
          mb-5
        ">


          <h2 className="
            text-2xl
            font-bold
            text-indigo-400
          ">

            Achievements

          </h2>



          <button

            onClick={onClose}

            className="
              px-3
              py-1
              rounded
              bg-red-500
            "

          >

            X

          </button>


        </div>






        <div className="
          flex
          flex-col
          gap-4
        ">


          {
            achievements.map(
              achievement=>{


                const unlocked =
                  game.achievements[
                    achievement.id
                  ];



                const claimed =
                  game.claimedAchievements[
                    achievement.id
                  ];




                return (

                  <div

                    key={
                      achievement.id
                    }

                    className="
                      p-4
                      rounded-lg
                      bg-[#181818]
                      border
                      border-gray-700
                    "

                  >


                    <h3 className="
                      font-bold
                      text-white
                    ">

                      {achievement.name}

                    </h3>




                    <p className="
                      text-gray-400
                      text-sm
                    ">

                      {achievement.description}

                    </p>




                    <p className="
                      text-indigo-300
                      mt-2
                    ">

                      Reward:
                      {" "}
                      {achievement.reward.amount}
                      {" "}
                      {achievement.reward.type}

                    </p>





                    {
                      unlocked ? (

                        claimed ? (

                          <button

                            disabled

                            className="
                              mt-3
                              px-4
                              py-2
                              rounded
                              bg-gray-600
                            "

                          >

                            Claimed

                          </button>


                        ) : (


                          <button

                            onClick={()=>
                              claimAchievement(
                                achievement
                              )
                            }

                            className="
                              mt-3
                              px-4
                              py-2
                              rounded
                              bg-indigo-500
                              hover:bg-indigo-600
                            "

                          >

                            Claim Reward

                          </button>


                        )


                      ) : (


                        <div className="
                          mt-3
                          text-gray-500
                        ">

                          Locked

                        </div>


                      )

                    }


                  </div>


                );


              }

            )

          }


        </div>


      </div>


    </div>

  );


}