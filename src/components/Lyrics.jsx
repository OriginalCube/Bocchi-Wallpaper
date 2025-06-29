import React from "react";
import SongData from "./SongData.json";
import { MultipleLrc, useRecoverAutoScrollImmediately } from "react-lrc";
import { toFilename } from "../helpers";
import LyricsDisplay from "../LyricsDisplay";

const Lyrics = (props) => {
  const [lyrics, setLyrics] = React.useState(["", ""]);
  const [currentTime, setCurrentTime] = React.useState(0);
  const { signal, recoverAutoScrollImmediately } = useRecoverAutoScrollImmediately();
  const audioRef = React.useRef(props.audioRef.current);
  let keyPress = new Audio();

  React.useEffect(() => {
    const audio = audioRef.current;
    const updateCurrentTime = () => setCurrentTime(audio.currentTime * 1000);
    audio.addEventListener("timeupdate", updateCurrentTime);
    return () => audio.removeEventListener("timeupdate", updateCurrentTime);
  }, [])

  React.useEffect(() => {
    const abortController = new AbortController();
    const newLyrics = ["", ""];
    const lrcFetches = [];

    if (props.lyricsDisplay === LyricsDisplay.Both) {
      lrcFetches.push(fetch(`./assets/lyrics/original/${toFilename(SongData[props.songIndex].name)}.lrc`, { signal: abortController.signal }));
      lrcFetches.push(fetch(`./assets/lyrics/romanized/${toFilename(SongData[props.songIndex].name)}.lrc`, { signal: abortController.signal }));
    }
    else {
      lrcFetches.push(fetch(`./assets/lyrics/${props.lyricsDisplay}/${toFilename(SongData[props.songIndex].name)}.lrc`, { signal: abortController.signal }));
    }

    Promise.all(lrcFetches)
      .then(responses => Promise.all(responses.map(r => r.text())))
      .then(lrcs => {
        lrcs.forEach((lrc, i) => newLyrics[i] = lrc.replace(/\r\n/g, '\n').replace(/\r/g, '\n'));
        setLyrics(newLyrics);
      })
      .catch(function (err) {
        if (err.name !== "AbortError")
          console.error(` Err: ${err}`);
      });
    return () => {
      abortController.abort();
    };
  }, [props.songIndex, props.lyricsDisplay])

  const onLineClicked = (startMillisecond) => {
    // Nudge value to fix floating-point issue
    audioRef.current.currentTime = (startMillisecond + 1) / 1000;
    recoverAutoScrollImmediately();
    keyPress.src = "./assets/audios/keypress.mp3";
    keyPress.volume = props.uiVolume;
    keyPress.play();
  }

  const lineRenderer = ({ active, line: { children, startMillisecond } }) =>
    <div
      style={{
        opacity: ".85",
        backgroundColor: active
          ? SongData[props.songIndex].lineColor
          : `transparent`,
        padding: `10px`,
        color: active ? SongData[props.songIndex].backgroundColor : `white`,
        fontWeight: active ? "500" : "normal",
        borderRadius: active ? "5px" : "0px",
      }}
      onClick={() => onLineClicked(startMillisecond)}
    >
      {
        (children[0].content !== children[1]?.content)
          ? children.map(child => (
            <div key={child.id}>{child.content}</div>
          ))
          : children[0].content
      }
    </div>

  return (
    <div
      className="lrc-container"
      style={{ border: `4.5px solid ${SongData[props.songIndex].lineColor}` }}
    >
      <MultipleLrc
        className="lrc"
        lrcs={lyrics}
        lineRenderer={lineRenderer}
        currentMillisecond={currentTime}
        recoverAutoScrollSingal={signal}
      />
    </div>
  );
};

export default Lyrics;
