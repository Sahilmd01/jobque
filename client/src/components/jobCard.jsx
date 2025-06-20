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
      boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)"
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
      className="relative isolate overflow-hidden border border-gray-200 p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {/* Premium decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full filter blur-[80px]"></div>
      </div>

      {/* Company logo */}
      <div className='flex justify-between items-center'>
        <motion.img 
          className='h-10 w-10 object-contain rounded-lg border border-gray-200 p-1' 
          src={assets.company_icon} 
          alt="Company logo"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        />
      </div>
      
      {/* Job title */}
      <motion.h4 
        className='font-semibold text-xl mt-4 text-gray-900'
        whileHover={{ color: "#3B82F6" }} // blue-600 on hover
      >
        {job.title}
      </motion.h4>
      
      {/* Job tags */}
      <div className='flex items-center gap-3 mt-4'>
        <motion.span 
          className='bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium'
          whileHover={{ scale: 1.05 }}
        >
          {job.location}
        </motion.span>
        <motion.span 
          className='bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-sm font-medium'
          whileHover={{ scale: 1.05 }}
        >
          {job.level}
        </motion.span>
      </div>
      
      {/* Job description */}
      <motion.p 
        className='text-gray-600 mt-5 leading-relaxed'
        dangerouslySetInnerHTML={{ __html: job.description.slice(0,150) }}
        whileHover={{ color: "#4B5563" }} // darker gray on hover
      />
      
      {/* Action buttons */}
      <div className='mt-6 flex gap-4'>
        <motion.button
          onClick={() => { navigate(`/apply-job/${job._id}`); window.scrollTo(0, 0) }}
          className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-2.5 rounded-xl font-medium shadow-md'
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Apply now
        </motion.button>
        <motion.button
          onClick={() => { navigate(`/apply-job/${job._id}`); window.scrollTo(0, 0) }}
          className='text-gray-700 hover:text-blue-600 border border-gray-300 hover:border-blue-300 bg-white hover:bg-blue-50 rounded-xl px-6 py-2.5 font-medium shadow-sm'
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