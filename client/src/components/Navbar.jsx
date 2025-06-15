import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const { setShowRecruiterLogin } = useContext(AppContext);

  return (
    <div className="bg-white shadow-sm border-b border-gray-100 py-4 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        {/* Logo with smooth hover effect */}
        <div 
          onClick={() => navigate('/')} 
          className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
        >
          <img 
            className="h-8 md:h-10 object-contain" 
            src={assets.logo} 
            alt="Company Logo" 
          />
        </div>

        {user ? (
          <div className="flex items-center gap-6">
            <Link 
              to={'/applications'}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
              <span className="hidden sm:inline">Applied Jobs</span>
            </Link>
            
            <div className="w-px h-6 bg-gray-200"></div>
            
            <div className="flex items-center gap-3">
              <p className="text-gray-700 font-medium hidden sm:block">
                Hi, <span className="text-blue-600">{user.firstName}</span>
              </p>
              <div className="relative">
                <UserButton appearance={{
                  elements: {
                    userButtonAvatarBox: "h-9 w-9 ring-2 ring-blue-500/20",
                    userButtonPopoverCard: "shadow-lg rounded-xl",
                  }
                }} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <button 
              onClick={(e) => setShowRecruiterLogin(true)}
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium hidden sm:block"
            >
              Recruiter Login
            </button>
            
            <button
              onClick={(e) => openSignIn()}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-2 rounded-full font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span>Login</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;