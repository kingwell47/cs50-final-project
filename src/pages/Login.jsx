import React, { useState } from "react";
import useAuthStore from "../store/authStore";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading } = useAuthStore();

  const signInUser = () => {
    login(email, password);
  };

  return (
    <fieldset className='fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4'>
      <legend className='fieldset-legend'>Login</legend>

      <label className='label'>Email</label>
      <input
        type='email'
        className='input'
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className='label'>Password</label>
      <input
        type='password'
        className='input'
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className='btn btn-neutral mt-4' onClick={signInUser}>
        Login
      </button>
    </fieldset>
  );
};

export default Login;
