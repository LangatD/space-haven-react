import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://space-haven-3.onrender.com";

const Membership = () => {
  const [memberships, setMemberships] = useState([]);
  const [currentMembership, setCurrentMembership] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (!token || !userId) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        console.log("Fetching data from API_URL:", API_URL);
        const userResponse = await fetch(`${API_URL}/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!userResponse.ok) throw new Error("Failed to fetch user data");
        const userData = await userResponse.json();
        setCurrentMembership(userData.membership?.id || null);

        const membershipsResponse = await fetch(`${API_URL}/api/memberships`);
        if (!membershipsResponse.ok) throw new Error("Failed to fetch memberships");
        const membershipsData = await membershipsResponse.json();
        setMemberships(membershipsData);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, token, userId]);

  const handleUpgrade = async (membershipId) => {
    if (currentMembership === membershipId || updating) return;

    setUpdating(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/users/${userId}/membership`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ membership_id: membershipId }),
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to update membership");
      }

      setCurrentMembership(data.membership?.id || null);
      
      setMemberships(prev => prev.map(m => 
        m.id === data.membership.id ? { ...m, ...data.membership } : m
      ));

    } catch (error) {
      setError(error.message);
    } finally {
      setUpdating(false);
    }
  };

  const renderFeatures = (features) => {
    if (!features) return null;
    const featuresArray = typeof features === 'string' 
      ? features.split(',') 
      : features;

    return featuresArray.map((feature, index) => (
      <li key={index} className="flex items-center mb-2">
        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        {feature.trim()}
      </li>
    ));
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Membership Management</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Current Membership</h2>
          <p className="text-gray-600 mt-2">
            {currentMembership 
              ? memberships.find(m => m.id === currentMembership)?.name
              : "No active membership"}
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-4">Available Memberships</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {memberships.map((membership) => (
            <div
              key={membership.id}
              className={`border rounded-lg p-4 transition-all ${
                currentMembership === membership.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <h3 className="text-lg font-bold mb-2">{membership.name}</h3>
              <p className="text-2xl font-bold text-blue-600 mb-3">
                ${membership.price}/month
              </p>
              <ul className="mb-4">
                {renderFeatures(membership.features)}
              </ul>
              <button
                onClick={() => handleUpgrade(membership.id)}
                className={`w-full py-2 rounded transition-colors ${
                  currentMembership === membership.id || updating
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
                disabled={currentMembership === membership.id || updating}
              >
                {updating ? "Updating..." : currentMembership === membership.id ? "Current Plan" : "Select Plan"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Membership;
