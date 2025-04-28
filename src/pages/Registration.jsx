import React from "react";

const Registration = () => {
  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
      <legend className="fieldset-legend">Register</legend>

      <input
        type="input"
        className="input validator"
        required
        placeholder="Username"
        pattern="[A-Za-z][A-Za-z0-9\-]*"
        minLength="3"
        maxLength="30"
        title="Only letters, numbers or dash"
      />
      <p className="validator-hint">
        Must be 3 to 30 characters
        <br />
        containing only letters, numbers or dash
      </p>

      <label className="label">Email</label>
      <input type="email" className="input" placeholder="Email" />

      <label className="label">Confirm Email</label>
      <input type="email" className="input" placeholder="Confirm Email" />

      <label className="label">Password</label>
      <input type="password" className="input" placeholder="Password" />

      <button className="btn btn-neutral mt-4">Create Account</button>
    </fieldset>
  );
};

export default Registration;
