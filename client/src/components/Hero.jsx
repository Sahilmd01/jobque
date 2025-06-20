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
    
    setTimeout(() => {
      const element = document.getElementById('job-listings');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

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
    <div className="bg-gradient-to-b from-gray-50 to-white" ref={mainRef}>
      {/* Main Hero Section */}
      <div className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
        {/* Premium decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-16 top-16 -z-10 transform-gpu blur-3xl">
            <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] opacity-20"
              style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
            />
          </div>
          <div className="absolute right-16 bottom-16 -z-10 transform-gpu blur-3xl">
            <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] opacity-20"
              style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
            />
          </div>
        </div>

        <motion.div 
          className="mx-auto max-w-7xl px-6 lg:px-8"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div className="mx-auto max-w-3xl text-center" variants={itemVariants}>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Elevate Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Career Journey</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600">
              Exclusive access to premium opportunities with top-tier companies worldwide.
            </p>
          </motion.div>

          {/* Premium search form */}
          <motion.div className="mx-auto mt-16 max-w-2xl" variants={itemVariants}>
            <form onSubmit={onSearch} className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-auto">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    ref={titleRef}
                    type="text"
                    className="block w-full rounded-xl border-0 bg-white/95 py-5 pl-12 pr-6 text-gray-900 shadow-lg ring-1 ring-gray-200 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    placeholder="Job title, skills, or company"
                  />
                </div>
                <div className="relative flex-auto">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <input
                    ref={locationRef}
                    type="text"
                    className="block w-full rounded-xl border-0 bg-white/95 py-5 pl-12 pr-6 text-gray-900 shadow-lg ring-1 ring-gray-200 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    placeholder="Location or remote"
                  />
                </div>
                <motion.button
                  type="submit"
                  className="flex-none rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-5 text-sm font-semibold text-white shadow-lg hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 flex items-center justify-center gap-2 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Discover Opportunities
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Premium Stats */}
          <motion.div 
            className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
            variants={containerVariants}
          >
            {[
              { name: 'Premium Jobs', value: '10,000+', highlight: 'text-blue-600' },
              { name: 'Top Companies', value: '5,000+', highlight: 'text-purple-600' },
              { name: 'Successful Matches', value: '15,000+', highlight: 'text-indigo-600' },
            ].map((stat, index) => (
              <motion.div 
                key={stat.name} 
                className="flex flex-col gap-y-3 rounded-2xl bg-white p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`text-4xl font-bold tracking-tight ${stat.highlight}`}>{stat.value}</div>
                <div className="text-base leading-6 text-gray-600 font-medium">{stat.name}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Premium Trusted By Section */}
      <motion.div 
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInVariants}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-gray-50 to-white p-12 shadow-inner border border-gray-200">
            <p className="text-center text-gray-500 font-medium mb-12 text-sm uppercase tracking-wider">
              Trusted by industry leaders
            </p>
            <div className="relative overflow-hidden h-16">
              <div
                ref={logosContainerRef}
                className="absolute left-0 top-0 flex items-center gap-16 whitespace-nowrap"
              >
                {[...Array(2)].map((_, i) => (
                  <React.Fragment key={`set-${i}`}>
                    <img className="h-10 opacity-80 hover:opacity-100 transition-opacity" src={assets.microsoft_logo} alt="Microsoft" />
                    <img className="h-10 opacity-80 hover:opacity-100 transition-opacity" src={assets.walmart_logo} alt="Walmart" />
                    <img className="h-10 opacity-80 hover:opacity-100 transition-opacity" src={assets.accenture_logo} alt="Accenture" />
                    <img className="h-10 opacity-80 hover:opacity-100 transition-opacity" src={assets.samsung_logo} alt="Samsung" />
                    <img className="h-12 opacity-80 hover:opacity-100 transition-opacity" src={assets.amazon_logo} alt="Amazon" />
                    <img className="h-10 opacity-80 hover:opacity-100 transition-opacity" src={assets.adobe_logo} alt="Adobe" />
                    <img className="h-10 opacity-80 hover:opacity-100 transition-opacity" src={assets.google_logo} alt="Google" />
                    <img className="h-10 opacity-80 hover:opacity-100 transition-opacity" src={assets.apple_logo} alt="Apple" />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Premium Features Section */}
      <motion.div 
        className="py-24 bg-gradient-to-b from-white to-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInVariants}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-3xl bg-white p-12 shadow-xl border border-gray-200">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                The <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Premium Advantage</span>
              </h2>
              <p className="mt-6 text-xl leading-8 text-gray-600 max-w-3xl mx-auto">
                Experience the difference with our exclusive features designed for professionals like you
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Curated Jobs */}
              <motion.div 
                className="rounded-2xl bg-white p-8 hover:bg-gray-50 transition-all duration-300 group border border-gray-200 shadow-lg hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-4 rounded-xl mr-5 group-hover:bg-blue-200 transition-colors">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Executive Curated Jobs</h3>
                </div>
                <p className="text-gray-600">
                  Our team of career experts hand-selects premium opportunities from elite employers, ensuring quality matches for your skills and aspirations.
                </p>
              </motion.div>

              {/* Fast Results */}
              <motion.div 
                className="rounded-2xl bg-white p-8 hover:bg-gray-50 transition-all duration-300 group border border-gray-200 shadow-lg hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-purple-100 p-4 rounded-xl mr-5 group-hover:bg-purple-200 transition-colors">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Priority Matching</h3>
                </div>
                <p className="text-gray-600">
                  Our proprietary AI technology prioritizes your profile, connecting you with the most relevant high-value opportunities before other candidates.
                </p>
              </motion.div>

              {/* No Hidden Fees */}
              <motion.div 
                className="rounded-2xl bg-white p-8 hover:bg-gray-50 transition-all duration-300 group border border-gray-200 shadow-lg hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-indigo-100 p-4 rounded-xl mr-5 group-hover:bg-indigo-200 transition-colors">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Exclusive Access</h3>
                </div>
                <p className="text-gray-600">
                  Gain visibility to unadvertised executive positions and direct introductions to hiring managers at top companies through our premium network.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Hero;