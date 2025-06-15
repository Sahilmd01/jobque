import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FiBriefcase, FiUser, FiMenu, FiX, FiChevronDown } from "react-icons/fi";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const { setShowRecruiterLogin } = useContext(AppContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <button 
              onClick={() => navigate('/')}
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg"
            >
              <img 
                className="h-8 w-auto sm:h-10 transition-transform hover:scale-105" 
                src={assets.logo} 
                alt="Company Logo" 
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link
                  to="/applications"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors duration-200"
                >
                  <FiBriefcase className="text-blue-500" />
                  <span>Applied Jobs</span>
                </Link>
                
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <div className="h-9 w-9 rounded-full bg-gray-100 border-2 border-blue-100 flex items-center justify-center overflow-hidden">
                      <UserButton appearance={{
                        elements: {
                          userButtonAvatarBox: "h-full w-full",
                        }
                      }} />
                    </div>
                    <span className="text-gray-700 font-medium hidden lg:inline-flex">
                      {user.firstName}
                    </span>
                    <FiChevronDown className={`text-gray-500 transition-transform duration-200 ${dropdownOpen ? 'transform rotate-180' : ''}`} />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                      <button
                        onClick={() => {
                          navigate('/profile');
                          setDropdownOpen(false);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center gap-2"
                      >
                        <FiUser className="text-blue-500" />
                        My Profile
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button 
                  onClick={(e) => setShowRecruiterLogin(true)}
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  For Recruiters
                </button>
                
                <button
                  onClick={(e) => openSignIn()}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2"
                >
                  <FiUser className="text-white" />
                  <span>Sign In</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/applications"
                  className="text-gray-700 hover:text-blue-600 p-2 rounded-md"
                >
                  <FiBriefcase className="h-5 w-5" />
                </Link>
                <div className="h-8 w-8 rounded-full bg-gray-100 border border-blue-100 flex items-center justify-center overflow-hidden">
                  <UserButton appearance={{
                    elements: {
                      userButtonAvatarBox: "h-full w-full",
                    }
                  }} />
                </div>
              </div>
            ) : (
              <button
                onClick={(e) => openSignIn()}
                className="bg-blue-600 text-white p-2 rounded-full shadow-sm"
              >
                <FiUser className="h-5 w-5" />
              </button>
            )}
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="ml-4 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {mobileMenuOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user ? (
              <>
                <button
                  onClick={() => {
                    navigate('/profile');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 flex items-center gap-2"
                >
                  <FiUser className="text-blue-500" />
                  My Profile
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setShowRecruiterLogin(true);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 flex items-center gap-2"
              >
                <FiBriefcase className="text-blue-500" />
                Recruiter Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;