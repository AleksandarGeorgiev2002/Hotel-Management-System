import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RoomCard from '../components/RoomCard';

// Import local images
import standardRoom from '../assets/standard_room.jpg';
import luxuryRoom from '../assets/luxury_room.jpg';
import vipRoom from '../assets/vip_room.jpg';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/rooms')
      .then((response) => {
        const sortedRooms = response.data.sort((a, b) => a.pricePerNight - b.pricePerNight);
        setRooms(sortedRooms);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error showing rooms:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading rooms...</div>;
  }

  if (rooms.length === 0) {
    return <div className="text-center mt-10">No available rooms at the moment.</div>;
  }

  // Map room types to local images
  const roomImages = {
    standard_room: standardRoom,
    luxury_room: luxuryRoom,
    vip_room: vipRoom,
  };

  const capitalizedType = (str) => {
    if (!str) return ''; // Handle empty or undefined strings
    return str
      .split(' ')
      .map((word, index) => {
        if (index === 0 && word.toLowerCase() === 'vip') {
          return word.toUpperCase(); // Fully uppercase the first word if it's "VIP"
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); // Capitalize other words
      })
      .join(' ');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">Our Rooms</h1>
      <div className="grid gap-8 md:grid-cols-3">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            name={capitalizedType(room.type.replace('_', ' '))}
            image={roomImages[room.type]} // Use the local image based on room type
            description={room.description}
            price={`€${room.pricePerNight} / night`}
          />
        ))}
      </div>
    </div>
  );
};

export default Rooms;