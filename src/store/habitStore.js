import { create } from "zustand";
import {
  getHabits,
  saveHabit,
  updateHabitStatus,
  deleteHabit,
} from "../lib/habits";

const useHabitStore = create((set, get) => ({
  habits: [],
  loading: false,

  fetchHabits: async (userId) => {
    set({ loading: true });
    try {
      const data = await getHabits(userId);
      set({ habits: data, loading: false });
    } catch (error) {
      console.error("Failed to fetch habits:", error);
      set({ loading: false });
    }
  },

  addHabit: async (habitData, userId) => {
    try {
      await saveHabit(habitData, userId);
      await get().fetchHabits(userId);
    } catch (error) {
      console.error("Failed to add habit:", error);
    }
  },

  markHabitComplete: async (habitId, date) => {
    try {
      await updateHabitStatus(habitId, date);
      const userId = get().habits[0]?.userId;
      if (userId) await get().fetchHabits(userId);
    } catch (error) {
      console.error("Failed to mark habit complete:", error);
    }
  },

  removeHabit: async (habitId) => {
    try {
      await deleteHabit(habitId);
      const userId = get().habits[0]?.userId;
      if (userId) await get().fetchHabits(userId);
    } catch (error) {
      console.error("Failed to delete habit:", error);
    }
  },
}));

export default useHabitStore;
