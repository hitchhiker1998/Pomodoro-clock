import React from 'react'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'


momentDurationFormatSetup(moment)


const Timeleft = (props) => {
    const { timerLabel } = props;
    const { handleStartStopClick } = props;
    const { startStopButtonLabel } = props;
    const { timeLeft } = props;
    




  
    
    const formattedTimeleft = moment.duration(timeLeft, 's').format('mm:ss', { trim: false})
   
    return (
        <div> 
            <p id="timer-label">{timerLabel}</p>
            <button id="start_stop" onClick={handleStartStopClick}>{startStopButtonLabel}</button>
            <p id="time-left">{formattedTimeleft}</p>
        </div>
    );
};

export default Timeleft