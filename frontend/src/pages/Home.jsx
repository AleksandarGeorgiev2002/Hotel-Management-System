import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Calendar from '../components/Calendar';
import hotel_lobby from '../assets/hotel_lobby.jpg';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <section className="h-[90vh] relative flex items-center justify-center text-white">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url(${hotel_lobby})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'brightness(0.5)',
                    }}
                />
                <div className="z-10 text-center px-4">
                    <h1 className="text-5xl font-bold mb-4">Welcome to Hotel 101</h1>
                    <p className="text-xl">Experience tranquility, luxury, and nature in perfect harmony.</p>
                </div>
            </section>
            <section className="py-8 px-5 md:px-20 bg-gray-100 mt-10">
                <h2 className="text-3xl font-semibold mb-8 text-gray-800 text-center">Book Your Stay</h2>
                <Calendar />
            </section>
            <section className="py-16 px-4 md:px-20 text-center bg-gray-100">
                <h2 className="text-3xl font-semibold mb-8 text-gray-800">Why Choose Us</h2>
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-bold mb-2">Peaceful Location</h3>
                        <p className="text-gray-600">Nestled in lush greenery away from the city's noise.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-bold mb-2">Fine Dining</h3>
                        <p className="text-gray-600">Enjoy gourmet dishes crafted with local ingredients.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-bold mb-2">Modern Comfort</h3>
                        <p className="text-gray-600">Stylish rooms with modern amenities and stunning views.</p>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Home;
