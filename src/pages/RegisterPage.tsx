import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const schema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .nullable()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      console.log(data);

      const response = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      localStorage.setItem("token", responseData.token);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(`Register failed. ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              {...register("email")}
              className={`mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className={`mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
              className={`mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            disabled={isLoading}
          >
            Register
          </button>
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
