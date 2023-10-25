import React from "react";
import SongData from "./SongData.json";

const Player = (props) => {
  let keypress = new Audio();
  const [isPlaying, setPlaying] = React.useState(false);
  const [trackProgress, setProgress] = React.useState(0);
  const [volume, setVolume] = React.useState(
    localStorage.getItem("volume") !== null
      ? +localStorage.getItem("volume")
      : 0.2
  );

  const intervalRef = React.useRef();
  const audioRef = React.useRef(new Audio());
  const isReady = React.useRef(true);
  const { duration } = audioRef.current;

  const clickAudio = (e) => {
    keypress.src = "./assets/audios/keypress.mp3";
    keypress.volume = props.uiVolume;
    keypress.play();
  };

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        if (props.replay === true) {
          audioRef.current.play();
        } else {
          skipButton(false);
        }
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
    //Just send False
    props.changeSong(false);
    clickAudio();
  };

  const skipButton = (e) => {
    //Just send True
    props.changeSong(true);
    if (e) {
      clickAudio();
    }
  };

  const playButton = () => {
    setPlaying(false);
    audioRef.current.play();
    clickAudio();
  };

  const pauseButton = () => {
    setPlaying(true);
    audioRef.current.pause();
    clickAudio();
  };

  const lessVolume = () => {
    if (volume - 0.1 > 0) {
      setVolume(Math.round((volume - 0.1) * 10) / 10);
    } else {
      setVolume(0);
    }
    clickAudio();
  };

  const addVolume = () => {
    if (volume >= 0 && volume + 0.1 <= 1) {
      setVolume(volume + 0.1);
    }
    clickAudio();
  };

  const onReplay = () => {
    props.reShuffle("replay", props.replay === true ? false : true);
    clickAudio();
  };

  const shuffle = () => {
    props.reShuffle("shuffle", props.shuffle === true ? false : true);
    clickAudio();
  };

  React.useEffect(() => {
    audioRef.current.volume = volume;
    localStorage.setItem("volume", volume);
  }, [volume]);

  React.useEffect(() => {
    if (isPlaying) {
      audioRef.current.pause();
      startTimer();
    } else {
      audioRef.current.play();
    }
  }, [isPlaying]);

  React.useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(
      `./assets/songs/${SongData[props.songIndex].name}.flac`
    );
    audioRef.current.volume = volume;
    if (isReady.current) {
      audioRef.current.play();
      setPlaying(true);
      setProgress(audioRef.current.currentTime);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
    setPlaying(audioRef.isPlaying);
  }, [props.songIndex]);

  React.useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  //July 2023 Resizing Update
  const [titleSize, setTitleSize] = React.useState(1.25);

  React.useEffect(() => {
    if (window.innerWidth <= 1370) {
      setTitleSize(0.875);
    } else {
      setTitleSize(1.25);
    }
  }, [window.innerWidth]);

  return (
    <div className="player ">
      <div className="h-full w-full flex-col">
        <div className="w-full" style={{ height: "30%" }}>
          <p
            className="playerText"
            style={{
              textShadow: `${props.playerTextShadow}`,
              fontSize: `${titleSize * props.textSize}rem`,
            }}
          >{`${SongData[props.songIndex].name}`}</p>
        </div>{" "}
        <div
          className="w-full flex items-center justify-center"
          style={{ height: "25%" }}
        >
          <input
            type="range"
            step="1"
            min="0"
            value={trackProgress}
            max={duration ? duration : `${duration}`}
            className="audio-progress"
            onChange={(e) => onScrub(e.target.value)}
            onClick={onScrubEnd}
            onKeyUp={onScrubEnd}
          />
        </div>
        <div
          className="flex items-center justify-evenly"
          style={{ height: "45%" }}
        >
          <img
            className="audioIcon"
            onClick={() => onReplay()}
            style={{ marginLeft: "0%", opacity: ".85" }}
            alt=""
            src={
              props.replay
                ? "./assets/icons/replayToggle.png"
                : "./assets/icons/replay.png"
            }
          />
          <img
            className="audioIcon"
            onClick={lessVolume}
            alt=""
            src="./assets/icons/volumeMinus.png"
          />
          <img
            className="audioIcon"
            onClick={prevButton}
            alt=""
            src="./assets/icons/backward.png"
          />
          {isPlaying ? (
            <img
              className="audioIcon"
              onClick={playButton}
              alt=""
              src="./assets/icons/play.png"
            />
          ) : (
            <img
              className="audioIcon"
              onClick={pauseButton}
              alt=""
              src="./assets/icons/pause.png"
            />
          )}
          <img
            className="audioIcon"
            onClick={() => skipButton(true)}
            alt=""
            src="./assets/icons/forward.png"
          />
          <img
            className="audioIcon"
            onClick={addVolume}
            alt=""
            src="./assets/icons/volumePlus.png"
          />
          <img
            className="audioIcon"
            onClick={() => shuffle()}
            style={{ opacity: ".85" }}
            alt=""
            src={
              props.shuffle
                ? "./assets/icons/shuffleToggle.png"
                : "./assets/icons/shuffle.png"
            }
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default Player;
