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
