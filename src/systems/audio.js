const sounds = {};





export function loadSound(
  name,
  src
){

  const audio =
    new Audio(src);


  audio.preload = "auto";


  sounds[name] = audio;

}








export function playSound(
  name,
  volume = 1
){

  const original =
    sounds[name];


  if(!original){

    return;

  }




  const sound =
    original.cloneNode();



  sound.volume =
    Math.max(
      0,
      Math.min(
        volume,
        1
      )
    );



  sound.play()
    .catch(()=>{});

}








export function setSoundVolume(
  name,
  volume
){

  const sound =
    sounds[name];


  if(!sound){

    return;

  }



  sound.volume =
    Math.max(
      0,
      Math.min(
        volume,
        1
      )
    );

}








export function stopSound(
  name
){

  const sound =
    sounds[name];


  if(!sound){

    return;

  }



  sound.pause();

  sound.currentTime = 0;

}








export function hasSound(
  name
){

  return !!sounds[name];

}