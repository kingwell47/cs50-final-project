import React, { useState } from "react";
import useAuthStore from "../store/authStore";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, loading } = useAuthStore();

  const loginUser = () => {
    if (formData.email && formData.password) {
      login(formData.email, formData.password);
    }
  };

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
      <legend className="fieldset-legend">Login</legend>

      <label className="label">Email</label>
      <input
        type="email"
        className="input validate"
        placeholder="your@email.com"
        required
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      <label className="label">Password</label>
      <input
        type={showPassword ? "text" : "password"}
        className="input validate"
        placeholder="Password"
        required
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />

      <div className="flex gap-2 items-center mt-2 justify-end">
        <label htmlFor="showPassword" className="label">
          Show Password
        </label>
        <input
          className="checkbox checkbox-accent rounded-full size-4"
          type="checkbox"
          name="showPassword"
          id="showPassword"
          onChange={(e) => setShowPassword(e.target.checked)}
        />
      </div>

      <button
        className="btn btn-neutral mt-4"
        onClick={loginUser}
        disabled={!(formData.email && formData.password)}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </fieldset>
  );
};

export default Login;
