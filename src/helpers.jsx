import React from "react"

export const toFilename = (str) => str.replace(/[\\/:*?"<>|]/g, '_')

// Taken from https://docs.wallpaperengine.io/en/web/customization/properties.html#color-property with alpha added
export const convertWPEColorToCSS = (str, alpha = 1) => {
  var color = str.split(' ');
  color = color.map(function(c) {
      return Math.ceil(c * 255);
  });
  return 'rgba(' + color + ',' + alpha + ')';
}

// TODO: replace with native function when added to stable version of React
// Taken from https://stackoverflow.com/questions/76335194/is-this-an-accurate-polyfill-of-reacts-useeffectevent
export const useEffectEvent = (callback) => {
  const fnRef = React.useRef(null)
  React.useInsertionEffect(() => {
    fnRef.current = callback
  }) 
  return (...args) => {
    return fnRef.current.apply(null, args)
  }
}

// Source - https://stackoverflow.com/a/34184614
// Posted by Marco Bonelli, modified by community. See post 'Timeline' for change history
// Retrieved 2026-05-05, License - CC BY-SA 3.0
export const randomExcluded = (min, max, excluded) => {
    var n = Math.floor(Math.random() * (max-min) + min);
    if (n >= excluded) n++;
    return n;
}

export const toReadableTime = (seconds) => {
  if (isNaN(seconds)) return;
  const totalMinutes = seconds / 60;
  const totalHours = totalMinutes / 60;
  const hoursPart = Math.floor(totalHours).toString();
  const minutesPart = Math.floor(totalMinutes % 60).toString();
  const secondsPart = Math.floor(seconds % 60).toString().padStart(2, "0");
  let time = "";
  if (totalHours >= 1)
    time += `${hoursPart}:${minutesPart.padStart(2, "0")}:`;
  else
    time += `${minutesPart}:`;
  time += secondsPart;
  return time;
};
