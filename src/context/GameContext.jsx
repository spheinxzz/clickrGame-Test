import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef
} from "react";


import {
  AuthContext
} from "./AuthContext";


import {
  checkAchievements
} from "../systems/achievements";


import {
  calculateCPS,
  calculateClickValue
} from "../systems/production";


import {
  saveGame,
  loadGame
} from "../systems/saveSystem";


import {
  saveCloudGame,
  loadCloudGame
} from "../systems/cloudSave";


import {
  calculatePlayerStats
} from "../systems/playerStats";


import {
  playMusic,
  stopMusic,
  setMusicVolume
} from "../systems/music";


import {
  musicTracks
} from "../data/music";



export const GameContext =
  createContext(null);





const defaultGame = {

  money:0,

  gems:0,

  level:1,


  totalClicks:0,

  totalMoneyEarned:0,


  upgrades:{},

  passiveUpgrades:{},


  achievements:{},

  claimedAchievements:{},


  lastActive:

    Date.now(),



  settings:{

    audio:{

      masterVolume:100,

      musicVolume:80,

      musicEnabled:false,

      clickSounds:true

    },


    hud:{

      hudScale:100,

      showMoney:true,

      showGems:true,

      showLevel:true

    },


    effects:{

      particles:true,

      floatingText:true,

      clickAnimation:true,

      glowEffects:true

    },

    offline:{

  enabled:true,

  maxHours:8,

  multiplier:1

    }

  }

};





function mergeGame(saved){

  return {

    ...defaultGame,

    ...saved,


    settings:{

      ...defaultGame.settings,

      ...saved.settings,


      audio:{

        ...defaultGame.settings.audio,

        ...saved.settings?.audio

      },


      hud:{

        ...defaultGame.settings.hud,

        ...saved.settings?.hud

      },


      effects:{

        ...defaultGame.settings.effects,

        ...saved.settings?.effects

      },

      offline:{

        ...defaultGame.settings.offline,

        ...saved.settings?.offline

      }

    }

  };

}

function claimOfflineReward(){


  if(!offlineReward){

    return;

  }



  setGame(previous=>({


    ...previous,


    money:

      previous.money +

      offlineReward.amount,



    totalMoneyEarned:

      previous.totalMoneyEarned +

      offlineReward.amount


  }));



  setOfflineReward(null);



  requestCloudSave();


}

export default function GameProvider({

  children

}){


  const {
    user
  } = useContext(AuthContext);



  const [game,setGame] =

    useState(()=>{


      const saved =

        loadGame();



      return saved

        ?

        mergeGame(saved)

        :

        defaultGame;


    });




  const [cloudLoaded,setCloudLoaded] =

    useState(false);



  const [notifications,setNotifications] =

    useState([]);



  const [saving,setSaving] =

    useState(false);

  const [offlineReward,setOfflineReward] =

    useState(null);




  const gameRef =

    useRef(game);



  const cloudSaveTimer =

    useRef(null);



  const lastSaveRef =

    useRef(Date.now());




  useEffect(()=>{


    gameRef.current = game;


  },[game]);





  useEffect(()=>{


    async function loadCloud(){


      if(!user){


        setCloudLoaded(true);

        return;


      }



      const cloud =

        await loadCloudGame(

          user.id

        );




      if(cloud){


        const merged =

          mergeGame(cloud);



        applyOfflineProgress(

          merged

        );



        setGame(

          merged

        );


      }



      setCloudLoaded(true);


    }




    setCloudLoaded(false);


    loadCloud();



  },[user]);

    function applyOfflineProgress(currentGame){


  const now = Date.now();



  const last =

    currentGame.lastActive ||

    now;



  const secondsAway =

    Math.floor(

      (now - last) / 1000

    );

    const maxSeconds =

  currentGame.settings.offline.maxHours *

  60 *

  60;



const cappedSeconds =

  Math.min(

    secondsAway,

    maxSeconds

  );

    const maxSeconds =
  currentGame.settings.offline.maxHours * 60 * 60;


const cappedSeconds =
  Math.min(
    secondsAway,
    maxSeconds
  );



  if(secondsAway <= 10){


    currentGame.lastActive = now;


    return currentGame;


  }



  const cps =

    calculateCPS(currentGame);



  const earned =

  cps *

  cappedSeconds *

  currentGame.settings.offline.multiplier;



  if(earned <= 0){


    currentGame.lastActive = now;


    return currentGame;


  }



  setOfflineReward({

    amount: earned,

    seconds: secondsAway

  });



  return {


    ...currentGame,


    lastActive: now


  };

    addNotification(

      "Welcome Back!",

      `You earned ${Math.floor(earned)} money while away.`,

      "offline"

    );



    return {


      ...currentGame,


      money:

        currentGame.money + earned,


      totalMoneyEarned:

        currentGame.totalMoneyEarned + earned,


      lastActive:

        now

    };


  }









  async function save(){


    const current =

      gameRef.current;



    current.lastActive =

      Date.now();



    saveGame(

      current

    );



    lastSaveRef.current =

      Date.now();




    if(user){


      setSaving(true);



      await saveCloudGame(

        user.id,

        current

      );



      setTimeout(()=>{


        setSaving(false);


      },500);


    }


  }









  function requestCloudSave(){


    saveGame(

      gameRef.current

    );



    clearTimeout(

      cloudSaveTimer.current

    );



    cloudSaveTimer.current =

      setTimeout(()=>{


        save();


      },1500);


  }

    function updateGame(action){


    setGame(previous=>{


      const updated =

        action(previous);



      updated.lastActive =

        Date.now();



      requestCloudSave();



      const result =

        checkAchievements(

          updated

        );



      return {


        ...updated,


        achievements:

          result.unlocked


      };


    });


  }

  function click(){


    updateGame(previous=>{


      const amount =

        calculateClickValue(

          previous

        );



      return {


        ...previous,


        money:

          previous.money + amount,



        totalClicks:

          previous.totalClicks + 1,



        totalMoneyEarned:

          previous.totalMoneyEarned + amount


      };


    });


  }

  function generateMoney(){


    updateGame(previous=>{


      const amount =

        calculateCPS(

          previous

        );



      if(amount <= 0){


        return previous;


      }



      return {


        ...previous,


        money:

          previous.money + amount,



        totalMoneyEarned:

          previous.totalMoneyEarned + amount


      };


    });


  }

    useEffect(()=>{


    const backup =

      setInterval(


        ()=>{


          save();


        },


        30000


      );



    return ()=>{


      clearInterval(

        backup

      );


    };


  },[user]);









  useEffect(()=>{


    const timer =

      setInterval(


        ()=>{


          generateMoney();


        },


        1000


      );



    return ()=>{


      clearInterval(

        timer

      );


    };


  },[]);









  useEffect(()=>{


    function closeGame(){


      gameRef.current.lastActive =

        Date.now();



      saveGame(

        gameRef.current

      );



      if(user){


        saveCloudGame(

          user.id,

          gameRef.current

        );


      }


    }





    window.addEventListener(

      "beforeunload",

      closeGame

    );





    return ()=>{


      window.removeEventListener(

        "beforeunload",

        closeGame

      );


    };


  },[user]);

    useEffect(()=>{


    const track =

      musicTracks?.[0];



    if(

      track &&

      game.settings.audio.musicEnabled

    ){


      playMusic(

        track,

        game.settings.audio.musicVolume / 100

      );


    }

    else{


      stopMusic();


    }



  },[

    game.settings.audio.musicEnabled

  ]);









  useEffect(()=>{


    setMusicVolume(

      game.settings.audio.musicVolume / 100

    );


  },[

    game.settings.audio.musicVolume

  ]);









  function updateSetting(

    category,

    setting,

    value

  ){



    setGame(previous=>({



      ...previous,



      settings:{



        ...previous.settings,



        [category]:{



          ...previous.settings[category],



          [setting]:value



        }



      }



    }));




    requestCloudSave();


  }

    return (

    <GameContext.Provider

      value={{

        game,


        setGame,


        updateGame,


        click,


        generateMoney,


        updateSetting,

        offlineReward,

        claimOfflineReward,



        cps:

          calculateCPS(game),



        stats:

          calculatePlayerStats(game),



        notifications,



        addNotification:

          (

            title,

            description,

            type="info"

          )=>{


            const id =

              Date.now();



            setNotifications(old=>[


              ...old,

              {

                id,

                title,

                description,

                type

              }


            ]);



            setTimeout(()=>{


              setNotifications(old=>

                old.filter(

                  item=>

                    item.id !== id

                )

              );


            },3000);



          },



          saving,

          offlineReward,

          claimOfflineReward

}}


    >


      {children}


    </GameContext.Provider>


  );


}