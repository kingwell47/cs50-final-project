import React, { useMemo } from "react";
import useHabitStore from "../store/habitStore";

const TodayHabitsList = ({ habits, onToggleComplete }) => {
  const { toggleHabitDate } = useHabitStore(); // fallback if no prop
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);
  const weekday = useMemo(() => new Date().getDay(), []);

  // Helper to check if a habit is due today
  const isDueToday = (habit) => {
    switch (habit.frequency) {
      case "Daily":
        return true;
      case "Weekdays":
        return weekday >= 1 && weekday <= 5;
      default:
        return false;
    }
  };

  // Filter only due habits
  const todayHabits = habits.filter(isDueToday);

  // Toggle completion for today
  const handleToggle = (habit) => {
    const isCompleted = habit.completedDates.includes(today);
    if (onToggleComplete) {
      onToggleComplete(habit.id, today, isCompleted);
    } else {
      toggleHabitDate(habit.id, today, isCompleted);
    }
  };

  return (
    <div className="card w-96 bg-accent-content card-xl shadow-sm p-4">
      <h2 className="card-title">Habits for Today</h2>
      {todayHabits.length === 0 ? (
        <p className="text-neutral-500">No habits scheduled for today.</p>
      ) : (
        todayHabits.map((habit) => (
          <label
            key={habit.id}
            className="flex items-center justify-between p-2 border-b last:border-none label"
          >
            <span className="text-content">{habit.name}</span>
            <input
              type="checkbox"
              checked={habit.completedDates.includes(today)}
              onChange={() => handleToggle(habit)}
              className="checkbox checkbox-primary"
            />
          </label>
        ))
      )}
    </div>
  );
};

export default TodayHabitsList;
