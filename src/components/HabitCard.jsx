import { useState } from "react";
import useHabitStore from "../store/habitStore";

const HabitCard = ({ id, name, completedDates, frequency }) => {
  const { removeHabit, toggleHabitDate } = useHabitStore();
  const [loadingDay, setLoadingDay] = useState(null); // date string being updated

  const today = new Date();

  // Sunday-start weekday labels
  const weekdayLabels = ["S", "M", "T", "W", "T", "F", "S"];

  const daysArray = [...Array(15)].map((_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - 14 + i);
    const dateStr = date.toISOString().split("T")[0];
    return {
      label: date.getDate(),
      dateStr,
      weekday: date.getDay(), // 0 (Sun) to 6 (Sat)
      completed: completedDates.includes(dateStr),
    };
  });

  // Pad with empty slots so calendar starts on correct weekday
  const firstDayWeekday = daysArray[0].weekday;
  const paddedDays = [...Array(firstDayWeekday).fill(null), ...daysArray];

  const handleClick = async (day) => {
    setLoadingDay(day.dateStr);
    try {
      await toggleHabitDate(id, day.dateStr, day.completed);
    } catch (error) {
      console.error("Toggle failed", error);
    } finally {
      setLoadingDay(null);
    }
  };

  const progressCount = completedDates.length;

  return (
    <div className='indicator'>
      <div className='indicator-item indicator-top'>
        <button
          className='btn btn-circle btn-xs bg-warning-content border-warning'
          onClick={() => removeHabit(id)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='size-4'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>
      <div className='card bg-neutral-700 w-96 shadow-sm'>
        <div className='card-body'>
          <div className='flex justify-between w-full'>
            <div className='flex justify-between items-start mb-2 w-full mr-2'>
              <h2 className='card-title wrap-normal md:wrap-anywhere'>
                {name}
              </h2>
              <div className='text-right'>
                <p className='text-sm text-gray-300'>{progressCount} days</p>
                <p className='text-xs text-cyan-400'>{frequency}</p>
              </div>
            </div>
          </div>
          {/* Day headers */}
          <div className='grid grid-cols-7 gap-1 text-center text-xs text-gray-400 mb-1'>
            {weekdayLabels.map((label, i) => (
              <div key={i}>{label}</div>
            ))}
          </div>
          <div className='grid grid-cols-7 gap-1 justify-evenly justify-items-center items-center content-evenly w-full'>
            {paddedDays.map((day, index) =>
              day ? (
                <button
                  key={index}
                  onClick={() => handleClick(day)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm transition duration-150 ${
                    day.completed
                      ? "bg-primary text-base-content font-bold"
                      : "border-zinc-700 text-zinc-400 hover:border-accent"
                  }`}
                  disabled={loadingDay === day.dateStr}>
                  {loadingDay === day.dateStr ? (
                    <span className='loading loading-ring loading-lg text-primary'></span>
                  ) : (
                    day.label
                  )}
                </button>
              ) : (
                <div key={index} className='w-8 h-8' />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
