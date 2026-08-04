import {
  loadSound
} from "./audio";


const sounds = [

  {
    id:"click",
    src:"/assets/audio/click.mp3"
  },

  {
    id:"purchase",
    src:"/assets/audio/purchase.mp3"
  },

  {
    id:"achievement",
    src:"/assets/audio/achievement.mp3"
  }

];




export default function setupAudio(){


  sounds.forEach(sound=>{


    loadSound(
      sound.id,
      sound.src
    );


  });


}