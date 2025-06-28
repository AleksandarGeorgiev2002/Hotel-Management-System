import React, { useState } from 'react';
import grilledSalmon from '../assets/dishes/salmon.jpg';
import filetMignon from '../assets/dishes/grilled_steak.jpg';
import caesarSalad from '../assets/dishes/caesar_salad.jpg';
import lobsterBisque from '../assets/dishes/lobster_soup.jpg';
import margheritaPizza from '../assets/dishes/pizza_margarita.jpg';
import tiramisu from '../assets/dishes/Tiramisu.jpg';
import chickenAlfredo from '../assets/dishes/chicken_alfredo.jpg';
import beefWellington from '../assets/dishes/welington.jpg';
import shrimpScampi from '../assets/dishes/Linguini.jpg';
import vegetableStirFry from '../assets/dishes/sauteed_veggies_savory_sauce.jpg';
import chocolateLavaCake from '../assets/dishes/molten_cake.jpg';
import frenchOnionSoup from '../assets/dishes/french_onion_soop.jpg';
import capreseSalad from '../assets/dishes/caprese_salad.jpg';
import duckConfit from '../assets/dishes/slow_cooked_duck_crispy.jpg';
import seafoodPaella from '../assets/dishes/Paella.jpg';
import ribeyeSteak from '../assets/dishes/ribeye.jpg';
import pannaCotta from '../assets/dishes/Panna_cotta.jpg';
import cheesecake from '../assets/dishes/cheesecake.jpg';

const RestaurantMenu = () => {
  const [flippedIndex, setFlippedIndex] = useState(null); // Track which card is flipped
  const [orderCounts, setOrderCounts] = useState({}); // Track order counts for each item

  const menuItems = [
    { name: 'Grilled Salmon', description: 'Freshly grilled salmon served with roasted vegetables.', price: '€25', image: grilledSalmon },
    { name: 'Filet Mignon', description: 'Premium steak with garlic mashed potatoes.', price: '€40', image: filetMignon },
    { name: 'Caesar Salad', description: 'Romaine lettuce with Caesar dressing and parmesan.', price: '€12', image: caesarSalad },
    { name: 'Lobster Bisque', description: 'Creamy lobster soup with a hint of sherry.', price: '€18', image: lobsterBisque },
    { name: 'Margherita Pizza', description: 'Pizza with fresh mozzarella, tomatoes, and basil.', price: '€15', image: margheritaPizza },
    { name: 'Tiramisu', description: 'Italian dessert with coffee-soaked ladyfingers.', price: '€10', image: tiramisu },
    { name: 'Chicken Alfredo', description: 'Creamy Alfredo pasta with grilled chicken.', price: '€20', image: chickenAlfredo },
    { name: 'Beef Wellington', description: 'Tender beef wrapped in puff pastry.', price: '€45', image: beefWellington },
    { name: 'Shrimp Scampi', description: 'Garlic butter shrimp served over pasta.', price: '€22', image: shrimpScampi },
    { name: 'Vegetable Stir-Fry', description: 'Fresh vegetables sautéed in a savory sauce.', price: '€14', image: vegetableStirFry },
    { name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a gooey center.', price: '€12', image: chocolateLavaCake },
    { name: 'French Onion Soup', description: 'Classic soup topped with melted cheese.', price: '€10', image: frenchOnionSoup },
    { name: 'Caprese Salad', description: 'Tomatoes, mozzarella, and basil drizzled with balsamic.', price: '€14', image: capreseSalad },
    { name: 'Duck Confit', description: 'Slow-cooked duck leg with crispy skin.', price: '€35', image: duckConfit },
    { name: 'Seafood Paella', description: 'Spanish rice dish with shrimp, mussels, and clams.', price: '€30', image: seafoodPaella },
    { name: 'Ribeye Steak', description: 'Juicy ribeye steak grilled to perfection.', price: '€50', image: ribeyeSteak },
    { name: 'Panna Cotta', description: 'Creamy Italian dessert with berry sauce.', price: '€8', image: pannaCotta },
    { name: 'Cheesecake', description: 'Creamy cheesecake with a graham cracker crust.', price: '€10', image: cheesecake },
  ];

  const handleFlip = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index); // Toggle flip state
  };

  const handleOrder = (name) => {
    setOrderCounts((prevCounts) => ({
      ...prevCounts,
      [name]: (prevCounts[name] || 0) + 1, // Increment order count
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">Our Menu</h1>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="relative bg-white rounded-lg shadow hover:shadow-lg transition transform"
            style={{
              height: '350px',
              perspective: '1000px', // Enable 3D perspective
            }}
            onClick={() => handleFlip(index)}
          >
            {/* Front Side */}
            <div
              className={`absolute inset-0 backface-hidden transform ${flippedIndex === index ? 'rotate-y-180' : ''
                }`}
              style={{
                backfaceVisibility: 'hidden', // Ensure the front side is not visible when flipped
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{item.name}</h2>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <p className="text-lg font-semibold text-blue-800">{item.price}</p>
              </div>
            </div>

            {/* Back Side */}
            <div
              className={`absolute inset-0 bg-blue-100 p-6 rounded-lg transform ${flippedIndex === index ? '' : 'rotate-y-180'
                }`}
              style={{
                backfaceVisibility: 'hidden', // Ensure the back side is not visible when not flipped
              }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{item.name}</h2>
              <p className="text-gray-600 mb-6">How many portions would you like?</p>
              <div className="flex items-center justify-between">
                {/* Numeric Input Field */}
                <input
                  type="number"
                  min="0"
                  value={orderCounts[item.name] || 0}
                  onClick={(e) => e.stopPropagation()} // Prevent flipping when interacting with the input
                  onChange={(e) => {
                    let value = parseInt(e.target.value, 10) || 0;
                    if (value > 100) value = 100; // Ensure the value does not exceed 999
                    setOrderCounts((prevCounts) => ({
                      ...prevCounts,
                      [item.name]: value,
                    }));
                  }}
                  className="w-20 text-center border border-gray-300 rounded py-1"
                />

                {/* Order Button */}
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering flip
                    setOrderCounts((prevCounts) => ({
                      ...prevCounts,
                      [item.name]: 0, // Reset order count to 0
                    }));
                  }}
                >
                  Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;