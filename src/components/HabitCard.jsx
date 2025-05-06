import { useState } from "react";
import useHabitStore from "../store/habitStore";

const HabitCard = ({ id, name, completedDates, frequency }) => {
  const { removeHabit, toggleHabitDate } = useHabitStore();
  const [loadingDay, setLoadingDay] = useState(null); // date string being updated

  const today = new Date();

  const daysArray = [...Array(15)].map((_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - 14 + i);
    const dateStr = date.toISOString().split("T")[0];
    return {
      label: date.getDate(),
      completed: completedDates.includes(dateStr),
      dateStr,
    };
  });

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
    <div className="card bg-neutral-700 w-96 shadow-sm">
      <div className="card-body">
        <div className="flex justify-between w-full">
          <div className="flex justify-between items-start mb-2 w-full mr-2">
            <h2 className="card-title">{name}</h2>
            <div className="text-right">
              <p className="text-sm text-gray-300">{progressCount} days</p>
              <p className="text-xs text-cyan-400">{frequency}</p>
            </div>
          </div>
          <div className="card-actions justify-end">
            <button
              className="btn btn-square btn-xs"
              onClick={() => removeHabit(id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2 justify-evenly justify-items-center items-center content-evenly w-full">
          {daysArray.map((day, index) => (
            <button
              key={index}
              onClick={() => handleClick(day)}
              className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                day.completed
                  ? "bg-white text-black font-bold"
                  : "border-zinc-700 text-zinc-400"
              }`}
              disabled={loadingDay === day.dateStr}
            >
              {loadingDay === day.dateStr ? (
                <span className="loading loading-ring loading-lg text-primary"></span>
              ) : day.completed ? (
                "✓"
              ) : (
                day.label
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
