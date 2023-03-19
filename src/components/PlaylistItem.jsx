import React from "react";
import SongData from "./SongData.json";

const PlaylistItem = (props) => {
  let keypress = new Audio();
  const clickHandle = () => {
    props.changeId(props.id - 1);
    keypress.src = "./assets/audios/keypress.mp3";
    keypress.volume = 0.5;
    keypress.play();
  };

  return (
    <div className="playlist-item">
      <p
        onClick={clickHandle}
        style={{
          opacity: ".85",
          borderBottom: `3px solid ${SongData[props.songIndex].lineColor}`,
          textShadow: SongData[props.songIndex].playerTextShadow,
        }}
      >
        {props.index}. {SongData[props.id - 1].name}
      </p>
    </div>
  );
};

export default PlaylistItem;
