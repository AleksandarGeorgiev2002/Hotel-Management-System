import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Booking = () => {
  const { typeOfRoom } = useParams();

  const roomPrices = {
    standard_room: 100,
    luxury_room: 150,
    vip_room: 250,
  };

  const normalizedTypeOfRoom = typeOfRoom.replace('-', '_');
  const pricePerNight = roomPrices[normalizedTypeOfRoom] || 0;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [daysOfStay, setDaysOfStay] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateTotalPrice = () => {
    const checkInDate = new Date(formData.checkInDate);
    const checkOutDate = new Date(formData.checkOutDate);
    const timeDifference = checkOutDate - checkInDate;
    const days = timeDifference > 0 ? timeDifference / (1000 * 60 * 60 * 24) : 0;
    setDaysOfStay(days);
    return days * pricePerNight;
  };

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [formData.checkInDate, formData.checkOutDate, pricePerNight]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking Details:', {
      ...formData,
      totalPrice,
    });
    alert(`Booking confirmed for ${typeOfRoom.replace('-', ' ')}!`);
  };

  return (
      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">Booking</h1>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Room Details</h2>
            <p className="text-gray-600">Room Type: {typeOfRoom.replace('-', ' ')}</p>
            <p className="text-gray-600">Price: €{pricePerNight} / night</p>
          </div>
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Details</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Full Name</label>
              <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your full name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Email</label>
              <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Phone</label>
              <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your phone number"
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Booking Details</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Check-In Date</label>
              <input
                  type="date"
                  name="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Check-Out Date</label>
              <input
                  type="date"
                  name="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={handleChange}
                  min={formData.checkInDate}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Guests</label>
              <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  min="1"
              />
            </div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Price Summary</h2>
              <p className="text-gray-600">
                Total: €{totalPrice} ({daysOfStay} {daysOfStay === 1 ? 'night' : 'nights'})
              </p>
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
  );
};

export default Booking;
