import React, {useEffect, useState, useRef} from 'react';
const [start, setStart] = useState(0);
const [now, setNow] = useState(0);
const [laps, setLaps] = useState([]);
let timerInterval = useRef(null);

useEffect(() => {
  return () => {
    clearInterval(timerInterval.current);
  };
}, []);

const startTimer = () => {
  const cnow = new Date().getTime();
  setStart(cnow);
  setNow(cnow);
  setLaps([0]);

  timerInterval.current = setInterval(() => {
    setNow(new Date().getTime());
  }, 100);
};

const lapTimer = () => {
  const timestamp = new Date().getTime();
  const [firstLap, ...other] = laps;
  setLaps([0, firstLap + now - start, ...other]);
  setStart(timestamp);
  setNow(timestamp);
};

const stopTimer = () => {
  clearInterval(timerInterval.current);
  const [firstLap, ...other] = laps;
  setLaps([firstLap + now - start, ...other]);
  setStart(0);
  setNow(0);
};

const resetTimer = () => {
  setLaps([]);
  setStart(0);
  setNow(0);
};

const resumeTimer = () => {
  const cnow = new Date().getTime();
  setStart(cnow);
  setNow(cnow);

  timerInterval.current = setInterval(() => {
    setNow(new Date().getTime());
  }, 100);
};

const timer = now - start;

export const FUNCTIONS = {
    start,
    setStart,
    now,
    setNow,
    laps,
    setLaps,
    startTimer,
    lapTimer,
    stopTimer,
    resetTimer,
    resumeTimer,
    timer

}