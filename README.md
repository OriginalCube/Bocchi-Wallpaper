#How to edit and add your stuff manually Things you'll need: ~Node That's pretty much it.

Step 1: The thing that you'll only need to change would be the SongData.json. Structure of SongData.json { id - Rpresents the unique code for the song. name - This will be used to find the source of the song and image, will also be used as the display text for the song name. background color - Background color :> clockTextShadow - Text shadow of Clock text same value with playerTextShadow but has a bigger px because of the text size. lineColor - It is the audio responsive bar colors playerTextShadow - Same values as the others but with a smaller px }

Step 2: Change the files according to the name that you have written in the SongData.json Where to change files? public/assets/audios - where the audio cues are located. public/assets/icons - where all of the images are located icons/thumbnail pics. public/assets/songs - where the songs are located.

Step 3: Locate the file path with a terminal then run "npm run build" so node can compile it and make it into a static html where Wallpaper engine can read.

Step 4: Enjoy.

If you have any bugs regarding this method please DM me.

~This version has repeat and shuffle, I haven't debug it yet so it might lead into problems if you ever use this. Please do use a previous version to be able to use this without any problem. :>

QnA:

Why use a framework to create a simple wallpaper/ -Because, it looks easier to me and manage.

Can I use this to create my own wallpaper? -Sure, just give me some credits thanks. <3

What project are you currently working on? -I'm currently working on Genshin Impact wallpaper

Sources of images are from youtube and flaticon.
