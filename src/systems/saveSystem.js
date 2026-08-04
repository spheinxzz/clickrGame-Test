const SAVE_KEY =
  "clickerGameSave";


const SAVE_VERSION = 2;





function migrateSave(save){


  return {


    saveVersion:SAVE_VERSION,


    money:
      save.money ?? 0,


    gems:
      save.gems ?? 0,


    level:
      save.level ?? 1,


    totalClicks:
      save.totalClicks ?? 0,


    totalMoneyEarned:
      save.totalMoneyEarned ?? 0,


    upgrades:
      save.upgrades ?? {},


    passiveUpgrades:
      save.passiveUpgrades ?? {},


    achievements:
      save.achievements ?? {},


    claimedAchievements:
      save.claimedAchievements ?? {},


    settings:{


      ...save.settings,


      audio:{


        masterVolume:
          save.settings?.audio?.masterVolume ?? 100,


        musicVolume:
          save.settings?.audio?.musicVolume ?? 80,


        musicEnabled:
          save.settings?.audio?.musicEnabled ?? false,


        clickSounds:
          save.settings?.audio?.clickSounds ?? true


      },


      hud:{


        hudScale:
          save.settings?.hud?.hudScale ?? 100,


        showMoney:
          save.settings?.hud?.showMoney ?? true,


        showGems:
          save.settings?.hud?.showGems ?? true,


        showLevel:
          save.settings?.hud?.showLevel ?? true


      },


      effects:{


        particles:
          save.settings?.effects?.particles ?? true,


        floatingText:
          save.settings?.effects?.floatingText ?? true,


        clickAnimation:
          save.settings?.effects?.clickAnimation ?? true,


        glowEffects:
          save.settings?.effects?.glowEffects ?? true


      }


    }


  };


}








export function saveGame(game){


  try {


    const saveData = {


      ...game,


      saveVersion:SAVE_VERSION,


      lastSave:
        Date.now()


    };



    localStorage.setItem(

      SAVE_KEY,

      JSON.stringify(saveData)

    );



    return true;


  }


  catch(error){


    console.error(

      "Save failed:",

      error

    );


    return false;


  }


}








export function loadGame(){


  try {


    const data =
      localStorage.getItem(
        SAVE_KEY
      );



    if(!data){

      return null;

    }



    const parsed =
      JSON.parse(data);



    if(
      typeof parsed !== "object" ||
      parsed === null
    ){

      return null;

    }



    return migrateSave(parsed);


  }


  catch(error){


    console.error(

      "Load failed:",

      error

    );



    return null;


  }


}








export function deleteSave(){


  try {


    localStorage.removeItem(

      SAVE_KEY

    );


    return true;


  }


  catch(error){


    console.error(

      "Delete save failed:",

      error

    );


    return false;


  }


}








export function hasSave(){


  return Boolean(

    localStorage.getItem(

      SAVE_KEY

    )

  );


}