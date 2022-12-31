import React from 'react'

const Clock = (props) => {
    const [hour, setHour] = React.useState('00');
    const [minute, setMinute] = React.useState('0');
    const [second, setSecond] = React.useState('');
    React.useEffect(()=>{
        setInterval(() => {
            let currentTime = new Date();
            setHour(currentTime.getHours());
            setMinute(currentTime.getMinutes());
            setSecond(currentTime.getSeconds());
        }, 1000);
    },[]) 

    return (
        <p className={`mainClock absolute opacity-80`} style={{top:'79vh', right:'2vw', color:`white`, 
        textShadow:`${props.textShadow}`}}>{hour + ':'} 
        { minute>9? minute: '0' + minute}
        <span className={`mainSecond relative top-2/3`} style={{color:`white`}}>{ second>9? second: '0' + second}</span></p>
  )
}

export default Clock