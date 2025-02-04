import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';

const API_URL = process.env.REACT_APP_API_URL;

const UserProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");

        if (!token || !userId) {
          navigate("/login");
          return;
        }

        const profileResponse = await fetch(`${API_URL}/api/users/${userId}`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!profileResponse.ok) throw new Error('Failed to load profile data');
        
        const profileData = await profileResponse.json();
        setProfileData(profileData);

        const bookingsResponse = await fetch(`${API_URL}/api/users/${userId}/bookings`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!bookingsResponse.ok) throw new Error('Failed to load bookings');
        
        const bookingsData = await bookingsResponse.json();
        setBookings(bookingsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate]);

  const handleCancelBooking = async (bookingId) => {
    try {
      const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
      if (!confirmCancel) return;

      const response = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (!response.ok) throw new Error('Failed to cancel booking');
      
      setBookings(bookings.filter(booking => booking.id !== bookingId));
      alert('Booking cancelled successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Profile Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Account Details</h3>
              <p className="text-gray-600"><span className="font-medium">Name:</span> {profileData?.name || 'N/A'}</p>
              <p className="text-gray-600"><span className="font-medium">Email:</span> {profileData?.email || 'N/A'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Membership Status</h3>
              {profileData?.membership ? (
                <div className="space-y-2">
                  <p className="text-blue-600 font-semibold">{profileData.membership.name} Plan</p>
                  <p className="text-gray-600"><span className="font-medium">Price:</span> ${profileData.membership.price}/month</p>
                  <button onClick={() => navigate('/membership')} className="mt-3 text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">Change Plan</button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-gray-600">No active membership</p>
                  <button onClick={() => navigate('/membership')} className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">Choose Membership</button>
                </div>
              )}
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-4">Booking History</h3>
          {bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map(booking => (
                <div key={booking.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mb-2 md:mb-0">
                      <h4 className="font-semibold text-lg">{booking.space?.name || 'Unknown Space'}</h4>
                      <p className="text-gray-600 text-sm">{format(new Date(booking.date), 'MMM do yyyy, h:mm a')}</p>
                    </div>
                    {booking.status === 'active' && (
                      <button onClick={() => handleCancelBooking(booking.id)} className="text-red-600 hover:text-red-800 text-sm font-semibold mt-2 md:mt-0">Cancel Booking</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No upcoming bookings found</p>
              <button onClick={() => navigate('/spaces')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">Browse Available Spaces</button>
            </div>
          )}
        </div>
        <button onClick={() => { localStorage.clear(); navigate("/login"); }} className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors">Log Out</button>
      </div>
    </div>
  );
};

export default UserProfile;
