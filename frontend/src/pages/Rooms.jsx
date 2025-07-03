import React, {useEffect, useState} from 'react';
import axios from 'axios';
import RoomCard from '../components/RoomCard';
import standardRoom from '../assets/standard_room.jpg';
import luxuryRoom from '../assets/luxury_room.jpg';
import vipRoom from '../assets/vip_room.jpg';

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                let response;
                if (location.pathname === '/rooms/filtered') {
                    const params = new URLSearchParams(location.search);
                    response = await axios.get(`http://localhost:8080/api/rooms/filtered${location.search}`)
                } else {
                    response = await axios.get('http://localhost:8080/api/rooms');
                }
                const sortedRooms = response.data.sort((a, b) => a.price - b.price);
                setRooms(sortedRooms);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, [location.pathname, location.search])

    if (loading) {
        return <div className="text-center mt-10">Loading rooms...</div>;
    }

    if (rooms.length === 0) {
        return (
            <div className="text-center mt-10">
                {location.pathname === '/rooms/filtered'
                    ? 'No rooms available for the selected criteria.'
                    : 'No rooms available at the moment.'}
            </div>
        );
    }

    const roomImages = {
        standard_room: standardRoom,
        luxury_room: luxuryRoom,
        vip_room: vipRoom,
    };

    const capitalizedType = (str) => {
        if (!str) return '';
        return str
            .split(' ')
            .map((word, index) => {
                if (index === 0 && word.toLowerCase() === 'vip') {
                    return word.toUpperCase();
                }
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
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
                        image={roomImages[room.type]}
                        description={room.description}
                        price={`€${room.pricePerNight} / night`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Rooms;
