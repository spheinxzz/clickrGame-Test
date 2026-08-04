export const REBIRTH_REQUIREMENTS = {


  first: {

    money:
      1000000,

    reward:

      1

  }


};







export function canRebirth(game){


  return (

    game.money >=
    REBIRTH_REQUIREMENTS.first.money

  );


}







export function calculateRebirthReward(
  game
){


  return Math.floor(

    Math.sqrt(
      game.totalMoneyEarned / 1000000
    )

  );



}







export function performRebirth(game){



  if(!canRebirth(game)){


    return game;


  }






  const reward =
    calculateRebirthReward(game);







  return {


    ...game,



    money:0,



    clickPower:1,



    production:{

      baseCPS:0

    },



    upgrades:{


      reinforced_cursor:0,

      click_calibration:0,

      rapid_clicking:0,

      overclocked_clicks:0,

      double_tap:0,

      quantum_clicking:0


    },





    rebirths:{


      count:
        (game.rebirths?.count || 0)
        +
        1,



      moneyBonus:

        (game.rebirths?.moneyBonus || 1)
        +
        (reward * 0.1),



      gemBonus:

        (game.rebirths?.gemBonus || 1)
        +
        (reward * 0.05)


    }



  };


}