import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        {/* Left Section - Copyright */}
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} TaskManager. All rights reserved.
        </p>

        {/* Middle Section - Developer */}
        <p className="text-sm text-center md:text-left">
          Developed by{' '}
          <a
            href="https://www.linkedin.com/in/prince-bhatt-0958a725a"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-500 font-medium transition">
            Prince Bhatt
          </a>
        </p>

        {/* Right Section - Social Links */}
        <div className="flex gap-4 justify-center md:justify-end">
          <a
            href="https://github.com/princebhatt03"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            aria-label="GitHub">
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/prince-bhatt-0958a725a"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
            aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a
            href="https://princebhatt03.github.io/Portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition"
            aria-label="Portfolio">
            <Globe size={20} />
          </a>
        </div>
      </div>

      {/* Optional: Bottom Section for Mobile */}
      <div className="mt-4 text-center text-xs text-gray-500 md:hidden">
        Follow me on social media & explore my work!
      </div>
    </motion.footer>
  );
};

export default Footer;
