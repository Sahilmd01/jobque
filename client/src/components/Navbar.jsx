import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FiBriefcase, FiUser, FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const { setShowRecruiterLogin } = useContext(AppContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <motion.nav 
      className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <motion.button 
              onClick={() => navigate('/')}
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                className="h-10 w-auto transition-all" 
                src={assets.logo} 
                alt="Company Logo" 
              />
            </motion.button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {user ? (
              <>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/applications"
                    className="text-gray-700 hover:text-blue-600 px-4 py-2.5 rounded-xl text-base font-medium flex items-center gap-2 transition-all duration-200 group"
                  >
                    <FiBriefcase className="text-blue-600 group-hover:animate-bounce" />
                    <span>Applied Jobs</span>
                  </Link>
                </motion.div>
                
                <div className="relative">
                  <motion.button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-3 focus:outline-none"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-100 flex items-center justify-center overflow-hidden shadow-sm">
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
                  </motion.button>

                  {dropdownOpen && (
                    <motion.div 
                      className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl py-2 z-50 ring-1 ring-gray-100"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.button
                        onClick={() => {
                          navigate('/profile');
                          setDropdownOpen(false);
                        }}
                        className="block px-5 py-3 text-base text-gray-700 hover:bg-gray-50 w-full text-left flex items-center gap-3 transition-colors duration-200"
                        whileHover={{ x: 5 }}
                      >
                        <FiUser className="text-blue-600" />
                        My Profile
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </>
            ) : (
              <>
                <motion.button 
                  onClick={(e) => setShowRecruiterLogin(true)}
                  className="text-gray-600 hover:text-blue-600 px-4 py-2.5 rounded-xl text-base font-medium transition-all duration-200 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <FiBriefcase className="text-blue-600" />
                  <span>For Recruiters</span>
                </motion.button>
                
                <motion.button
                  onClick={(e) => openSignIn()}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-2.5 rounded-xl text-base font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiUser className="text-white" />
                  <span>Sign In</span>
                </motion.button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {user ? (
              <div className="flex items-center space-x-5">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Link
                    to="/applications"
                    className="text-gray-700 hover:text-blue-600 p-2 rounded-xl"
                  >
                    <FiBriefcase className="h-6 w-6" />
                  </Link>
                </motion.div>
                <div className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center overflow-hidden shadow-sm">
                  <UserButton appearance={{
                    elements: {
                      userButtonAvatarBox: "h-full w-full",
                    }
                  }} />
                </div>
              </div>
            ) : (
              <motion.button
                onClick={(e) => openSignIn()}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2.5 rounded-xl shadow-sm"
                whileHover={{ scale: 1.1 }}
              >
                <FiUser className="h-5 w-5" />
              </motion.button>
            )}
            
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="ml-4 inline-flex items-center justify-center p-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              whileHover={{ scale: 1.1 }}
            >
              {mobileMenuOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="md:hidden bg-white shadow-xl rounded-b-xl border-t border-gray-100"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-4 pt-3 pb-4 space-y-2">
            {user ? (
              <>
                <motion.button
                  onClick={() => {
                    navigate('/profile');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 flex items-center gap-3 transition-colors duration-200"
                  whileHover={{ x: 5 }}
                >
                  <FiUser className="text-blue-600" />
                  My Profile
                </motion.button>
              </>
            ) : (
              <motion.button
                onClick={() => {
                  setShowRecruiterLogin(true);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 flex items-center gap-3 transition-colors duration-200"
                whileHover={{ x: 5 }}
              >
                <FiBriefcase className="text-blue-600" />
                Recruiter Login
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;