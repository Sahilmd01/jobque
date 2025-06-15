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
      className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-16 pb-8 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1 - Logo and description */}
          <motion.div variants={itemVariants}>
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="bg-white p-3 rounded-lg inline-block mb-6 shadow-lg"
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
                  whileHover={{ y: -3, color: "#3B82F6" }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
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
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <FaArrowRight className="text-blue-400 text-xs" />
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
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <FaArrowRight className="text-blue-400 text-xs" />
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
                className="px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
                required
                whileFocus={{ 
                  borderColor: "#3B82F6",
                  boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)"
                }}
              />
              <motion.button 
                type="submit" 
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-3 rounded-lg font-medium shadow-lg"
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
          className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center"
          variants={itemVariants}
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} InsiderJobs. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-gray-400 hover:text-blue-400 text-sm relative"
                whileHover={{ scale: 1.05 }}
              >
                <span className="block relative">
                  {item}
                  <motion.span 
                    className="absolute left-0 bottom-0 w-0 h-px bg-blue-400"
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
              className="text-gray-400 hover:text-blue-400 text-sm"
              whileHover={{ scale: 1.05 }}
            >
              Developed by Sahil MD
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-blue-400 text-sm"
              whileHover={{ scale: 1.05 }}
            >
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;