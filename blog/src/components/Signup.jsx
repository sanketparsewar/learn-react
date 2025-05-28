import React, { useState } from "react";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { Button, Input } from "./index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Link } from "react-router-dom";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const signup = async (data) => {
    setError("");
    try {
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentuser();
        if (userData) {
          dispatch(authLogin(userData));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center md:min-h-screen lg:min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign Up
        </h2>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <form onSubmit={handleSubmit(signup)} className="space-y-4">
          <Input
            type="text"
            label="Name"
            placeholder="Enter your name"
            {...register("name", { required: true })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
              validate: (value) => {
                // validate password
                return (
                  value.length >= 6 || "Password must be at least 6 characters"
                );
              },
            })}
          />
          <Button type="submit">Sign Up</Button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
