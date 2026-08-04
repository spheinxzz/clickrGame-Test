import React, {
  useEffect
} from "react";


import GameLayout from "./GameLayout";

import setupAudio from "./systems/audioSetup";

import OfflineReward from "./components/ui/OfflineReward";




export default function App(){


  useEffect(()=>{


    setupAudio();


  },[]);




  return (

    <GameLayout />

  );

}