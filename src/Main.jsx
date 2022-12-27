import React from 'react'
import Navigation from './components/Navigation';
import Clock from './components/Clock';
import Player from './components/Player';
import AudioVisualizer from './components/AudioVisualizer';

const Main = () => {
    const songList = ['Guitar, Loneliness and Blue Planet','That band', 'If I could be a constellation', 'Never forget',
    'Secret base','Rockn Roll, Morning Light Falls on You', 'What is wrong with', "I can't sing a love song",
    'Karakara', 'The Little Sea', 'Seisyun Complex', 'Distortion!!', 'Flashbacker','Hitoribocchi Tokyo'];
    const [songIndex, setIndex] = React.useState(Math.floor(songList.length * Math.random()));//Math.floor(songList.length * Math.random())
    const [player, setPlayer] = React.useState('true');
    const [clock, setClock] = React.useState('true');
    const [audioVis, setAudioVis] = React.useState('true');
    const Colors = {
    "clockTextShadow": ['3px 3px rgba(237, 112 ,154 ,.7)', '3px 3px rgba(26,124,195,.7)', 
      '3px 3px rgba(232,26,91,.7)','3px 3px rgba(247,180,27,.7)', '3px 3px rgba(0,0,0,.7)', '3px 3px rgba(237, 112 ,154 ,.7)', 
      '3px 3px rgba(247,180,27,.7)', '3px 3px rgba(0,0,0,.7)','3px 3px rgba(26,124,195,.7)', 
      '3px 3px rgba(0,0,0,.7)','3px 3px rgba(21, 6 ,37 ,.7)'
      ,'3px 3px rgba(232,26,91,.7)','3px 3px rgba(0,0,0,.7)','3px 3px rgba(21, 6 ,37 ,.7)'],
    "backgroundColor" : ['#4C2633', '#0C3958', '#580D24','#59420E', '#40292F', 
     '#4C2633','#59420E', '#40292F','#0C3958', '#40292F','#4D2E2C', '#580D22','#40292F', '#4D2E2C'],// 91C3BA
    "lineColor": ['rgba(237, 112 ,154 ,.9)', 'rgba(26,124,195,.9)', 
    'rgba(232,26,91,.9)','rgba(247,180,27,.9)', 'rgba(255,255,255 ,.9)','rgba(237, 112 ,154 ,.9)',
    'rgba(247,180,27,.9)' , 'rgba(255,255,255 ,.9)','rgba(26,124,195,.9)',
    'rgba(255,255,255 ,.9)','rgba(21,6,37,.9)',
    'rgba(232,26,91,.9)' , 'rgba(255,255,255 ,.9)', 'rgba(21,6,37,.9)'],
    "playerTextShadow": [ '2px 2px rgba(237, 112 ,154 ,.7)','2px 2px rgba(26,124,195,.7)', 
    '2px 2px rgba(232,26, 91,.7)','2px 2px rgba(247,180, 27,.7)','2px 2px rgba(0,0,0,.7)','2px 2px rgba(237, 112 ,154 ,.7)',
    '2px 2px rgba(247,180,27,.7)','2px 2px rgba(0,0,0,.7)','2px 2px rgba(26,124,195,.7)', 
    '2px 2px rgba(0,0,0,.7)','2px 2px rgba(21,6,37,.7)', 
    '2px 2px rgba(232,26,91,.7)','2px 2px rgba(0,0,0,.7)','2px 2px rgba(21,6,37,.7)' ]
  };

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

  const changeSong = (e) =>{
    if(e!==0){ 
      setIndex(songIndex + e);
    }else{
      setIndex(0);
    }
  }

  React.useEffect(()=>{
    setAudioVis(localStorage.getItem('audioVis')!==null?localStorage.getItem('audioVis'):'true');
    setClock(localStorage.getItem('clock')!==null?localStorage.getItem('clock'):'true');
    setPlayer(localStorage.getItem('player')!==null?localStorage.getItem('player'):'true');
    console.log(songIndex);
  },[])

  return (
    <div className='Main' style={{backgroundColor: Colors.backgroundColor[songIndex]}}>
        {audioVis==='true'?<AudioVisualizer lineColor={Colors.lineColor[songIndex]}/>:null}
        <img className='mainImage' src={`./assets/icons/${songList[songIndex]}.jpg`} alt=""
          style={{boxShadow:'1px 1px 12px #150625'}} /> 
        <Navigation playerHandler={playerHandler} clockHandler={clockHandler} 
          changeSong={changeSong} visualizerHandler={visualizerHandler} songIndex={songIndex}/>
        {clock==='true'?<Clock textShadow={Colors.clockTextShadow[songIndex]}/>: null}
        {player==='true'?<Player playerTextShadow={Colors.playerTextShadow[songIndex]} songIndex={songIndex} 
          changeSong={changeSong} />:null}
    </div>
  )
}

export default Main