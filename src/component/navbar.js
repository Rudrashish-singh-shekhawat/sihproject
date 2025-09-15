import logo from "../source/logo.svg";
import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../firebase";
import Micon from "../source/menicon.jpg";

const auth = getAuth(app);

function Nav() {
  const location = useLocation();
  const navigate = useNavigate(); // <-- programmatic navigation
  const isHome = location.pathname === "/";
  const isLogin = location.pathname === "/login";
  const isSignup = location.pathname === "/signup";

  const [open, setOpen] = useState(false); // hamburger drawer for not-logged-in users
  const [user, setUser] = useState(null);
  const [dropdown, setDropdown] = useState(false); // profile drawer for logged-in users

  // separate refs for desktop profile area and mobile button/drawer
  const desktopRef = useRef(null);
  const mobileRef = useRef(null);

  // Track Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Close drawers when clicking outside either desktop or mobile areas
  useEffect(() => {
    const handleClickOutside = (e) => {
      const clickedInsideDesktop = desktopRef.current?.contains(e.target);
      const clickedInsideMobile = mobileRef.current?.contains(e.target);

      if (!clickedInsideDesktop && !clickedInsideMobile) {
        setDropdown(false);
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout
  const handleLogout = async () => {
    await signOut(auth);
    setDropdown(false);
    setOpen(false);
    // optionally navigate to home after logout:
    navigate("/");
  };

  // helper to navigate from mobile drawer safely
  const handleNavigate = (path) => {
    setOpen(false);
    setDropdown(false);
    navigate(path);
  };

  // Hide nav on login & signup pages
  if (isLogin || isSignup) return null;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav
      className={`top-0 left-0 w-full z-30 px-6 py-4 transition-all duration-500 ${
        isHome ? "bg-transparent fixed" : "bg-gray-900/70"
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="logo" className="w-10 h-10 rounded-xl shadow-md" />
          <span className="font-extrabold text-xl bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            SOLAR
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10 font-semibold">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`relative px-2 py-1 transition-all duration-300 ${
                  location.pathname === link.path
                    ? "text-green-400"
                    : "text-gray-200 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-0 bottom-0 w-full h-[2px] bg-gradient-to-r from-pink-400 to-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                    location.pathname === link.path ? "scale-x-100" : ""
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA / Profile */}
        <div className="hidden md:flex gap-5" ref={desktopRef}>
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-pink-500/50 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold shadow-lg hover:shadow-green-400/50 transition duration-300"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative">
              <button onClick={() => setDropdown((d) => !d)} aria-expanded={dropdown}>
                <img
                  src={user.photoURL || Micon}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-green-400 shadow-md"
                />
              </button>

              {dropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 text-gray-700 z-50">
                  <Link
                    to="/account"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdown(false)}
                  >
                    My Account
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdown(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile area (button + drawer) */}
        <div className="md:hidden" ref={mobileRef}>
          {!user ? (
            // hamburger for non-logged-in users
            <button
              onClick={() => setOpen((o) => !o)}
              className="text-gray-200 focus:outline-none"
              aria-expanded={open}
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          ) : (
            // profile picture for logged-in users
            <button onClick={() => setDropdown((d) => !d)} aria-expanded={dropdown}>
              <img
                src={user.photoURL || Micon}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-green-400 shadow-md"
              />
            </button>
          )}

          {/* One unified mobile drawer that opens for either "open" (hamburger) OR "dropdown" (profile) */}
          {(open || dropdown) && (
            <div
              className={`absolute z-50 top-16 left-0 w-full md:hidden rounded-b-2xl ${
                isHome ? "bg-transparent" : "bg-gray-900/95"
              }`}
            >
              <ul className="flex flex-col items-center space-y-6 py-6 text-lg font-semibold">
                {navLinks.map((link) => (
                  <li key={link.path} className="w-full">
                    {/* use programmatic navigation to avoid race with outside-click handler */}
                    <button
                      onClick={() => handleNavigate(link.path)}
                      className={`block w-full text-center py-2 transition-all duration-300 ${
                        location.pathname === link.path ? "text-green-400" : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}

                {!user ? (
                  <>
                    <li className="w-full">
                      <button
                        onClick={() => handleNavigate("/login")}
                        className="block w-full text-center px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-pink-500/50 transition duration-300"
                      >
                        Login
                      </button>
                    </li>
                    <li className="w-full">
                      <button
                        onClick={() => handleNavigate("/signup")}
                        className="block w-full text-center px-5 py-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold shadow-lg hover:shadow-green-400/50 transition duration-300"
                      >
                        Signup
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="w-full">
                      <button
                        onClick={() => handleNavigate("/account")}
                        className="px-5 py-2 rounded-full bg-gray-700 text-white font-semibold shadow-lg hover:bg-gray-600 transition duration-300 block w-full text-center"
                      >
                        Profile
                      </button>
                    </li>
                    <li className="w-full">
                      <button
                        onClick={handleLogout}
                        className="px-5 py-2 rounded-full bg-red-500 text-white font-semibold shadow-lg hover:bg-red-600 transition duration-300 block w-full text-center"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
