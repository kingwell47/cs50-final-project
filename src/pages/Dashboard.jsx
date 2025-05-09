import React, { useEffect, useState } from "react";
import useHabitStore from "../store/habitStore";
import useAuthStore from "../store/authStore";
import AddHabitForm from "../components/AddHabitForm";
import HabitCard from "../components/HabitCard";
import TodayHabitsList from "../components/TodayHabitsList";

const Dashboard = () => {
  const { habits, fetchHabits, loading } = useHabitStore();
  const { user } = useAuthStore();

  const [showAllHabits, setShowAllHabits] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      fetchHabits(user.uid);
    }
  }, [user, fetchHabits]);

  return (
    <>
      <div className='flex items-center justify-between gap-4 mt-4 w-full md:max-w-96'>
        <div className='tabs tabs-box'>
          <input
            type='radio'
            name='today-filter'
            className={`tab ${
              !showAllHabits && "[--tab-bg:var(--color-primary)]"
            }`}
            aria-label='Today'
            defaultChecked
            onChange={() => {
              setShowAllHabits(false);
            }}
          />
          <input
            type='radio'
            name='today-filter'
            className={`tab ${
              showAllHabits && "[--tab-bg:var(--color-primary)]"
            }`}
            aria-label='All Habits'
            onChange={() => {
              setShowAllHabits(true);
            }}
          />
        </div>
        <button
          className='btn btn-primary btn-sm'
          onClick={() => {
            document.getElementById("add_habit_modal").showModal();
          }}>
          + Add Habit
        </button>
        <dialog
          id='add_habit_modal'
          className='modal modal-bottom sm:modal-middle'>
          <div className='modal-box'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
                ✕
              </button>
            </form>
            <AddHabitForm />
          </div>
        </dialog>
      </div>
      <div className='p-4 w-full md:max-w-sm flex flex-col items-center'>
        {showAllHabits ? (
          <div className='flex flex-col gap-4 items-center justify-center w-full'>
            <h2 className='text-xl font-bold'>All Habits</h2>
            {loading ? (
              <div className='skeleton h-60 w-92' />
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
        ) : (
          <TodayHabitsList habits={habits} />
        )}
      </div>
    </>
  );
};

export default Dashboard;
