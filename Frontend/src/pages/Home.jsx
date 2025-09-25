import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Linkedin, Globe } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-16 gap-10 md:gap-20">
        {/* Left Content */}
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-600">
            Task Manager
          </h1>
          <p className="text-gray-700 text-lg md:text-xl">
            Welcome to{' '}
            <span className="font-semibold text-indigo-500">Task Manager</span>!
            This is a Job Interview Task project for Magnet Brains Software
            Technology built using MERN stack. It allows users to create,
            manage, and track tasks with priorities and due dates.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link to="/user-login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold shadow-md hover:bg-indigo-700 transition">
                Login
              </motion.button>
            </Link>

            <Link to="/user-register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold shadow-md hover:bg-green-700 transition">
                Register
              </motion.button>
            </Link>
          </div>

          {/* Personal Links */}
          <div className="flex items-center gap-6 mt-6">
            <a
              href="https://github.com/princebhatt03"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black transition">
              <Github size={28} />
            </a>
            <a
              href="https://www.linkedin.com/in/prince-bhatt-0958a725a"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-800 transition">
              <Linkedin size={28} />
            </a>
            <a
              href="https://princebhatt03.github.io/Portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 transition">
              <Globe size={28} />
            </a>
          </div>

          {/* Your Details */}
          <div className="mt-6 text-gray-600 text-sm space-y-1">
            <p>
              Developer: <span className="font-semibold">Prince Bhatt</span>
            </p>
            <p>
              Email:{' '}
              <span className="font-semibold">princebhatt316@gmail.com</span>
            </p>
          </div>
        </div>

        {/* Right Image / Illustration */}
        <div className="flex-1">
          <motion.img
            src="https://img.freepik.com/premium-vector/developing-programming-coding-technologies-engineering-development-programmer-developer-create-code-laptop-screen-with-codes-developer-work-with-task-coding-software-using-pc_458444-1153.jpg"
            alt="Task Illustration"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl shadow-xl w-full object-cover"
          />
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-indigo-50 py-16 mt-10">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-bold text-indigo-600">
            About This Project
          </h2>
          <p className="text-gray-700 text-lg">
            This Task Manager allows users to create tasks, set due dates,
            assign priority levels, and manage their workflow efficiently. Built
            as a job interview assignment, it demonstrates my skills in{' '}
            <span className="font-semibold">
              React, Node.js, Express, MongoDB, Tailwind CSS, and Framer Motion
            </span>
            .
          </p>
          <p className="text-gray-700 text-lg">
            Users can log in, register, create tasks, update status, delete
            tasks, and view tasks in a clean dashboard. The application also
            implements JWT authentication and responsive design for both desktop
            and mobile devices.
          </p>
        </div>
      </motion.section>
      <Footer />
    </div>
  );
};

export default Home;
