import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = () => {
    const [arrivalDate, setArrivalDate] = useState(null);
    const [departureDate, setDepartureDate] = useState(null);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    const [rooms, setRooms] = useState([]); // Store rooms fetched from the database
    const [filteredRooms, setFilteredRooms] = useState([]); // Store filtered rooms

    // Fetch rooms from the database when the component mounts
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('/api/rooms'); // Replace with your API endpoint
                const data = await response.json();
                setRooms(data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, []);

    // Filter rooms based on criteria
    const handleFilter = () => {
        if (!arrivalDate || !departureDate) {
            alert('Please select both arrival and departure dates.');
            return;
        }

        const totalGuests = adults + children;

        // Filter rooms where max_guests >= totalGuests
        const availableRooms = rooms.filter((room) => room.max_guests >= totalGuests);

        setFilteredRooms(availableRooms);
    };

    return (
        <div className="flex flex-col mt-10 bg-gray-50 p-5 rounded-md shadow-md border border-gray-300 max-w-4xl mx-auto mb-0">
            {/* Input Fields Row */}
            <div className="flex flex-wrap md:flex-row items-center justify-center gap-6 w-full">
                {/* Arrival Date */}
                <div className="flex flex-col">
                    <label className="block text-gray-700 font-medium mb-2 uppercase text-sm">
                        Arrival
                    </label>
                    <DatePicker
                        selected={arrivalDate}
                        onChange={(date) => setArrivalDate(date)}
                        dateFormat="dd/MM/yyyy" // Set date format to day/month/year
                        className="border border-gray-150 rounded-md px-3 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholderText="Select date"
                    />
                </div>

                {/* Departure Date */}
                <div className="flex flex-col">
                    <label className="block text-gray-700 font-medium mb-2 uppercase text-sm">
                        Departure
                    </label>
                    <DatePicker
                        selected={departureDate}
                        onChange={(date) => setDepartureDate(date)}
                        dateFormat="dd/MM/yyyy" 
                        minDate={arrivalDate}
                        className="border border-gray-150 rounded-md px-3 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholderText="Select date"
                    />
                </div>

                {/* Adults Input */}
                <div className="flex flex-col">
                    <label className="block text-gray-700 font-medium mb-2 uppercase text-sm">
                        Adults
                    </label>
                    <input
                        type="number"
                        min="1"
                        value={adults}
                        onChange={(e) => setAdults(parseInt(e.target.value, 10))}
                        className="border border-gray-150 rounded-md px-3 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="1"
                    />
                </div>

                {/* Children Input */}
                <div className="flex flex-col">
                    <label className="block text-gray-700 font-medium mb-2 uppercase text-sm">
                        Children
                    </label>
                    <input
                        type="number"
                        min="0"
                        value={children}
                        onChange={(e) => setChildren(parseInt(e.target.value, 10))}
                        className="border border-gray-150 rounded-md px-3 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
                    />
                </div>

                {/* Check Button */}
                <div className="flex flex-col justify-end mt-6">
                    <button
                        onClick={handleFilter}
                        className="bg-blue-600 text-white font-medium px-6 py-2 rounded-md shadow hover:bg-blue-700 transition"
                    >
                        Check
                    </button>
                </div>
            </div>

            {/* Filtered Rooms and No Rooms Message */}
            <div className="w-full text-center mt-8">
                {filteredRooms.length > 0 && (
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Available Rooms:</h3>
                        <ul className="list-disc pl-5 inline-block text-left">
                            {filteredRooms.map((room) => (
                                <li key={room.id} className="text-gray-700">
                                    {room.name} (Max Guests: {room.max_guests})
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {filteredRooms.length === 0 && arrivalDate && departureDate && (
                    <h3 className="text-xl font-semibold text-red-500">
                        No rooms available for the selected criteria.
                    </h3>
                )}
            </div>
        </div>
    );
};

export default Calendar;