import { Link } from 'react-router-dom'

const Header = () => (
    <header className="bg-white shadow-md py-4 px-6 flex justify-center sticky top-0 z-10">
    {/* <h1 className="text-2xl font-bold text-blue-800">Hotel101</h1> */}
    <nav className="space-x-6">
      <Link to="/" className="text-black font-bold hover:text-blue-600">Home</Link>
      <Link to="/restaurant" className="text-black font-bold hover:text-blue-600">Restaurant</Link>
      <Link to="/rooms" className="text-black font-bold hover:text-blue-600">Rooms</Link>
      <Link to="/signup" className="text-black font-bold hover:text-blue-600">Sign Up</Link>
      {/*<Link to="/login" className="text-black font-bold hover:text-blue-600">Log In</Link>*/}
    </nav>
  </header>
)

export default Header
