import React, {
  useEffect
} from "react";


import GameLayout from "./GameLayout";

import setupAudio from "./systems/audioSetup";




export default function App(){


  useEffect(()=>{


    setupAudio();


  },[]);




  return (

    <GameLayout />

  );

}