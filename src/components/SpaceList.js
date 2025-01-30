import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SpaceList = () => {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/spaces")
      .then((response) => setSpaces(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Available Coworking Spaces</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spaces.map((space) => (
          <div key={space.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Link to={`/space/${space.id}`}>
              <img src={space.image} alt={space.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{space.name}</h2>
                <p className="text-gray-600">{space.location}</p>
                <p className="text-blue-600 font-bold">${space.price}/day</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpaceList;