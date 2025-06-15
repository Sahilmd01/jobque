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
        stiffness: 100
      }
    }
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="bg-gray-900 text-white pt-16 pb-8 px-4 relative overflow-hidden"
    >
      {/* Abstract background elements matching the Hero */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400 rounded-full filter blur-[80px] opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-400 rounded-full filter blur-[80px] opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-400 rounded-full filter blur-[100px] opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1 - Logo and description */}
          <motion.div variants={itemVariants}>
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="bg-gray-800 p-3 rounded-lg inline-block mb-6 shadow-lg border border-gray-700"
            >
              <img width={180} src={assets.logo} alt="InsiderJobs" className="h-10 object-contain" />
            </motion.div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Connecting top talent with world-class companies. Find your dream job or ideal candidate today.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: <FaFacebook className="text-xl" />, name: "Facebook" },
                { icon: <FaTwitter className="text-xl" />, name: "Twitter" },
                { icon: <FaInstagram className="text-xl" />, name: "Instagram" },
                { icon: <FaLinkedin className="text-xl" />, name: "LinkedIn" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -3, color: "#818CF8" }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2 - Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {["Browse Jobs", "Companies", "Career Resources", "Salary Calculator", "Post a Job"].map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors flex items-center gap-2">
                    <FaArrowRight className="text-indigo-400 text-xs" />
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 - Resources */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6 text-white">Resources</h3>
            <ul className="space-y-3">
              {["Resume Builder", "Interview Tips", "Career Blog", "FAQ", "Contact Support"].map((resource, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors flex items-center gap-2">
                    <FaArrowRight className="text-indigo-400 text-xs" />
                    {resource}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4 - Newsletter */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6 text-white">Stay Updated</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Subscribe to our newsletter for the latest jobs and career advice.
            </p>
            <motion.form 
              className="flex flex-col gap-3"
              whileHover={{ scale: 1.01 }}
            >
              <motion.input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-700"
                required
                whileFocus={{ 
                  borderColor: "#818CF8",
                  boxShadow: "0 0 0 3px rgba(129, 140, 248, 0.3)"
                }}
              />
              <motion.button 
                type="submit" 
                className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white px-6 py-3 rounded-lg font-medium shadow-lg"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)"
                }}
                whileTap={{ 
                  scale: 0.98,
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                }}
              >
                Subscribe Now
              </motion.button>
            </motion.form>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div 
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
          variants={itemVariants}
        >
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} InsiderJobs. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-gray-500 hover:text-indigo-400 text-sm relative"
                whileHover={{ scale: 1.05 }}
              >
                <span className="block relative">
                  {item}
                  <motion.span 
                    className="absolute left-0 bottom-0 w-0 h-px bg-indigo-400"
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
              className="text-gray-500 hover:text-indigo-400 text-sm"
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