import React, { useState, useEffect } from "react";
import useHabitStore from "../store/habitStore";
import useAuthStore from "../store/authStore";
import AddHabitForm from "../components/AddHabitForm";

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const { habits, fetchHabits, markHabitComplete, loading } = useHabitStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.uid) {
      fetchHabits(user.uid);
    }
  }, [user, fetchHabits]);

  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
  return (
    <>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Today's Habits</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          habits.map((habit) => (
            <div
              key={habit.id}
              className="flex items-center justify-between p-2 border rounded mb-2"
            >
              <span>{habit.name}</span>
              <input
                type="checkbox"
                checked={habit.completedDates?.includes(today)}
                onChange={() => markHabitComplete(habit.id, today)}
              />
            </div>
          ))
        )}
      </div>
      <div className="p-4">
        <button
          onClick={() => setShowForm(true)}
          className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Habit
        </button>

        {showForm && (
          <div className="mb-4">
            <AddHabitForm onClose={() => setShowForm(false)} />
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
