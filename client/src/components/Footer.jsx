import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaArrowRight } from 'react-icons/fa';
import { assets } from '../assets/assets';

const Footer = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="bg-gradient-to-b from-gray-50 to-white text-gray-800 pt-20 pb-12 px-6 relative overflow-hidden border-t border-gray-200"
    >
      {/* Premium decorative elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full filter blur-[120px] opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-full filter blur-[100px] opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1 - Logo and description */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.div 
              whileHover={{ scale: 1.03, rotate: 1 }}
              className="bg-white p-4 rounded-xl inline-block shadow-lg border border-gray-100"
            >
              <img width={200} src={assets.logo} alt="InsiderJobs" className="h-12 object-contain" />
            </motion.div>
            <p className="text-gray-600 leading-relaxed text-lg">
              Connecting exceptional talent with premium opportunities at the world's most innovative companies.
            </p>
            <div className="flex items-center gap-5">
              {[
                { icon: <FaFacebook className="text-xl" />, name: "Facebook", color: "hover:text-[#1877F2]" },
                { icon: <FaTwitter className="text-xl" />, name: "Twitter", color: "hover:text-[#1DA1F2]" },
                { icon: <FaInstagram className="text-xl" />, name: "Instagram", color: "hover:text-[#E4405F]" },
                { icon: <FaLinkedin className="text-xl" />, name: "LinkedIn", color: "hover:text-[#0A66C2]" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`text-gray-500 ${social.color} transition-all duration-300 p-2 rounded-full bg-white shadow-sm hover:shadow-md`}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2 - Quick Links */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-4">
              {["Browse Jobs", "Companies", "Career Resources", "Salary Calculator", "Post a Job"].map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center gap-3 group">
                    <span className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                    <span className="flex-1">{link}</span>
                    <FaArrowRight className="text-blue-500 text-xs opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 - Resources */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Resources</h3>
            <ul className="space-y-4">
              {["Resume Builder", "Interview Tips", "Career Blog", "FAQ", "Contact Support"].map((resource, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center gap-3 group">
                    <span className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                    <span className="flex-1">{resource}</span>
                    <FaArrowRight className="text-blue-500 text-xs opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4 - Newsletter */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Stay Updated</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Subscribe to our premium newsletter for exclusive job opportunities and career insights.
            </p>
            <motion.form 
              className="space-y-4"
              whileHover={{ scale: 1.01 }}
            >
              <motion.input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-5 py-3.5 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 border border-gray-200 shadow-sm"
                required
                whileFocus={{ 
                  borderColor: "#3B82F6",
                  boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.2)"
                }}
              />
              <motion.button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3.5 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ 
                  scale: 0.98,
                  boxShadow: "0 5px 15px -3px rgba(59, 130, 246, 0.3)"
                }}
              >
                Subscribe Now
                <FaArrowRight className="text-sm" />
              </motion.button>
            </motion.form>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div 
          className="border-t border-gray-200 pt-10 flex flex-col lg:flex-row justify-between items-center gap-6"
          variants={itemVariants}
        >
          <p className="text-gray-500 text-base">
            © {new Date().getFullYear()} <span className="font-medium text-gray-700">InsiderJobs</span>. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 justify-center">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-gray-500 hover:text-blue-600 text-base relative font-medium"
                whileHover={{ scale: 1.05 }}
              >
                <span className="block relative pb-1">
                  {item}
                  <motion.span 
                    className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
              </motion.a>
            ))}
            <motion.a
              href="https://www.linkedin.com/in/codewithkinu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 text-base font-medium"
              whileHover={{ scale: 1.05 }}
            >
              Developed by Sahil MD
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;