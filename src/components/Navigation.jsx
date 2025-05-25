import React from "react";
import Optionbar from "./Optionbar";

const Navigation = (props) => {
  const [activate, setActivate] = React.useState(false);
  let keyPress = new Audio();
  const onActivate = () => {
    setActivate(!activate);
    keyPress.src = "./assets/audios/notes.mp3";
    keyPress.volume = props.uiVolume;
    keyPress.play();
  };
  return (
    <div>
      {activate ? (
        <Optionbar
          uiVolume={props.uiVolume}
          playerHandler={props.playerHandler}
          clockHandler={props.clockHandler}
          playlistHandler={props.playlistHandler}
          visualizerHandler={props.visualizerHandler}
          changeSong={props.changeSong}
          songIndex={props.songIndex}
          lyricsHandler={props.lyricsHandler}
        />
      ) : null}
      <img
        src={`./assets/icons/darksetting.png`}
        width="5vh"
        height="5vh"
        className="navigation opacity-70"
        onClick={onActivate}
        alt=""
      />
    </div>
  );
};

export default Navigation;
