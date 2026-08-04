import { achievements } from "../data/achievements";



export function checkAchievements(game){


  const unlocked = {
    ...(game.achievements || {})
  };


  const newlyUnlocked = [];



  achievements.forEach((achievement)=>{


    if(unlocked[achievement.id]){
      return;
    }



    let completed = false;



    const requirement =
      achievement.requirement;



    switch(requirement.type){



      case "clicks":

      case "totalClicks":

        completed =
          (game.totalClicks || 0)
          >=
          requirement.amount;

        break;




      case "totalMoney":

      case "totalMoneyEarned":

        completed =
          (game.totalMoneyEarned || 0)
          >=
          requirement.amount;

        break;




      case "upgrades":


        completed =
          Object.values(
            game.upgrades || {}
          )
          .reduce(
            (total, level)=>
              total + level,
            0
          )
          >=
          requirement.amount;


        break;




      case "maxUpgrade":


        completed =
          Object.values(
            game.upgrades || {}
          )
          .some(
            level =>
              level >= requirement.amount
          );


        break;




      case "gems":


        completed =
          (game.gems || 0)
          >=
          requirement.amount;


        break;




      default:


        console.warn(
          "Unknown achievement type:",
          requirement.type
        );


        break;


    }





    if(completed){


      unlocked[achievement.id] = true;


      newlyUnlocked.push(
        achievement
      );


    }


  });





  return {


    unlocked,


    newlyUnlocked


  };


}







export function applyAchievementRewards(
  game,
  unlockedAchievements
){


  let updated = {
    ...game
  };



  unlockedAchievements.forEach(
    achievement=>{


      const reward =
        achievement.reward;



      if(!reward)
        return;




      switch(reward.type){



        case "money":


          updated.money =
            (updated.money || 0)
            +
            reward.amount;


          updated.totalMoneyEarned =
            (updated.totalMoneyEarned || 0)
            +
            reward.amount;


          break;





        case "gems":


          updated.gems =
            (updated.gems || 0)
            +
            reward.amount;


          break;





        default:


          console.warn(
            "Unknown reward type:",
            reward.type
          );


          break;


      }


    }

  );



  return updated;


}