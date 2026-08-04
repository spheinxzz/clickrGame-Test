import {
  upgrades
} from "../data/upgrades";


import {
  passiveUpgrades
} from "../data/passiveUpgrades";








function getLevel(level){


  const value =

    Number(level);



  return Number.isFinite(value)

    ? value

    : 0;


}









function findUpgrade(id){


  return upgrades.find(

    item =>

      item.id === id

  );


}









function findPassiveUpgrade(id){


  return passiveUpgrades.find(

    item =>

      item.id === id

  );


}









export function getClickPower(game){


  let power = 1;



  Object.entries(

    game.upgrades || {}

  )

  .forEach(([id,level])=>{


    level =

      getLevel(level);



    const upgrade =

      findUpgrade(id);



    if(

      upgrade &&

      upgrade.type === "clickPower"

    ){


      power +=

        upgrade.amount *

        level;


    }


  });




  return Number.isFinite(power)

    ? power

    : 1;


}









export function getMoneyMultiplier(game){


  let multiplier = 1;



  Object.entries(

    game.upgrades || {}

  )

  .forEach(([id,level])=>{


    level =

      getLevel(level);



    const upgrade =

      findUpgrade(id);



    if(

      upgrade &&

      upgrade.type === "moneyMultiplier"

    ){


      multiplier +=

        upgrade.amount *

        level;


    }


  });




  return Number.isFinite(multiplier)

    ? multiplier

    : 1;


}









export function getCriticalChance(game){


  let chance = 0;



  Object.entries(

    game.upgrades || {}

  )

  .forEach(([id,level])=>{


    level =

      getLevel(level);



    const upgrade =

      findUpgrade(id);



    if(

      upgrade &&

      upgrade.type === "criticalChance"

    ){


      chance +=

        upgrade.amount *

        level;


    }


  });




  return Math.min(

    Math.max(chance,0),

    1

  );


}









export function getCriticalMultiplier(game){


  let multiplier = 2;



  Object.entries(

    game.upgrades || {}

  )

  .forEach(([id,level])=>{


    level =

      getLevel(level);



    const upgrade =

      findUpgrade(id);



    if(

      upgrade &&

      upgrade.type === "criticalMultiplier"

    ){


      multiplier +=

        upgrade.amount *

        level;


    }


  });




  return Number.isFinite(multiplier)

    ? multiplier

    : 2;


}









export function calculateClickValue(game){


  let amount =

    getClickPower(game);



  amount *=

    getMoneyMultiplier(game);




  if(

    Math.random()

    <

    getCriticalChance(game)

  ){


    amount *=

      getCriticalMultiplier(game);


  }




  if(

    !Number.isFinite(amount)

  ){


    return 0;


  }



  return Math.floor(amount);


}









export function calculateCPS(game){


  let cps = 0;



  let multiplier = 1;



  Object.entries(

    game.passiveUpgrades || {}

  )

  .forEach(([id,level])=>{


    level =

      getLevel(level);



    const upgrade =

      findPassiveUpgrade(id);



    if(!upgrade){

      return;

    }



    if(

      upgrade.type === "cps"

    ){


      cps +=

        upgrade.amount *

        level;


    }



    if(

      upgrade.type === "cpsMultiplier"

    ){


      multiplier +=

        upgrade.amount *

        level;


    }


  });





  const result =

    cps *

    multiplier;





  return Number.isFinite(result)

    ? result

    : 0;


}