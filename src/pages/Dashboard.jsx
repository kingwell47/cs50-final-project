import React, { useState, useEffect } from "react";
import useHabitStore from "../store/habitStore";
import useAuthStore from "../store/authStore";
import AddHabitForm from "../components/AddHabitForm";
import HabitCard from "../components/HabitCard";

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const { habits, fetchHabits, markHabitComplete, loading } = useHabitStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.uid) {
      fetchHabits(user.uid);
    }
  }, [user, fetchHabits]);

  return (
    <>
      <div className='p-4 w-full md:max-w-xs flex flex-col items-center'>
        <h2 className='text-xl font-bold mb-4'>Today's Habits</h2>
        <div className='flex flex-col gap-4'>
          {loading ? (
            <div className='skeleton h-60 w-full'></div>
          ) : habits.length > 0 ? (
            habits.map((habit) => (
              <HabitCard
                key={habit.id}
                id={habit.id}
                name={habit.name}
                completedDates={habit.completedDates}
                frequency={habit.frequency}
              />
            ))
          ) : (
            <p>No habits found</p>
          )}
        </div>
      </div>
      <div className='p-4'>
        <button onClick={() => setShowForm(true)} className='btn btn-primary'>
          + Add Habit
        </button>

        {showForm && (
          <div className='mb-4'>
            <AddHabitForm onClose={() => setShowForm(false)} />
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
