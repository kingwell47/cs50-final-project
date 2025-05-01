import { useState } from "react";
import useHabitStore from "../store/habitStore";
import useAuthStore from "../store/authStore";

const AddHabitForm = ({ onClose }) => {
  const { addHabit } = useHabitStore();
  const { user } = useAuthStore();

  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("daily");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    const habitData = {
      name,
      frequency,
    };

    await addHabit(habitData, user.uid);
    setName("");
    setFrequency("daily");
    if (onClose) onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-lg font-semibold">Add New Habit</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Habit Name</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          placeholder="e.g. Drink water"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Frequency</label>
        <select
          className="w-full border rounded p-2"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekdays">Weekdays</option>
          <option value="custom">Custom (coming soon)</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add Habit
      </button>
    </form>
  );
};

export default AddHabitForm;
