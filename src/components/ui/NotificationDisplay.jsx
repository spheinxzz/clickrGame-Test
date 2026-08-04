import React from "react";

import { useGame } from "../../hooks/useGame";

import Notification from "../effects/Notification";



export default function NotificationDisplay(){


  const {
    notifications
  } = useGame();




  return (

    <div

      className="
        fixed
        bottom-6
        left-1/2
        -translate-x-1/2
        z-[999]
        flex
        flex-col
        gap-3
        pointer-events-none
      "

    >

      {
        notifications.map(item=>(

          <Notification

            key={item.id}

            title={item.title}

            description={item.description}

          />

        ))
      }


    </div>

  );

}