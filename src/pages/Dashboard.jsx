import React, { useState, useEffect } from "react";
import useHabitStore from "../store/habitStore";
import useAuthStore from "../store/authStore";
import AddHabitForm from "../components/AddHabitForm";
import HabitCard from "../components/HabitCard";

const Dashboard = () => {
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
        <div className='flex items-center justify-between gap-4 mb-4 w-full'>
          <h2 className='text-xl font-bold'>Today's Habits</h2>
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
        <div className='flex flex-col gap-4 items-center justify-center w-full'>
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
      </div>
    </>
  );
};

export default Dashboard;
