import { useEffect } from "react";
import { useTimerStore } from "../store/timerStore";

const TimerTicker = () => {
  const tick = useTimerStore((state) => state.tick);

  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [tick]);

  return null; // No UI needed
};

export default TimerTicker;
