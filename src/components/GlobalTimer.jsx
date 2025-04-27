import { useTimerStore } from "../lib/timerStore";

const GlobalTimer = () => {
  const {
    mode,
    secondsLeft,
    isPaused,
    start,
    pause,
    reset,
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

  const ResetButton = (props) => (
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
        <path d="M520-330v-60h160v60H520Zm60 210v-50h-60v-60h60v-50h60v160h-60Zm100-50v-60h160v60H680Zm40-110v-160h60v50h60v60h-60v50h-60Zm111-280h-83q-26-88-99-144t-169-56q-117 0-198.5 81.5T200-480q0 72 32.5 132t87.5 98v-110h80v240H160v-80h94q-62-50-98-122.5T120-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q129 0 226.5 79.5T831-560Z" />
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
      <div className="flex items-center justify-center gap-4">
        {isPaused ? (
          <>
            <PlayButton onClick={start} />
            <ResetButton onClick={reset} />
          </>
        ) : (
          <PauseButton onClick={pause} />
        )}
      </div>
    </div>
  );
};

export default GlobalTimer;
