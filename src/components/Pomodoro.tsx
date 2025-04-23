import React, { useState, useRef, useEffect } from "react";

const Pomodoro = () => {
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work");
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  // Temporary Values
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakminutes, setBreakMinutes] = useState(5);

  // https://www.youtube.com/watch?v=B1tjrnX160k

  useEffect(() => {
    function switchMode() {
      // Determine what the next mode is
      const nextMode = modeRef.current === "work" ? "break" : "work";
      const nextSeconds =
        (nextMode === "work" ? workMinutes : breakminutes) * 60;

      // Set the next mode
      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) return;

      if (secondsLeftRef.current === 0) return switchMode();

      tick();
    }, 50);

    return () => clearInterval(interval);
  }, [breakminutes, workMinutes]);

  const totalSeconds = mode === "work" ? workMinutes * 60 : breakminutes * 60;

  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div
      className={`flex flex-col justify-center items-center gap-4 ${
        mode === "work" ? "text-primary" : "text-success"
      }`}>
      <label htmlFor='progress' className='text-4xl font-bold'>
        {minutes}:{seconds < 10 ? "0" + seconds : seconds}
      </label>
      <progress
        className={`progress w-56 h-5 ${
          mode === "work" ? "progress-primary" : "progress-success"
        }`}
        value={percentage}
        max='100'
        id='progress'
      />
    </div>
  );
};

export default Pomodoro;
