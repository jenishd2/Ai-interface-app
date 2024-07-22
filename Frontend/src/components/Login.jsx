import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice.js";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (data) => {
    // console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        {
          email: data.email,
          password: data.password,
        },
      );
      alert(response.data.message);
      // const userData = JSON.stringify(response.data.user)
      const accessToken = response.data.data.accessToken
      const userData = response.data.data.user
      const status = true
      // console.log(user)
      // console.log(accessToken)
      if(accessToken){
        localStorage.setItem("accessToken",accessToken)
        localStorage.setItem("status",true)
        localStorage.setItem("auth",JSON.stringify(userData))
        dispatch(login({accessToken,userData,status}))
        navigate('/'); // Navigate to the home page
        reset();
      }else{
        console.log("Access Token is Not")
      }
      // navigate("/");
      // localStorage.setItem("jwt",accessToken)
      // console.log(response.data); // Assuming response.data is a success message
      // reset()
    } catch (error) {
      if (error.message == "Request failed with status code 404") {
        alert("User is Not Registered");
        return;
      }
      alert(`Error ${error.message}`);
    }
  };

  return (

    <div className="flex items-center min-h-screen bg-white dark:bg-gray-900 ">
      <div className="container mx-auto ">
        <div className="max-w-md mx-auto my-10 border-2 dark:border-white rounded">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
              Sign In
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Sign in to access your account
            </p>
          </div>
          <div className="m-7">
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  {...register("email", { required: true })}
                  placeholder="you@company.com"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Password
                  </label>
                  <Link
                    to="forget-pass"
                    className="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  {...register("password", { required: true })}
                  placeholder="Your Password"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div className="mb-6">
                <button
                  type="submit"
                  className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                >
                  Sign In
                </button>
              </div>
              <p className="text-sm text-center text-gray-400">
                Don&#x27;t have an account yet?{" "}
                <Link
                  to="/signup"
                  className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
                >
                  Sign up
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
