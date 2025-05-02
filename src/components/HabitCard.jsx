import React from "react";

const HabitCard = ({ name, completedDates, frequency }) => {
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

  const progressCount = completedDates.length;

  return (
    <div className="card bg-neutral w-96 shadow-sm">
      <div className="card-body">
        <div className="card-actions justify-end">
          <button className="btn btn-square btn-sm">
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
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold leading-tight">{name}</h3>
          <div className="text-right">
            <p className="text-sm text-gray-300">{progressCount} days</p>
            <p className="text-xs text-cyan-400">{frequency}</p>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {daysArray.map((day, index) => (
            <div
              key={index}
              className={`w-8 h-8 flex items-center justify-center rounded-md border ${
                day.completed
                  ? "bg-white text-black font-bold"
                  : "border-zinc-700 text-zinc-400"
              }`}
            >
              {day.completed ? "✓" : day.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
