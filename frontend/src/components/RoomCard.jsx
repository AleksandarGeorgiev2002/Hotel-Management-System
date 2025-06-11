import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoomCard = ({ name, image, description, price }) => {
  const navigate = useNavigate();

  // Function to capitalize the first letter of each word
  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleBookNow = () => {
    // Normalize the route by replacing spaces with hyphens and converting to lowercase
    const route = name.toLowerCase().replace(/\s+/g, '-'); // Convert "VIP Room" -> "vip-room"
    navigate(`/${route}`);
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition">
      <img
        src={image}
        alt={name}
        className="w-full h-100 object-cover rounded-t-lg"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{capitalizeWords(name)}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        <p className="text-lg font-semibold text-blue-800 mb-6">{price}</p>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleBookNow}
        >
          More Details
        </button>
      </div>
    </div>
  );
};

export default RoomCard;