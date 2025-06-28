import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import RestaurantMenu from './pages/RestaurantMenu'; // Create this file or comment it out for now
import Rooms from './pages/Rooms'; // Create this file or comment it out for now
import RoomDetails from './pages/RoomDetails';
import Booking from './pages/Booking';
import './styles.css';
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import UserDashboard from "./pages/dashboards/UserDashboard.jsx";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant" element={<RestaurantMenu />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/:typeOfRoom" element={<RoomDetails />} />
        <Route path="/:typeOfRoom/booking" element={<Booking />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
