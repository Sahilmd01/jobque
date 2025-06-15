import React from 'react'
import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      {/* Main spinner with gradient border */}
      <motion.div
        className="relative w-24 h-24 rounded-full"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Gradient border */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-indigo-500 p-1">
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-b-purple-500 border-l-indigo-400"></div>
        </div>
        
        {/* Pulsing dot */}
        <motion.div
          className="absolute top-2 left-1/2 w-3 h-3 bg-indigo-400 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      {/* Optional text */}
      <motion.p 
        className="absolute mt-32 text-gray-400 font-medium"
        animate={{
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      >
        Loading opportunities...
      </motion.p>
    </div>
  )
}

export default Loading