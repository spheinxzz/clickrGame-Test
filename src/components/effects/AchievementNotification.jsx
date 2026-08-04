import React, { useEffect, useState } from "react";

import { useGame } from "../../hooks/useGame";


export default function AchievementNotification() {


  const {
    game,
    removeNotification
  } = useGame();



  const [visible, setVisible] = useState({});



  useEffect(() => {


    game.notifications.forEach((notification)=>{


      if(visible[notification.id]) {
        return;
      }



      setVisible(prev => ({

        ...prev,

        [notification.id]: true

      }));




      setTimeout(()=>{


        removeNotification(
          notification.id
        );


      }, 6230);



    });


  }, [game.notifications]);






  return (

    <div className="
      fixed
      left-6
      bottom-6
      z-[100]
      flex
      flex-col
      gap-3
    ">


      {
        game.notifications.map((notification)=>(


          <div

            key={notification.id}

            className="
              achievement-popup
              w-80
              bg-[#1c1a1a]
              border-2
              border-indigo-400/50
              rounded-2xl
              p-4
              shadow-xl
            "

          >


            <h3 className="
              text-indigo-400
              font-black
              text-lg
            ">

              🏆 {notification.title}

            </h3>



            <p className="
              text-gray-300
              text-sm
              mt-1
            ">

              {notification.description}

            </p>


          </div>


        ))
      }


    </div>

  );

}