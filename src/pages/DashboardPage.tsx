import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../@types";
import { toast, ToastContainer } from "react-toastify";
import { PATH_AUTH, PATH_DASHBOARD } from "../routes/paths.ts";

const DashboardPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const fetchUserData = async (
    {
      pageNumber,
      usersNumberPerPage,
    }: {
      pageNumber?: number;
      usersNumberPerPage?: number;
    } = {
      pageNumber: currentPage,
      usersNumberPerPage: usersPerPage,
    }
  ) => {
    try {
      console.log(pageNumber, usersNumberPerPage);

      const response = await fetch(
        `https://reqres.in/api/users?page=${pageNumber}&per_page=${usersNumberPerPage}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      console.log(data);

      setUsers(data.data);
      setTotalPages(data.total_pages);
    } catch (err) {
      setError("Failed to load users.");
      console.error("Error fetching users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData({});
  }, []);

  const paginate = (pageNumber: number) => {
    fetchUserData({ pageNumber, usersNumberPerPage: usersPerPage });
    setCurrentPage(pageNumber);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);
    fetchUserData({ usersNumberPerPage: value });
    setUsersPerPage(value);
    setCurrentPage(1); // Reset to the first page when changing users per page
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(PATH_AUTH.login);
  };

  const handleDeleteUser = async (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`https://reqres.in/api/users/${userId}`, {
          method: "DELETE",
        });

        if (response.status !== 204) {
          throw new Error();
        }

        setUsers(users.filter((user) => user.id !== userId));
        toast.success("User deleted successfully!");
      } catch (err) {
        console.error("Error deleting user:", err);
        toast.error("Failed to delete user.", err);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <div className="flex justify-end items-center mb-4">
            <label htmlFor="usersPerPage" className="mr-2">
              Users Per Page:
            </label>
            <select
              id="usersPerPage"
              value={usersPerPage}
              onChange={handlePerPageChange}
              className="border rounded-md p-2 mr-10"
            >
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={6}>6</option>
              <option value={8}>8</option>
              <option value={10}>10</option>
              <option value={12}>12</option>
            </select>
            <Link
              to={PATH_DASHBOARD.users.create}
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            >
              Create User
            </Link>
          </div>

          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-100 border-b">ID</th>
                <th className="px-4 py-2 bg-gray-100 border-b">Avatar</th>
                <th className="px-4 py-2 bg-gray-100 border-b">Name</th>
                <th className="px-4 py-2 bg-gray-100 border-b">Email</th>
                <th className="px-4 py-2 bg-gray-100 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 &&
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-2 border-b text-center">
                      {user.id}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      <img
                        src={user.avatar}
                        alt={user.first_name}
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td className="px-4 py-2 border-b text-center">{`${user.first_name} ${user.last_name}`}</td>
                    <td className="px-4 py-2 border-b text-center">
                      {user.email}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      <Link
                        to={PATH_DASHBOARD.users.edit(user.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Edit
                      </Link>

                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-4">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  className={`bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md mx-1 ${
                    currentPage === number ? "bg-blue-600" : ""
                  }`}
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              )
            )}

            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default DashboardPage;
