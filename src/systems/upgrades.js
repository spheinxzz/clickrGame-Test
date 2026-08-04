import {
  upgrades
} from "../data/upgrades";


import {
  passiveUpgrades
} from "../data/passiveUpgrades";








function getSafeLevel(level){

  const value =
    Number(level);


  return Number.isFinite(value)
    ? value
    : 0;

}








function calculateCost(
  upgrade,
  level
){


  level =
    getSafeLevel(level);





  const cost =
    upgrade.baseCost *
    Math.pow(
      1.15,
      level
    );





  if(
    !Number.isFinite(cost)
  ){

    return Infinity;

  }





  return Math.floor(cost);

}









export function getUpgradeCost(
  id,
  level
){


  const upgrade =
    upgrades.find(
      item =>
        item.id === id
    );



  if(!upgrade){

    return Infinity;

  }





  return calculateCost(
    upgrade,
    level
  );

}









export function getPassiveUpgradeCost(
  id,
  level
){


  const upgrade =
    passiveUpgrades.find(
      item =>
        item.id === id
    );



  if(!upgrade){

    return Infinity;

  }





  return calculateCost(
    upgrade,
    level
  );

}









export function buyUpgrade(
  game,
  id
){


  const level =
    getSafeLevel(
      game.upgrades?.[id]
    );



  const upgrade =
    upgrades.find(
      item =>
        item.id === id
    );



  if(!upgrade){

    return game;

  }





  const cost =
    getUpgradeCost(
      id,
      level
    );





  if(
    level >= upgrade.maxLevel ||
    game.money < cost
  ){

    return game;

  }





  return {


    ...game,


    money:
      game.money - cost,



    upgrades:{


      ...(game.upgrades || {}),


      [id]:
        level + 1


    }


  };

}









export function buyPassiveUpgrade(
  game,
  id
){


  const level =
    getSafeLevel(
      game.passiveUpgrades?.[id]
    );



  const upgrade =
    passiveUpgrades.find(
      item =>
        item.id === id
    );



  if(!upgrade){

    return game;

  }





  const cost =
    getPassiveUpgradeCost(
      id,
      level
    );





  if(
    level >= upgrade.maxLevel ||
    game.money < cost
  ){

    return game;

  }





  return {


    ...game,


    money:
      game.money - cost,



    passiveUpgrades:{


      ...(game.passiveUpgrades || {}),


      [id]:
        level + 1


    }


  };

}