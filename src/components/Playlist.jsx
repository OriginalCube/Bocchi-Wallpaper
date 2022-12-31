import React from 'react'
import PlaylistItem from './PlaylistItem'
import SongData from './SongData.json'

const Playlist = (props) => {
            // <p style={{textShadow: SongData[props.songIndex].playerTextShadow, border: `2px solid ${SongData[props.songIndex].lineColor}`}} 
            // onClick={props.changeMode('1')}>Playlist 1</p>
            // <p style={{textShadow: SongData[props.songIndex].playerTextShadow, border: `2px solid ${SongData[props.songIndex].lineColor}`}} 
            // onClick={props.changeMode('2')}>Playlist 2</p>

    return (
    <div className='playlist' style={{border: `4.5px solid ${SongData[props.songIndex].lineColor}`, 
        boxShadow:'1px 1px 6px #150625'}}>
        <div className='playlistNavigation'>
            <p style={{textShadow: SongData[props.songIndex].playerTextShadow, 
            borderBottom: `3px solid ${SongData[props.songIndex].lineColor}`}} 
            >Default Playlist</p>
            
        </div>
        <div className='playlistItemWrapper'>
        <div className='playlistItem'>
            {SongData.map((e, index)=>(
                <PlaylistItem key={index} id={e.id} name={e.name}
                    textShadow={SongData[props.songIndex].playerTextShadow} border={SongData[props.songIndex].lineColor} 
                    changeId={props.changeId}/>
                )
            )}
        </div>
        </div>
    </div>
  )
}

export default Playlist