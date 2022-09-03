import React, { useState } from "react";
import "./Timer.css";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [inputTime, setInputTime] = useState(0);

  const toMS = (minutes) => minutes * 60 * 1000;

  const padZero = (num, count) => {
    return String(num).padStart(count, "0");
  };

  const getDisplayTime = (ms) => {
    const inSeconds = ms / 1000;
    const inMinutes = inSeconds / 60;
    const inHours = inMinutes / 60;

    const h = Math.floor(inHours);
    const m = h > 0 ? inMinutes % 60 : inMinutes;
    const s = m > 0 ? inSeconds % 60 : inSeconds;

    return `${padZero(h, 2)}:${padZero(m, 2)}:${padZero(s, 2)}`;
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
      <button>Start</button>
      <button>Stop</button>
    </div>
  );
};

export default Timer;
