import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from '../context/AppContext'
import { motion } from "framer-motion";

const RecruiterLogin = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(false);
  const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);
  const { setShowRecruiterLogin } = useContext(AppContext);

  const onSubmitHandler = async (e) => { 
    e.preventDefault();
    if(state == "Sign Up" && !isTextDataSubmited){
        setIsTextDataSubmited(true);
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  },[])

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 backdrop-blur-sm bg-black/70 flex justify-center items-center"
    >
      <motion.form 
        onSubmit={onSubmitHandler}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-700"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">
            Recruiter {state}
          </h1>
          <motion.img 
            onClick={() => setShowRecruiterLogin(false)}
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="w-6 h-6 cursor-pointer filter brightness-0 invert opacity-70 hover:opacity-100"
            src={assets.cross_icon} 
            alt="Close" 
          />
        </div>

        <p className="text-gray-400 text-sm mb-6">Welcome back! Please sign in to continue</p>

        {state === "Sign Up" && isTextDataSubmited ? (
          <div className="flex flex-col items-center gap-6 my-6">
            <label htmlFor="image" className="cursor-pointer">
              <div className="relative group">
                <img 
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-700 group-hover:border-indigo-500 transition-colors" 
                  src={image ? URL.createObjectURL(image) : assets.upload_area} 
                  alt="Company Logo" 
                />
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <input onChange={e => setImage(e.target.files[0])} type="file" id="image" hidden accept="image/*" />
            </label>
            <p className="text-gray-300 text-center">Upload Company Logo</p>
          </div>
        ) : (
          <>
            {state !== "Login" && (
              <div className="mb-4">
                <label className="block text-gray-400 text-sm mb-1">Company Name</label>
                <div className="flex items-center bg-gray-700 rounded-lg px-4 py-3 border border-gray-600 focus-within:border-indigo-500 transition-colors">
                  <img className="w-5 h-5 opacity-70" src={assets.person_icon} alt="" />
                  <input
                    className="bg-transparent outline-none text-white ml-2 w-full placeholder-gray-500"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    placeholder="Enter company name"
                    required
                  />
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-400 text-sm mb-1">Email</label>
              <div className="flex items-center bg-gray-700 rounded-lg px-4 py-3 border border-gray-600 focus-within:border-indigo-500 transition-colors">
                <img className="w-5 h-5 opacity-70" src={assets.email_icon} alt="" />
                <input
                  className="bg-transparent outline-none text-white ml-2 w-full placeholder-gray-500"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-400 text-sm mb-1">Password</label>
              <div className="flex items-center bg-gray-700 rounded-lg px-4 py-3 border border-gray-600 focus-within:border-indigo-500 transition-colors">
                <img className="w-5 h-5 opacity-70" src={assets.lock_icon} alt="" />
                <input
                  className="bg-transparent outline-none text-white ml-2 w-full placeholder-gray-500"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
          </>
        )}

        {state === "Login" && (
          <motion.p 
            whileHover={{ x: 2 }}
            className="text-sm text-indigo-400 mt-2 cursor-pointer hover:underline"
          >
            Forgot Password?
          </motion.p>
        )}

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium mt-6 transition-colors"
        >
          {state === "Login" ? "Login" : isTextDataSubmited ? "Create Account" : "Next"}
        </motion.button>

        <div className="mt-6 text-center text-gray-400">
          {state === "Login" ? (
            <p>
              Don't have an account?{' '}
              <motion.span 
                whileHover={{ color: '#818cf8' }}
                className="text-indigo-400 cursor-pointer font-medium"
                onClick={() => setState("Sign Up")}
              >
                Sign Up
              </motion.span>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <motion.span 
                whileHover={{ color: '#818cf8' }}
                className="text-indigo-400 cursor-pointer font-medium"
                onClick={() => setState("Login")}
              >
                Login
              </motion.span>
            </p>
          )}
        </div>
      </motion.form>
    </motion.div>
  );
};

export default RecruiterLogin;