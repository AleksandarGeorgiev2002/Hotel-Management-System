import { Link } from 'react-router-dom'

const Header = () => (
    <header className="bg-white shadow-md py-4 px-6 flex justify-center sticky top-0 z-10">
    <nav className="space-x-6">
      <Link to="/" className="text-black font-bold hover:text-blue-600">Home</Link>
      <Link to="/restaurant" className="text-black font-bold hover:text-blue-600">Restaurant</Link>
      <Link to="/rooms" className="text-black font-bold hover:text-blue-600">Rooms</Link>
      <Link to="/signup" className="text-black font-bold hover:text-blue-600">Sign Up</Link>
    </nav>
  </header>
)

export default Header
