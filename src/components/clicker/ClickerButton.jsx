import React, {
  useState
} from "react";


import {
  useGame
} from "../../hooks/useGame";


import {
  playSound
} from "../../systems/audio";


import ParticleEffect from "../effects/ParticleEffect";
import FloatingText from "../effects/FloatingText";





export default function ClickerButton({

  imgSrc,

  title="CLICK"

}){


  const {

    game,

    click,

    stats

  } = useGame();




  const [pressed,setPressed] =
    useState(false);


  const [shake,setShake] =
    useState(false);


  const [flash,setFlash] =
    useState(false);


  const [particles,setParticles] =
    useState([]);


  const [texts,setTexts] =
    useState([]);








  function handleClick(){



    click();



    if(
      game.settings?.audio?.clickSounds
    ){

      playSound(
        "click",
        game.settings.audio.masterVolume / 100
      );

    }







    const id =
      Date.now();




    const value =
      Math.floor(
        stats.clickPower *
        stats.moneyMultiplier
      );








    setPressed(true);


    setShake(true);


    setFlash(true);







    setTimeout(()=>{

      setPressed(false);

    },120);




    setTimeout(()=>{

      setShake(false);

    },200);




    setTimeout(()=>{

      setFlash(false);

    },250);









    if(
      game.settings?.effects?.particles !== false
    ){

      setParticles(old=>[

        ...old,

        id

      ]);

    }








    if(
      game.settings?.effects?.floatingText !== false
    ){

      setTexts(old=>[

        ...old,

        {

          id,

          value,

          x:
            50 + Math.random()*14-7,


          y:
            50 + Math.random()*14-7

        }

      ]);

    }








    setTimeout(()=>{


      setParticles(old=>

        old.filter(
          item=>item !== id
        )

      );



      setTexts(old=>

        old.filter(
          item=>item.id !== id
        )

      );


    },900);



  }








  return (

    <div

      className={`
        relative
        flex
        items-center
        justify-center

        ${
          shake
          ?
          "click-shake"
          :
          ""
        }

      `}

    >





      {
        particles.map(id=>(

          <ParticleEffect

            key={id}

            count={16}

          />

        ))
      }








      {
        texts.map(item=>(

          <FloatingText

            key={item.id}

            value={item.value}

            x={item.x}

            y={item.y}

          />

        ))
      }









      <div className="
        absolute
        w-96
        h-96
        rounded-full
        bg-emerald-400/10
        blur-3xl
        animate-pulse
      "/>









      <button

        onClick={handleClick}

        className={`

          relative

          w-60

          h-60

          rounded-full

          transition-all

          duration-150


          ${
            pressed
            ?
            "scale-90"
            :
            "scale-100 hover:scale-110"
          }


          shadow-[0_0_50px_rgba(52,211,153,0.35)]


          border-4

          border-emerald-400/50


          bg-gradient-to-b

          from-[#3b3737]

          to-[#111111]


        `}

      >




        {
          flash && (

            <div

              className="
                absolute
                inset-0
                rounded-full
                bg-emerald-300/40
                animate-clickFlash
              "

            />

          )
        }






        <div className="
          absolute
          inset-3
          rounded-full
          border
          border-emerald-400/30
          flex
          items-center
          justify-center
          bg-[#161515]
          overflow-hidden
        ">


          {
            imgSrc

            ?

            <img

              src={imgSrc}

              alt={title}

              className="
                w-32
                h-32
                object-contain
                pointer-events-none
              "

            />


            :

            <span className="
              text-emerald-400
              text-5xl
              font-black
            ">

              {title}

            </span>

          }


        </div>



      </button>


    </div>

  );

}