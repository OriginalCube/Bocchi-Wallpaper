import React from "react";
import SongData from "./SongData.json";
import TitleDisplay from "../TitleDisplay";
import { toFilename } from "../helpers";

const Player = (props) => {
  let keypress = new Audio();
  const [isPlaying, setPlaying] = React.useState(false);
  const [trackProgress, setProgress] = React.useState(0);
  const [volume, setVolume] = React.useState(
    localStorage.getItem("volume") !== null
      ? +localStorage.getItem("volume")
      : 0.2,
  );
  const [duration, setDuration] = React.useState(0);

  const audioRef = React.useRef(new Audio());
  const isReady = React.useRef(true);

  const clickAudio = (e) => {
    keypress.src = "./assets/audios/keypress.mp3";
    keypress.volume = props.uiVolume;
    keypress.play();
  };

  const onScrub = (value) => {
    // Clear any timers already running
    audioRef.current.currentTime = value;
  };

  const onScrubEnd = () => {
    // If not already playing, start
    setPlaying(false);
  };

  const prevButton = () => {
    if (audioRef.current.currentTime >= 3) {
      audioRef.current.currentTime = 0;
    } else {
      //Just send False
      props.changeSong(false);
    }

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

  const toReadableTime = (seconds) => {
    if (isNaN(seconds)) return;
    const date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substring(15, 19);
  };

  React.useEffect(() => {
    audioRef.current.volume = volume;
    localStorage.setItem("volume", volume);
  }, [volume]);

  React.useEffect(() => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  }, [isPlaying]);

  React.useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(
      `./assets/songs/${toFilename(SongData[props.songIndex].name)}${
        SongData[props.songIndex]?.audioType ?? ".flac"
      }`,
    );
    audioRef.current.volume = volume;
    if (isReady.current) {
      audioRef.current.play();
      setPlaying(true);
      setProgress(audioRef.current.currentTime);
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
    setPlaying(audioRef.isPlaying);
  }, [props.songIndex]);

  React.useEffect(() => {
    return () => {
      audioRef.current.pause();
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

  audioRef.current.ontimeupdate = () => {
    setProgress(Math.floor(audioRef.current.currentTime));
  };

  audioRef.current.ondurationchange = () => {
    setDuration(audioRef.current.duration);
  };

  audioRef.current.onended = () => {
    skipButton(false);
  };

  let title;
  
  switch (props.titleDisplay)
  {
    case TitleDisplay.English:
      title = SongData[props.songIndex].name;
      break;
    case TitleDisplay.Original:
      title = SongData[props.songIndex].nameOriginal ?? SongData[props.songIndex].name;
      break;
    case TitleDisplay.Romanized:
      title = SongData[props.songIndex].nameRomanized ?? SongData[props.songIndex].name;
      break;
  }

  return (
    <div className="player ">
      <div className="h-full w-full flex-col">
        <div className="w-full" style={{ height: "30%" }}>
          <p
            className="playerText"
            style={{
              fontSize: `${titleSize * props.textSize}rem`,
            }}
          >{`${
            title
          }`}</p>
        </div>{" "}
        <div
          className="w-full flex items-center justify-center"
          style={{ height: "25%" }}
        >
          {toReadableTime(trackProgress)}
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
          {toReadableTime(duration)}
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
