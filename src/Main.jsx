import React from 'react'
import Navigation from './components/Navigation';
import Clock from './components/Clock';
import Player from './components/Player';
import AudioVisualizer from './components/AudioVisualizer';
import SongData from './components/SongData.json';
import Playlist from './components/Playlist';

const Main = () => {
  const [songIndex, setIndex] = React.useState(Math.floor(SongData.length * Math.random()));//Math.floor(songList.length * Math.random())
  const [player, setPlayer] = React.useState('true');
  const [clock, setClock] = React.useState('true');
  const [audioVis, setAudioVis] = React.useState('true');
  //const [mode, setMode] = React.useState('0'); 
  const [playlist, setPlaylist] = React.useState('true');
  //
  const playerHandler = () =>{
    setPlayer(player==='true'?'false':'true');
    localStorage.setItem('player', player==='true'?'false':'true');
  }

  const clockHandler = () =>{
    setClock(clock==='true'?'false':'true')
    localStorage.setItem('clock', clock==='true'?'false':'true');
  }

  const visualizerHandler = () =>{
    setAudioVis(audioVis==='true'?'false':'true');
    localStorage.setItem('audioVis', audioVis==='true'?'false':'true');
  }

  const playlistHandler = () =>{
    setPlaylist(playlist==='true'?'false':'true');
    localStorage.setItem('playlistH', playlist==='true'?'false':'true');
  }

  const changeSong = (e) =>{
    if(e!==0){ 
      setIndex(songIndex + e);
    }else{
      setIndex(0);
    }
  }
  
  const changeId = (e) =>{
    setIndex(e);
  }

  // const changeMode = (e) =>{
  //   setMode(e);
  // }

  React.useEffect(()=>{
    setAudioVis(localStorage.getItem('audioVis')!==null?localStorage.getItem('audioVis'):'true');
    setClock(localStorage.getItem('clock')!==null?localStorage.getItem('clock'):'true');
    setPlayer(localStorage.getItem('player')!==null?localStorage.getItem('player'):'true');
    setPlaylist(localStorage.getItem('playlistH')!==null?localStorage.getItem('playlistH'):'true');
  },[])

  return (
    <div className='Main' style={{backgroundColor: SongData[songIndex].backgroundColor}}>
        {audioVis==='true'?<AudioVisualizer lineColor={SongData[songIndex].lineColor}/>:null}
        <img className='mainImage' src={`./assets/icons/${SongData[songIndex].name}.jpg`} alt=""
          style={{boxShadow:'1px 1px 12px #150625'}} /> 
        <Navigation playerHandler={playerHandler} clockHandler={clockHandler} playlistHandler={playlistHandler}
          changeSong={changeSong} visualizerHandler={visualizerHandler} songIndex={songIndex}/>
        {playlist==='true'?<Playlist songIndex={songIndex} changeId={changeId}/>:null}
        {clock==='true'?<Clock textShadow={SongData[songIndex].clockTextShadow}/>: null}
        {player==='true'?<Player playerTextShadow={SongData[songIndex].playerTextShadow} songIndex={songIndex} 
          changeSong={changeSong} />:null}
    </div>
  )
}

export default Main