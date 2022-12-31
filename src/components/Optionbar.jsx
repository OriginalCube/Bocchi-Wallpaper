import React from 'react';
import SongData from './SongData.json';

const Optionbar = (props) => {
  let keypress = new Audio();
  
  const skipButton = () => {
   if (props.songIndex < SongData.length - 1) {
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
    }else if(e==='playlist'){
      props.playlistHandler();
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
      <img src={`./assets/icons/playlist.png`} onClick={()=>onPress('playlist')} style={{top:'29%'}} alt='' className='optionIcon opacity-80' />
    </div>
  ) 
}

export default Optionbar