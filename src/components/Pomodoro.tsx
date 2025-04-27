import { useState, useRef, useEffect } from "react";

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
  const [breakMinutes, setBreakMinutes] = useState(5);

  // https://www.youtube.com/watch?v=B1tjrnX160k

  useEffect(() => {
    function switchMode() {
      // Determine what the next mode is
      const nextMode = modeRef.current === "work" ? "break" : "work";
      const nextSeconds =
        (nextMode === "work" ? workMinutes : breakMinutes) * 60;

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
    }, 1000);

    return () => clearInterval(interval);
  }, [breakMinutes, workMinutes]);

  const totalSeconds = mode === "work" ? workMinutes * 60 : breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const PlayButton = (props: { onClick: () => void }) => (
    <span
      {...props}
      className={`btn btn-circle ${
        mode === "work" ? "border-primary" : "border-secondary"
      } `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#e3e3e3"
      >
        <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
      </svg>
    </span>
  );

  const PauseButton = (props: { onClick: () => void }) => (
    <span
      {...props}
      className={`btn btn-circle ${
        mode === "work" ? "border-primary" : "border-secondary"
      } `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#e3e3e3"
      >
        <path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z" />
      </svg>
    </span>
  );

  return (
    <div
      className={`flex flex-col justify-center items-center gap-4 mt-4 p-4 bg-base-200 border-base-300 rounded-box border ${
        mode === "work" ? "text-primary" : "text-success"
      }`}
    >
      <h1 className="font-bold text-4xl text-center mb-4 text-base-content">
        Pomodoro Timer
      </h1>
      <div
        className="radial-progress text-6xl font-bold"
        style={
          {
            "--value": `${percentage}`,
            "--size": "16rem",
            "--thickness": "1.5rem",
          } as React.CSSProperties
        }
        aria-valuenow={percentage}
        role="progressbar"
      >
        {minutes}:{seconds < 10 ? "0" + seconds : seconds}
        <span className="text-xl text-center font-normal mt-4">
          {mode === "work" ? "Work!" : "Take a break!"}
        </span>
      </div>
      <div>
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
    </div>
  );
};

export default Pomodoro;
