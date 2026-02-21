import React from "react";
import PlaylistItem from "./PlaylistItem";

const Playlist = (props) => {
  const [playlistPages, setPlaylistPages] = React.useState(0);
  const [titleSize, setTitleSize] = React.useState(1);
  let keypress = new Audio();

  const audioPlay = (e) => {
    keypress.src = `./assets/audios/${e === 0 ? "notes" : "keypress"}.mp3`;
    keypress.volume = props.uiVolume;
    keypress.play(); //ADD AUDIO IN FOOTER PART!!!!
  };

  const onFooter = (x, y) => {
    if (x === true) {
      props.addSong(props.songIndex + 1, y);
    } else {
      props.removeSong(y);
    }
    audioPlay(0);
  };

  const onPages = (e) => {
    if (props.mode === 0) {
      if (e === -1) {
        if (playlistPages + e >= 0) {
          setPlaylistPages(playlistPages + e);
        } else {
          setPlaylistPages(Math.trunc((props.songData.length - 1) / 5));
        }
      } else if (e === 1) {
        if (playlistPages + e < props.songData.length / 5) {
          setPlaylistPages(playlistPages + e);
        } else {
          setPlaylistPages(0);
        }
      }
      // if (playlistPages + e < SongData.length / 5 && playlistPages + e > 0) {
      //   setPlaylistPages(playlistPages + 1);
      // } else {
      //   setPlaylistPages(0);
      // }
    } else if (props.mode === 1 || props.mode === 2) {
      if (e === -1) {
        if (playlistPages + e >= 0) {
          setPlaylistPages(playlistPages + e);
        } else {
          setPlaylistPages(
            Math.trunc((props.songList[props.mode - 1].length - 1) / 5),
          );
        }
      } else if (e === 1) {
        if (playlistPages + e < props.songList[props.mode - 1].length / 5) {
          setPlaylistPages(playlistPages + e);
        } else {
          setPlaylistPages(0);
        }
      }
      // if (
      //   playlistPages + e < props.songList[props.mode - 1].length / 5 &&
      //   playlistPages + e > 0
      // ) {
      //   setPlaylistPages(playlistPages + 1);
      // } else {
      //   setPlaylistPages(0);
      // }
    }
    audioPlay(1);
  };

  const onChangeMode = (e) => {
    props.changeMode(e);
    audioPlay(0);
  };

  const includedInPlaylist = (index) => props.songList[index - 1].includes(props.songIndex + 1);

  React.useEffect(() => {
    if (props.mode === 0)
      setPlaylistPages(Math.trunc(props.songIndex / 5));
    else
      setPlaylistPages(Math.trunc(props.songList[props.mode - 1].findIndex((x) => x === props.songIndex + 1) / 5));
  }, [props.mode, props.songIndex, props.songList]);

  React.useLayoutEffect(() => {
    const updateTitleSize = () => {
      if (window.innerWidth <= 1370) {
        setTitleSize(0.875); //0.875
      } else {
        setTitleSize(1);
      }
    }
    updateTitleSize();
    window.addEventListener("resize", updateTitleSize);
    return () => window.removeEventListener("resize", updateTitleSize);
  }, []);

  return (
    <div
      className="playlist"
      style={{
        fontSize: `${titleSize * props.textSize}rem`,
        border: `4.5px solid ${props.lineColor}`,
        boxShadow: "1px 1px 6px #150625",
      }}
    >
      <div className="playlistNavigation" style={{ height: "10%" }}>
        <button
          className="h-full w-1/3"
          onClick={() => onChangeMode(0)}
          style={{
            borderBottom: `3px solid ${props.lineColor}`,
            borderRight: `3px solid ${props.lineColor}`,
          }}
        >
          默认歌单
        </button>
        <button
          className="h-full w-1/3"
          onClick={() => onChangeMode(1)}
          style={{
            borderBottom: `3px solid ${props.lineColor}`,
            borderRight: `3px solid ${props.lineColor}`,
          }}
        >
          歌单1
        </button>
        <button
          className="w-1/3 h-full"
          onClick={() => onChangeMode(2)}
          style={{
            borderBottom: `3px solid ${props.lineColor}`,
          }}
        >
          歌单2
        </button>
      </div>
      <div className="playlist-container" style={{ height: "80%" }}>
        <div className="playlist-item-container">
          {props.mode === 0
            ? (props.songData || []).slice(playlistPages * 5, playlistPages * 5 + 5).map(
                (e, index) => (
                  <PlaylistItem
                    uiVolume={props.uiVolume}
                    key={index}
                    id={e.id}
                    index={playlistPages * 5 + index + 1}
                    songIndex={props.songIndex}
                    changeId={props.changeId}
                    mode={props.mode}
                    titleDisplay={props.titleDisplay}
                    backgroundColor={props.backgroundColor}
                    lineColor={props.lineColor}
                    songData={props.songData}
                  />
                ),
              )
            : null}

          {props.mode === 1
            ? props.songList[0] !== null
              ? props.songList[0]
                  .slice(playlistPages * 5, playlistPages * 5 + 5)
                  .map((e, index) => (
                    <PlaylistItem
                      uiVolume={props.uiVolume}
                      key={index}
                      id={e}
                      addSong={props.addSong}
                      songIndex={props.songIndex}
                      index={playlistPages * 5 + index + 1}
                      changeId={props.changeId}
                      mode={props.mode}
                      titleDisplay={props.titleDisplay}
                      songData={props.songData}
                      backgroundColor={props.backgroundColor}
                      lineColor={props.lineColor}
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
                      uiVolume={props.uiVolume}
                      key={index}
                      id={e}
                      addSong={props.addSong}
                      songIndex={props.songIndex}
                      index={playlistPages * 5 + index + 1}
                      changeId={props.changeId}
                      mode={props.mode}
                      titleDisplay={props.titleDisplay}
                      songData={props.songData}
                      backgroundColor={props.backgroundColor}
                      lineColor={props.lineColor}
                    />
                  ))
              : null
            : null}
        </div>
        <div
          className="playlist-sroll"
          style={{
            border: `2px solid ${props.lineColor}`,
          }}
        >
          <div
            className="playlist-scroll-img"
            onClick={() => onPages(-1)}
            style={{ top: "12%" }}
          >
            <img src="./assets/icons/upBar.png" alt="" />
          </div>
          <div
            className="playlist-scroll-img"
            onClick={() => onPages(1)}
            style={{ bottom: "10%" }}
          >
            <img src="./assets/icons/downBar.png" alt="" />
          </div>
        </div>
      </div>
      <div
        className="playlistNavigation"
        style={{
          height: "10%",
          borderTop: `4.5px solid ${props.lineColor}`,
          position: "relative",
        }}
      >
        {props.mode === 0 ? (
          <>
            <button
              className="w-1/2 h-full"
              onClick={() => onFooter(!includedInPlaylist(1), 1)}
              style={{
                borderRight: `3px solid ${props.lineColor}`,
                height: "100%",
              }}
            >
              {includedInPlaylist(1) ? "-" : "+"} 歌单1
            </button>
            <button className="w-1/2 h-full" onClick={() => onFooter(!includedInPlaylist(2), 2)}>
              {includedInPlaylist(2) ? "-" : "+"} 歌单2
            </button>
          </>
        ) : (
          <>
            <button
              className="h-full w-full"
              onClick={() => onFooter(false, props.mode)}
              style={{
                padding: "0px",
              }}
            >
              从歌单移除
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Playlist;
