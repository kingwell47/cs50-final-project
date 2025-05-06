import { create } from "zustand";
import {
  getHabits,
  saveHabit,
  updateHabitStatus,
  deleteHabit,
} from "../lib/habits";
import { arrayUnion, arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const useHabitStore = create((set, get) => ({
  habits: [],
  loading: false,
  checkingLoad: false,

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
    set({ loading: true });
    try {
      await saveHabit(habitData, userId);
      await get().fetchHabits(userId);
    } catch (error) {
      console.error("Failed to add habit:", error);
    } finally {
      set({ loading: false });
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

  toggleHabitDate: async (habitId, dateStr, isCompleted) => {
    const habitRef = doc(db, "habits", habitId);
    // Update Firestore
    await updateDoc(habitRef, {
      completedDates: isCompleted ? arrayRemove(dateStr) : arrayUnion(dateStr),
    });

    // Update local state
    set((state) => {
      const updatedHabits = state.habits.map((habit) => {
        if (habit.id !== habitId) return habit;

        const updatedDates = isCompleted
          ? habit.completedDates.filter((d) => d !== dateStr)
          : [...habit.completedDates, dateStr];

        return {
          ...habit,
          completedDates: updatedDates,
        };
      });

      return { habits: updatedHabits };
    });
  },

  removeHabit: async (habitId) => {
    set({ loading: true });
    try {
      await deleteHabit(habitId);
      const userId = get().habits[0]?.userId;
      if (userId) await get().fetchHabits(userId);
    } catch (error) {
      console.error("Failed to delete habit:", error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useHabitStore;
