import { useState } from "react";
import useHabitStore from "../store/habitStore";
import useAuthStore from "../store/authStore";

const AddHabitForm = () => {
  const { addHabit, loading } = useHabitStore();
  const { user } = useAuthStore();

  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("Daily");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    const habitData = {
      name,
      frequency,
    };

    try {
      await addHabit(habitData, user.uid);
      setName("");
      setFrequency("daily");
      document.getElementById("add_habit_modal").close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} method="dialog" className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Add New Habit</h2>
      <div>
        <label className="label block text-sm font-medium mb-1">
          Habit Name
        </label>
        <input
          type="text"
          className="input w-full p-2"
          placeholder="e.g. Drink water"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
          maxLength={60}
        />
      </div>

      <div>
        <label className="label block text-sm font-medium mb-1">
          Frequency
        </label>

        <ul className="flex gap-4">
          <li className="flex justify-start items-center gap-2">
            <input
              type="radio"
              value="Daily"
              name="frequency"
              className="radio radio-primary"
              defaultChecked
              onChange={(e) => setFrequency(e.target.value)}
            />
            <span className="label">Daily</span>
          </li>
          <li className="flex justify-start items-center gap-2">
            <input
              type="radio"
              value="Weekdays"
              name="frequency"
              className="radio radio-primary"
              onChange={(e) => setFrequency(e.target.value)}
            />
            <span className="label">Weekdays</span>
          </li>
        </ul>
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Adding..." : "Add Habit"}
      </button>
    </form>
  );
};

export default AddHabitForm;
