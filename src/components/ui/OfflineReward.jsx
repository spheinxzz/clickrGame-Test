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



  const hours = Math.floor(
    offlineReward.seconds / 3600
  );


  const minutes = Math.floor(
    (offlineReward.seconds % 3600) / 60
  );



  return (

    <div
      style={{
        position:"fixed",
        inset:0,
        background:"rgba(0,0,0,0.75)",
        backdropFilter:"blur(8px)",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        zIndex:9999,
        animation:"fadeIn .25s ease"
      }}
    >

      <div
        style={{
          width:"380px",
          background:
            "linear-gradient(145deg,#111827,#1f2937)",
          borderRadius:"24px",
          padding:"32px",
          color:"white",
          textAlign:"center",
          boxShadow:
            "0 20px 60px rgba(0,0,0,.6)",
          border:
            "1px solid rgba(255,255,255,.1)"
        }}
      >

        <div
          style={{
            fontSize:"55px",
            marginBottom:"10px"
          }}
        >
          ⚡
        </div>


        <h1
          style={{
            margin:0,
            fontSize:"28px"
          }}
        >
          Welcome Back!
        </h1>


        <p
          style={{
            opacity:.75,
            marginTop:"10px"
          }}
        >
          Your Byte Network kept running
          while you were away.
        </p>



        <div
          style={{
            marginTop:"25px",
            padding:"20px",
            borderRadius:"18px",
            background:
              "rgba(255,255,255,.08)"
          }}
        >

          <div
            style={{
              fontSize:"14px",
              opacity:.7
            }}
          >
            Offline Earnings
          </div>


          <div
            style={{
              fontSize:"38px",
              fontWeight:"bold",
              color:"#4ade80"
            }}
          >
            +{Math.floor(
              offlineReward.amount
            )}
          </div>


          <div
            style={{
              fontSize:"14px",
              opacity:.7
            }}
          >
            Money
          </div>

        </div>



        <p
          style={{
            marginTop:"20px",
            opacity:.8
          }}
        >

          Production ran for{" "}

          {
            hours > 0
            ?
            `${hours}h ${minutes}m`
            :
            `${minutes}m`
          }

        </p>



        <button

          onClick={claimOfflineReward}

          style={{
            width:"100%",
            marginTop:"20px",
            padding:"15px",
            borderRadius:"14px",
            border:"none",
            cursor:"pointer",
            fontSize:"17px",
            fontWeight:"bold",
            background:
              "linear-gradient(90deg,#22c55e,#16a34a)",
            color:"white",
            transition:"transform .2s"
          }}

        >

          Collect Earnings

        </button>


      </div>


    </div>

  );

}