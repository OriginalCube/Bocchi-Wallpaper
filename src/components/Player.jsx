import React from 'react'

const Player = (props) => {
    const songList = ['Guitar, Loneliness and Blue Planet','That band', 'If I could be a constellation', 'Never forget',
    'Secret base','Rockn Roll, Morning Light Falls on You', 'What is wrong with', "I can't sing a love song",
    'Karakara', 'The Little Sea', 'Seisyun Complex', 'Distortion!!', 'Flashbacker','Hitoribocchi Tokyo'];
    const [isPlaying, setPlaying] = React.useState(false);
    const [trackProgress, setProgress] = React.useState(0);
    const [volume, setVolume] = React.useState(localStorage.getItem('volume')!==null?+(localStorage.getItem('volume')):.2);

    const intervalRef = React.useRef();
    const audioRef = React.useRef(new Audio());
    const isReady = React.useRef(true);
    const { duration } = audioRef.current;

    const startTimer = () => {
     // Clear any timers already running
     clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        skipButton();
      } else {
      setProgress(audioRef.current.currentTime);
    }
    }, [1000]);
    };

    const onScrub = (value) => {
    // Clear any timers already running
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setProgress(audioRef.current.currentTime);
    };

    const onScrubEnd = () => {
     // If not already playing, start
      setPlaying(false);
      startTimer();
     };

    const prevButton = () => {
      if(props.songIndex > 0) {
        props.changeSong(-1);
      }

      if(props.songIndex === 0){
        props.changeSong(songList.length-1);
      }
    }

    const skipButton = () => {
      if (props.songIndex < songList.length - 1) {
       props.changeSong(1);
      }else {
        props.changeSong(0);
      }
  };

  const playButton = () =>{
    setPlaying(false);
    audioRef.current.play();
  }

  const pauseButton = () =>{
    setPlaying(true);
    audioRef.current.pause();
  }

  const lessVolume = () =>{
    if(volume-.1>0){
      setVolume(Math.round((volume-.1)*10)/10);
    }else{
      setVolume(0);
    }
  }

  const addVolume = () =>{
    if(volume>=0 && volume+.1<=1){
      setVolume(volume+.1);
    }
  }

  React.useEffect(()=>{
    audioRef.current.volume = volume;
    localStorage.setItem('volume', volume);
  },[volume])

  React.useEffect(() => {
    if (isPlaying) {
      audioRef.current.pause();
      startTimer();
    }else{
      audioRef.current.play();
    }
  }, [isPlaying]);

  React.useEffect(()=>{
    audioRef.current.pause();
    audioRef.current = new Audio(`./assets/songs/${songList[props.songIndex]}.mp3`);
    audioRef.current.volume = volume;
    if (isReady.current) {
      audioRef.current.play();
      setPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }    
    setPlaying(audioRef.isPlaying);
  },[props.songIndex])

  React.useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className='player'>
        <p className='text-xl' style={{textShadow:`${props.playerTextShadow}`}}>{`${songList[props.songIndex]}`}</p>
        <div><input
            type='range'
            step='1'
            min='0'
            value={trackProgress}
            max={duration ? duration : `${duration}`}
            className="audioProgress"
            onChange={(e) => onScrub(e.target.value)}
            onMouseUp={onScrubEnd}
            onKeyUp={onScrubEnd}
          /></div>
        <img className='audioIcon' onClick={lessVolume} style={{marginLeft:'0%'}} alt='' src='./assets/icons/volumeMinus.png' />
        <img className='audioIcon' onClick={prevButton} alt='' src='./assets/icons/backward.png' />
        {isPlaying?<img className='audioIcon' onClick={playButton} alt='' src='./assets/icons/play.png' />
        :<img className='audioIcon' onClick={pauseButton} alt='' src='./assets/icons/pause.png' />}
        <img className='audioIcon' onClick={skipButton} alt='' src='./assets/icons/forward.png' />
        <img className='audioIcon' onClick={addVolume} alt='' src='./assets/icons/volumePlus.png' />
    </div>
  )
}

export default Player