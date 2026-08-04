import {
  calculateCPS
} from "./production";





export function startGameLoop({

  game,

  setGame

}){


  const interval =

    setInterval(()=>{


      setGame(previous=>{


        const cps =
          calculateCPS(previous);



        if(
          cps <= 0
        ){

          return previous;

        }





        return {


          ...previous,


          money:
            previous.money + cps,



          totalMoneyEarned:

            previous.totalMoneyEarned + cps


        };


      });



    },1000);





  return ()=>{


    clearInterval(interval);


  };


}