import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const SpaceDetail = () => {
  const { id } = useParams();
  const [space, setSpace] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/spaces/${id}`);
        setSpace(response.data);
      } catch (err) {
        console.error("Error fetching space:", err);
      }
    };
    fetchSpace();
  }, [id]);

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("You must be logged in to book a space.");

      const response = await axios.post(`${API_URL}/api/bookings`, {
        space_id: id,
        date: bookingDate
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setSuccessMessage("Booking successful!");
      setBookingError('');
    } catch (err) {
      setBookingError(err.response?.data?.error || "Booking failed. Try again.");
    }
  };

  if (!space) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={space.image} alt={space.name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{space.name}</h1>
          <p className="text-gray-600 mb-2">Location: {space.location}</p>
          <p className="text-blue-600 font-bold mb-4">Price: ${space.price}/hour</p>

          <div className="mb-4">
            <label className="block text-gray-700">Choose Booking Date:</label>
            <input
              type="datetime-local"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {bookingError && <p className="text-red-500">{bookingError}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}

          <button
            onClick={handleBooking}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpaceDetail;
