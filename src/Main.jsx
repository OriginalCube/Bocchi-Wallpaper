import React from "react";
import Navigation from "./components/Navigation";
import Clock from "./components/Clock";
import Player from "./components/Player";
import AudioVisualizer from "./components/AudioVisualizer";
import Playlist from "./components/Playlist";
import TitleDisplay from "./TitleDisplay";
import LyricsDisplay from "./LyricsDisplay";
import { convertWPEColorToCSS, toFilename } from "./helpers";
import Lyrics from "./components/Lyrics";

const Main = () => {
  const [songIndex, setIndex] = React.useState(0);
  const [player, setPlayer] = React.useState("true");
  const [clock, setClock] = React.useState("true");
  const [audioVis, setAudioVis] = React.useState("true");
  const [mode, setMode] = React.useState(0);
  const [playlist, setPlaylist] = React.useState("true");
  const [hasLyrics, setHasLyrics] = React.useState("true");
  const [shuffle, setShuffle] = React.useState(true);
  const [replay, setReplay] = React.useState(true);
  const [wpePaused, setWPEPaused] = React.useState(false);
  const [songList, setSongList] = React.useState([[], []]);
  const [uiVolume, setUiVolume] = React.useState(0.5);
  const [textSize, setTextSize] = React.useState(1);
  const [titleDisplay, setTitleDisplay] = React.useState(TitleDisplay.English);
  const [lyricsDisplay, setLyricsDisplay] = React.useState(LyricsDisplay.Original);
  const [use24HourClock, set24HourClock] = React.useState(true);
  const [showSeconds, setShowSeconds] = React.useState(true);
  const [overrideBackgroundColor, setOverrideBackgroundColor] = React.useState(false);
  const [customBackgroundColor, setCustomBackgroundColor] = React.useState("#000000");
  const [overrideLineColor, setOverrideLineColor] = React.useState(false);
  const [customLineColor, setCustomLineColor] = React.useState("#ffffff");
  const audioRef = React.useRef(new Audio());

  const [songData, setSongData] = React.useState(null);

  React.useEffect(() => {
    fetch("./SongData.json")
      .then((r) => r.json())
      .then((d) => setSongData(d))
      .catch((e) => console.error(e));
  }, []);

  const playerHandler = () => {
    //Changes and sets the music player
    setPlayer(player === "true" ? "false" : "true");
    localStorage.setItem("GBCplayer", player === "true" ? "false" : "true");
  };

  const clockHandler = () => {
    //Changes and sets the clock
    setClock(clock === "true" ? "false" : "true");
    localStorage.setItem("GBCclock", clock === "true" ? "false" : "true");
  };

  const visualizerHandler = () => {
    //Changes and sets the visualizer
    setAudioVis(audioVis === "true" ? "false" : "true");
    localStorage.setItem("GBCaudioVis", audioVis === "true" ? "false" : "true");
  };

  const playlistHandler = () => {
    //Changes and sets the playlist
    setPlaylist(playlist === "true" ? "false" : "true");
    localStorage.setItem("GBCplaylistH", playlist === "true" ? "false" : "true");
  };

  const lyricsHandler = () => {
    //Toggles the lyrics
    setHasLyrics(hasLyrics === "true" ? "false" : "true");
    localStorage.setItem("lyricsGBC", hasLyrics === "true" ? "false" : "true");
  };

  const reShuffle = (x, y) => {
    //Replay and Shuffle
    if (x === "shuffle") {
      setShuffle(y);
      setReplay(false);
      localStorage.setItem("GBC-14", `[${false}, ${y}]`);
    } else {
      setReplay(y);
      setShuffle(false);
      localStorage.setItem("GBC-14", `[${y}, ${false}]`);
    }
  };

  const getKey = (m) => songList[m - 1].findIndex((x) => x === songIndex + 1);

  const changeSong = (e) => {
    //Changes the song using conditions ~from player
    if (mode === 0) {
      //Default Playlist
      if (shuffle === false) {
        //Shuffle Scuffed mech
        if (e === true) {
          //Skip Button
          if (songIndex + 1 < songData.length) {
            setIndex(songIndex + 1);
          } else {
            setIndex(0);
          }
        } else if (e === false) {
          //Prev Button
          if (songIndex - 1 < 0) {
            setIndex(songData.length - 1);
          } else {
            setIndex(songIndex - 1);
          }
        }
      } else {
        setIndex(Math.floor(songData.length * Math.random()));
      }
    } else if (
      (mode === 1 || mode === 2) &&
      Array.isArray(songList[mode - 1]) &&
      songList[mode - 1].length
    ) {
      //Check if array is empty
      if (shuffle === false) {
        const key = getKey(mode);
        if (e === true) {
          if (key + 1 < songList[mode - 1].length) {
            setIndex(songList[mode - 1][key + 1] - 1);
          } else {
            setIndex(songList[mode - 1][0] - 1);
          }
        } else if (e === false) {
          if (key - 1 < 0) {
            const tempSong = songList[mode - 1];
            const tempId = songData.findIndex(
              (e) => e.id === tempSong[tempSong.length - 1],
            );
            setIndex(tempId);
          } else {
            setIndex(songList[mode - 1][key - 1] - 1);
          }
        }
      } else {
        //Shuffle, it won't need a key because it's random :>
        setIndex(
          songList[mode - 1][
            Math.floor(songList[mode - 1].length * Math.random())
          ] - 1,
        );
      }
    }
  };

  const addSong = (x, y) => {
    if (songList[y - 1].includes(x)) {
      //Op check
    } else {
      let tempArray = [...songList];
      tempArray[y - 1].push(x);
      setSongList(tempArray);
      localStorage.setItem("playlistGBC", JSON.stringify(tempArray));
    }
  };

  const removeSong = (y) => {
    songList[y - 1].splice(getKey(y), 1);
    setSongList([...songList]);
    localStorage.setItem("playlistGBC", JSON.stringify(songList));
  };

  const changeId = (e) => {
    //Change the song through playlist
    setIndex(e);
  };

  const changeMode = (e) => {
    //Changes mode ~the playlist of what the user is using
    setMode(e);
    localStorage.setItem("GBCmode", e);
  };

  const [prevMode, setPrevMode] = React.useState();

  React.useEffect(() => {
    //Changes song when mode changes
    if (mode !== prevMode) {
      setPrevMode(mode);
      if (!songData) return;
      if (mode === 0) {
        setIndex(Math.floor(songData.length * Math.random()));
      } else if (Array.isArray(songList[mode - 1]) && songList[mode - 1].length) {
        setIndex(
          songList[mode - 1][
            Math.floor(songList[mode - 1].length * Math.random())
          ] - 1,
        );
      }
    }
  }, [mode, prevMode, songData, songList]);

  React.useEffect(() => {
    //Loads and sets data onstart
    try {
      setAudioVis(
        localStorage.getItem("GBCaudioVis") !== null
          ? localStorage.getItem("GBCaudioVis")
          : "true",
      );
      setClock(
        localStorage.getItem("GBCclock") !== null
          ? localStorage.getItem("GBCclock")
          : "true",
      );
      setPlayer(
        localStorage.getItem("GBCplayer") !== null
          ? localStorage.getItem("GBCplayer")
          : "true",
      );
      setPlaylist(
        localStorage.getItem("GBCplaylistH") !== null
          ? localStorage.getItem("GBCplaylistH")
          : "true",
      );
      setMode(
        localStorage.getItem("GBCmode") !== null
          ? parseInt(localStorage.getItem("GBCmode"))
          : 0,
      );
      setSongList(
        localStorage.getItem("playlistGBC") !== null
          ? JSON.parse(localStorage.getItem("playlistGBC"))
          : [[], []],
      );
      setHasLyrics(
        localStorage.getItem("lyricsGBC") !== null
          ? localStorage.getItem("lyricsGBC")
          : "true",
      );
      if (localStorage.getItem("GBC-14") !== null) {
        let temp14 = JSON.parse(localStorage.getItem("GBC-14"));
        setReplay(temp14[0]);
        setShuffle(temp14[1]);
      } else {
        setReplay(false);
        setShuffle(true);
      }
    } catch (e) {
      setAudioVis("true");
      localStorage.setItem("GBCaudioVis", "true");
      setClock("true");
      localStorage.setItem("GBCclock", "true");
      setPlayer("true");
      localStorage.setItem("GBCplayer", "true");
      setPlaylist("true");
      localStorage.setItem("GBCplaylistH", "true");
      setMode(0);
      localStorage.setItem("GBCmode", 0);
      setSongList([[], []]);
      localStorage.setItem("playlistGBC", JSON.stringify([[], []]));
      setReplay(false);
      setShuffle(true);
      localStorage.setItem("GBC-14", JSON.stringify([true, false]));
      localStorage.setItem("lyricsGBC", "true");
    }
  }, []);

  //Wallpaper Engine Functions
  try {
    window.wallpaperPropertyListener = {
      applyUserProperties: function (properties) {
        if (properties.uiVolume) setUiVolume(properties.uiVolume.value * 0.1);
        if (properties.textsize) setTextSize(properties.textsize.value / 10);
        if (properties.titledisplay) setTitleDisplay(properties.titledisplay.value)
        if (properties.lyricsdisplay) setLyricsDisplay(properties.lyricsdisplay.value)
        if (properties.use24hourclock) set24HourClock(properties.use24hourclock.value)
        if (properties.showseconds) setShowSeconds(properties.showseconds.value)
        if (properties.overridebackgroundcolor) setOverrideBackgroundColor(properties.overridebackgroundcolor.value)
        if (properties.custombackgroundcolor) setCustomBackgroundColor(convertWPEColorToCSS(properties.custombackgroundcolor.value))
        // Wallpaper Engine properties are named with "accent" instead of "line" as the color is being used in places other than border lines
        // TODO: rename line color to accent color in another refactor
        if (properties.overrideaccentcolor) setOverrideLineColor(properties.overrideaccentcolor.value)
        if (properties.customaccentcolor) setCustomLineColor(convertWPEColorToCSS(properties.customaccentcolor.value, .9))
      },
      setPaused: function (isPaused) {
        setWPEPaused(isPaused);
      },
    };
  } catch (e) {
    console.log(e);
  }

  return (
    <>
      {!songData ? (
        <div className="Main" />
      ) : (
        <div className="Main" style={{ backgroundColor: overrideBackgroundColor ? customBackgroundColor : songData[songIndex].backgroundColor }}>
          {audioVis === "true" ? (
            <AudioVisualizer lineColor={overrideLineColor ? customLineColor : songData[songIndex].lineColor} />
          ) : null}
          <img
            className="mainImage"
            src={`./assets/icons/${toFilename(songData[songIndex].album ?? songData[songIndex].name)}.jpg`}
            alt=""
            style={{ boxShadow: "1px 1px 12px #150625" }}
          />
          <Navigation
            uiVolume={uiVolume}
            playerHandler={playerHandler}
            clockHandler={clockHandler}
            playlistHandler={playlistHandler}
            changeSong={changeSong}
            visualizerHandler={visualizerHandler}
            songIndex={songIndex}
            lyricsHandler={lyricsHandler}
          />
          {playlist === "true" ? (
            <Playlist
              textSize={textSize}
              uiVolume={uiVolume}
              songIndex={songIndex}
              changeId={changeId}
              songList={songList}
              changeMode={changeMode}
              mode={mode}
              addSong={addSong}
              removeSong={removeSong}
              titleDisplay={titleDisplay}
              backgroundColor={overrideBackgroundColor ? customBackgroundColor : songData[songIndex].backgroundColor}
              lineColor={overrideLineColor ? customLineColor : songData[songIndex].lineColor}
              songData={songData}
            />
          ) : null}
          {clock === "true" ? (
            <Clock
              textShadow={songData[songIndex].clockTextShadow}
              textSize={textSize}
              use24HourClock={use24HourClock}
              showSeconds={showSeconds}
            />
          ) : null}
          {player === "true" ? (
            <Player
              uiVolume={uiVolume}
              playerTextShadow={songData[songIndex].playerTextShadow}
              songIndex={songIndex}
              changeSong={changeSong}
              shuffle={shuffle}
              replay={replay}
              reShuffle={reShuffle}
              textSize={textSize}
              titleDisplay={titleDisplay}
              audioRef={audioRef}
              wpePaused={wpePaused}
              songData={songData}
            />
          ) : null}
          {hasLyrics === "true" && (
            <Lyrics
              songIndex={songIndex}
              audioRef={audioRef}
              uiVolume={uiVolume}
              lyricsDisplay={lyricsDisplay}
              backgroundColor={overrideBackgroundColor ? customBackgroundColor : songData[songIndex].backgroundColor}
              lineColor={overrideLineColor ? customLineColor : songData[songIndex].lineColor}
              songData={songData}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Main;
