import React from 'react'

const Optionbar = (props) => {
  const songList = ['Guitar, Loneliness and Blue Planet','That band', 'If I could be a constellation', 'Rockn Roll, Morning Light Falls on You',
    'Flashbacker','Hitoribocchi Tokyo','What is wrong with', "I can't sing a love song",
    'Karakara', 'The Little Sea', 'Seisyun Complex', 'Distortion!!', 'Secret base', 'Never forget'];
  let keypress = new Audio();
  
  const skipButton = () => {
   if (props.songIndex < songList.length - 1) {
     props.changeSong(1);
    }else {
      props.changeSong(0);
    }
    keypress.src = './assets/audios/keypress.mp3';
    keypress.volume = .5;
    keypress.play();
  };

  const onPress = (e) => {
    if(e==='background'){
    }else if(e==='clock'){
      props.clockHandler();
    }else if(e==='music'){
      props.playerHandler();
    }else if(e==='vis'){
      props.visualizerHandler();
    }
    keypress.src = './assets/audios/keypress.mp3';
    keypress.volume = .5;
    keypress.play();
  }

return (
    <div className='optionBar'>
      <img src={`./assets/icons/darkclock.png`} onClick={()=>onPress('clock')} alt='' className='optionIcon opacity-70' />
      <img src={`./assets/icons/darksound.png`} onClick={()=>onPress('vis')} style={{top:'7.5%'}} alt='' className='optionIcon' />
      <img src={`./assets/icons/darkbackground.png`} onClick={skipButton} style={{top:'15%'}} alt='' className='optionIcon opacity-90' />
      <img src={`./assets/icons/darkheadphones.png`} onClick={()=>onPress('music')} style={{top:'22.5%'}} alt='' className='optionIcon opacity-90' />
    </div>
  ) 
}

export default Optionbar