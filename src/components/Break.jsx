import moment from 'moment'
import React from 'react'


const Break = (props) => {
    
    const {
        breakLength,
        decrementBreak,
        incrementBreak
    } = props;
    const breakLengthInMinutes = moment.duration(breakLength, 's').asMinutes();

    return (
        <div>   
            <p id="break-label">Break</p>
            <p id="break-length">{breakLengthInMinutes}</p>
            <button id="break-decrement" onClick={decrementBreak}>-</button>
            <button id="break-increment" onClick={incrementBreak}>+</button>
        </div> 
    );
};


export default Break