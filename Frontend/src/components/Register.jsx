import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { register, handleSubmit, reset } = useForm();
  const [error, seterror] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    const email = data.email;
    const password = data.password;
    const confirmpassword = data.confirmpassword;
    seterror("");
    try {
      if (password != confirmpassword) {
        seterror("Password is Not Matched");
        return;
      }
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        {
          email: email,
          password: password,
          confirmpassword: confirmpassword,
        }
      );
      alert(response.data.message);
      // dispatch(login());
      navigate("/login");
      // console.log(response.data); // Assuming response.data is a success message
      reset();
    } catch (error) {
      if (error.message == "Request failed with status code 409") {
        alert("User is Already Exist Please Login");
        return;
      }
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center min-h-screen bg-white dark:bg-gray-900 ">
      <div className="container mx-auto ">
        <div className="max-w-md mx-auto my-10 border-2 dark:border-white rounded">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
              Sign Up
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Sign up to access your account
            </p>
          </div>
          <div className="m-7">
            <form onSubmit={handleSubmit(handleRegister)}>
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
                    htmlFor="Password"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="Password"
                  id="password"
                  {...register("password", { required: true })}
                  placeholder="Your Password"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label
                    htmlFor="Confirm Password"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Confirm Password
                  </label>
                </div>
                <input
                  type="password"
                  name="Confirm Password"
                  id="password"
                  {...register("confirmpassword", { required: true })}
                  placeholder="Your Confirm Password"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="mb-6">
                <button
                  type="submit"
                  className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                >
                  Sign up
                </button>
              </div>
              <p className="text-sm text-center text-gray-400">
                have an account?{" "}
                <Link
                  to="/login"
                  className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
                >
                  Sign in
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

export default Register;
