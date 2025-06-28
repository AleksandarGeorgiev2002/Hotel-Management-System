import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = () => {
    const [arrivalDate, setArrivalDate] = useState(null);
    const [departureDate, setDepartureDate] = useState(null);

    // Initialize clientMinDate directly to today's date at midnight.
    // Use a function for useState initial value to ensure it only runs once.
    const [clientMinDate] = useState(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to midnight for consistent date comparison
        return today;
    });

    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    const [filteredRooms, setFilteredRooms] = useState([]); // Store filtered rooms

    // Define some dummy room data to be used instead of fetching from an API
    const dummyRooms = [
        { id: 1, name: 'Standard King Room', max_guests: 2 },
        { id: 2, name: 'Deluxe Queen Room', max_guests: 3 },
        { id: 3, name: 'Executive Suite', max_guests: 4 },
        { id: 4, name: 'Presidential Penthouse', max_guests: 6 },
    ];

    const handleArrivalChange = (date) => {
        setArrivalDate(date);
        // Reset departure date if it becomes invalid (before or same as arrival)
        if (departureDate && date && date >= departureDate) {
            setDepartureDate(null);
        }
    };

    const minDepartureDate = () => {
        let calculatedMinDate = new Date(clientMinDate.getTime());

        if (arrivalDate) {
            const dayAfterArrival = new Date(arrivalDate.getTime());
            dayAfterArrival.setDate(dayAfterArrival.getDate() + 1);
            dayAfterArrival.setHours(0, 0, 0, 0); // Ensure comparison is at midnight

            // If the day after arrival is later than today, use it as min departure
            if (dayAfterArrival > clientMinDate) {
                calculatedMinDate = dayAfterArrival;
            } else {
                // Otherwise, use today's date if arrival is today or in the past
                calculatedMinDate = clientMinDate;
            }
        }
        return calculatedMinDate;
    };

    // handleFilter now uses dummyRooms directly
    const handleFilter = () => {
        if (!arrivalDate || !departureDate) {
            setFilteredRooms([]); // Clear previous results if dates are incomplete
            return;
        }

        const totalGuests = adults + children;

        // Filter dummyRooms based on max_guests
        const availableRooms = dummyRooms.filter((room) => room.max_guests >= totalGuests);

        setFilteredRooms(availableRooms);
    };

    // Added a check for clientMinDate to ensure it's initialized before rendering DatePicker
    if (!clientMinDate) {
        return <div>Loading calendar...</div>;
    }

    return (
        <div
            className="flex flex-col mt-10 bg-gray-50 p-5 rounded-md shadow-md border border-gray-300 max-w-4xl mx-auto mb-0">
            {/* Input Fields Row */}
            <div className="flex flex-wrap md:flex-row items-center justify-center gap-6 w-full">
                {/* Arrival Date */}
                <div className="flex flex-col">
                    <label className="block text-gray-700 font-medium mb-2 uppercase text-sm">
                        Arrival
                    </label>
                    <DatePicker
                        selected={arrivalDate}
                        onChange={(date) => {
                            // Ensure date is a Date object, otherwise null
                            const newDate = date instanceof Date ? date : null;
                            handleArrivalChange(newDate);
                        }}
                        selectsStart
                        startDate={arrivalDate}
                        endDate={departureDate}
                        dateFormat="dd/MM/yyyy" // Set date format to day/month/year
                        minDate={clientMinDate} // Set minDate to today
                        showMonthYearDropdown // Allows easy year/month navigation
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
                        onChange={(date) => {
                            // Handle null date selection gracefully
                            if (date === null) {
                                setDepartureDate(null);
                                return;
                            }
                            setDepartureDate(new Date(date.getTime())); // Ensure a new Date object is set
                        }}
                        selectsEnd
                        startDate={arrivalDate}
                        endDate={departureDate}
                        dateFormat="dd/MM/yyyy"
                        minDate={minDepartureDate()} // Departure must be after arrival
                        disabled={!arrivalDate} // Disable if arrival date is not selected
                        showMonthYearDropdown
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
                        Check Availability
                    </button>
                </div>
            </div>

            {/* --- Display Results --- */}
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

                {/* Message for no rooms available after filtering */}
                {filteredRooms.length === 0 && arrivalDate && departureDate && (
                    <h3 className="text-xl font-semibold text-red-500">
                        No rooms available for the selected criteria.
                    </h3>
                )}
                {/* Default message before any dates are selected */}
                {filteredRooms.length === 0 && (!arrivalDate || !departureDate) && (
                    <p className="text-gray-500 text-lg">Select dates and guests to check availability.</p>
                )}
            </div>
        </div>
    );
};

export default Calendar;