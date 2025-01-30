import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Space Haven</Link>
        <ul className="flex space-x-4">
          /*<li><Link to="/" className="hover:text-blue-300">Home</Link></li>*/
          <li><Link to="/profile" className="hover:text-blue-300">Profile</Link></li>
          <li><Link to="/membership" className="hover:text-blue-300">Membership</Link></li>
          <li><Link to="/contact" className="hover:text-blue-300">Contact</Link></li>
          <li><Link to="/signup" className="hover:text-blue-300">Sign Up</Link></li>
          <li><Link to="/login" className="hover:text-blue-300">Log In</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;