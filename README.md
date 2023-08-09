#  Bocchi the Rock Wallpaper
This is a web-based wallpaper inspired from the anime Bocchi the rock. This website features a music player and a playlist that allows users to browse the playlist
and create their own custom playlist.

<img src="https://i.imgur.com/zaBnTLU.png" />

##  Steam Workshop Link:


## To create your own custom playlist
You need to have Node/NPM to be installed in your system to be able to build the file into a static HTML file. Every song in the playlist is stored in the SongData.json, which is the file
that you'll need to edit for you to add custom songs. <br/>

##  SongData JSON structure
```
{
    "id": 1,
    "name": "Guitar, Loneliness and Blue Planet", // Name for both files, the image and the music/mp3 file. Everything in the wallpaper that I built has the same image type and music type which I didn't need to indicate here
    "backgroundColor": "#4C2633", // Color of the background. I based my colors from the colors that youtube provided.
    "clockTextShadow": "3px 3px rgba(237, 112 ,154 ,.7)", // Color for the text shadow, which is the primary color of the image.
    "lineColor": "rgba(237, 112 ,154 ,.9)", // Similiar data as clocktextshadow.
    "playerTextShadow": "2px 2px rgba(237, 112 ,154 ,.7)" // Similiar data as clocktextshadow.
  }
```
##  Built with
React JS - Front-End <br/>
localstorage - to store playlist data.
