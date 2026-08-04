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
      }

    }

  };

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



  const gameRef =
    useRef(game);



  const cloudTimer =
    useRef(null);





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
        await loadCloudGame(user.id);



      if(cloud){

        setGame(
          mergeGame(cloud)
        );

      }


      setCloudLoaded(true);

    }



    setCloudLoaded(false);

    loadCloud();


  },[user]);









  async function save(){

    saveGame(gameRef.current);



    if(user){

      setSaving(true);


      await saveCloudGame(
        user.id,
        gameRef.current
      );


      setTimeout(()=>{

        setSaving(false);

      },500);

    }

  }







  function requestCloudSave(){

    saveGame(gameRef.current);



    clearTimeout(
      cloudTimer.current
    );



    cloudTimer.current = setTimeout(()=>{

      save();

    },2000);


  }








  function updateGame(action){


    setGame(previous=>{


      const updated =
        action(previous);



      requestCloudSave();



      const result =
        checkAchievements(updated);



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
        calculateClickValue(previous);



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
        calculateCPS(previous);



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

        save,

        30000

      );


    return ()=>clearInterval(backup);


  },[user]);









  useEffect(()=>{


    const timer =
      setInterval(

        generateMoney,

        1000

      );


    return ()=>clearInterval(timer);


  },[]);









  useEffect(()=>{


    function close(){


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
      close
    );



    return ()=>{


      window.removeEventListener(
        "beforeunload",
        close
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

        cps:
          calculateCPS(game),

        stats:
          calculatePlayerStats(game),

        notifications,

        addNotification:

          (title,description,type="info")=>{

            setNotifications(old=>[

              ...old,

              {
                id:Date.now(),
                title,
                description,
                type
              }

            ]);

          },

        saving

      }}

    >

      {children}

    </GameContext.Provider>

  );


}