import React, {
  useState,
  useEffect
} from "react";

import { useGame } from "../../hooks/useGame";



export default function SettingsMenu({
  onClose
}) {


  const {
    game,
    updateSetting
  } = useGame();



  const [tab, setTab] = useState("Audio");



  const tabs = [

    "Audio",

    "HUD",

    "Effects",

    "License",

    "Credits"

  ];








  function Toggle({
    label,
    value,
    onChange
  }) {


    return (

      <div className="
        flex
        items-center
        justify-between
        bg-[#1c1a1a]
        border
        border-[#383434]
        rounded-xl
        p-4
      ">


        <span className="
          text-white
          font-bold
        ">

          {label}

        </span>




        <button

          onClick={onChange}

          className={`
            w-14
            h-7
            rounded-full
            transition-all
            duration-200

            ${
              value
              ?
              "bg-emerald-500"
              :
              "bg-gray-600"
            }

          `}

        >


          <div

            className={`
              w-5
              h-5
              rounded-full
              bg-white
              transition-transform

              ${
                value
                ?
                "translate-x-8"
                :
                "translate-x-1"
              }

            `}

          />


        </button>


      </div>

    );

  }









  function Slider({
    label,
    value,
    onChange
  }) {


    const [localValue, setLocalValue] = useState(value);



    useEffect(()=>{

      setLocalValue(value);

    },[value]);





    function change(e){


      const number =
        Number(e.target.value);



      setLocalValue(number);


      onChange(number);


    }






    return (

      <div className="
        bg-[#1c1a1a]
        border
        border-[#383434]
        rounded-xl
        p-4
      ">



        <div className="
          flex
          justify-between
          mb-3
        ">


          <span className="
            text-white
            font-bold
          ">

            {label}

          </span>



          <span className="
            text-emerald-400
            font-bold
          ">

            {localValue}%

          </span>


        </div>





        <input

          type="range"

          min="0"

          max="100"

          value={localValue}

          onChange={change}

          className="
            w-full
            accent-emerald-500
            cursor-pointer
          "

        />



      </div>

    );

  }









  function renderTab(){


    if(tab === "Audio"){


      return (

        <div className="
          flex
          flex-col
          gap-4
        ">


          <Slider

            label="Master Volume"

            value={
              game.settings.audio.masterVolume
            }

            onChange={(value)=>

              updateSetting(
                "audio",
                "masterVolume",
                value
              )

            }

          />



          <Slider

            label="Music Volume"

            value={
              game.settings.audio.musicVolume
            }

            onChange={(value)=>

              updateSetting(
                "audio",
                "musicVolume",
                value
              )

            }

          />



          <Toggle

  label="Music"

  value={
    Boolean(game.settings.audio.musicEnabled)
  }

  onChange={()=>{

    updateSetting(

      "audio",

      "musicEnabled",

      !Boolean(game.settings.audio.musicEnabled)

    );

  }}

/>




          <Toggle

            label="Click Sounds"

            value={
              game.settings.audio.clickSounds
            }

            onChange={()=>


              updateSetting(

                "audio",

                "clickSounds",

                !game.settings.audio.clickSounds

              )

            }

          />



        </div>

      );

    }









    if(tab === "HUD"){


      return (

        <div className="
          flex
          flex-col
          gap-4
        ">


          <Slider

            label="HUD Size"

            value={
              game.settings.hud.hudScale
            }

            onChange={(value)=>

              updateSetting(
                "hud",
                "hudScale",
                value
              )

            }

          />




          <Toggle

            label="Show Money"

            value={
              game.settings.hud.showMoney
            }

            onChange={()=>


              updateSetting(

                "hud",

                "showMoney",

                !game.settings.hud.showMoney

              )

            }

          />




          <Toggle

            label="Show Gems"

            value={
              game.settings.hud.showGems
            }

            onChange={()=>


              updateSetting(

                "hud",

                "showGems",

                !game.settings.hud.showGems

              )

            }

          />




          <Toggle

            label="Show Level"

            value={
              game.settings.hud.showLevel
            }

            onChange={()=>


              updateSetting(

                "hud",

                "showLevel",

                !game.settings.hud.showLevel

              )

            }

          />


        </div>

      );


    }









    if(tab === "Effects"){


      return (

        <div className="
          flex
          flex-col
          gap-4
        ">



          <Toggle

            label="Particles"

            value={
              game.settings.effects.particles
            }

            onChange={()=>


              updateSetting(

                "effects",

                "particles",

                !game.settings.effects.particles

              )

            }

          />




          <Toggle

            label="Floating Text"

            value={
              game.settings.effects.floatingText
            }

            onChange={()=>


              updateSetting(

                "effects",

                "floatingText",

                !game.settings.effects.floatingText

              )

            }

          />




          <Toggle

            label="Click Animation"

            value={
              game.settings.effects.clickAnimation
            }

            onChange={()=>


              updateSetting(

                "effects",

                "clickAnimation",

                !game.settings.effects.clickAnimation

              )

            }

          />




          <Toggle

            label="Screen Shake"

            value={
              game.settings.effects.screenShake
            }

            onChange={()=>


              updateSetting(

                "effects",

                "screenShake",

                !game.settings.effects.screenShake

              )

            }

          />




          <Toggle

            label="Glow Effects"

            value={
              game.settings.effects.glowEffects
            }

            onChange={()=>


              updateSetting(

                "effects",

                "glowEffects",

                !game.settings.effects.glowEffects

              )

            }

          />



        </div>

      );


    }









    if(tab === "License"){


      return (

        <div className="
          flex
          flex-col
          gap-4
        ">


          <div className="
            bg-[#1c1a1a]
            border
            border-[#383434]
            rounded-xl
            p-5
          ">


            <h3 className="
              text-xl
              font-black
              text-emerald-400
              mb-3
            ">

              Music

            </h3>




            <p className="
              text-white
              font-bold
            ">

              Summer Rain

            </p>




            <p className="
              text-gray-400
              text-sm
              mt-2
            ">

              Music from #Uppbeat (free for Creators!)

            </p>




            <a

              href="https://uppbeat.io/t/giulio-fazio/summer-rain"

              target="_blank"

              rel="noreferrer"

              className="
                text-emerald-400
                text-sm
                block
                mt-3
              "

            >

              https://uppbeat.io/t/giulio-fazio/summer-rain

            </a>




            <div className="
              mt-4
              bg-[#242222]
              rounded-lg
              p-3
            ">


              <p className="
                text-gray-400
                text-sm
              ">

                License Code

              </p>



              <p className="
                text-white
                font-mono
              ">

                BK7VNMGRPVZDNEGB

              </p>


            </div>


          </div>


        </div>

      );


    }



    if(tab === "Credits"){


      return (

        <div className="
          flex
          flex-col
          gap-4
        ">


          <div className="
            bg-[#1c1a1a]
            border
            border-[#383434]
            rounded-xl
            p-5
          ">


            <h3 className="
              text-xl
              font-black
              text-emerald-400
              mb-3
            ">

              Development Team

            </h3>




            <div className="
              flex
              flex-col
              gap-3
            ">

              <div>

                <p className="
                  text-white
                  font-bold
                ">

                  Lead Developer

                </p>

                <p className="
                  text-gray-400
                  text-sm
                ">

                  Your Name Here

                </p>

              </div>



              <div>

                <p className="
                  text-white
                  font-bold
                ">

                  Game Design & Programming

                </p>

                <p className="
                  text-gray-400
                  text-sm
                ">

                  Your Studio Name

                </p>

              </div>

            </div>


          </div>



          <div className="
            bg-[#1c1a1a]
            border
            border-[#383434]
            rounded-xl
            p-5
          ">


            <h3 className="
              text-xl
              font-black
              text-emerald-400
              mb-3
            ">

              Special Thanks

            </h3>




            <p className="
              text-gray-300
              text-sm
              leading-relaxed
            ">

              Thank you for playing! Special appreciation goes out to all playtesters, open-source library contributors, and the wonderful community supporting this project.

            </p>


          </div>


        </div>

      );


    }



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
        w-[600px]
        max-h-[80vh]
        bg-[#242222]
        rounded-3xl
        border-2
        border-[#383434]
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
            text-white
          ">

            Settings

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
          gap-2
          mb-5
          overflow-x-auto
        ">


          {

            tabs.map(item=>(

              <button

                key={item}

                onClick={()=>setTab(item)}

                className={`
                  px-4
                  py-2
                  rounded-xl
                  font-bold
                  whitespace-nowrap

                  ${
                    tab === item
                    ?
                    "bg-emerald-500/20 text-emerald-400"
                    :
                    "bg-[#1c1a1a] text-gray-400"
                  }

                `}

              >

                {item}

              </button>

            ))

          }


        </div>





        <div className="
          overflow-y-auto
          max-h-[55vh]
        ">

          {renderTab()}

        </div>



      </div>


    </div>

  );

}