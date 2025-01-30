import React, { useState } from "react";

const Membership = () => {
  const [membership, setMembership] = useState("Basic");

  const handleUpgrade = () => {
    setMembership("Premium");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Membership Management</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <p className="text-gray-600 mb-4">Current Membership: {membership}</p>
        <button
          onClick={handleUpgrade}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Upgrade to Premium
        </button>
      </div>
    </div>
  );
};

export default Membership;