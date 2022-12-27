import React from 'react'

const AudioVisualizer = (props) => {
    const canvasRef = React.useRef();
    React.useEffect(()=>{
        const canvas = canvasRef.current;
        canvas.width = window.innerHeight * .65 + 4;
        canvas.height = window.innerHeight * .155;
        let ctx = canvas.getContext('2d');
        function wallpaperAudioListener(audioArray) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Render bars along the full width of the canvas
            var barWidth = (canvas.width/audioArray.length);
            var halfCount = audioArray.length / 2;
            // Begin with the left channel in red
            ctx.fillStyle = `${props.lineColor}`;
            var tempHeight = canvas.height * .85;
            // Iterate over the first 64 array elements (0 - 63) for the left channel audio data
            for (let i = 0; i < halfCount; ++i) {
                // Create an audio bar with its hight depending on the audio volume level of the current frequency
                var height = tempHeight * Math.min(audioArray[i], 1);
                ctx.globalAlpha = .7;
                ctx.fillRect(barWidth * i*2 + 2, canvas.height - height, barWidth, height);
                ctx.shadowColor = props.visualizer;
                ctx.globalAlpha = .7;
                ctx.shadowBlur = 2;
                ctx.shadowOffsetX = 5;
            }
        }
        try{window.wallpaperRegisterAudioListener(wallpaperAudioListener)}catch(e){}
    },[props.lineColor])
    return (
    <canvas ref={canvasRef} className='mainCanvas'/>
    )
}

export default AudioVisualizer