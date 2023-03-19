import React from "react";
import PlaylistItem from "./PlaylistItem";
import SongData from "./SongData.json";

const Playlist = (props) => {
  const [playlistPages, setPlaylistPages] = React.useState(1);
  let keypress = new Audio();

  const audioPlay = (e) => {
    keypress.src = `./assets/audios/${e === 0 ? "notes" : "keypress"}.mp3`;
    keypress.volume = 0.5;
    keypress.play(); //ADD AUDIO IN FOOTER PART!!!!
  };

  const onFooter = (x, y) => {
    if (x === true) {
      props.addSong(props.songIndex + 1, y);
    } else {
      props.removeSong();
    }
    audioPlay(0);
  };

  const onPages = (e) => {
    if (props.mode === 0) {
      if (playlistPages + e < SongData.length / 5 && playlistPages + e > 0) {
        setPlaylistPages(playlistPages + 1);
      } else {
        setPlaylistPages(0);
      }
    } else if (props.mode === 1 || props.mode === 2) {
      if (
        playlistPages + e < props.songList[props.mode - 1].length / 5 &&
        playlistPages + e > 0
      ) {
        setPlaylistPages(playlistPages + 1);
      } else {
        setPlaylistPages(0);
      }
    }
    audioPlay(1);
  };

  const onChangeMode = (e) => {
    props.changeMode(e);
    audioPlay(0);
  };

  React.useEffect(() => {
    console.log(playlistPages);
  }, [playlistPages]);

  React.useEffect(() => {
    setPlaylistPages(0);
  }, [props.mode]);
  return (
    <div
      className="playlist"
      style={{
        border: `4.5px solid ${SongData[props.songIndex].lineColor}`,
        boxShadow: "1px 1px 6px #150625",
      }}
    >
      <div className="playlistNavigation">
        <p
          onClick={() => onChangeMode(0)}
          style={{
            textShadow: SongData[props.songIndex].playerTextShadow,
            borderBottom: `3px solid ${SongData[props.songIndex].lineColor}`,
            borderRight: `3px solid ${SongData[props.songIndex].lineColor}`,
          }}
        >
          Default
        </p>
        <p
          onClick={() => onChangeMode(1)}
          style={{
            textShadow: SongData[props.songIndex].playerTextShadow,
            borderBottom: `3px solid ${SongData[props.songIndex].lineColor}`,
            borderRight: `3px solid ${SongData[props.songIndex].lineColor}`,
          }}
        >
          Playlist 1
        </p>
        <p
          onClick={() => onChangeMode(2)}
          style={{
            textShadow: SongData[props.songIndex].playerTextShadow,
            borderBottom: `3px solid ${SongData[props.songIndex].lineColor}`,
          }}
        >
          Playlist 2
        </p>
      </div>
      <div className="playlist-container">
        <div className="playlist-item-container">
          {props.mode === 0
            ? SongData.slice(playlistPages * 5, playlistPages * 5 + 5).map(
                (e, index) => (
                  <PlaylistItem
                    key={index}
                    id={e.id}
                    index={playlistPages * 5 + index + 1}
                    songIndex={props.songIndex}
                    changeId={props.changeId}
                    mode={props.mode}
                  />
                )
              )
            : null}

          {props.mode === 1
            ? props.songList[0] !== null
              ? props.songList[0]
                  .slice(playlistPages * 5, playlistPages * 5 + 5)
                  .map((e, index) => (
                    <PlaylistItem
                      key={index}
                      id={e}
                      addSong={props.addSong}
                      songIndex={props.songIndex}
                      index={playlistPages * 5 + index + 1}
                      changeId={props.changeId}
                      mode={props.mode}
                    />
                  ))
              : null
            : null}

          {props.mode === 2
            ? props.songList[1] !== null
              ? props.songList[1]
                  .slice(playlistPages * 5, playlistPages * 5 + 5)
                  .map((e, index) => (
                    <PlaylistItem
                      key={index}
                      id={e}
                      addSong={props.addSong}
                      songIndex={props.songIndex}
                      index={playlistPages * 5 + index + 1}
                      changeId={props.changeId}
                      mode={props.mode}
                    />
                  ))
              : null
            : null}
        </div>
        <div
          className="playlist-sroll"
          style={{
            border: `2px solid ${SongData[props.songIndex].lineColor}`,
          }}
        >
          <div
            className="playlist-scroll-img"
            onClick={() => onPages(1)}
            style={{ top: "12%" }}
          >
            <img src="./assets/icons/upBar.png" alt="" />
          </div>
          <div
            className="playlist-scroll-img"
            onClick={() => onPages(-1)}
            style={{ bottom: "10%" }}
          >
            <img src="./assets/icons/downBar.png" alt="" />
          </div>
        </div>
      </div>
      <div
        className="playlistNavigation"
        style={{
          borderTop: `4.5px solid ${SongData[props.songIndex].lineColor}`,
          position: "relative",
        }}
      >
        {props.mode === 0 ? (
          <>
            <p
              onClick={() => onFooter(true, 1)}
              style={{
                textShadow: SongData[props.songIndex].playerTextShadow,
                borderRight: `3px solid ${SongData[props.songIndex].lineColor}`,
                height: "100%",
              }}
            >
              +Playlist 1
            </p>
            <p
              onClick={() => onFooter(true, 2)}
              style={{ textShadow: SongData[props.songIndex].playerTextShadow }}
            >
              +Playlist 2
            </p>
          </>
        ) : (
          <>
            <p
              onClick={() => onFooter(false, 0)}
              style={{
                textShadow: SongData[props.songIndex].playerTextShadow,
                padding: "0px",
              }}
            >
              Remove Current Song
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Playlist;
