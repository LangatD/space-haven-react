import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const SpaceList = () => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/spaces`);
        setSpaces(response.data);
      } catch (error) {
        setError("Failed to load spaces. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchSpaces();
  }, []);

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
      <h1 className="text-3xl font-bold mb-6">Available Coworking Spaces</h1>
      
      {spaces.length === 0 ? (
        <div className="text-center text-gray-600">
          No spaces currently available. Check back later!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaces.map((space) => (
            <div 
              key={space.id} 
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <Link to={`/space/${space.id}`}>
                <div className="relative h-48 bg-gray-100">
                  <img 
                    src={space.image_path} 
                    alt={space.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/placeholder-space.jpg';
                    }}
                  />
                  {!space.availability && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                      Booked
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{space.name}</h2>
                  <div className="flex items-center text-gray-600 mb-2">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{space.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-bold">
                      ${space.price}/hour
                    </span>
                    {space.availability && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                        Available
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpaceList;