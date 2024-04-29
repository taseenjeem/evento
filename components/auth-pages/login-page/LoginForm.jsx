"use client";

import { userLogin } from "@/actions";
import { useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      await userLogin(formData);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <>
      <div className="my-2 text-red-500">{error}</div>
      <form className="login-form" onSubmit={handleLogin}>
        {/* email */}
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" />
        </div>
        {/* password */}
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <button
          type="submit"
          className="btn-primary w-full mt-4 bg-indigo-600 hover:bg-indigo-800"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
