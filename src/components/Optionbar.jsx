import React from "react";

const Optionbar = (props) => {
  let keypress = new Audio();

  const skipButton = () => {
    props.changeSong(true);
    keypress.src = "./assets/audios/keypress.mp3";
    keypress.volume = props.uiVolume;
    keypress.play();
  };

  const onPress = (e) => {
    if (e === "background") {
    } else if (e === "clock") {
      props.clockHandler();
    } else if (e === "music") {
      props.playerHandler();
    } else if (e === "vis") {
      props.visualizerHandler();
    } else if (e === "playlist") {
      props.playlistHandler();
    } else if (e === "lyrics") {
      props.lyricsHandler();
    }
    keypress.src = "./assets/audios/keypress.mp3";
    keypress.volume = props.uiVolume;
    keypress.play();
  };

  return (
    <div className="optionBar">
      <img
        src={`./assets/icons/darkclock.png`}
        onClick={() => onPress("clock")}
        alt=""
        className="optionIcon opacity-70"
      />
      <img
        src={`./assets/icons/darksound.png`}
        onClick={() => onPress("vis")}
        style={{ top: "7.5%" }}
        alt=""
        className="optionIcon"
      />
      <img
        src={`./assets/icons/darkbackground.png`}
        onClick={skipButton}
        style={{ top: "15%" }}
        alt=""
        className="optionIcon opacity-90"
      />
      <img
        src={`./assets/icons/darkheadphones.png`}
        onClick={() => onPress("music")}
        style={{ top: "22.5%" }}
        alt=""
        className="optionIcon opacity-90"
      />
      <img
        src={`./assets/icons/playlist.png`}
        onClick={() => onPress("playlist")}
        style={{ top: "29%" }}
        alt=""
        className="optionIcon opacity-80"
      />
      <img
        src={`./assets/icons/lyricsIcon.png`}
        onClick={() => onPress("lyrics")}
        style={{ top: "35.5%" }}
        alt=""
        className="optionIcon opacity-80"
      />
    </div>
  );
};

export default Optionbar;
