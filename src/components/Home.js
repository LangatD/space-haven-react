import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-[url('https://via.placeholder.com/1920x400')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Find cowrking spaces near you</h1>
            <p className="text-lg mb-6">
              Flexible offices and workspaces in a modern coworking environment built for small businesses and teams.
            </p>
            <Link
              to="/spaces"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Find Your Space
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Spaces Section */}
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Coworking Spaces</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Space Card 1 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/400x250"
              alt="Space 1"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Private Office</h3>
              <p className="text-gray-600 mb-4">Hamilton, ON</p>
              <p className="text-blue-600 font-bold">$200/day</p>
            </div>
          </div>

          {/* Space Card 2 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/400x250"
              alt="Space 2"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Shared Workspace</h3>
              <p className="text-gray-600 mb-4">Hamilton, ON</p>
              <p className="text-blue-600 font-bold">$50/day</p>
            </div>
          </div>

          {/* Space Card 3 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/400x250"
              alt="Space 3"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Meeting Room</h3>
              <p className="text-gray-600 mb-4">Hamilton, ON</p>
              <p className="text-blue-600 font-bold">$100/hour</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;