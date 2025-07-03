import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker-override.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Calendar = () => {
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [clientMinDate] = useState(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
    });
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const handleCheckInDateChange = (date) => {
        setCheckInDate(date);
        if (checkOutDate && date && date >= checkOutDate) {
            setCheckOutDate(null);
        }
    };
    const minCheckOutDate = () => {
        let calculatedMinDate = new Date(clientMinDate.getTime());

        if (checkInDate) {
            const dayAfterCheckIn = new Date(checkInDate.getTime());
            dayAfterCheckIn.setDate(dayAfterCheckIn.getDate() + 1);
            dayAfterCheckIn.setHours(0, 0, 0, 0);

            if (dayAfterCheckIn > clientMinDate) {
                calculatedMinDate = dayAfterCheckIn;
            } else {
                calculatedMinDate = clientMinDate;
            }
        }
        return calculatedMinDate;
    };
    const navigate = useNavigate();
    const handleFilter = async () => {
        if (!checkInDate || !checkOutDate) {
            setFilteredRooms([]);
            alert('Please select both arrival and departure dates.');
            return;
        }

        try {
            const params = new URLSearchParams({
                checkInDate: checkInDate.toISOString().split('T')[0],
                checkOutDate: checkOutDate.toISOString().split('T')[0],
                adults: adults.toString(),
                children: children.toString()
            }).toString();

            const response = await fetch(
                `http://localhost:8080/api/rooms/filtered?${params}`,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    credentials: 'include'
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch rooms');
            }

            const data = await response.json();
            setFilteredRooms(data);
            navigate('/rooms/filtered');
        } catch (error) {
            console.error('Error:', error);
            setFilteredRooms([]);
        }
    };

    if (!clientMinDate) {
        return <div>Loading calendar...</div>;
    }

    return (
        <div
            className="flex flex-col mt-10 bg-gray-50 p-5 rounded-md shadow-md border border-gray-300 max-w-4xl mx-auto mb-0">
            <div className="flex flex-wrap md:flex-row items-center justify-center gap-6 w-full">
                <div className="flex flex-col">
                    <label className="block text-gray-700 font-medium mb-2 uppercase text-sm">
                        Arrival
                    </label>
                    <DatePicker
                        selected={checkInDate}
                        onChange={(date) => {
                            const newDate = date instanceof Date ? date : null;
                            handleCheckInDateChange(newDate);
                        }}
                        selectsStart
                        startDate={checkInDate}
                        endDate={checkOutDate}
                        dateFormat="dd/MM/yyyy"
                        minDate={clientMinDate}
                        showMonthYearDropdown
                        formatMonthYear={() => ""}
                        className="border border-gray-150 rounded-md px-3 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholderText="Select date"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="block text-gray-700 font-medium mb-2 uppercase text-sm">
                        Departure
                    </label>
                    <DatePicker
                        selected={checkOutDate}
                        onChange={(date) => {
                            if (date === null) {
                                setCheckOutDate(null);
                                return;
                            }
                            setCheckOutDate(new Date(date.getTime()));
                        }}
                        selectsEnd
                        startDate={checkInDate}
                        endDate={checkOutDate}
                        dateFormat="dd/MM/yyyy"
                        minDate={minCheckOutDate()}
                        disabled={!checkInDate}
                        showMonthYearDropdown
                        formatMonthYear={() => ""}
                        className="border border-gray-150 rounded-md px-3 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholderText="Select date"
                    />
                </div>

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

                <div className="flex flex-col justify-end mt-6">
                    <button
                        onClick={handleFilter}
                        className="bg-blue-600 text-white font-medium px-6 py-2 rounded-md shadow hover:bg-blue-700 transition"
                    >
                        Check Availability
                    </button>
                </div>
            </div>

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

                {/*{filteredRooms.length === 0 && arrivalDate && departureDate && (*/}
                {/*    <h3 className="text-xl font-semibold text-red-500">*/}
                {/*        No rooms available for the selected criteria.*/}
                {/*    </h3>*/}
                {/*)}*/}
                {filteredRooms.length === 0 && (!checkInDate || !checkOutDate) && (
                    <p className="text-gray-500 text-lg">Select dates and guests to check availability.</p>
                )}
            </div>
        </div>
    );
};

export default Calendar;