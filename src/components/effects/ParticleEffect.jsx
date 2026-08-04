import React from "react";

import { useGame } from "../../hooks/useGame";


export default function ParticleEffect({
  count = 12
}) {


  const {
    game
  } = useGame();



  if(
    game.settings?.effects?.particles === false
  ){

    return null;

  }




  return (

    <div className="
      absolute
      inset-0
      pointer-events-none
      overflow-visible
    ">


      {
        Array.from({
          length: count

        }).map((_,index)=>{


          const angle =
            Math.random() * 360;


          const distance =
            40 + Math.random()*70;



          const x =
            Math.cos(
              angle * Math.PI / 180
            )
            *
            distance;



          const y =
            Math.sin(
              angle * Math.PI / 180
            )
            *
            distance;



          return (

            <span

              key={index}


              className="
                absolute
                left-1/2
                top-1/2

                w-2
                h-2

                rounded-full

                bg-emerald-400

                animate-particle

              "


              style={{

                "--x":
                  `${x}px`,


                "--y":
                  `${y}px`,


                width:
                  `${4 + Math.random()*6}px`,


                height:
                  `${4 + Math.random()*6}px`,


                transform:
                  `rotate(${Math.random()*360}deg)`

              }}


            />

          );


        })

      }


    </div>

  );

}