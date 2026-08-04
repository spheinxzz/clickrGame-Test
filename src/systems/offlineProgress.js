import {
  calculateCPS
} from "./production";







const MAX_OFFLINE_TIME =
  60 * 60 * 8;









export function calculateOfflineProgress(
  game,
  lastSave
){


  if(
    !lastSave
  ){

    return {

      money:0,

      seconds:0

    };

  }





  const savedTime =
    Number(lastSave);





  if(
    !Number.isFinite(savedTime)
  ){

    return {

      money:0,

      seconds:0

    };

  }





  const now =
    Date.now();





  let seconds =
    Math.floor(
      (now - savedTime) / 1000
    );





  if(seconds < 0){

    seconds = 0;

  }





  if(
    seconds > MAX_OFFLINE_TIME
  ){

    seconds =
      MAX_OFFLINE_TIME;

  }





  const cps =
    calculateCPS(game);





  const money =
    Math.floor(
      cps * seconds
    );





  return {


    money:
      Number.isFinite(money)
        ? money
        : 0,



    seconds


  };

}









export function applyOfflineProgress(
  game,
  progress
){


  if(
    !progress ||
    progress.money <= 0
  ){

    return game;

  }





  return {


    ...game,


    money:
      game.money + progress.money,



    totalMoneyEarned:
      game.totalMoneyEarned +
      progress.money



  };

}