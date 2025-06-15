import React, { useContext, useRef, useEffect } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion, useAnimation, useInView } from 'framer-motion'

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext)
  const titleRef = useRef(null)
  const locationRef = useRef(null)
  const logosContainerRef = useRef(null)
  const mainRef = useRef(null)
  const isInView = useInView(mainRef, { once: true, amount: 0.1 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const onSearch = (e) => {
    e.preventDefault();
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value
    })
    setIsSearched(true);
    
    // Scroll to job listings after a small delay
    setTimeout(() => {
      const element = document.getElementById('job-listings');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  // Animation effect for logos
  useEffect(() => {
    const logosContainer = logosContainerRef.current;
    if (!logosContainer) return;

    const logos = logosContainer.querySelectorAll('img');
    const containerWidth = logosContainer.offsetWidth;
    let position = 0;

    const animate = () => {
      position -= 1;
      if (position <= -containerWidth / 2) {
        position = 0;
      }

      logosContainer.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animate);
    }

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  }

  return (
    <div className="bg-gray-900" ref={mainRef}>
      {/* Main Hero Section */}
      <div className="relative isolate overflow-hidden py-24 sm:py-32">
        {/* Abstract background pattern */}
        <div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl">
          <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
          />
        </div>
        <div className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu">
          <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
          />
        </div>

        <motion.div 
          className="mx-auto max-w-7xl px-6 lg:px-8"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div className="mx-auto max-w-3xl text-center" variants={itemVariants}>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Launch Your <span className="text-indigo-400">Dream Career</span> Today
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Join 10,000+ professionals who found their perfect match through our AI-powered job platform.
            </p>
          </motion.div>

          {/* Modern search form */}
          <motion.div className="mx-auto mt-16 max-w-2xl" variants={itemVariants}>
            <form onSubmit={onSearch} className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-auto">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    ref={titleRef}
                    type="text"
                    className="block w-full rounded-lg border-0 bg-white/5 py-4 pl-10 pr-4 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    placeholder="Job title, skills, or company"
                  />
                </div>
                <div className="relative flex-auto">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <input
                    ref={locationRef}
                    type="text"
                    className="block w-full rounded-lg border-0 bg-white/5 py-4 pl-10 pr-4 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    placeholder="Location or remote"
                  />
                </div>
                <motion.button
                  type="submit"
                  className="flex-none rounded-lg bg-indigo-600 px-6 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Find Jobs
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
            variants={containerVariants}
          >
            {[
              { name: 'Jobs available', value: '10,000+' },
              { name: 'Companies hiring', value: '5,000+' },
              { name: 'Career matches', value: '15,000+' },
            ].map((stat, index) => (
              <motion.div 
                key={stat.name} 
                className="flex flex-col gap-y-3 rounded-xl bg-white/5 p-6 backdrop-blur-sm"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-3xl font-bold tracking-tight text-white">{stat.value}</div>
                <div className="text-sm leading-6 text-gray-300">{stat.name}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Trusted By Section */}
      <motion.div 
        className="bg-gray-900 py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInVariants}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl bg-gray-800 p-8 shadow-xl">
            <p className="text-center text-gray-400 font-medium mb-8 text-sm uppercase tracking-wider">
              Trusted by the world's best companies
            </p>
            <div className="relative overflow-hidden h-12">
              <div
                ref={logosContainerRef}
                className="absolute left-0 top-0 flex items-center gap-12 whitespace-nowrap"
              >
                {[...Array(2)].map((_, i) => (
                  <React.Fragment key={`set-${i}`}>
                    <img className="h-8 opacity-80 hover:opacity-100 transition-opacity" src={assets.microsoft_logo} alt="Microsoft" />
                    <img className="h-8 opacity-80 hover:opacity-100 transition-opacity" src={assets.walmart_logo} alt="Walmart" />
                    <img className="h-8 opacity-80 hover:opacity-100 transition-opacity" src={assets.accenture_logo} alt="Accenture" />
                    <img className="h-8 opacity-80 hover:opacity-100 transition-opacity" src={assets.samsung_logo} alt="Samsung" />
                    <img className="h-10 opacity-80 hover:opacity-100 transition-opacity" src={assets.amazon_logo} alt="Amazon" />
                    <img className="h-8 opacity-80 hover:opacity-100 transition-opacity" src={assets.adobe_logo} alt="Adobe" />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        className="bg-gray-900 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInVariants}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 p-12 shadow-2xl">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Why <span className="text-indigo-400">Choose Us</span>?
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-400 max-w-2xl mx-auto">
                We're revolutionizing the job search experience with cutting-edge technology and personalized service
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Curated Jobs */}
              <motion.div 
                className="rounded-xl bg-gray-800 p-6 hover:bg-gray-700 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-500/10 p-3 rounded-lg mr-4 group-hover:bg-indigo-500/20 transition-colors">
                    <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Curated Jobs</h3>
                </div>
                <p className="text-gray-400">
                  Our team hand-picks only the highest quality opportunities from verified employers, saving you time and effort.
                </p>
              </motion.div>

              {/* Fast Results */}
              <motion.div 
                className="rounded-xl bg-gray-800 p-6 hover:bg-gray-700 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-500/10 p-3 rounded-lg mr-4 group-hover:bg-indigo-500/20 transition-colors">
                    <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Fast Results</h3>
                </div>
                <p className="text-gray-400">
                  Our advanced matching algorithm connects you with the most relevant jobs in seconds, not weeks.
                </p>
              </motion.div>

              {/* No Hidden Fees */}
              <motion.div 
                className="rounded-xl bg-gray-800 p-6 hover:bg-gray-700 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-500/10 p-3 rounded-lg mr-4 group-hover:bg-indigo-500/20 transition-colors">
                    <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">No Hidden Fees</h3>
                </div>
                <p className="text-gray-400">
                  Complete transparency - no surprise charges or premium paywalls. All features are available to all users.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Hero