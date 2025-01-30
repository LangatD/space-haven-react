import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:5555"; // Flask Backend URL

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");

    if (!token || !userId) {
      navigate("/login"); // Redirect if not logged in
      return;
    }

    // Fetch user details from Flask backend
    fetch(`${API_URL}/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setUser(data);
      })
      .catch((err) => setError(err.message));
  }, [navigate]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <p className="text-gray-600 mb-2">Name: {user.name}</p>
        <p className="text-gray-600 mb-2">Email: {user.email}</p>
        <p className="text-gray-600">
          Membership: {user.membership ? user.membership : "None"}
        </p>
      </div>
      <button
        className="mt-4 bg-red-500 text-white p-2 rounded"
        onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
