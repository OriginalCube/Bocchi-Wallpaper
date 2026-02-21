#  Girls Band Cry Wallpaper / 哭泣少女乐队壁纸
This is a web-based wallpaper music player for anime Girls Band Cry.
Forked from OriginalCube:https://github.com/OriginalCube/Bocchi-Wallpaper.
这个项目是动漫《哭泣少女乐队》主题的网页音乐播放器壁纸。
基于原作者 OriginalCube:https://github.com/OriginalCube/Bocchi-Wallpaper 的项目修改完成。


##  Steam Workshop Link / Steam创意工坊链接:
[ガールズバンドクライGirls Band Cry](https://steamcommunity.com/sharedfiles/filedetails/?id=)

##  SongData JSON structure / SongData JSON 格式
```
{
    "id": 1,
    "name": "Guitar, Loneliness and Blue Planet", 
    // Name for both files, the image and the music/mp3 file. Everything in the wallpaper that I built has the same image type and music type which I didn't need to indicate here
    "nameOriginal": "ギターと孤独と蒼い惑星",
    // Untranslated song titles. This property is Optional. 
    "nameRomanized": "Guitar to Kodoku to Aoi Hoshi",
    // Romanized song titles. This property is Optional.
    "audioType": ".mp3",
    // Based on the files you add to /songs, if you add ".flac" files, you don't need to write this property.
    "album": "Guitar, Loneliness and Blue Planet"
    // The file name of the album image you uploaded to /icons folder. If the album image you upload has the same filename as the song title, you don't need to add this property.
    "backgroundColor": "#4C2633",
    // Color of the background. I based my colors from the colors that youtube provided.
    "clockTextShadow": "3px 3px rgba(237, 112 ,154 ,.7)", 
    // Color for the text shadow, which is the primary color of the image.
    "lineColor": "rgba(237, 112 ,154 ,.9)", 
    // Similiar data as clocktextshadow.
    "playerTextShadow": "2px 2px rgba(237, 112 ,154 ,.7)" 
    // Similiar data as clocktextshadow.
  }
```
```
{
    "id": 1,
    "name": "Guitar, Loneliness and Blue Planet", 
    // 添加到 /songs 文件夹或 /lyrics 文件夹下的歌曲文件和歌词文件名
    "nameOriginal": "ギターと孤独と蒼い惑星",
    // 歌名原文，如不需要多语言切换显示可不添加该项
    "nameRomanized": "Guitar to Kodoku to Aoi Hoshi",
    // 歌名罗马音，如不需要多语言切换显示可不添加该项
    "audioType": ".mp3",
    // 上传到 /songs 文件夹的歌曲文件格式,如果上传的是".flac"格式的文件可以不添加该项
    "album": "Guitar, Loneliness and Blue Planet"
    // 上传到 /icons 文件夹的歌曲封面文件名,如果和歌名一致可以不添加该项
    "backgroundColor": "#4C2633",
    // 背景颜色
    "clockTextShadow": "3px 3px rgba(237, 112 ,154 ,.7)", 
    // 时钟组件文本阴影颜色
    "lineColor": "rgba(237, 112 ,154 ,.9)", 
    // 边框线条颜色
    "playerTextShadow": "2px 2px rgba(237, 112 ,154 ,.7)" 
    // 播放器上歌名文本阴影颜色
  }
```

