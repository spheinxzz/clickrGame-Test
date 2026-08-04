let audio = null;

let currentTrack = null;



export function playMusic(
  track,
  volume = 0.8
){

  if(!track){

    return;

  }



  if(
    currentTrack === track.id &&
    audio
  ){

    audio.play()
      .catch(()=>{});

    return;

  }



  stopMusic();



  audio =
    new Audio(track.src);



  audio.loop = true;



  audio.volume =
    Math.max(
      0,
      Math.min(
        volume,
        1
      )
    );



  currentTrack =
    track.id;



  audio.play()
    .catch(()=>{});

}




export function stopMusic(){


  if(audio){

    audio.pause();

    audio.src = "";

    audio.currentTime = 0;

  }



  audio = null;

  currentTrack = null;


}




export function setMusicVolume(
  volume
){


  if(!audio){

    return;

  }



  audio.volume =
    Math.max(
      0,
      Math.min(
        volume,
        1
      )
    );


}