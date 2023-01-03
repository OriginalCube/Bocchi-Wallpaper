import React from 'react'
import Navigation from './components/Navigation';
import Clock from './components/Clock';
import Player from './components/Player';
import AudioVisualizer from './components/AudioVisualizer';
import SongData from './components/SongData.json';
import Playlist from './components/Playlist';

const Main = () => {
  const [songIndex, setIndex] = React.useState(0);
  const [player, setPlayer] = React.useState('true');
  const [clock, setClock] = React.useState('true');
  const [audioVis, setAudioVis] = React.useState('true');
  const [mode, setMode] = React.useState(0); 
  const [playlist, setPlaylist] = React.useState('true');
  const [remove, setRemove] = React.useState();
  const [key, setKey] = React.useState(0); //Foreign key for other modes
  const [songList, setSongList] = React.useState([[],[]]);
  const playerHandler = () =>{//Changes and sets the music player
    setPlayer(player==='true'?'false':'true');
    localStorage.setItem('player', player==='true'?'false':'true');
  }

  const clockHandler = () =>{//Changes and sets the clock
    setClock(clock==='true'?'false':'true')
    localStorage.setItem('clock', clock==='true'?'false':'true');
  }

  const visualizerHandler = () =>{//Changes and sets the visualizer
    setAudioVis(audioVis==='true'?'false':'true');
    localStorage.setItem('audioVis', audioVis==='true'?'false':'true');
  }

  const playlistHandler = () =>{//Changes and sets the playlist 
    setPlaylist(playlist==='true'?'false':'true');
    localStorage.setItem('playlistH', playlist==='true'?'false':'true');
  }

  const changeSong = (e) =>{//Changes the song using conditions ~from player 
    if(mode===0){//Default Playlist
      if(e===true){//Skip Button
        if(songIndex+1 < SongData.length){
          setIndex(songIndex+1);
        }else{
          setIndex(0);
        }
      }else if(e===false){//Prev Button
        if(songIndex-1 < 0){
          setIndex(SongData.length-1);
        }else{
          setIndex(songIndex-1);
        }
      }
    }else if((mode===1 || mode===2) && (Array.isArray(songList[mode-1]) && songList[mode-1].length)){//Check if array is empty
      if(e===true){
        if(key+1 < songList[mode-1].length){
          setIndex(songList[mode-1][key+1]-1);
          setKey(key+1);
        }else{
          setIndex(songList[mode-1][0]-1);
          setKey(0);
        }
      }else if(e===false){
        if(key-1 < 0){
          setIndex(songList[mode-1][(songList[mode-1].length-1)-1]);
          setKey(songList[mode-1].length-1);
        }else{
          setIndex(songList[mode-1][key-1]-1);
          setKey(key-1);
        }
      }
    }
  }

  const addSong = (x,y) =>{
    if(songList[y-1].includes(x)){
      console.log('Dups')
    }else{
     let tempArray = songList;
      tempArray[y-1].push(x);
      setSongList(tempArray);
      localStorage.setItem('playlistBocchi',JSON.stringify(tempArray));
    }
  }

  const removeSong = () =>{
    songList[mode-1].splice(key, 1); 
    setSongList([...songList]);
    localStorage.setItem('playlistBocchi',JSON.stringify(songList));
  }
  
  const changeId = (e) =>{//Change the song through playlist
    setIndex(e);
  }

  const changeMode = (e) =>{//Changes mode ~the playlist of what the user is using
    setMode(e);
    localStorage.setItem('mode', e);
  }

  React.useEffect(()=>{
    if(mode===0){
      setIndex(Math.floor(SongData.length * Math.random()))
    }else{
      if(Array.isArray(songList[mode-1]) && songList[mode-1].length){
        setIndex(songList[mode-1][Math.floor(songList[mode-1].length * Math.random())]-1)
       }else{
       }
    }
  },[mode]);

  React.useEffect(()=>{//Sets key anchor 
    if(mode===1||mode===2){
        setKey(songList[mode-1].findIndex((x)=>(
          x === songIndex+1
        )))
      }
  },[songIndex])

  React.useEffect(()=>{//Loads and sets data onstart 
    setAudioVis(localStorage.getItem('audioVis')!==null?localStorage.getItem('audioVis'):'true');
    setClock(localStorage.getItem('clock')!==null?localStorage.getItem('clock'):'true');
    setPlayer(localStorage.getItem('player')!==null?localStorage.getItem('player'):'true');
    setPlaylist(localStorage.getItem('playlistH')!==null?localStorage.getItem('playlistH'):'true');
    setMode(localStorage.getItem('mode')!==null?parseInt(localStorage.getItem('mode')):0);
    setSongList(localStorage.getItem('playlistBocchi')!==null?JSON.parse(localStorage.getItem('playlistBocchi')):[[],[]])
  },[])

  return (
    <div className='Main' style={{backgroundColor: SongData[songIndex].backgroundColor}}>
        {audioVis==='true'?<AudioVisualizer lineColor={SongData[songIndex].lineColor}/>:null}
        <img className='mainImage' src={`./assets/icons/${SongData[songIndex].name}.jpg`} alt=""
          style={{boxShadow:'1px 1px 12px #150625'}} /> 
        <Navigation playerHandler={playerHandler} clockHandler={clockHandler} playlistHandler={playlistHandler}
          changeSong={changeSong} visualizerHandler={visualizerHandler} songIndex={songIndex}/>
        {playlist==='true'?<Playlist songIndex={songIndex} changeId={changeId} songList={songList}
        changeMode={changeMode} mode={mode} addSong={addSong} removeSong={removeSong}/>:null}
        {clock==='true'?<Clock textShadow={SongData[songIndex].clockTextShadow}/>: null}
        {player==='true'?<Player playerTextShadow={SongData[songIndex].playerTextShadow} songIndex={songIndex} 
          changeSong={changeSong} />:null}
    </div>
  )
}

export default Main