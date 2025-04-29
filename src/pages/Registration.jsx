import React, { useState } from "react";
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../lib/firebase";
import { useAuthStore } from "../store/useAuthStore.js";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signup, isSigningUp } = useAuthStore();

  // Username Check

  // Confirm Password Check

  // Create user
  const createUser = () => {
    signup({ username, email, password });
  };
  // Get userId

  // Add user to userDB

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
      <legend className="fieldset-legend">Register</legend>
      <label className="label">Username</label>
      <input
        type="input"
        className="input validator"
        required
        placeholder="Username"
        pattern="[A-Za-z][A-Za-z0-9\-]*"
        minLength="3"
        maxLength="30"
        title="Only letters, numbers or dash"
        onChange={(e) => setUsername(e.target.value)}
      />
      <p className="validator-hint">
        Must be 3 to 30 characters containing only letters, numbers or dash
      </p>

      <label className="label">Email</label>
      <input
        type="email"
        className="input validator"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <p className="validator-hint">Please enter a valid email.</p>

      <label className="label">Password</label>
      <input
        type="password"
        className="input validator"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <label className="label">Confirm Password</label>
      <input
        type="password"
        className="input validator"
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button className="btn btn-neutral mt-4" onClick={createUser}>
        Create Account
      </button>
    </fieldset>
  );
};

export default Registration;
