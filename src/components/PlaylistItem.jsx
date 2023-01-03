import React from 'react';
import SongData from './SongData.json';

const PlaylistItem = (props) => {
  let keypress = new Audio();
  const clickHandle = () =>{
    props.changeId(props.id-1);
    keypress.src = './assets/audios/keypress.mp3';
    keypress.volume = .5;
    keypress.play(); 
  }

  const addSong = () =>{
    props.addSong(props.songIndex, props.mode);
  }
  return (
    <div>
        <p onClick={clickHandle} style={{borderBottom: `3px solid ${SongData[props.songIndex].lineColor}`, 
        textShadow: SongData[props.songIndex].playerTextShadow,paddingTop: '2px'}}
        >{props.index}. {SongData[props.id-1].name}</p>
    </div>
  )
}

export default PlaylistItem