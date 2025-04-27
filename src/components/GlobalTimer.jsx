import { useTimerStore } from "../lib/timerStore";

const GlobalTimer = () => {
  const {
    mode,
    secondsLeft,
    isPaused,
    start,
    pause,
    workMinutes,
    breakMinutes,
  } = useTimerStore();

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

  const PauseButton = (props) => (
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
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className="radial-progress text-primary text-8xl"
        style={
          {
            "--value": `${percentage}`,
            "--size": "24rem",
            "--thickness": "1.5rem",
          } /* as React.CSSProperties */
        }
        aria-valuenow={percentage}
        role="progressbar"
      >
        {minutes}:{seconds}
      </div>
      {isPaused ? (
        <PlayButton onClick={start} />
      ) : (
        <PauseButton onClick={pause} />
      )}
    </div>
  );
};

export default GlobalTimer;
