import React, { useEffect, useState } from "react";
import "./Timer.css";
import audio from "../assets/timer_complete.mp3";

const Timer = () => {
  const toMS = (minutes) => minutes * 60 * 1000;
  const timerCompleteAudio = new Audio(audio);

  const defaultTime = 10;
  const [time, setTime] = useState(toMS(defaultTime));
  const [inputTime, setInputTime] = useState(defaultTime);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (time === 0) {
      stopTimer();
      timerCompleteAudio.play();
    }
  }, [time]);

  const padZero = (num, count) => {
    return String(num).padStart(count, "0");
  };

  const getDisplayTime = (ms) => {
    const inSeconds = ms / 1000;
    const inMinutes = inSeconds / 60;
    const inHours = inMinutes / 60;

    const h = Math.floor(inHours);
    const m = h > 0 ? inMinutes % 60 : Math.floor(inMinutes);
    const s = m > 0 ? inSeconds % 60 : Math.floor(inSeconds);

    return `${padZero(h, 2)}:${padZero(m, 2)}:${padZero(s, 2)}`;
  };

  const startTimer = () => {
    if (timer) return; // do not start another timer if already running

    const timerID = setInterval(() => {
      setTime((time) => time - 1000);
    }, 1000);
    setTimer(timerID);
  };

  const stopTimer = () => {
    clearInterval(timer);
    setTimer(null);
  };

  return (
    <div className="timer">
      <h1>{getDisplayTime(time)}</h1>
      <input
        type="text"
        placeholder="minutes"
        value={inputTime}
        onChange={(e) => setInputTime(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setTime(toMS(inputTime));
        }}
      >
        Set Time
      </button>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
};

export default Timer;
