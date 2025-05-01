import React, { useState } from "react";
import useAuthStore from "../store/authStore";
import { Link } from "react-router-dom";

const blankForm = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(blankForm);

  const { register, loading, setError } = useAuthStore();

  // Username Check
  const validateForm = () => {
    if (!formData.displayName.trim())
      return setError("Display Name is required");
    if (!formData.email.trim()) return setError("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return setError("Invalid email format");
    if (!formData.password) return setError("Password is required");
    if (formData.password.length < 6)
      return setError("Password must be at least 6 characters");
    if (formData.confirmPassword != formData.password)
      return setError("Passwords do not match");
    return true;
  };

  // Create user
  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) {
      register(formData.displayName, formData.email, formData.password);
    }
  };

  return (
    <fieldset
      onSubmit={handleSubmit}
      className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
    >
      <legend className="fieldset-legend">Registration</legend>
      <label className="label">Display Name</label>
      <input
        type="input"
        className="input"
        required
        placeholder="Display Name"
        pattern="[A-Za-z][A-Za-z0-9\-]*"
        minLength="3"
        maxLength="30"
        title="Only letters, numbers or dash"
        onChange={(e) =>
          setFormData({ ...formData, displayName: e.target.value })
        }
      />

      <label className="label">Email</label>
      <input
        type="email"
        className="input validator"
        placeholder="Email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <p className="validator-hint">Please enter a valid email.</p>

      <label className="label">Password</label>
      <input
        type={showPassword ? "text" : "password"}
        className="input validator"
        placeholder="Password"
        required
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />

      <label className="label">Confirm Password</label>
      <input
        type={showPassword ? "text" : "password"}
        className="input validator"
        placeholder="Confirm Password"
        required
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
      />
      <div className="flex gap-2 items-center mt-2 justify-end">
        <label htmlFor="showPassword" className="label">
          Show Passwords
        </label>
        <input
          className="checkbox checkbox-accent rounded-full size-4"
          type="checkbox"
          name="showPassword"
          id="showPassword"
          onChange={(e) => setShowPassword(e.target.checked)}
        />
      </div>

      <button className="btn btn-neutral mt-4" type="submit">
        {loading ? "Creating Account..." : "Create Account"}
      </button>
      <div className="text-center">
        <p className="text-base-content/60">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary">
            Sign in
          </Link>
        </p>
      </div>
    </fieldset>
  );
};

export default Registration;
