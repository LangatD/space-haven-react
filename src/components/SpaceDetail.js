import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SpaceDetail = () => {
  const { id } = useParams();
  const [space, setSpace] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/spaces/${id}`)
      .then((response) => setSpace(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!space) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={space.image} alt={space.name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{space.name}</h1>
          <p className="text-gray-600 mb-2">Location: {space.location}</p>
          <p className="text-blue-600 font-bold mb-4">Price: ${space.price}/day</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default SpaceDetail;