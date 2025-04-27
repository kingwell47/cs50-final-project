import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTimerStore = create(
  persist(
    (set, get) => ({
      mode: "work",
      secondsLeft: 25 * 60,
      isPaused: true,
      workMinutes: 25,
      breakMinutes: 5,

      tick: () => {
        const { secondsLeft, isPaused } = get();
        if (isPaused) return;
        if (secondsLeft > 0) {
          set({ secondsLeft: secondsLeft - 1 });
        } else {
          get().switchMode();
        }
      },

      switchMode: () => {
        const { mode, workMinutes, breakMinutes } = get();
        const nextMode = mode === "work" ? "break" : "work";
        const nextSeconds =
          (nextMode === "work" ? workMinutes : breakMinutes) * 60;
        set({ mode: nextMode, secondsLeft: nextSeconds });
      },

      start: () => set({ isPaused: false }),
      pause: () => set({ isPaused: true }),
      reset: () => {},

      setWorkMinutes: (minutes) => set({ workMinutes: minutes }),
      setBreakMinutes: (minutes) => set({ breakMinutes: minutes }),
    }),
    {
      name: "pomodoro-timer", // the key in localStorage
      partialize: (state) => ({
        mode: state.mode,
        secondsLeft: state.secondsLeft,
        isPaused: state.isPaused,
        workMinutes: state.workMinutes,
        breakMinutes: state.breakMinutes,
      }),
    }
  )
);
