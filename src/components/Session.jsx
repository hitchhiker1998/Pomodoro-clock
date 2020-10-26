import moment from 'moment'
import React from 'react'


const Session = (props) => {
    const  { 
        sessionLength,
        decrementSession,
        incrementSession 
    } = props;

    const sessionLengthInMinutes = moment.duration(sessionLength, 's').asMinutes();

    return (
        <div>   
            <p id="session-label">Session</p>
            <p id="session-length">{sessionLengthInMinutes}</p>
            <button id="session-decrement" onClick={decrementSession}>-</button>
            <button id="session-increment" onClick={incrementSession}>+</button>
        </div> 
    );
};


export default Session