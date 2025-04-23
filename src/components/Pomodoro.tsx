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

  const style = {
    "--value": percentage,
    "--size": "24rem",
    "--thickness": "1rem",
  };

  return (
    <div>
      <div
        title={mode}
        className={`radial-progress text-4xl flex flex-col gap-4 justify-center items-center ${
          mode === "work" ? "text-secondary" : "text-primary"
        }`}
        style={style as React.CSSProperties}
        aria-valuenow={percentage}
        role='progressbar'>
        {minutes}:{seconds < 10 ? "0" + seconds : seconds}
        <div className='flex text-center justify-center items-center'>
          <button className='btn btn-circle size-10 bg-accent-content p-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2.5'
              stroke='currentColor'
              className='size-20'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
