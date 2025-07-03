import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBed, FaWifi, FaUtensils, FaUsers, FaBinoculars } from 'react-icons/fa';
import standardRoom from '../assets/standard_room.jpg';
import luxuryRoom from '../assets/luxury_room.jpg';
import vipRoom from '../assets/vip_room.jpg';

const RoomDetails = () => {
  const { typeOfRoom } = useParams();
  const navigate = useNavigate();

  const normalizedTypeOfRoom = typeOfRoom.toLowerCase();

  const roomDetails = {
    'standard-room': {
      image: standardRoom,
      bed: 'Double bed 140-180cm x 200cm',
      view: 'Street view',
      wifi: 'Free wifi included',
      breakfast: 'Included',
      guests: 'Maximum number of guests: 2 adults',
      price: 'From €100 / room / night',
    },
    'luxury-room': {
      image: luxuryRoom,
      bed: 'King-size bed 180cm x 200cm',
      view: 'Panoramic city view',
      wifi: 'Free wifi included',
      breakfast: 'Included',
      dinner: 'Included',
      guests: 'Maximum number of guests: 4 adults',
      price: 'From €150 / room / night',
    },
    'vip-room': {
      image: vipRoom,
      bed: 'Premium king-size bed 200cm x 200cm',
      view: 'Mountain view',
      wifi: 'High-speed wifi included',
      breakfast: 'Included',
      dinner: 'Included',
      guests: 'Maximum number of guests: 4 adults',
      price: 'From €250 / room / night',
    },
  };

  const details = roomDetails[normalizedTypeOfRoom];

  if (!details) {
    return <div className="text-center mt-10">Room type not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-20 px-16 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-12 flex flex-col md:flex-row gap-16">
        <div className="flex-shrink-0">
          <img
            src={details.image}
            alt={typeOfRoom}
            className="w-full md:w-[600px] h-auto object-cover rounded-lg"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-6xl font-bold text-blue-800 mb-8">
            {typeOfRoom
              .replace('-', ' ')
              .split(' ')
              .map((word) =>
                word.toLowerCase() === 'vip' ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1)
              )
              .join(' ')}
          </h1>
          <h2 className="text-4xl font-semibold text-gray-800 mb-10">Room Details</h2>
          <ul className="space-y-8">
            <li><FaBed className="inline-block text-blue-600 mr-4 text-3xl" /> <strong>Bed:</strong> {details.bed}</li>
            <li>
              <FaBinoculars className="inline-block text-blue-600 mr-4 text-3xl" /> <strong>View:</strong> {details.view}
            </li>
            <li><FaWifi className="inline-block text-blue-600 mr-4 text-3xl" /> <strong>Wifi:</strong> {details.wifi}</li>
            <li><FaUtensils className="inline-block text-blue-600 mr-4 text-3xl" /> <strong>Breakfast:</strong> {details.breakfast}</li>
            {details.dinner && (
              <li>
                <FaUtensils className="inline-block text-blue-600 mr-4 text-3xl" /> <strong>Dinner:</strong> {details.dinner}
              </li>
            )}
            <li><FaUsers className="inline-block text-blue-600 mr-4 text-3xl" /> <strong>Guests:</strong> {details.guests}</li>
          </ul>
          <p className="text-3xl font-semibold text-blue-800 mt-10">{details.price}</p>
          <button
            className="mt-8 px-6 py-3 bg-blue-600 text-white text-xl font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            onClick={() => navigate(`/${typeOfRoom}/booking`)}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
