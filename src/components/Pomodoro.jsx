import { useState, useRef, useEffect } from "react";

const Pomodoro = () => {
  // https://github.com/dejwid/react-pomodoro-timer/blob/master/src/Timer.js

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work"); // work/break/null
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  useEffect(() => {
    function switchMode() {
      const nextMode = modeRef.current === "work" ? "break" : "work";
      const nextSeconds =
        (nextMode === "work" ? workMinutes : breakMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [
    isPausedRef,
    modeRef,
    secondsLeftRef,
    setMode,
    setSecondsLeft,
    workMinutes,
    breakMinutes,
  ]);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  const totalSeconds = mode === "work" ? workMinutes * 60 : breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  const PlayButton = (props) => (
    <span
      {...props}
      className={`btn btn-circle ${
        mode === "work" ? "border-primary" : "border-secondary"
      } `}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        height='24px'
        viewBox='0 -960 960 960'
        width='24px'
        fill='#e3e3e3'>
        <path d='M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z' />
      </svg>
    </span>
  );

  const PauseButton = (props) => (
    <span
      {...props}
      className={`btn btn-circle ${
        mode === "work" ? "border-primary" : "border-secondary"
      } `}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        height='24px'
        viewBox='0 -960 960 960'
        width='24px'
        fill='#e3e3e3'>
        <path d='M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z' />
      </svg>
    </span>
  );

  return (
    <div className='flex flex-col items-center justify-center gap-4 w-full'>
      <div
        className='radial-progress text-primary text-8xl'
        style={
          {
            "--value": `${percentage}`,
            "--size": "24rem",
            "--thickness": "1.5rem",
          } /* as React.CSSProperties */
        }
        aria-valuenow={percentage}
        role='progressbar'>
        {minutes}:{seconds}
      </div>
      {isPaused ? (
        <PlayButton
          onClick={() => {
            setIsPaused(false);
            isPausedRef.current = false;
          }}
        />
      ) : (
        <PauseButton
          onClick={() => {
            setIsPaused(true);
            isPausedRef.current = true;
          }}
        />
      )}
    </div>
  );
};

export default Pomodoro;
