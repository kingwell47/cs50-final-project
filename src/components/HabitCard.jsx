import { useState } from "react";
import useHabitStore from "../store/habitStore";

const HabitCard = ({ id, name, completedDates, frequency }) => {
  const { checkingLoad, toggleHabitDate } = useHabitStore();
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
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold leading-tight">{name}</h3>
          <div className="text-right">
            <p className="text-sm text-gray-300">{progressCount} days</p>
            <p className="text-xs text-cyan-400">{frequency}</p>
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
