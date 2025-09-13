import React, { useEffect, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

function Btnav() {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setShowMenu(true);
      } else {
        setShowMenu(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bottom nav">
      {showMenu && (
        <div className="fixed bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-30 w-full sm:w-auto px-4">
          <ul className="flex justify-center sm:gap-6 gap-3">
            <li className="px-3 py-2 text-xs sm:text-base text-white rounded-full font-medium transition duration-300 bg-black/40 hover:bg-green-400">
              <Link to="/">Home</Link>
            </li>
            <li className="px-3 py-2 text-xs sm:text-base text-white rounded-full font-medium transition duration-300 bg-black/40 hover:bg-green-400">
              <Link to="/about">About Us</Link>
            </li>
            <li className="px-3 py-2 text-xs sm:text-base text-white rounded-full font-medium transition duration-300 bg-black/40 hover:bg-green-400">
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Btnav;
