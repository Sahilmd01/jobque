import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const AppDownload = () => {
  return (
    <div className='container px-4 2xl:px-20 mx-auto my-12'>
      <motion.div 
        className='relative bg-white backdrop-blur-sm border border-gray-200 rounded-xl p-6 sm:p-10 lg:p-12 overflow-hidden shadow-sm'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Background elements */}
        <div className="absolute -z-10 inset-0 overflow-hidden opacity-10">
          <div className="absolute -top-10 -right-1/2 transform-gpu blur-3xl">
            <div 
              className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]"
              style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* Content */}
          <div className="lg:w-1/2">
            <motion.h1 
              className='text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-gray-800'
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Download App for <span className="text-blue-600">Better Experience</span>
            </motion.h1>
            
            <motion.p 
              className="text-sm text-gray-600 mb-6 max-w-md"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Get job opportunities and manage applications on the go.
            </motion.p>
            
            <motion.div 
              className='flex gap-3'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.a 
                href="#" 
                className='inline-block'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img className='h-10 sm:h-12' src={assets.play_store} alt="Google Play" />
              </motion.a>
              <motion.a 
                href="#" 
                className='inline-block'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img className='h-10 sm:h-12' src={assets.app_store} alt="App Store" />
              </motion.a>
            </motion.div>
          </div>

          {/* App Image */}
          <motion.div
            className="mt-6 lg:mt-0 lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <img 
              className='w-full max-w-[180px] sm:max-w-[220px] lg:max-w-[260px]' 
              src={assets.app_main_img} 
              alt="App Preview"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default AppDownload