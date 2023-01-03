import React from 'react'
import PlaylistItem from './PlaylistItem'
import SongData from './SongData.json'

const Playlist = (props) => {
    return (
    <div className='playlist' style={{border: `4.5px solid ${SongData[props.songIndex].lineColor}`, 
        boxShadow:'1px 1px 6px #150625'}}>
        <div className='playlistNavigation'>
            <p onClick={()=>props.changeMode(0)} style={{textShadow: SongData[props.songIndex].playerTextShadow, 
            borderBottom: `3px solid ${SongData[props.songIndex].lineColor}`, borderRight: `3px solid ${SongData[props.songIndex].lineColor}`}} 
            >Default</p>
            <p onClick={()=>props.changeMode(1)}style={{textShadow: SongData[props.songIndex].playerTextShadow, 
            borderBottom: `3px solid ${SongData[props.songIndex].lineColor}`, borderRight: `3px solid ${SongData[props.songIndex].lineColor}`}} 
            >Playlist 1</p>
            <p onClick={()=>props.changeMode(2)}style={{textShadow: SongData[props.songIndex].playerTextShadow, 
            borderBottom: `3px solid ${SongData[props.songIndex].lineColor}`}} 
            >Playlist 2</p> 
        </div>
        <div className='playlistItemWrapper' style={{borderBottom: `4.5px solid ${SongData[props.songIndex].lineColor}`}}>
        <div className='playlistItem'>
            {props.mode===0?SongData.map((e, index)=>(
                <PlaylistItem key={index} id={e.id} index={index+1}
                    songIndex={props.songIndex} 
                    changeId={props.changeId} mode={props.mode}/>
                )
            ):null}

            {
                props.mode===1?props.songList[0]!==null?props.songList[0].map((e, index)=>(
                    <PlaylistItem key={index} id={e} addSong={props.addSong}
                    songIndex={props.songIndex} index={index+1}
                    changeId={props.changeId} mode={props.mode}/>
                ))
                :null:null
            }

            {
                props.mode===2?props.songList[1]!==null?props.songList[1].map((e, index)=>(
                    <PlaylistItem key={index} id={e} addSong={props.addSong}
                    songIndex={props.songIndex}  index={index+1}
                    changeId={props.changeId} mode={props.mode}/>
                ))
                :null:null
            }

             
        </div>
        </div>
        <div className='playlistNavigation'>
        {props.mode===0?<>
            <p onClick={()=>props.addSong(props.songIndex + 1, 1)} style={{textShadow: SongData[props.songIndex].playerTextShadow, 
            borderRight: `3px solid ${SongData[props.songIndex].lineColor}`}} 
            >+Playlist 1</p>
            <p onClick={()=>props.addSong(props.songIndex + 1, 2)} style={{textShadow: SongData[props.songIndex].playerTextShadow, 
            }} 
            >+Playlist 2</p>
        </>:<><p onClick={props.removeSong} style={{textShadow: SongData[props.songIndex].playerTextShadow, padding: '0px'}} 
            >Remove Current Song</p></>}
        </div>
    </div>
  )
}

export default Playlist