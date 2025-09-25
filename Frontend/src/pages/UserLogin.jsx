import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2 } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';

const UserLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        email: formData.email?.trim(),
        password: formData.password?.trim(),
      };

      console.log('Sending login payload:', payload);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      toast.success('Login successful! Redirecting...');
      localStorage.setItem('taskUser', JSON.stringify(res.data));

      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      console.error('Login Error:', error.response?.data || error);
      toast.error(
        error.response?.data?.message || 'Invalid credentials. Try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
        {/* Toaster for react-hot-toast */}
        <Toaster
          position="top-center"
          reverseOrder={false}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Welcome Back
          </h2>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5">
            {/* Email */}
            <div className="relative">
              <Mail
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              type="submit"
              className="w-full flex items-center justify-center bg-indigo-500 text-white font-medium py-2 rounded-lg hover:bg-indigo-600 transition-colors shadow-md">
              {loading ? (
                <Loader2
                  className="animate-spin"
                  size={20}
                />
              ) : (
                'Login'
              )}
            </motion.button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-gray-600 text-sm mt-5">
            Don’t have an account?{' '}
            <Link
              to="/user-register"
              className="text-indigo-500 font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default UserLogin;
