import { achievements } from "../data/achievements";


export default function checkAchievements(game) {


  const unlocked = {
    ...game.achievements
  };



  achievements.forEach((achievement) => {


    const existing =
      unlocked[achievement.id];



    // Already unlocked
    if (existing?.unlocked) {
      return;
    }



    let completed = false;



    switch (achievement.requirement.type) {


      case "clicks":

        completed =
          game.totalClicks >= achievement.requirement.amount;

        break;



      case "totalMoney":

        completed =
          game.totalMoneyEarned >= achievement.requirement.amount;

        break;



      case "upgrades":

        completed =
          Object.values(game.upgrades)
          .reduce(
            (total, level) =>
              total + level,
            0
          )
          >= achievement.requirement.amount;

        break;



      case "maxUpgrade":

        completed =
          Object.values(game.upgrades)
          .some(
            level =>
              level >= achievement.requirement.amount
          );

        break;



      case "gems":

        completed =
          game.gems >= achievement.requirement.amount;

        break;



      default:

        break;

    }




    if(completed) {


      unlocked[achievement.id] = {


        unlocked: true,


        claimed: false,


        reward:
          achievement.reward,


        name:
          achievement.name


      };


    }


  });



  return unlocked;


}