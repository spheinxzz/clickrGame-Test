export function getMoneyMultiplier(game){


  let multiplier = 1;




  if(game.moneyMultiplier){


    multiplier *= game.moneyMultiplier;


  }





  if(game.rebirths?.moneyBonus){


    multiplier *=
      game.rebirths.moneyBonus;


  }





  if(game.events?.moneyBoost){


    multiplier *=
      game.events.moneyBoost;


  }





  return multiplier;


}








export function getGemMultiplier(game){


  let multiplier = 1;




  if(game.gemMultiplier){


    multiplier *=
      game.gemMultiplier;


  }





  if(game.rebirths?.gemBonus){


    multiplier *=
      game.rebirths.gemBonus;


  }





  return multiplier;


}








export function calculateMoneyGain(
  game,
  amount
){



  return Math.floor(

    amount *
    getMoneyMultiplier(game)

  );


}








export function calculateGemGain(
  game,
  amount
){



  return Math.floor(

    amount *
    getGemMultiplier(game)

  );


}








export function applyIncome(
  game,
  amount
){


  const gained =
    calculateMoneyGain(
      game,
      amount
    );




  return {


    ...game,


    money:
      game.money + gained,



    totalMoneyEarned:
      game.totalMoneyEarned + gained


  };


}