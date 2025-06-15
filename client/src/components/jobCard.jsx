import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <motion.div
      className="relative isolate overflow-hidden border border-gray-700 p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm shadow-lg"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {/* Background elements matching Hero */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-10">
        <div className="absolute -top-10 -right-1/2 transform-gpu blur-3xl">
          <div 
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff]"
            style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
          />
        </div>
      </div>

      {/* Original content with animations */}
      <div className='flex justify-between items-center'>
        <motion.img 
          className='h-8' 
          src={assets.company_icon} 
          alt=""
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        />
      </div>
      
      <motion.h4 
        className='font-medium text-xl mt-2 text-white'
        whileHover={{ color: "#a5b4fc" }} // light indigo on hover
      >
        {job.title}
      </motion.h4>
      
      <div className='flex items-center gap-3 mt-2 text-xs'>
        <motion.span 
          className='bg-blue-900/30 text-blue-300 px-4 py-1.5 rounded-full'
          whileHover={{ scale: 1.05 }}
        >
          {job.location}
        </motion.span>
        <motion.span 
          className='bg-red-900/30 text-red-300 px-4 py-1.5 rounded-full'
          whileHover={{ scale: 1.05 }}
        >
          {job.level}
        </motion.span>
      </div>
      
      <motion.p 
        className='text-gray-300 text-sm mt-4'
        dangerouslySetInnerHTML={{ __html: job.description.slice(0,150) }}
        whileHover={{ color: "#e5e7eb" }} // lighter gray on hover
      />
      
      <div className='mt-4 flex gap-4 text-sm'>
        <motion.button
          onClick={() => { navigate(`/apply-job/${job._id}`); window.scrollTo(0, 0) }}
          className='bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg'
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Apply now
        </motion.button>
        <motion.button
          onClick={() => { navigate(`/apply-job/${job._id}`); window.scrollTo(0, 0) }}
          className='text-gray-300 hover:text-white border border-gray-600 hover:bg-gray-700/50 rounded-lg px-4 py-2'
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Learn more
        </motion.button>
      </div>
    </motion.div>
  );
};

export default JobCard;