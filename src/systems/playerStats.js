import {
  getClickPower,
  getMoneyMultiplier,
  getCriticalChance,
  getCriticalMultiplier,
  calculateCPS
} from "./production";





export function calculatePlayerStats(game){


  return {


    clickPower:
      getClickPower(game),



    moneyMultiplier:
      getMoneyMultiplier(game),



    criticalChance:
      getCriticalChance(game),



    criticalMultiplier:
      getCriticalMultiplier(game),



    cps:
      calculateCPS(game),



    totalClicks:
      game.totalClicks || 0,



    totalMoneyEarned:
      game.totalMoneyEarned || 0,



    level:
      game.level || 1,


    money:
      game.money || 0,


    gems:
      game.gems || 0


  };


}