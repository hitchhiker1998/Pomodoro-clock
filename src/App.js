import React, { useRef } from 'react';
import { useState } from 'react';
import './App.css';
import Break from './components/Break';
import Session from './components/Session';
import Timeleft from './components/Timeleft';
import { useEffect } from 'react';

function App() {
  const audioElement = useRef(null) 
  const [ intervalId, setIntervalId ] = useState(null);
  const [ currentSessionType, setCurrentSessionType ] = useState("Session");
  const [sessionLength, setSessionLength] = useState(25 * 60);
  const [breakLength, setBreakLength] = useState(300);

  const [ timeLeft, setTimeLeft] = useState(sessionLength);
    
    useEffect(() => {
        setTimeLeft(sessionLength);
    }, [sessionLength])


    useEffect(() => {
        if (timeLeft === 0) {
          audioElement.current.play();

          if (currentSessionType === "Session") {
            setCurrentSessionType('Break');
            setTimeLeft(breakLength);
          } else if (currentSessionType === "Break") {
            setCurrentSessionType('Session');
            setTimeLeft(sessionLength);
          }
        }
    },[breakLength,sessionLength,currentSessionType,timeLeft])


    const decrementSession = () => {
        const newsessionLength = sessionLength - 60;
        if (newsessionLength > 0) {
            setSessionLength(newsessionLength);
        } 
    };

    const incrementSession = () => {
        const newsessionLength = sessionLength + 60;
        if (newsessionLength <= 60 * 60) {
          setSessionLength(newsessionLength);
        }
        
    }
 
    const decrementBreak = () => {
        const newbreakLength = breakLength - 60;
        if (newbreakLength > 0) {
            setBreakLength(newbreakLength);
        } 
    };

    const incrementBreak = () => {
        const newbreakLength = breakLength + 60 
        if (newbreakLength <= 60 * 60){
          setBreakLength(newbreakLength);
        }   
    }

    const isStarted = intervalId !== null;
    
    const handleStartStopClick = () => {
      if (isStarted) {
          clearInterval(intervalId);
          setIntervalId(null);
      } else {
          const newIntervalId = setInterval(() => {
              setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
          },1000)
          setIntervalId(newIntervalId);
      }
    };

    const handleResetButtonClick = () => {
      audioElement.current.load()
      clearInterval(intervalId)
      setIntervalId(null)
      setCurrentSessionType("Session")
      setSessionLength(60 * 25)
      setBreakLength(60 * 5)
      setTimeLeft(60 * 25)
    }

  return (
    <div className="App">
      < Break 
      breakLength = {breakLength}
      decrementBreak = {decrementBreak}
      incrementBreak = {incrementBreak}
      />
      < Timeleft 
      timerLabel = {currentSessionType}
      handleStartStopClick = {handleStartStopClick}
      startStopButtonLabel = {isStarted ? "Stop" : "Start"}
      timeLeft = {timeLeft}
      />
      < Session 
      sessionLength = {sessionLength}
      decrementSession = {decrementSession}
      incrementSession = {incrementSession}
      />
      <button id="reset" onClick={handleResetButtonClick}>Reset</button>
      <audio id="beep" ref={audioElement}>
        <source src="http://codeskulptor-demos.commondatastorage.googleapis.com/pang/arrow.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default App;
