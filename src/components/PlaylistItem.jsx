import React from "react";
// song data is provided via props.songData
import TitleDisplay from "../TitleDisplay";

const PlaylistItem = (props) => {
  let keypress = new Audio();
  const clickHandle = () => {
    props.changeId(props.id - 1);
    keypress.src = "./assets/audios/keypress.mp3";
    keypress.volume = props.uiVolume;
    keypress.play();
  };

  let title;
  
  switch (props.titleDisplay) {
    default:
    case TitleDisplay.Chinese:
      title = props.songData[props.id - 1].name;
      break;
    case TitleDisplay.Original:
      title = props.songData[props.id - 1].nameOriginal ?? props.songData[props.id - 1].name;
      break;
    case TitleDisplay.Romanized:
      title = props.songData[props.id - 1].nameRomanized ?? props.songData[props.id - 1].name;
      break;
  }


  return (
    <div className="playlist-item">
      <p
        onClick={clickHandle}
        style={{
          opacity: ".85",
          borderBottom: `3px solid ${props.lineColor}`,
          backgroundColor:
            props.songIndex === props.id - 1
              ? props.lineColor
              : `transparent`,
          padding: `5px`,
          color:
            props.songIndex === props.id - 1
              ? props.backgroundColor
              : "white",
          fontWeight: props.songIndex === props.id - 1 ? "500" : "normal",
          borderRadius: props.songIndex === props.id - 1 ? "5px" : "0px",
        }}
      >
        {props.index}. {title}
      </p>
    </div>
  );
};

export default PlaylistItem;
