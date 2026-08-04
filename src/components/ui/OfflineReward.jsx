import React, {
  useContext
} from "react";


import {
  GameContext
} from "../../context/GameContext";


export default function OfflineReward(){

  const {
    offlineReward,
    claimOfflineReward
  } = useContext(GameContext);



  if(!offlineReward){

    return null;

  }



  const minutes = Math.floor(
    offlineReward.seconds / 60
  );


  const hours = Math.floor(
    minutes / 60
  );



  return (

    <div
      style={{
        position:"fixed",
        inset:0,
        background:"rgba(0,0,0,0.65)",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        zIndex:9999
      }}
    >

      <div
        style={{
          background:"#111827",
          padding:"30px",
          borderRadius:"16px",
          width:"320px",
          textAlign:"center",
          color:"white",
          boxShadow:"0 0 30px rgba(0,0,0,0.5)"
        }}
      >

        <h2>
          Welcome Back! 🚀
        </h2>


        <p>
          Your company kept producing while you were away.
        </p>


        <h3>
          +{Math.floor(offlineReward.amount)}
          {" "}
          Money
        </h3>


        <p>
          Time Away:
          {" "}

          {
            hours > 0
            ?
            `${hours}h ${minutes % 60}m`
            :
            `${minutes}m`
          }

        </p>


        <button

          onClick={claimOfflineReward}

          style={{
            marginTop:"15px",
            padding:"12px 25px",
            borderRadius:"10px",
            border:"none",
            cursor:"pointer",
            fontSize:"16px"
          }}

        >

          Claim Reward

        </button>


      </div>

    </div>

  );

}