import React from "react"

export const toFilename = (str) => str.replace(/[\\/:*?"<>|]/g, '_')

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
