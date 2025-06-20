import React from 'react'
import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center">
      {/* Main loading container */}
      <div className="relative flex flex-col items-center">
        {/* Animated gradient circle */}
        <motion.div
          className="relative w-28 h-28 rounded-full flex items-center justify-center"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Gradient border segments */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-r-blue-500 p-1">
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-b-indigo-500 border-l-indigo-400"></div>
          </div>
          
          {/* Center logo or icon */}
          <motion.div
            className="absolute inset-4 bg-white rounded-full flex items-center justify-center shadow-sm"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
              animate={{
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>

        {/* Orbiting dots */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-indigo-600 rounded-full"
            initial={false}
            animate={{
              x: 40 * Math.cos((i * 120 * Math.PI) / 180),
              y: 40 * Math.sin((i * 120 * Math.PI) / 180),
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
          />
        ))}

        {/* Loading text with animated dots */}
        <motion.div 
          className="mt-12 text-gray-700 font-medium text-lg flex items-center gap-1"
          animate={{
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity
          }}
        >
          Finding your dream job
          <motion.span
            animate={{
              opacity: [0, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.3
            }}
          >
            .
          </motion.span>
          <motion.span
            animate={{
              opacity: [0, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.6
            }}
          >
            .
          </motion.span>
          <motion.span
            animate={{
              opacity: [0, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.9
            }}
          >
            .
          </motion.span>
        </motion.div>
      </div>

      {/* Subtle decorative elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full filter blur-[80px] opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-100 rounded-full filter blur-[80px] opacity-30"></div>
      </div>
    </div>
  )
}

export default Loading