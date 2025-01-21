import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { UserCreate } from "../@types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { PATH_DASHBOARD } from "../routes/paths.ts";

const schema = yup.object({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
});

const CreateEditUserPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserCreate>({ resolver: yupResolver(schema) });

  const fetchData = async () => {
    if (userId) {
      try {
        const response = await fetch(`https://reqres.in/api/users/${userId}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(`Failed to fetch user: ${data.error}`);
        }
        reset(data.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId, reset]);

  const onSubmit = async (data: UserCreate) => {
    setIsLoading(true);

    try {
      const method = userId ? "PUT" : "POST";
      const url = userId
        ? `https://reqres.in/api/users/${userId}`
        : "https://reqres.in/api/users";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error((await response.json()).error);
      }

      if (userId) {
        toast.success("User updated successfully!", {
          autoClose: 3000,
        });
      } else {
        toast.success("User created successfully!", {
          autoClose: 3000,
        });
      }

      setTimeout(() => {
        navigate(PATH_DASHBOARD.root);
      }, 4000);
    } catch (error) {
      console.error("Error saving user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">
        {userId ? "Edit User" : "Create User"}
      </h1>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              {...register("first_name")}
              className={`mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                errors.first_name ? "border-red-500" : ""
              }`}
            />
            {errors.first_name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.first_name.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              {...register("last_name")}
              className={`mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                errors.last_name ? "border-red-500" : ""
              }`}
            />
            {errors.last_name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.last_name.message}
              </p>
            )}
          </div>
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
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {userId ? "Save Changes" : "Create User"}
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateEditUserPage;
