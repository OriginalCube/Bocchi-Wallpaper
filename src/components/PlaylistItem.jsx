import React from 'react'

const PlaylistItem = (props) => {
  let keypress = new Audio();
  
  const clickHandle = () =>{
    props.changeId(props.id-1);
    keypress.src = './assets/audios/keypress.mp3';
    keypress.volume = .5;
    keypress.play(); 
  }
  return (
    <div>
        <p style={{borderBottom: `3px solid ${props.border}`, 
        textShadow: props.textShadow,paddingTop: '2px'}}
        onClick={clickHandle}>{props.id}. {props.name}</p>
    </div>
  )
}

export default PlaylistItem